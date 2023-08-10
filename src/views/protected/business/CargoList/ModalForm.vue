<script lang="ts" setup>
import { reactive, ref } from "vue";
import { addOneCargo } from "./api";
import { Rule } from "ant-design-vue/es/form";

const props = defineProps({
  setOpen: { type: null },
  initTable: { type: null },
});
const pageState = reactive<any>({
  formState: {},
  loading: false,
});
const rules: Record<string, Rule[]> = {
  inputOutputType: [
    {
      required: true,
      message: "輸出入タイプが必須",
    },
  ],
  bookingType: [
    {
      required: true,
      message: "BOOKING TYPEが必須",
    },
  ],
};
const formRef = ref();
const addSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      pageState.loading = true;
      return addOneCargo(pageState.formState);
    })
    .then((data: any) => {
      pageState.loading = false;
      if (data) {
        props.initTable();
        props.setOpen(false);
      }
    })
    .catch((error: any) => {
      console.warn(error);
    });
};
</script>

<template>
  <a-form :model="pageState.formState" :label-col="{ span: 24 }" ref="formRef" :rules="rules">
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="輸出入タイプ" name="inputOutputType">
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
        <a-form-item label="SHIPPER" name="shipper">
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
        <a-form-item label="BOOKING TYPE" name="bookingType">
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
        <a-form-item label="BOOKING NO" name="bookingNo">
          <a-input v-model:value="pageState.formState.bookingNo" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="BOOKING DATE" name="bookingDate">
          <a-date-picker
            v-model:value="pageState.formState.bookingDate"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="請求書番号(自社)" name="invoiceNo">
          <a-input v-model:value="pageState.formState.invoiceNo" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="請求書番号(他社)" name="invoiceNoOther">
          <a-input v-model:value="pageState.formState.invoiceNoOther" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <a-button
        type="primary"
        :loading="pageState.loading"
        @click="addSubmit"
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
