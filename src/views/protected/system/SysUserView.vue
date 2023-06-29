<script lang="ts">
import CommonTable from "@/components/CommonTable.vue";
import AppSplit from "@/components/AppSplit.vue";
import AppTree from "@/components/AppTree.vue";
import { defineComponent, reactive, Ref, ref } from "vue";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons-vue";

interface DataItem {
  key: number | string;
  name: string;
  account: string;
  status: boolean;
  company: string;
  createdTime: string;
  actions?: any[];
}
const columns = [
  {
    title: "名前",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "アカウント",
    dataIndex: "account",
    key: "account",
    // width: "12%",
  },
  {
    title: "ステータス",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "会社",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "登録時間",
    dataIndex: "createdTime",
    key: "createdTime",
    sorter: true,
  },
  {
    title: "アクション",
    dataIndex: "actions",
    key: "actions",
  },
];
const dataSource: Ref<DataItem[]> = ref([
  {
    key: 1,
    name: "呉",
    account: "admin",
    status: true,
    company: "123",
    createdTime: "2023-06-02",
  },
  {
    key: 2,
    name: "John",
    account: "test01",
    status: true,
    company: "123",
    createdTime: "2023-06-02",
  },
]);
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  components: { CommonTable, AppSplit, AppTree,DownloadOutlined,PlusOutlined },
  setup() {
    const formState = reactive<FormState>({
      username: "",
      password: "",
      remember: true,
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    return { columns, dataSource, formState, onFinish, onFinishFailed };
  },
});
</script>

<template>
  <div class="container">
    <AppSplit>
      <template #paneL> <AppTree /> </template>
      <template #paneR>
        <div class="paneR-box">
          <div class="search-area">
            <a-button type="primary" size="small" class="btn">
              <template #icon>
                <PlusOutlined />
              </template>
              新規
            </a-button>
            <a-button type="primary" size="small" class="btn">
              <template #icon>
                <DownloadOutlined />
              </template>
              ダンロード
            </a-button>
          </div>
          <a-divider style="margin-bottom: 0" />
          <CommonTable :columns="columns" :dataSource="dataSource" />
        </div>
      </template>
    </AppSplit>
  </div>
</template>


<style scoped>
.container {
  padding: 1px;
}
.paneR-box {
  padding: 10px;
}
.search-area {
  height: 30px;
  padding-top: 10px;
}
.btn{
  float: right;
  margin: 0 10px;
  height: 30px;
}
</style>