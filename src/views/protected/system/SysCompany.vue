<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import http from "@/utils/request";

const columns = [
  {
    title: "会社名",
    dataIndex: "companyName",
    key: "companyName",
    width: "10%",
  },
  {
    title: "電話番号",
    dataIndex: "contactNumber",
    key: "contactNumber",
    width: "10%",
  },
  {
    title: "メール",
    dataIndex: "email",
    key: "email",
    width: "10%",
  },
  {
    title: "アドレス",
    dataIndex: "address",
    key: "address",
    width: "10%",
  },
  {
    title: "会社分類",
    dataIndex: "companyType",
    key: "companyType",
    sorter: true,
  },
  {
    title: "登録時間",
    dataIndex: "createTime",
    key: "createTime",
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
  formState: {} as any,
  dataSource: [],
});

onMounted(() => {
  http.get("/system/fetchAllCompanies").then((data: any) => {
    if (data) {
      pageState.dataSource = data;
    }
  });
});
</script>

<template>
  <div class="company-container">
    <ul>
      <li>
        <label>ステータス</label>
        <a-radio-group name="type" v-model:value="pageState.formState.type">
          <a-radio value="1">船运</a-radio>
          <a-radio value="2">货运</a-radio>
          <a-radio value="3">海关</a-radio>
          <a-radio value="4">保险</a-radio>
        </a-radio-group>
      </li>
      <li>
        <label>登録日</label>
        <div>
          <a-range-picker style="width: 380px" />
        </div>
      </li>
    </ul>
    <div>
      <a-table
      :columns="columns"
      :dataSource="pageState.dataSource"
      size="middle"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'actions'">
          <a-button
              type="link"
              @click="
                () => {
                  
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

<style lang="less" scoped>
ul{
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
.company-container {
  padding: 10px;
  background-color: #fff;
}

</style>
