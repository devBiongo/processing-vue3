<script lang="ts" setup>
import { UnwrapRef, reactive, ref } from "vue";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import { deepClone } from "@/utils/common";

const editableData: UnwrapRef<Record<string, any>> = reactive({});
const dataSource = ref([
  {
    key: nanoid(),
    companyName: "",
    contactPerson: "",
    teleNum: "",
    date: "",
    address: "",
    note: "",
  },
]);
function addRecord() {
  dataSource.value.push({
    key: nanoid(),
    companyName: "",
    contactPerson: "",
    teleNum: "",
    date: "",
    address: "",
    note: "",
  });
}
function deleteRecord(key: string) {
  dataSource.value.splice(
    dataSource.value.findIndex((s) => (s.key = key)),
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
        <a-button
          v-if="dataSource.length > 1"
          style="transform: translateY(10px)"
          shape="circle"
          @click="deleteRecord(record.key)"
        >
          <template #icon>
            <delete-outlined />
          </template>
        </a-button>
      </template>
      <a-descriptions-item label="会社">
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].companyName"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.companyName }}
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="担当者">
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].contactPerson"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.contactPerson }}
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="連絡Tel">
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].teleNum"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.teleNum }}
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="日時">
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].date"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.date }}
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="住所" :span="2">
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].address"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.address }}
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="備考" :span="3">
        <a-textarea
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key].note"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ record.note }}
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
