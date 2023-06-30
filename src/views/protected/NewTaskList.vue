<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const  router = useRouter();
    function navigate(){
      // window.open('/cargoManifest', '_blank');
      router.push('/cargoManifest')
      // window.open('/cargoManifest', '_blank', 'width=1300, height=800, toolbar=0, location=0, status=0, menubar=0');
    }
    return {navigate};
  },
});
</script>

<template>
  <div class="new-task-container">
    <div class="box" @click="navigate">
        <a-typography-title :level="4">新規</a-typography-title>
        <div class="content">
            船積確認書管理画面
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.new-task-container {
  display: flex;
  .box {
    padding: 10px;
    background-color: #fff;
    margin-right: 20px;
    width: 300px;
    height: 350px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: all .5s ease;
    .content{
        font-size: 18px;
        margin: 100px auto;
        text-align: center;
    }
    cursor: pointer;
    &:hover {
      background-color: #c9c9c9;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>