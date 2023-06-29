<script lang="ts">
import CommonSideMenu from "./CommonSideMenu";
import CommonHeader from "./CommonHeader";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    CommonSideMenu,
    CommonHeader,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    const setCollapsed = (value: boolean) => {
      collapsed.value = value;
    };
    return {
      collapsed,
      setCollapsed,
    };
  },
});
</script>

<template>
  <a-layout>
    <a-layout-sider
      class="layout-sider"
      :collapsed="collapsed"
      :trigger="null"
      width="230"
      collapsible
    >
      <div class="logo-area">
        <a-image :width="32" :src="require('@/assets/company_logo.png')" style="border-radius: 5px;"/>
        <span :style="{ display: collapsed ? 'none' : 'inline-block', margin: '0 20px' }">欣和シッピング</span>
      </div>
      <CommonSideMenu />
    </a-layout-sider>
    <a-layout style="background-color: #f0f2f5;">
      <a-layout-header class="layout-header">
        <CommonHeader :collapsed="collapsed" @setCollapsed="setCollapsed" />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo-area {
  height: 50px;
  background-color: #2f54eb;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
}
.layout-sider {
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
}
.layout-header {
  height: 90px;
  padding: 0;
  position: sticky;
  z-index: 2;
  left: 0;
  top: 0;
}
.layout-content {
  margin: 24px 24px;
  min-height: 100vh;
}
</style>
