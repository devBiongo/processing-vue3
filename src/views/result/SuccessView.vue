<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const route = useRoute();
    const closeWindow = () => {
      window.close();
    };
    const countdown = ref(3);
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
          clearInterval(intervalId);
          closeWindow();
        }
      }, 1000);
    };
    onMounted(() => {
      startCountdown();
    });
    return {
      title: route.query.messge,
      closeWindow,
      countdown,
    };
  },
});
</script>


<template>
    <a-result
      status="success"
      :title="title"
      sub-title=""
    >
      <template #extra>
        <a-button key="console" type="primary" @click="closeWindow">{{countdown}}<span style="margin-left: 10px">閉じる</span></a-button>
      </template>
    </a-result>
  </template>



<style lang="scss" scoped>

</style>