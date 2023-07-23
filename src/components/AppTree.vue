<script lang="ts" setup>
import { DownOutlined, DollarCircleFilled } from "@ant-design/icons-vue";

defineProps({
  treeData: { type: null },
  selectedKeys:  { type: Array },
  onSelect: { type: null },
});

</script>

<template>
  <a-tree
    :selectedKeys="selectedKeys"
    :tree-data="treeData"
    show-icon
    default-expand-all
    @select="onSelect"
  >
    <template #switcherIcon="{ switcherCls }">
      <down-outlined :class="switcherCls" />
    </template>
    <template #icon="{ key }">
      <template v-if="key === 'trailer'">
        <font-awesome-icon icon="truck" class="icon" />
      </template>
      <template v-else-if="key === 'ship'">
        <font-awesome-icon icon="ship" class="icon" />
      </template>
      <template v-else-if="key === 'customs'">
        <font-awesome-icon icon="shield" class="icon" />
      </template>
      <template v-else-if="key === 'insurance'">
        <dollar-circle-filled class="icon" />
      </template>
    </template>
  </a-tree>
</template>

<style scoped>
.icon {
  color: grey;
  margin-right: 30px;
}
</style>
