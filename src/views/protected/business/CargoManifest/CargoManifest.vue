<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchCargoById, updateCargo } from "./api";
import {
  formatData,
  useConsign,
  useContainer,
  useNotify,
  useAssignment,
} from "./util";
import AppDescription from "@/components/descriptions/AppDescription.vue";
import { deepClone } from "@/utils/common";

const route = useRoute();
const router = useRouter();
const assignmentRef = ref(null);
const containerRef = ref(null);
const consignRef = ref(null);
const notifyRef = ref(null);
const pageState = reactive<any>({
  loading: true,
  formState: {},
  assignmentData: [],
  containerData: [],
  consignData: [],
  nofityData: [],
  mode: 1,
  assignmentList: undefined,
  containerList: undefined,
  consignList: undefined,
  notifyList: undefined,
});
onMounted(() => {
  fetchCargoById(route.query.cargoId).then((data: any) => {
    pageState.loading = false;
    if (data) {
      pageState.formState = formatData(data);
      pageState.assignmentList = useAssignment(data.assignmentList);
      pageState.containerList = useContainer(data.containerList);
      pageState.consignList = useConsign(data.consignList);
      pageState.notifyList = useNotify(data.notifyList);
    }
  });
});
function update() {
  pageState.loading = true;
  const param = {
    ...pageState.formState,
    assignments: deepClone((assignmentRef.value as any).dataSource),
    containers: deepClone((containerRef.value as any).dataSource),
    consigns: deepClone((consignRef.value as any).dataSource),
    notifies: deepClone((notifyRef.value as any).dataSource),
  };
  updateCargo(param).then((data: any) => {
    pageState.loading = false;
    if (data) router.push("/wf/taskList");
  });
}
function switchModel(mode: number) {
  pageState.mode = mode;
}
</script>
<template>
  <div class="cargo-container">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 700px;
      "
      v-if="pageState.loading"
    >
      <a-spin size="large" />
    </div>
    <a-form
      class="form"
      :layout="pageState.formState.layout"
      v-bind="{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }"
      :style="{ display: pageState.loading ? 'none' : 'block' }"
    >
      <div class="page-header">
        <a-row>
          <a-col :span="8">
            <a-button type="primary">添付ファイル管理</a-button>
          </a-col>
          <a-col :span="8" style="text-align: center">
            <a-typography-title :level="2">
              船積確認書管理画面
            </a-typography-title>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="タスク状態"
              v-bind="{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }"
            >
              <a-select
                v-model:value="pageState.formState.taskStatus"
                style="width: 120px"
              >
                <a-select-option value="新規">新規</a-select-option>
                <a-select-option value="船積確認">船積確認</a-select-option>
                <a-select-option value="B/L">B/L</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="船積状態"
              v-bind="{ labelCol: { span: 12 }, wrapperCol: { span: 18 } }"
            >
              <a-select
                v-model:value="pageState.formState.stowageStatus"
                style="width: 120px"
              >
                <a-select-option value="船積1">船積1</a-select-option>
                <a-select-option value="船積2">船積2</a-select-option>
                <a-select-option value="船積3">船積3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <!-- start -->
      <a-row>
        <a-col :span="10">
          <a-form-item label="輸出入タイプ">
            <a-select
              v-model:value="pageState.formState.inputOutputType"
              style="width: 100%"
            >
              <a-select-option value="輸入">輸入</a-select-option>
              <a-select-option value="輸出">輸出</a-select-option>
            </a-select>
          </a-form-item>
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
          <a-form-item label="BOOKING TYPE">
            <a-select
              v-model:value="pageState.formState.bookingType"
              style="width: 100%"
            >
              <a-select-option value="自社">自社</a-select-option>
              <a-select-option value="他社">他社</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="BOOKING NO">
            <a-input v-model:value="pageState.formState.bookingNo" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="BOOKING DATE">
            <a-date-picker
              v-model:value="pageState.formState.bookingDate"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="請求書番号(自社)">
            <a-input v-model:value="pageState.formState.invoiceNo" />
          </a-form-item>
          <a-form-item label="請求書番号(他社)">
            <a-input v-model:value="pageState.formState.invoiceNoOther" />
          </a-form-item>
          <a-form-item label="FREIGHT">
            <a-input-number
              v-model:value="pageState.formState.freight"
              prefix="$"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" style="padding: 0px 55px">
          <a-form-item
            label="自社用メモ"
            v-bind="{ labelCol: { span: 24 }, wrapperCol: { span: 24 } }"
          >
            <a-textarea v-model:value="pageState.formState.memoMine" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider />
      <!-- 船情報 -->
      <a-typography-title :level="3" style="margin: 30px 0px">
        船情報
      </a-typography-title>
      <a-row class="box">
        <a-col :span="10">
          <a-form-item label="SHIPPING COMP">
            <a-select
              v-model:value="pageState.formState.shippingCompanyName"
              style="width: 100%"
            >
              <a-select-option value="船1">船1</a-select-option>
              <a-select-option value="船2">船2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="VESSEL NO">
            <a-select
              v-model:value="pageState.formState.vesselNo"
              style="width: 100%"
            >
              <a-select-option value="船号1">船号1</a-select-option>
              <a-select-option value="船号2">船号2</a-select-option>
              <a-select-option value="船号3">船号3</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="PLACE OF RECEIPT">
            <a-select
              v-model:value="pageState.formState.placeOfReceipt"
              style="width: 100%"
            >
              <a-select-option value="东京港">东京港 CY </a-select-option>
              <a-select-option value="大阪港">大阪港 CY</a-select-option>
              <a-select-option value="名古屋港">名古屋港 CY</a-select-option>
              <a-select-option value="横滨港">横滨港 CY</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="PORT OF LOADING">
            <a-select
              v-model:value="pageState.formState.portOfLoading"
              style="width: 100%"
            >
              <a-select-option value="东京港">东京港</a-select-option>
              <a-select-option value="大阪港">大阪港</a-select-option>
              <a-select-option value="名古屋港">名古屋港</a-select-option>
              <a-select-option value="横滨港">横滨港</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="PORT OF DISCHARGE">
            <a-select
              v-model:value="pageState.formState.portOfDischarge"
              style="width: 100%"
            >
              <a-select-option value="东京港">福建港</a-select-option>
              <a-select-option value="大阪港">上海港</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="PLACE OF DELIVERY">
            <a-input v-model:value="pageState.formState.placeOfDelivery" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="出港日">
            <a-date-picker
              v-model:value="pageState.formState.departureDate"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="CY CUT">
            <a-date-picker
              v-model:value="pageState.formState.cyCut"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="書類 CUT">
            <a-date-picker
              v-model:value="pageState.formState.fileCut"
              :format="'YYYY-MM-DD'"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="OPEN 日">
            <a-date-picker
              v-model:value="pageState.formState.openDay"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="到着日">
            <a-date-picker
              v-model:value="pageState.formState.arrivalDate"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" style="padding: 0px 30px">
          <a-form-item
            label="補足説明"
            v-bind="{ labelCol: { span: 24 }, wrapperCol: { span: 24 } }"
          >
            <a-textarea v-model:value="pageState.formState.shipInfoMemo" />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- B/L -->
      <a-typography-title :level="3" style="margin: 30px 0px">
        B/L
      </a-typography-title>
      <a-row class="box">
        <a-col :span="10">
          <a-form-item label="ISSUED AT">
            <a-date-picker
              v-model:value="pageState.formState.issuedAt"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="NOS.OF B/L">
            <a-select
              v-model:value="pageState.formState.blCount"
              style="width: 100%"
            >
              <a-select-option value="ORIGINAL ONE(1)"
                >ORIGINAL ONE(1)</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item label="BL COPY">
            <a-select
              v-model:value="pageState.formState.blCopy"
              style="width: 100%"
            >
              <a-select-option value="ONE(1)">ONE(1)</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="BL MARK">
            <a-select
              v-model:value="pageState.formState.blMark"
              style="width: 100%"
            >
              <a-select-option value="NO MARK">NO MARK</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="PAYMENT TYPE">
            <a-select
              v-model:value="pageState.formState.paymentType"
              style="width: 100%"
            >
              <a-select-option value="PREPAID AT COLLECT"
                >PREPAID AT COLLECT</a-select-option
              >
              <a-select-option value="COLLECT">COLLECT</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24" style="padding: 0px 30px">
          <a-form-item
            label="補足説明"
            v-bind="{ labelCol: { span: 24 }, wrapperCol: { span: 24 } }"
          >
            <a-textarea v-model:value="pageState.formState.blMemo" />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 運営情報 -->
      <a-typography-title :level="3" style="margin: 30px 0px">
        運営情報
      </a-typography-title>
      <a-row class="box">
        <a-col :span="10">
          <a-form-item label="運輸会社">
            <a-select
              v-model:value="pageState.formState.transportationCompany"
              style="width: 100%"
            >
              <a-select-option value="田中会社">田中会社</a-select-option>
              <a-select-option value="鈴木会社">鈴木会社</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="担当者">
            <a-input v-model:value="pageState.formState.transContactPerson" />
          </a-form-item>
        </a-col>
        <a-col :span="24" style="padding: 0px 30px">
          <a-form-item
            label="メモ"
            v-bind="{ labelCol: { span: 24 }, wrapperCol: { span: 24 } }"
          >
            <a-textarea v-model:value="pageState.formState.transMemo" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="switch-form">
        <div class="nav-area">
          <span
            :class="pageState.mode === 1 ? 'selected' : ''"
            @click="switchModel(1)"
            >作業内容</span
          >
          <span
            :class="pageState.mode === 2 ? 'selected' : ''"
            @click="switchModel(2)"
            >コンテナ情報</span
          >
          <span
            :class="pageState.mode === 3 ? 'selected' : ''"
            @click="switchModel(3)"
            >Consign情報</span
          >
          <span
            :class="pageState.mode === 4 ? 'selected' : ''"
            @click="switchModel(4)"
            >Nofity情報</span
          >
        </div>
        <AppDescription
          v-if="pageState.assignmentList"
          :style="{ display: pageState.mode === 1 ? 'block' : 'none' }"
          :config="pageState.assignmentList"
          ref="assignmentRef"
        />
        <AppDescription
          v-if="pageState.containerList"
          :style="{ display: pageState.mode === 2 ? 'block' : 'none' }"
          :config="pageState.containerList"
          ref="containerRef"
        />
        <AppDescription
          v-if="pageState.consignList"
          :style="{ display: pageState.mode === 3 ? 'block' : 'none' }"
          :config="pageState.consignList"
          ref="consignRef"
        />
        <AppDescription
          v-if="pageState.notifyList"
          :style="{ display: pageState.mode === 4 ? 'block' : 'none' }"
          :config="pageState.notifyList"
          ref="notifyRef"
        />
      </div>
      <a-row style="margin-top: 50px">
        <a-col>
          <a-affix :offset-bottom="30">
            <a-button type="primary" size="large" @click="update"
              >更新</a-button
            >
          </a-affix>
        </a-col>
        <a-col style="margin-left: 20px">
          <a-affix :offset-bottom="30">
            <a-button
              type="primary"
              size="large"
              @click="
                () => {}
              "
              >出力</a-button
            >
          </a-affix>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.cargo-container {
  margin: auto;
  width: 1200px;
  min-height: 500px;
  padding-top: 50px;
  padding-bottom: 100px;
  .page-title {
    text-align: center;
  }
  .form {
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    min-height: 1500px;
    padding: 35px 20px;
    padding-top: 0px;
    overflow: hidden;
    .page-header {
      height: 100px;
      margin: 20px 0px;
    }
  }
  .box {
    padding: 20px;
    padding-top: 50px;
    border: 1px solid #eee;
    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .switch-form {
    padding: 5px;
    background-color: #f2f2f2;
    border-radius: 5px;
    margin-top: 80px;
    position: relative;
    .nav-area {
      height: 42px;
      position: absolute;
      top: -42px;
      left: 0px;
      width: 100%;
      padding: 0 20px;
      span {
        display: inline-block;
        height: 42px;
        line-height: 42px;
        padding: 0 20px;
        margin-right: 10px;
        background-color: #d7d7d7;
        border-radius: 10px 10px 0 0;
        font-size: 16px;
        cursor: pointer;
      }
      .selected {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
