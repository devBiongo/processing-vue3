<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import http from "@/utils/request";
import CommonModal from "@/components/CommonModal.vue";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { Rule } from "ant-design-vue/es/form/interface";

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
    width: "12%",
  },
  {
    title: "メール",
    dataIndex: "email",
    key: "email",
    width: "12%",
  },
  {
    title: "アドレス",
    dataIndex: "address",
    key: "address",
    width: "20%",
  },
  {
    title: "会社分類",
    dataIndex: "companyType",
    key: "companyType",
    width: "10%",
  },
  {
    title: "登録時間",
    dataIndex: "createTime",
    key: "createTime",
    width: "10%",
  },
  {
    title: "アクション",
    dataIndex: "actions",
    key: "actions",
    width: "10%",
  },
];

const pageState = reactive({
  loading: false,
  tableLoading: false,
  queries: { companyType: "货代" } as any,
  data: { companyType: "" } as any,
  dataSource: [],
});

function search() {
  pageState.tableLoading = true;
  http
    .post("/system/fetchCompanies", {
      queries: {
        delFlag: 0,
        companyType: pageState.queries.companyType,
      },
      timeRange: {
        createTimeFrom:
          pageState.queries.createTime && pageState.queries.createTime[0],
        createTimeTo:
          pageState.queries.createTime && pageState.queries.createTime[1],
      },
    })
    .then((data: any) => {
      if (data) {
        pageState.dataSource = data;
      }
      pageState.tableLoading = false;
    });
}

onMounted(() => {
  search();
});
const formRef = ref();
function addSubmit(params: any, setOpen: any) {
  pageState.loading = true;
  formRef.value
    .validate()
    .then(() => {
      http.post("/system/addCompany", params).then((data) => {
        if (data && (data as any).inserts === 1) {
          setOpen(false);
          search();
        }
        pageState.loading = false;
      });
    })
    .catch((error: any) => {
      pageState.loading = false;
      console.log("error", error);
    });
}
function updateSubmit(params: any, setOpen: any) {
  pageState.loading = true;
  formRef.value
    .validate()
    .then(() => {
      http.post("/system/updateCompanies", params).then((data) => {
        if (data && (data as any).updates === 1) {
          setOpen(false);
          search();
        }
        pageState.loading = false;
      });
    })
    .catch((error: any) => {
      pageState.loading = false;
      console.log("error1", error);
    });
}
function deleteSubmit(params: any, setOpen: any) {
  pageState.loading = true;
  formRef.value
    .validate()
    .then(() => {
      http.post("/system/deleteSpecifiedCompany", params).then((data) => {
        if (data && (data as any).updates === 1) {
          setOpen(false);
          search();
        }
        pageState.loading = false;
      });
    })
    .catch((error: any) => {
      pageState.loading = false;
      console.log("error1", error);
    });
}

const rules: Record<string, Rule[]> = {
  companyType: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "change",
    },
  ],
  companyName: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
};
</script>

<template>
  <div class="company-container">
    <ul>
      <li>
        <label>ステータス</label>
        <a-radio-group
          name="type"
          v-model:value="pageState.queries.companyType"
        >
          <a-radio value="货代">货代</a-radio>
          <a-radio value="拖车">拖车</a-radio>
          <a-radio value="船运">船运</a-radio>
          <a-radio value="海关">海关</a-radio>
          <a-radio value="保险">保险</a-radio>
        </a-radio-group>
      </li>
      <li>
        <label>登録日</label>
        <div>
          <a-range-picker
            style="width: 380px"
            v-model:value="pageState.queries.createTime"
          />
        </div>
      </li>
    </ul>
    <div>
      <div style="padding-bottom: 10px; overflow: hidden">
        <CommonModal title="新規" :width="800" :record="pageState.data">
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
          <template #content="{ modalFormState, setOpen }">
            <a-form
              :model="modalFormState"
              :label-col="{ span: 24 }"
              :rules="rules"
              ref="formRef"
            >
              <a-row :gutter="[16, 16]">
                <a-col :span="12">
                  <a-form-item label="会社タイプ" name="companyType">
                    <a-select
                      v-model:value="modalFormState.companyType"
                      style="width: 100%"
                      defaultValue="船运"
                    >
                      <a-select-option value=""></a-select-option>
                      <a-select-option value="货代">货代</a-select-option>
                      <a-select-option value="拖车">拖车</a-select-option>
                      <a-select-option value="船运">船运</a-select-option>
                      <a-select-option value="海关">海关</a-select-option>
                      <a-select-option value="保险">保险</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="会社名" name="companyName">
                    <a-input v-model:value="modalFormState.companyName" />
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
                  <a-form-item label="アドレス" name="address">
                    <a-textarea v-model:value="modalFormState.address" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item>
                <a-button
                  type="primary"
                  :loading="pageState.loading"
                  @click="
                    () => {
                      addSubmit(modalFormState, setOpen);
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
        <a-button
          type="primary"
          style="float: right; margin-right: 10px"
          @click="
            () => {
              search();
            }
          "
        >
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
        size="middle"
        style="min-height: 600px"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <CommonModal title="編集" :width="800" :record="record">
              <template #visibleControl="{ setOpen }">
                <a-button
                  type="link"
                  @click="
                    () => {
                      pageState.loading = false;
                      setOpen(true);
                    }
                  "
                  block
                  >編集</a-button
                >
              </template>
              <template #content="{ modalFormState, setOpen }">
                <a-form
                  :model="modalFormState"
                  :label-col="{ span: 24 }"
                  :rules="rules"
                  ref="formRef"
                >
                  <a-row :gutter="[16, 16]">
                    <a-col :span="12">
                      <a-form-item label="会社タイプ" name="companyType">
                        <a-select
                          v-model:value="modalFormState.companyType"
                          style="width: 100%"
                          defaultValue="船运"
                        >
                          <a-select-option value=""></a-select-option>
                          <a-select-option value="货代">货代</a-select-option>
                          <a-select-option value="拖车">拖车</a-select-option>
                          <a-select-option value="船运">船运</a-select-option>
                          <a-select-option value="海关">海关</a-select-option>
                          <a-select-option value="保险">保险</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="会社名" name="companyName">
                        <a-input v-model:value="modalFormState.companyName" />
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
                      <a-form-item label="アドレス" name="address">
                        <a-textarea v-model:value="modalFormState.address" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-form-item>
                    <a-button
                      type="primary"
                      :loading="pageState.loading"
                      @click="
                        () => {
                          updateSubmit(modalFormState, setOpen);
                        }
                      "
                      >更新</a-button
                    >
                    <a-button
                      danger
                      type="primary"
                      style="margin-left: 10px"
                      @click="
                        () => {
                          deleteSubmit(modalFormState, setOpen);
                        }
                      "
                      >削除</a-button
                    >
                  </a-form-item>
                </a-form>
              </template>
            </CommonModal>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
ul {
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
