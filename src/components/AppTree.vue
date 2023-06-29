<template>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    :tree-data="treeData"
    show-icon
    default-expand-all
  >
    <template #switcherIcon="{ switcherCls }">
      <down-outlined :class="switcherCls" />
    </template>
    <template #icon="{ key }">
      <template v-if="key === '1'">
        <font-awesome-icon icon="truck" class="icon" />
      </template>
      <template v-else-if="key === '2'">
        <font-awesome-icon icon="ship" class="icon" />
      </template>
      <template v-else-if="key === '3'">
        <font-awesome-icon icon="shield" class="icon" />
      </template>
      <template v-else-if="key === '4'">
        <dollar-circle-filled class="icon" />
      </template>
      <!-- <template v-else>
        <font-awesome-icon icon="building" class="icon" />
      </template> -->
    </template>
  </a-tree>
</template>
<script lang="ts">
import { DownOutlined, DollarCircleFilled } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import type { TreeProps } from "ant-design-vue";

const treeData: TreeProps["treeData"] = [
  {
    title: "船运",
    key: "1",
    children: [
      { title: "一号公司", key: "1-1" },
      { title: "二号公司", key: "1-2" },
      { title: "三号公司", key: "1-3" },
    ],
  },
  {
    title: "货运",
    key: "2",
    children: [
      { title: "一号公司", key: "2-1" },
      { title: "二号公司", key: "2-2" },
      { title: "三号公司", key: "2-3" },
    ],
  },
  {
    title: "海关",
    key: "3",
    children: [
      { title: "一号公司", key: "3-1" },
      { title: "二号公司", key: "3-2" },
      { title: "三号公司", key: "3-3" },
    ],
  },
  {
    title: "保险",
    key: "4",
    children: [
    { title: "一号公司", key: "4-1" },
      { title: "二号公司", key: "4-2" },
      { title: "三号公司", key: "4-3" },
    ],
  },
];

export default defineComponent({
  components: {
    DownOutlined,
    DollarCircleFilled,
  },
  setup() {
    return {
      selectedKeys: ref(["0-0-0"]),
      treeData,
    };
  },
});
</script>

<style scoped>
.icon {
  color: grey;
  margin-right: 30px;
}
</style>

