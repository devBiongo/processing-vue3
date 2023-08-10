<script lang="ts" setup>
import { DownOutlined, DollarCircleFilled ,CustomerServiceFilled} from "@ant-design/icons-vue";

defineProps({
  treeData: { type: null },
  selectedTreeKeys:  { type: Array },
  onSelect: { type: null },
});

</script>

<template>
  <a-tree
    :selectedKeys="selectedTreeKeys"
    :tree-data="treeData"
    show-icon
    default-expand-all
    @select="onSelect"
    :expandedKeys="['agency','trailer','ship','shipper','customs']"
  >
    <template #switcherIcon="{ switcherCls }">
      <down-outlined :class="switcherCls" />
    </template>
    <template #icon="{ key }">
      <template v-if="key === 'agency'">
        <customer-service-filled  class="icon" />
      </template>
      <template v-if="key === 'trailer'">
        <font-awesome-icon icon="truck" class="icon" />
      </template>
      <template v-else-if="key === 'ship'">
        <font-awesome-icon icon="ship" class="icon" />
      </template>
      <template v-else-if="key === 'customs'">
        <font-awesome-icon icon="shield" class="icon" />
      </template>
      <template v-else-if="key === 'shipper'">
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
