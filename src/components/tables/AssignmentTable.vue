
<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import { defineComponent, toRefs } from "vue";
import { formatDatePicker } from "@/utils/common";
import CommonModal from "../CommonModal.vue";


const columns = [
  { title: "日時", dataIndex: "date", key: "date" },
  { title: "会社", dataIndex: "companyName", key: "companyName" },
  { title: "住所", dataIndex: "address", key: "address" },
  { title: "担当者", dataIndex: "contactPerson", key: "contactPerson" },
  { title: "連絡Tel", dataIndex: "teleNum", key: "teleNum" },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 230,
  },
];

export default defineComponent({
  props: {
    dataSourse: { type: Array, default: () => [] },
  },
  components: {
    CommonModal,
    PlusOutlined,
  },
  setup(props) {
    const { dataSourse } = toRefs(props);
    return {
      data: dataSourse,
      columns,
      nanoid,
      formatDatePicker,
    };
  },
});
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
    bordered
  >
    <template #title>
      <a-row justify="end">
        <a-col :span="2">
          <common-modal title="新規" :width="600">
            <template #visibleControl="{ setOpen }">
              <a-button
                type="primary"
                @click="
                  () => {
                    setOpen(true);
                  }
                "
              >
                <template #icon>
                  <plus-outlined />
                </template>
                追加
              </a-button>
            </template>
            <template #content="{ setOpen, modalFormState }">
              <a-form :model="modalFormState" :label-col="{ span: 24 }">
                <a-row :gutter="[16, 16]">
                  <a-col :span="12">
                    <a-form-item label="日時">
                      <a-date-picker
                        v-model:value="modalFormState.date"
                        style="width: 100%"
                        show-time
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="会社">
                      <a-input v-model:value="modalFormState.companyName" />
                    </a-form-item>
                  </a-col>

                  

                  <a-col :span="12">
                    <a-form-item label="担当者">
                      <a-input v-model:value="modalFormState.contactPerson" />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item label="連絡Tel">
                      <a-input v-model:value="modalFormState.teleNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="住所">
                      <a-textarea
                        :rows="4"
                        v-model:value="modalFormState.address"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="備考">
                      <a-textarea
                        :rows="4"
                        v-model:value="modalFormState.precautions"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item>
                  <a-button
                    type="primary"
                    @click="
                      () => {
                        const newObj = Object.assign({}, modalFormState);
                        Object.keys(modalFormState).forEach((key) => {
                          modalFormState[key] = null;
                        });
                        newObj.key = nanoid();
                        data.push(newObj);
                        setOpen(false);
                      }
                    "
                    >确认</a-button
                  >
                </a-form-item>
              </a-form>
            </template>
          </common-modal>
        </a-col>
      </a-row>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'date'">
        {{ formatDatePicker(record.date) }}
      </template>
      <template v-if="column.key === 'action'">
        <common-modal title="編集" :width="1000" :record="record">
          <template #visibleControl="{ setOpen }">
            <a-button
              type="link"
              @click="
                () => {
                  setOpen(true);
                }
              "
              >編集</a-button
            >
            <a-button
              type="link"
              @click="
                () => {
                  const newObj = Object.assign({}, record);
                  newObj.key = nanoid();
                  data.push(newObj)
                }
              "
              >コピー</a-button
            >
            <a-button
              @click="
                () => {
                  data.splice(index,1);
                }
              "
              type="link"
              danger
              >削除</a-button
            >
          </template>
          <template #content="{ setOpen, modalFormState }">
            <a-form :model="modalFormState" :label-col="{ span: 24 }">
              <a-row :gutter="[16, 16]">
                <a-col :span="12">
                    <a-form-item label="日時">
                      <a-date-picker
                        v-model:value="modalFormState.date"
                        style="width: 100%"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="会社">
                      <a-input v-model:value="modalFormState.companyName" />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item label="住所">
                      <a-input v-model:value="modalFormState.address" />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item label="担当者">
                      <a-input v-model:value="modalFormState.contactPerson" />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item label="連絡Tel">
                      <a-input v-model:value="modalFormState.teleNum" />
                    </a-form-item>
                  </a-col>
                  
                  <a-col :span="24">
                    <a-form-item label="備考">
                      <a-textarea
                        :rows="4"
                        v-model:value="modalFormState.precautions"
                      />
                    </a-form-item>
                  </a-col>
              </a-row>
              <a-form-item>
                <a-button
                  type="primary"
                  @click="
                    () => {
                      setOpen(false);
                    }
                  "
                  >修正完了</a-button
                >
              </a-form-item>
            </a-form>
          </template>
        </common-modal>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.precautions }}
      </p>
    </template>
  </a-table>
</template>


