<script lang="ts">
import ContainerTable from "@/components/tables/ContainerTable.vue";
import AssignmentTable from "@/components/tables/AssignmentTable.vue";
import ConsignTable from "@/components/tables/ConsignTable.vue";
import NofityTable from "@/components/tables/NofityTable.vue";
import { nanoid } from "nanoid";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import http from "@/utils/request";
import { CoffeeOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    ContainerTable,
    AssignmentTable,
    ConsignTable,
    NofityTable,
    CoffeeOutlined,
  },
  setup() {
    const pageState = reactive<any>({
      pageLoading: false,
      btnLoading: false,
      tableMode: 1,
      formState: { blCount: "ORIGINAL ONE(1)", blCopy: "ONE(1)" },
      assignmentData: [{ key: nanoid() }],
      containerData: [{ key: nanoid() }],
      consignData: [{ key: nanoid() }],
      nofityData: [{ key: nanoid() }],
    });
    const router = useRouter();
    function submit() {
      pageState.btnLoading = true;
      setTimeout(() => {
        http
          .post("/task/cargo/registerNewOne", pageState.formState)
          .then((data) => {
            if (data) {
              router.push('/user/taskList');
            }
          });
      }, 1500);
    }
    return {
      pageState,
      router,
      http,
      submit,
    };
  },
});
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
      v-if="pageState.pageLoading"
    >
      <a-spin size="large" />
    </div>
    <a-form
      v-if="!pageState.pageLoading"
      class="form"
      :layout="pageState.formState.layout"
      v-bind="{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }"
    >
      <div class="page-header">
        <a-row>
          <a-col :span="8">
            <a-button type="primary">添付ファイル管理</a-button>
          </a-col>
          <a-col :span="8" style="text-align: center">
            <a-typography-title :level="2"
              >船積確認書管理画面<span style="color: green"
                >(新規)</span
              ></a-typography-title
            >
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
              <a-select-option value="委託">委託</a-select-option>
              <a-select-option value="受託">受託</a-select-option>
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
            <a-select
              v-model:value="pageState.formState.freight"
              style="width: 100%"
            >
              <a-select-option value="PREPAID AS ARRANGGED"
                >PREPAID AS ARRANGED</a-select-option
              >
              <a-select-option value="COLLECT">COLLECT</a-select-option>
            </a-select>
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
            <a-input v-model:value="pageState.formState.vesselNo" />
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
            <a-input v-model:value="pageState.formState.portOfDischarge" />
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
      <!-- 運輸情報 -->
      <a-typography-title :level="3" style="margin: 30px 0px">
        運輸情報
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
            :class="pageState.tableMode === 1 ? 'selected' : ''"
            @click="
              () => {
                pageState.tableMode = 1;
              }
            "
            >作業内容</span
          >
          <span
            :class="pageState.tableMode === 2 ? 'selected' : ''"
            @click="
              () => {
                pageState.tableMode = 2;
              }
            "
            >コンテナ情報</span
          >
          <span
            :class="pageState.tableMode === 3 ? 'selected' : ''"
            @click="
              () => {
                pageState.tableMode = 3;
              }
            "
            >Consign情報</span
          >
          <span
            :class="pageState.tableMode === 4 ? 'selected' : ''"
            @click="
              () => {
                pageState.tableMode = 4;
              }
            "
            >Nofity情報</span
          >
        </div>
        <assignment-table
          v-if="pageState.tableMode === 1"
          :dataSourse="pageState.assignmentData"
        />
        <container-table
          v-if="pageState.tableMode === 2"
          :dataSourse="pageState.containerData"
        />
        <consign-table
          v-if="pageState.tableMode === 3"
          :dataSourse="pageState.consignData"
        />
        <nofity-table
          v-if="pageState.tableMode === 4"
          :dataSourse="pageState.nofityData"
        />
      </div>
      <a-row style="margin-top: 50px">
        <a-col>
          <a-affix :offset-bottom="30">
            <a-button
              type="primary"
              size="large"
              :loading="pageState.btnLoading"
              @click="submit"
            >
              <template #icon>
                <coffee-outlined />
              </template>
              起票
            </a-button>
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
