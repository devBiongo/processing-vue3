
<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, toRefs } from "vue";
import CommonModal from "../CommonModal.vue";
import { nanoid } from "nanoid";
import { formatDatePicker } from "@/utils/common";

const columns = [
  { title: "日時", dataIndex: "date", key: "date" },
  { title: "発地", dataIndex: "departure", key: "departure" },
  { title: "経由地", dataIndex: "transit", key: "transit" },
  { title: "着地", dataIndex: "arrival", key: "arrival" },
  { title: "VAN No", dataIndex: "vanNo", key: "vanNo" },
  { title: "シール No", dataIndex: "sheetNo", key: "sheetNo" },
  { title: "サイズ", dataIndex: "size", key: "size" },
  { title: "FREE TIME(Dev)", dataIndex: "freeTime", key: "freeTime" },
  { title: "T/W", dataIndex: "tw", key: "tw" },
  { title: "免税運賃", dataIndex: "dutyFreeFare", key: "dutyFreeFare" },
  { title: "課税運賃", dataIndex: "taxableFare", key: "taxableFare" },
  { title: "通行料", dataIndex: "toll", key: "toll" },
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
    PlusOutlined,
    CommonModal,
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
    :scroll="{ x: 2000 }"
    bordered
  >
    <template #title>
      <a-row justify="end">
        <a-col :span="2">
          <common-modal title="新規" :width="1000">
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
                  <a-col :span="6">
                    <a-form-item label="日時">
                      <a-date-picker
                        v-model:value="modalFormState.date"
                        style="width: 100%"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="発地">
                      <a-input v-model:value="modalFormState.departure" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="経由地">
                      <a-input v-model:value="modalFormState.transit" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="着地">
                      <a-input v-model:value="modalFormState.arrival" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="VAN No">
                      <a-input v-model:value="modalFormState.vanNo" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="シール No">
                      <a-input v-model:value="modalFormState.sheetNo" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="サイズ">
                      <a-input v-model:value="modalFormState.size" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="FREE TIME(Dev)">
                      <a-input v-model:value="modalFormState.freeTime" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="T/W">
                      <a-input v-model:value="modalFormState.tw" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="免税運賃(JPY)" >
                      <a-input-number v-model:value="modalFormState.dutyFreeFare" style="width: 100%;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="課税運賃(JPY)" > 
                      <a-input-number v-model:value="modalFormState.taxableFare" style="width: 100%;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="通行料(JPY)" >
                      <a-input-number v-model:value="modalFormState.toll" style="width: 100%;"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="売上金額(JPY)">
                      <a-input-number v-model:value="modalFormState.uriagekinngaku" style="width: 100%;"/>
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
                <a-col :span="6">
                  <a-form-item label="日時">
                    <a-date-picker
                      v-model:value="modalFormState.date"
                      style="width: 100%"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="発地">
                    <a-input v-model:value="modalFormState.departure" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="経由地">
                    <a-input v-model:value="modalFormState.transit" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="着地">
                    <a-input v-model:value="modalFormState.arrival" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="VAN No">
                    <a-input v-model:value="modalFormState.vanNo" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="シール No">
                    <a-input v-model:value="modalFormState.sheetNo" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="サイズ">
                    <a-input v-model:value="modalFormState.size" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="FREE TIME(Dev)">
                    <a-input v-model:value="modalFormState.freeTime" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="T/W">
                    <a-input v-model:value="modalFormState.tw" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="免税運賃">
                    <a-input v-model:value="modalFormState.dutyFreeFare" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="課税運賃">
                    <a-input v-model:value="modalFormState.taxableFare" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="通行料">
                    <a-input v-model:value="modalFormState.toll" />
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


