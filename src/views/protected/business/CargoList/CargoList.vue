<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { useColumn } from "./util";
import { fetchCargos } from "./api";
import { useRouter } from "vue-router";

const state = reactive({
  searchText: "",
  searchedColumn: "",
  dataSource: [],
});

onMounted(() => {
  fetchCargos().then((data: any) => {
    if (data) {
      state.dataSource = data.map((s: any) => ({
        ...s,
        key: s.cargoId,
      }));
    }
  });
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
  <a-table :data-source="state.dataSource" :columns="columns">
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
        <a-button type="link" @click="navigate(record.cargoId)" block
          >詳細</a-button
        >
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
