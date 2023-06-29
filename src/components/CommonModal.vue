<script lang="ts">
import { nanoid } from "nanoid";
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  props: {
    title: { type: String, default: "no title" },
    width: { type: Number, default: 800 },
    record: { type: Object, default: null },
  },
  setup(props) {
    const { record } = toRefs(props);
    const open = ref<boolean>(false);
    const modalFormState = record.value?record:reactive<any>({key: nanoid()});
    const setOpen = (visible: boolean) => {
      open.value = visible;
    };
    return {
      open,
      modalFormState,
      setOpen,
    };
  },
});
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
  
  