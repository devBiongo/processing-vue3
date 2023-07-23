<script lang="ts" setup>
import AppSplit from "@/components/AppSplit.vue";
import AppTree from "@/components/AppTree.vue";
import { onMounted, reactive, ref } from "vue";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import http from "@/utils/request";
import CommonModal from "@/components/CommonModal.vue";

const selectedKeys = ref<any[]>([]);
const treeData: any = reactive([
  {
    title: "货运",
    key: "trailer",
    children: [],
  },
  {
    title: "船运",
    key: "ship",
    children: [],
  },
  {
    title: "海关",
    key: "customs",
    children: [],
  },
  {
    title: "保险",
    key: "insurance",
    children: [],
  },
]);
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
  selectItems: [],
});

onMounted(() => {
  http.get("/system/fetchAllUsers").then((data: any) => {
    if (data) {
      pageState.dataSource = data;
    }
  });
  http.get("/system/fetchAllCompanies").then((data: any) => {
    if (data) {
      treeData[0].children = data.trailer.map((s: any) => ({
        title: s.companyName,
        key: s.id,
      }));
      treeData[1].children = data.ship.map((s: any) => ({
        title: s.companyName,
        key: s.id,
      }));
      treeData[2].children = data.insurance.map((s: any) => ({
        title: s.companyName,
        key: s.id,
      }));
      treeData[3].children = data.customs.map((s: any) => ({
        title: s.companyName,
        key: s.id,
      }));
      const total = data.trailer
        .concat(data.ship)
        .concat(data.insurance)
        .concat(data.customs);
      pageState.selectItems = 
      total.map((s: any) => ({ key: s.id, value: s.companyName }));
      selectedKeys.value.push(total[0].id);
    }
  });
});
const onSelect = (s: number[]) => {
  if(s.length===1){
    selectedKeys.value[0] = s[0];
  }
};
</script>

<template>
  <div class="container">
    <AppSplit>
      <template #paneL> <AppTree :treeData="treeData" :selectedKeys="selectedKeys" :onSelect="onSelect"/> </template>
      <template #paneR>
        <div class="paneR-box">
          <div class="search-area">
            <CommonModal title="新規" :width="800" :record="{companyName: selectedKeys[0]}">
              <template #visibleControl="{ setOpen }">
                <a-button
                  type="primary"
                  size="small"
                  class="btn"
                  @click="
                    () => {
                      setOpen(true);
                    }
                  "
                >
                  <template #icon>
                    <PlusOutlined />
                  </template>
                  新規
                </a-button>
              </template>
              <template #content="{ modalFormState }">
                <a-form
                  :model="modalFormState"
                  :label-col="{ span: 24 }"
                  ref="formRef"
                  style="padding-top: 20px"
                >
                  <a-row :gutter="[16, 3]">
                    <a-col :span="12">
                      <a-form-item label="usename" name="username">
                        <a-input v-model:value="modalFormState.username" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="password" name="password">
                        <a-input-password
                          v-model:value="modalFormState.password"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="ニックネーム" name="nickName">
                        <a-input v-model:value="modalFormState.nickName" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="性別" name="sex">
                        <a-radio-group v-model:value="modalFormState.sex">
                          <a-radio value="a">男</a-radio>
                          <a-radio value="d">女</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="会社" name="deptId">
                        <a-select
                          v-model:value="modalFormState.companyName"
                          style="width: 100%"
                        >
                          <a-select-option
                            v-for="item in pageState.selectItems"
                            :key="item"
                            :value="(item as any).key"
                            >{{ (item as any).value }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="電話番号" name="contactNumber">
                        <a-input v-model:value="modalFormState.contactNumber" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="メール" name="email">
                        <a-input v-model:value="modalFormState.email" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="24">
                      <a-form-item label="備考" name="remark">
                        <a-textarea v-model:value="modalFormState.remark" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-form-item>
                    <a-button
                      type="primary"
                      :loading="pageState.loading"
                      @click="() => {}"
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
            <a-button type="primary" size="small" class="btn">
              <template #icon>
                <DownloadOutlined />
              </template>
              ダンロード
            </a-button>
          </div>
          <a-divider style="margin-bottom: 0" />
          <a-table
            :columns="columns"
            :dataSource="pageState.dataSource"
            size="middle"
          >
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
                  {{
                    record.nickname.length > 1
                      ? record.nickname.substring(0, 1)
                      : record.nickname
                  }}
                </a-avatar>
                <span style="display: inline-block; padding: 0 15px">{{
                  record.nickname
                }}</span>
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
