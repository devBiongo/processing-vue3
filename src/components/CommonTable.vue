
<script lang="ts">
import { defineComponent, ref } from "vue";
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
export default defineComponent({
  props: {
    columns: { type: Array, default: () => [] },
    dataSource: { type: Array, default: () => [] },
  },
  setup() {
    return {
      rowSelection
    };
  },
});
</script>

<template>
  <a-table :columns="columns" :dataSource="dataSource" :rowSelection="rowSelection" size="middle">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a-avatar
          shape="square"
          size="middle"
          :style="{
            backgroundColor: record.account === 'admin' ? '#f38709' : '#813afd',
            verticalAlign: 'middle',
          }"
        >
          {{ record.name }}
        </a-avatar>
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
</template>


