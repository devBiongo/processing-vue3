<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import http from "@/utils/request";
import { useRouter } from "vue-router";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import CommonModal from "@/components/CommonModal.vue";

const columns = [
  {
    title: "請求書番号",
    dataIndex: "invoiceNo",
    key: "invoiceNo",
  },
  {
    title: "ステータス",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "BOOKING NO",
    dataIndex: "bookingNo",
    key: "bookingNo",
    // width: "12%",
  },

  {
    title: "SHIPPING COMP",
    dataIndex: "shippingCompanyName",
    key: "shippingCompanyName",
  },
  {
    title: "運輸会社",
    dataIndex: "transportationCompany",
    key: "transportationCompany",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
  },
];

onMounted(() => {
  pageState.tableLoading = true;
  http.get("/task/cargo/getAllCargo").then((data: any) => {
    if (data) {
      pageState.dataSource = data.map((s: any) => {
        s.key = `${s.invoiceNo}_${s.subNo}`;
        return s;
      });
    }
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
function navigate(uuid: string) {
  router.push({
    path: "/wf/cargoManifest",
    query: {
      uuid,
    },
  });
}
function submit(params: any, setOpen: any) {
  http.post("/task/cargo/registerNewOne", params).then((data) => {
    if (data && (data as any).inserts === 1) {
      pageState.loading = false;
      setOpen(false);
    }
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
            <a-radio value="1">一時保存</a-radio>
            <a-radio value="2">変更なし</a-radio>
            <a-radio value="3">変更あり</a-radio>
            <a-radio value="4">終了</a-radio>
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
          <template #content="{ setOpen, modalFormState }">
            <a-form :model="modalFormState" :label-col="{ span: 24 }">
              <a-row :gutter="[16, 16]">
                <a-col :span="12">
                  <a-form-item label="輸出入タイプ">
                    <a-select
                      v-model:value="modalFormState.inputOutputType"
                      style="width: 100%"
                    >
                      <a-select-option value="輸入">輸入</a-select-option>
                      <a-select-option value="輸出">輸出</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="SHIPPER">
                    <a-select
                      v-model:value="modalFormState.shipper"
                      style="width: 100%"
                    >
                      <a-select-option value="shipper1"
                        >shipper1</a-select-option
                      >
                      <a-select-option value="shipper2"
                        >shipper2</a-select-option
                      >
                      <a-select-option value="shipper3"
                        >shipper3</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="BOOKING TYPE">
                    <a-select
                      v-model:value="modalFormState.bookingType"
                      style="width: 100%"
                    >
                      <a-select-option value="自社">自社</a-select-option>
                      <a-select-option value="他社">他社</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="BOOKING NO">
                    <a-input v-model:value="modalFormState.bookingNo" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="BOOKING DATE">
                    <a-date-picker
                      v-model:value="modalFormState.bookingDate"
                      style="width: 100%"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="請求書番号(自社)">
                    <a-input v-model:value="modalFormState.invoiceNo" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="請求書番号(他社)">
                    <a-input v-model:value="modalFormState.invoiceNoOther" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item>
                <a-button
                  type="primary"
                  :loading="pageState.loading"
                  @click="
                    () => {
                      pageState.loading = true;
                      submit(modalFormState, setOpen);
                    }
                  "
                  >确认</a-button
                >
                <a-button
                  type="primary"
                  style="margin-left: 10px"
                  @click="
                    () => {
                      Object.keys(modalFormState).forEach(
                        (key) => (modalFormState[key] = '')
                      );
                    }
                  "
                  >クリア</a-button
                >
              </a-form-item>
            </a-form>
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
                  navigate(record.uuid);
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
