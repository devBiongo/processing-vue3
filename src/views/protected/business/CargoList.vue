<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import http from "@/utils/request";
import { DeleteOutlined } from "@ant-design/icons-vue";
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
let pageState: any = reactive({
  dataSourse: [],
});
export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    const formState = reactive<any>({});
    function navigate(invoiceNo: string) {
      // window.open(`/cargoManifestUpdate?invoiceNo=${invoiceNo}`, "_blank");
      window.open(`/cargoManifestUpdate?invoiceNo=${invoiceNo}`, "_blank",'width=1300, height=800, toolbar=0, location=0, status=0, menubar=0');
    }
    onMounted(() => {
      http.get("/task/cargo/getAllCargo").then((data: any) => {
        if (data) {
          console.log(data);
          pageState.dataSource = data.map((s: any) => {
            s.key = `${s.invoiceNo}_${s.subNo}`;
            return s;
          });
        }
      });
    });
    return { columns, pageState, rowSelection, navigate, formState };
  },
});
</script>

<template>
  <div class="cargo-list-container">
    <div class="search-area">
      <a-input-group compact>
        <a-select v-model:value="formState.value15" style="width: 100px">
          <a-select-option value="Sign Up">自社</a-select-option>
          <a-select-option value="Sign In">他社</a-select-option>
        </a-select>
        <a-auto-complete
          v-model:value="formState.value16"
          :options="[{ value: 'text 1' }, { value: 'text 2' }]"
          style="width: 200px"
          placeholder="請求書番号"
        />
      </a-input-group>
    </div>
    <div class="content-area">
      <a-table
        :columns="columns"
        :dataSource="pageState.dataSource"
        :rowSelection="rowSelection"
        size="middle"
      >
        <template #title>
          <div style="overflow: hidden">
            <a-typography-title :level="4" style="float: left"
              >タスク一覧</a-typography-title
            >
            <a-button type="primary" style="float: right"> 
              <template #icon>
                <delete-outlined />
              </template>
              削除 
            </a-button>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-badge color="#108ee9" text="正常" status="processing" />
          </template>
          <template v-if="column.key === 'actions'">
            <span>
              <a
                @click="
                  () => {
                    navigate(record.invoiceNo);
                  }
                "
                >詳細</a
              >
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cargo-list-container {
  .search-area {
    background-color: #fff;
    padding: 20px 20px;
  }
  .content-area {
    padding: 10px;
    margin-top: 10px;
    background-color: #fff;
    min-height: 800px;
  }
}
</style>
