<script lang="ts" setup>
import { UnwrapRef, reactive, ref } from "vue";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import { deepClone } from "../../utils/common";


const props = defineProps({
  config: {
    type: Object as () => { columns: any[]; dataSource: any[] },
    default: () => ({ columns: [], dataSource: [] }),
  },
});
const dataSource = ref(
  deepClone(props.config.dataSource).map((record) => ({
    ...record,
    key: nanoid(),
  }))
);
defineExpose({dataSource})
const editableData: UnwrapRef<Record<string, any>> = reactive({});
function addRecord() {
  dataSource.value.push({ ...deepClone(dataSource.value[0]), key: nanoid() });
}
function deleteRecord(key: string) {
  dataSource.value.splice(
    dataSource.value.findIndex((s) => s.key === key),
    1
  );
}
function edit(key: string) {
  editableData[key] = deepClone(
    dataSource.value.filter((item) => key === item.key)[0]
  );
}
function save(key: string) {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
}
</script>

<template>
  <div class="container">
    <a-descriptions
      bordered
      size="default"
      v-for="record in dataSource"
      :key="record.key"
    >
      <template #extra>
        <a-button
          v-if="editableData[record.key]"
          style="transform: translateY(10px); margin-right: 10px"
          type="primary"
          shape="circle"
          @click="save(record.key)"
        >
          <template #icon>
            <check-outlined />
          </template>
        </a-button>
        <a-button
          v-else
          style="transform: translateY(10px); margin-right: 10px"
          @click="edit(record.key)"
          shape="circle"
        >
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>
        <a-popconfirm
          v-if="dataSource.length > 1"
          title="削除してよろしいですか？"
          @confirm="deleteRecord(record.key)"
        >
          <a-button style="transform: translateY(10px)" shape="circle">
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </a-popconfirm>
      </template>
      <a-descriptions-item
        :label="col.label"
        v-for="col in config.columns"
        :key="col.dataIndex"
        :span="col.span ? col.span : 1"
      >
        <template v-if="editableData[record.key]">
          <a-input
            v-if="col.span !== 3"
            v-model:value="editableData[record.key][col.dataIndex]"
            style="margin: -5px 0"
          />
          <a-textarea
            v-else
            v-model:value="editableData[record.key][col.dataIndex]"
          />
        </template>
        <template v-else>
          {{ record[col.dataIndex] }}
        </template>
      </a-descriptions-item>
    </a-descriptions>
    <a-button
      type="dashed"
      block
      style="margin: 20px 0; background-color: transparent"
      @click="addRecord"
    >
      <PlusOutlined />
      追加
    </a-button>
  </div>
</template>

<style scoped>
.container {
  padding: 0 10px;
}
</style>
