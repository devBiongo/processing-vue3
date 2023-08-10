<script lang="ts" setup>
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { useColumn } from "./util";
import { fetchCargos,downloadPdf } from "./api";
import { useRouter } from "vue-router";
import CommonModal from "@/components/CommonModal.vue";
import ModalForm from "./ModalForm.vue";

const state = reactive({
  searchText: "",
  searchedColumn: "",
  dataSource: [],
  loading: false,
});
function initTable() {
  state.loading = true;
  fetchCargos().then((data: any) => {
    state.loading = false;
    if (data) {
      state.dataSource = data.map((s: any) => ({
        ...s,
        key: s.cargoId,
      }));
    }
  });
}
onMounted(() => {
  initTable();
});

const searchInput = ref();
const columns = useColumn();

const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters: any) => {
  clearFilters({ confirm: true });
  state.searchText = "";
};
const router = useRouter();
function navigate(cargoId: string) {
  router.push({
    path: "/wf/cargoManifest",
    query: {
      cargoId,
    },
  });
}
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 480px;
    "
    v-if="state.loading"
  >
    <a-spin size="large" />
  </div>
  <a-table
    :data-source="state.dataSource"
    :columns="columns"
    :style="{ display: state.loading ? 'none' : 'block' }"
  >
    <template #title>
      <div style="text-align: right">
        <CommonModal title="新規" :width="800">
          <template #visibleControl="{ setOpen }">
            <div style="text-align: right">
              <a-button type="primary" @click="setOpen(true)">
                <template #icon><plus-outlined /></template>
                新規
              </a-button>
            </div>
          </template>
          <template #content="{ setOpen }">
            <ModalForm :setOpen="setOpen" :initTable="initTable" />
          </template>
        </CommonModal>
      </div>
    </template>
    <template #headerCell="{ column }">
      <template v-if="column.key === 'invoiceNo'">
        <span style="color: #1890ff">請求書番号</span>
      </template>
    </template>
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined
        :style="{ color: filtered ? '#108ee9' : undefined, fontSize: '18px' }"
      />
    </template>
    <template #bodyCell="{ text, column, record }">
      <template v-if="column.key === 'actions'">
        <a-space wrap>
          <a-button type="link" @click="navigate(record.cargoId)">
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
          <a-button type="link" @click="downloadPdf(record.cargoId)">
            <template #icon>
              <DownloadOutlined />
            </template>
          </a-button>
        </a-space>
      </template>
      <template v-if="column.key === 'createdAt'">
        {{ record.createdAt && record.createdAt.substring(0, 10) }}
      </template>
      <span
        v-if="state.searchText && state.searchedColumn === column.dataIndex"
      >
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(
              new RegExp(
                `(?<=${state.searchText})|(?=${state.searchText})`,
                'i'
              )
            )"
        >
          <mark
            v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
    </template>
  </a-table>
</template>

<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
