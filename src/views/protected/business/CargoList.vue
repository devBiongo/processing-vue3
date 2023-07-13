<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import http from "@/utils/request";
import { useRouter } from "vue-router";
import { SearchOutlined } from "@ant-design/icons-vue";
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
    SearchOutlined,
  },
  setup() {
    const formState = reactive<any>({ type: "2" });
    const router = useRouter();
    function navigate(uuid: string) {
      router.push({
        path: "/user/cargoManifestUpdate",
        query: {
          uuid,
        },
      });
    }
    onMounted(() => {
      http.get("/task/cargo/getAllCargo").then((data: any) => {
        if (data) {
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
    <div class="content-area">
      <a-button type="primary" style="float: right; margin: 10px">
        <template #icon><SearchOutlined /></template>
        検索
      </a-button>
      <a-button type="primary" style="float: right; margin: 10px">
        クリア
      </a-button>
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
      <a-table
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
            <span>
              <a
                @click="
                  () => {
                    navigate(record.uuid);
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
    padding: 10px;
    margin-top: 10px;
    background-color: #fff;
    min-height: 800px;
    position: relative;
  }
}
</style>
