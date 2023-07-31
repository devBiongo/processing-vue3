<script lang="ts" setup>
// import { Rule } from "ant-design-vue/es/form/interface";
import { reactive, ref } from "vue";
import { addOneCargo } from "./api";

const props = defineProps({
  setOpen: { type: null },
  selectItems: { type: null },
  freshUsers: { type: null },
});
const pageState = reactive<any>({
  formState: {},
  btnLoading: false,
});
const formRef = ref();
const addSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      pageState.btnLoading = true;
      return addOneCargo(pageState.formState);
    })
    .then((data: any) => {
      pageState.btnLoading = false;
      if (data && data.inserts === 1) {
        props.setOpen(false);
        props.freshUsers();
      }
    })
    .catch((error: any) => {
      console.warn(error);
    });
};
</script>

<template>
  <a-form :model="pageState.formState" :label-col="{ span: 24 }" ref="formRef">
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="輸出入タイプ">
          <a-select
            v-model:value="pageState.formState.inputOutputType"
            style="width: 100%"
          >
            <a-select-option value="輸入">輸入</a-select-option>
            <a-select-option value="輸出">輸出</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="SHIPPER">
          <a-select
            v-model:value="pageState.formState.shipper"
            style="width: 100%"
          >
            <a-select-option value="shipper1">shipper1</a-select-option>
            <a-select-option value="shipper2">shipper2</a-select-option>
            <a-select-option value="shipper3">shipper3</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="BOOKING TYPE">
          <a-select
            v-model:value="pageState.formState.bookingType"
            style="width: 100%"
          >
            <a-select-option value="自社">自社</a-select-option>
            <a-select-option value="他社">他社</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="BOOKING NO">
          <a-input v-model:value="pageState.formState.bookingNo" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="BOOKING DATE">
          <a-date-picker
            v-model:value="pageState.formState.bookingDate"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="請求書番号(自社)">
          <a-input v-model:value="pageState.formState.invoiceNo" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="請求書番号(他社)">
          <a-input v-model:value="pageState.formState.invoiceNoOther" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <a-button
        type="primary"
        :loading="pageState.loading"
        @click="
          () => {
            addSubmit();
          }
        "
        >确认</a-button
      >
      <a-button
        type="primary"
        style="margin-left: 10px"
        @click="
          () => {
            pageState.formState = {};
          }
        "
        >クリア</a-button
      >
    </a-form-item>
  </a-form>
</template>
