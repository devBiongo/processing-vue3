<script lang="ts" setup>
import AppSplit from "@/components/AppSplit.vue";
import AppTree from "@/components/AppTree.vue";
import { onMounted, reactive } from "vue";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import http from "@/utils/request";

const columns = [
  {
    title: "ニックネーム",
    dataIndex: "nickname",
    key: "nickname",
    width: "16%",
  },
  {
    title: "アカウント",
    dataIndex: "username",
    key: "username",
    width: "10%",
    
  },
  {
    title: "ステータス",
    dataIndex: "status",
    key: "status",
    width: "10%",
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


const pageState = reactive({
  loading: false,
  dataSource: [],
});


// [
//   {
//     key: 1,
//     nickname: "管",
//     username: "admin",
//     status: true,
//     company: "123",
//     createdTime: "2023-06-02",
//   },
//   {
//     key: 2,
//     nickname: "John",
//     username: "test01",
//     status: true,
//     company: "123",
//     createdTime: "2023-06-02",
//   },
// ];


onMounted(() => {
  http.get("/system/fetchAllUsers").then((data: any) => {
    if(data){
      pageState.dataSource = data;
    }
  });
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
          <a-table :columns="columns" :dataSource="pageState.dataSource" size="middle">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'nickname'">
                <a-avatar
                  shape="square"
                  size="middle"
                  :style="{
                    backgroundColor:
                      record.username === 'admin' ? '#f38709' : '#813afd',
                    verticalAlign: 'middle',
                  }"
                >
                  {{ record.nickname.length>1?record.nickname.substring(0,1):record.nickname }}
                </a-avatar>
                <span style="display: inline-block;padding: 0 15px;">{{ record.nickname }}</span>
              </template>
              <template v-else-if="column.key === 'status'">
                <a-badge color="#108ee9" text="正常" status="processing" />
              </template>
              <template v-else-if="column.key === 'actions'">
                <span>
                  <a>詳細</a>
                  <a-divider type="vertical" />
                  <a>パスワードリセット</a>
                </span>
              </template>
            </template>
          </a-table>
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
.btn {
  float: right;
  margin: 0 10px;
  height: 30px;
}
</style>
