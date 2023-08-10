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
  deepClone(
    (props.config.dataSource &&
      props.config.dataSource[0] &&
      props.config.dataSource) || [{}]
  ).map((record: any) => ({
    ...record,
    $key: nanoid(),
  }))
);

defineExpose({ dataSource });
const editableData: UnwrapRef<Record<string, any>> = reactive({});
// 追加
function addRecord() {
  dataSource.value.push({
    ...Object.fromEntries(
      Object.keys(dataSource.value[0]).map((key) => [key, ""])
    ),
    $key: nanoid(),
  });
}
// 删除
function deleteRecord(key: string) {
  dataSource.value.splice(
    dataSource.value.findIndex((item: any) => item.$key === key),
    1
  );
}
// 编辑
function edit(key: string) {
  editableData[key] = deepClone(
    dataSource.value.filter((item: any) => item.$key === key)[0]
  );
}
// 保存
function save(key: string) {
  Object.assign(
    dataSource.value.filter((item: any) => item.$key === key)[0],
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
      v-for="(item, index) in dataSource"
      :key="item.$key"
    >
      <template #title>
        <span
          style="
            display: inline-block;
            margin-top: 20px;
            font-size: 16px;
          "
          >{{ index + 1 }}</span
        >
      </template>
      <template #extra>
        <a-button
          v-if="editableData[item.$key]"
          style="transform: translateY(10px); margin-right: 10px"
          type="primary"
          shape="circle"
          @click="save(item.$key)"
        >
          <template #icon>
            <check-outlined />
          </template>
        </a-button>
        <a-button
          v-else
          style="transform: translateY(10px); margin-right: 10px"
          @click="edit(item.$key)"
          shape="circle"
        >
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>
        <a-popconfirm
          v-if="dataSource.length > 1"
          title="削除してよろしいですか？"
          @confirm="deleteRecord(item.$key)"
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
        <template v-if="editableData[item.$key]">
          <a-input
            v-if="col.span !== 3"
            v-model:value="editableData[item.$key][col.dataIndex]"
            style="margin: -5px 0"
          />
          <a-textarea
            v-else
            v-model:value="editableData[item.$key][col.dataIndex]"
          />
        </template>
        <template v-else>
          {{ item[col.dataIndex] }}
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
