<script lang="ts" setup>
import { reactive, ref } from "vue";

const props = defineProps({
  title: { type: String, default: () => "no title" },
  width: { type: Number, default: () => 800 },
  record: { type: Object, default: () => ({}) },
});
const modalFormState = reactive(props.record);
const open = ref<boolean>(false);
const setOpen = (visible?: boolean) => {
  if (visible === undefined) {
    open.value = false;
  } else {
    open.value = visible;
  }
};
</script>

<template>
  <div>
    <slot name="visibleControl" :setOpen="setOpen"></slot>
    <a-modal
      v-model:open="open"
      :title="title"
      :width="width"
      centered
      :footer="null"
      @ok="
        () => {
          setOpen(false);
        }
      "
    >
      <slot
        name="content"
        :setOpen="setOpen"
        :modalFormState="modalFormState"
      ></slot>
    </a-modal>
  </div>
</template>
