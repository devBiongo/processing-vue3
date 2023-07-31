<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import CommonModal from "@/components/CommonModal.vue";
import { fetchCargos } from "./api";
import { getColumn } from "./util";
import ModalForm from "./ModalForm.vue";

const columns = getColumn();
onMounted(() => {
  pageState.tableLoading = true;
  fetchCargos().then((data: any) => {
    pageState.dataSource = data.map((s: any) => {
      s.key = `${s.cargoId}_${s.subNo}`;
      return s;
    });
    pageState.tableLoading = false;
  });
});
let pageState: any = reactive({
  dataSourse: [],
  loading: false,
  tableLoading: false,
});
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
const formState = reactive<any>({ type: "2" });
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
  <div class="cargo-list-container">
    <div class="content-area">
      <ul class="search-area">
        <li>
          <label>ステータス</label>
          <a-radio-group name="type" v-model:value="formState.type">
            <a-radio value="1">変更なし</a-radio>
            <a-radio value="2">変更あり</a-radio>
          </a-radio-group>
        </li>
        <li>
          <label>登録日</label>
          <div>
            <a-range-picker style="width: 380px" />
          </div>
        </li>
        <li style="margin-top: 12px">
          <label>請求書番号(自社)</label>
          <div style="margin-right: 40px">
            <a-input style="width: 250px" />
          </div>
          <label>請求書番号(他社)</label>
          <div>
            <a-input style="width: 250px" />
          </div>
        </li>
      </ul>
      <div style="padding-bottom: 10px; overflow: hidden">
        <CommonModal title="新規" :width="800">
          <template #visibleControl="{ setOpen }">
            <a-button
              type="primary"
              @click="
                () => {
                  pageState.loading = false;
                  setOpen(true);
                }
              "
              style="float: right; margin-right: 10px"
            >
              <template #icon><plus-outlined /></template>
              新規
            </a-button>
          </template>
          <template #content="{ setOpen }">
            <ModalForm :setOpen="setOpen" />
          </template>
        </CommonModal>
        <a-button type="primary" style="float: right; margin-right: 10px">
          <template #icon><SearchOutlined /></template>
          検索
        </a-button>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        "
        v-if="pageState.tableLoading"
      >
        <a-spin size="large" />
      </div>
      <a-table
        v-else
        :columns="columns"
        :dataSource="pageState.dataSource"
        :rowSelection="rowSelection"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-badge color="#108ee9" text="正常" status="processing" />
          </template>
          <template v-if="column.key === 'actions'">
            <a-button
              type="link"
              @click="
                () => {
                  navigate(record.cargoId);
                }
              "
              block
              >詳細</a-button
            >
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<!-- <a-button type="primary" style="float: right">
  <template #icon>
    <delete-outlined />
  </template>
  削除
</a-button> 

-->

<style lang="less" scoped>
.cargo-list-container {
  .search-area {
    list-style: none; /* 去除列表标记 */
    padding: 10px 5px;
    li {
      height: 50px;
      display: flex;
      label {
        line-height: 28px;
        width: 160px;
      }
    }
  }
  .content-area {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #fff;
    min-height: 800px;
    position: relative;
  }
}
</style>
