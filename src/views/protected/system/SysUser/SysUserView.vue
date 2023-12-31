<script lang="ts" setup>
import AppSplit from "@/components/AppSplit.vue";
import AppTree from "@/components/AppTree.vue";
import { onMounted, reactive } from "vue";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import CommonModal from "@/components/CommonModal.vue";
import { fetchAllCompanies, fetchUsers } from "./userApi";
import { formatSelectItems, formatTreeData, getColumn } from "./userUtils";
import AddForm from "./AddForm.vue";
import UpdateForm from "./UpdateForm.vue";
import { setUserStatus } from "./userApi";

const columns = getColumn();
const pageState = reactive<any>({
  tableLoading: false,
  dataSource: [],
  selectItems: [],
  treeData: [],
  selectedTreeKeys: [],
});
const freshUsers = (queries: any) => {
  if (queries === undefined) {
    queries =
      pageState.selectedTreeKeys[0] !== undefined
        ? { deptId: pageState.selectedTreeKeys[0] }
        : {};
  }
  fetchUsers(queries).then((data: any) => {
    pageState.tableLoading = false;
    if (!data) return;
    data.forEach((s: any) => {
      s.ok = s.status === "0" ? true : false;
      s.loading = false;
    });
    pageState.dataSource = data;
  });
};
onMounted(() => {
  pageState.tableLoading = true;
  freshUsers(
    pageState.selectedTreeKeys[0] !== undefined
      ? { deptId: pageState.selectedTreeKeys[0] }
      : {}
  );
  fetchAllCompanies().then((data: any) => {
    if (!data) return;
    pageState.treeData = formatTreeData(data);
    pageState.selectItems = formatSelectItems(data) as any;
  });
});
const onSelect = (s: any[]) => {
  if (s.length === 1 && typeof s[0] === "number") {
    pageState.tableLoading = true;
    pageState.selectedTreeKeys = s;
    freshUsers({ deptId: s[0] });
  }
};
</script>

<template>
  <div class="container">
    <AppSplit>
      <template #paneL>
        <AppTree
          :treeData="pageState.treeData"
          :selectedKeys="pageState.selectedTreeKeys"
          :onSelect="onSelect"
        />
      </template>
      <template #paneR>
        <div class="paneR-box">
          <div class="search-area">
            <CommonModal title="新規" :width="800">
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
              <template #content="{ setOpen }">
                <AddForm
                  :selectItems="pageState.selectItems"
                  :setOpen="setOpen"
                  :freshUsers="freshUsers"
                />
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
                <a-badge
                  color="#108ee9"
                  text="正常"
                  status="processing"
                  v-if="record.ok"
                />
                <a-badge color="red" text="禁用" status="success" v-else />
                <a-switch
                  :checked="record.ok"
                  :loading="record.loading"
                  style="margin-left: 20px; margin-bottom: 2px"
                  @change="(e: any)=>{
                    record.loading = true;
                    setUserStatus({ username:record.username, status: e?0:1 }).then((data: any) => {
                      if (data&&data.updates===1){
                        record.ok = e;
                      }
                      record.loading = false;
                    });
                  }"
                />
              </template>
              <template v-else-if="column.key === 'actions'">
                <CommonModal title="編集" :width="800">
                  <template #visibleControl="{ setOpen }">
                    <a-button
                      type="link"
                      @click="
                        () => {
                          setOpen(true);
                        }
                      "
                      block
                      >編集</a-button
                    >
                  </template>
                  <template #content="{ setOpen }">
                    <UpdateForm
                      :selectItems="pageState.selectItems"
                      :setOpen="setOpen"
                      :record="record"
                      :freshUsers="freshUsers"
                    />
                  </template>
                </CommonModal>
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
