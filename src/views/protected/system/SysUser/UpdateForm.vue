<script lang="ts" setup>
import { Rule } from "ant-design-vue/es/form/interface";
import { reactive, ref } from "vue";
import { deleteUser, updateUser } from "./userApi";

const props = defineProps({
  setOpen: { type: null },
  selectItems: { type: null },
  record: { type: null },
  freshUsers: { type: null },
});
const pageState = reactive<any>({
  formState: props.record,
  btnLoading: false,
});
const rules: Record<string, Rule[]> = {
  nickname: [
    {
      required: true,
      message: "ニックネームが必須",
    },
  ],
  deptId: [
    {
      required: true,
      message: "会社を選択してください",
    },
  ],
};
const formRef = ref();
const updateSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      pageState.btnLoading = true;
      return updateUser(pageState.formState);
    })
    .then((data: any) => {
      pageState.btnLoading = false;
      if (data && data.updates === 1) {
        props.setOpen(false);
        props.freshUsers();
      }
    })
    .catch((error: any)=>{
      console.warn(error);
    });
};
const deleteSubmit = () => {
  deleteUser(pageState.formState).then((data: any) => {
    if (data && data.updates === 1) {
      props.setOpen(false);
      props.freshUsers();
    }
  });
};
</script>

<template>
  <a-form
    :model="pageState.formState"
    :label-col="{ span: 24 }"
    ref="formRef"
    style="padding-top: 20px"
    :rules="rules"
  >
    <a-row :gutter="[16, 3]">
      <a-col :span="12">
        <a-form-item label="ニックネーム" name="nickname">
          <a-input v-model:value="pageState.formState.nickname" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="性別" name="sex">
          <a-radio-group v-model:value="pageState.formState.sex">
            <a-radio value="1">男</a-radio>
            <a-radio value="0">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="会社" name="deptId">
          <a-select
            v-model:value="pageState.formState.deptId"
            style="width: 100%"
          >
            <a-select-option
              v-for="item in selectItems"
              :key="item"
              :value="(item as any).key"
              >{{ (item as any).value }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="電話番号" name="phoneNumber">
          <a-input v-model:value="pageState.formState.phoneNumber" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="メール" name="email">
          <a-input v-model:value="pageState.formState.email" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="備考" name="remark">
          <a-textarea v-model:value="pageState.formState.remark" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <a-button
        type="primary"
        :loading="pageState.btnLoading"
        @click="updateSubmit"
        >确认</a-button
      >
      <a-button
        type="primary"
        style="margin-left: 10px"
        @click="deleteSubmit"
        danger
        >削除</a-button
      >
    </a-form-item>
  </a-form>
</template>
