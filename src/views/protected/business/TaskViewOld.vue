<script lang="ts">
import AppStepper from "@/components/AppStepper";
import AppUpload from "@/components/AppUpload.vue";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
// import { nanoid } from "nanoid";

export default defineComponent({
  components: {
    AppStepper,
    AppUpload,
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
  },
  setup() {
    const formState = reactive<any>({
      consigneeInfoList: [{}],
      containerInfoList: [{}],
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log({ formState });
      console.log("Failed:", errorInfo);
    };
    const addConsigneeInfo = () => {
      formState.consigneeInfoList.push({});
    };
    const deleConsigneeInfo = (index: string) => {
      formState.consigneeInfoList.splice(index, 1);
    };
    const addContainerInfo = () => {
      formState.containerInfoList.push({});
    };
    const deleContainerInfo = (index: string) => {
      formState.containerInfoList.splice(index, 1);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      addConsigneeInfo,
      deleConsigneeInfo,
      addContainerInfo,
      deleContainerInfo,
    };
  },
});
</script>

<template>
  <div class="stepper-area">
    <AppStepper />
  </div>
  <div class="form-area">
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 24 }"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <!-- 出荷会社情報 -->
      <a-typography-title :level="4">出荷会社情報</a-typography-title>
      <div class="paper">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="会社名"
              name="shipperCompanyName"
              :rules="[{ required: true, message: '会社名が必須です。' }]"
            >
              <a-select
                v-model:value="formState.shipperCompanyName"
                style="width: 100%"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="郵便番号"
              name="shipperCompanyPostalCode"
              :rules="[{ required: true, message: '郵便番号が必須です。' }]"
            >
              <a-input v-model:value="formState.shipperCompanyPostalCode">
                <template #prefix>〒</template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="電話"
              name="shipperCompanyTeleNum"
              :rules="[{ required: true, message: '電話が必須です。' }]"
            >
              <a-input-number
                v-model:value="formState.shipperCompanyTeleNum"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="FAX"
              name="shipperCompanyFax"
              :rules="[{ required: true, message: 'FAXが必須です。' }]"
            >
              <a-input v-model:value="formState.shipperCompanyFax" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="担当者氏名（漢字）"
              name="shipperCompanyContactPersonKanji"
              :rules="[
                { required: true, message: '担当者氏名（漢字）が必須です。' },
              ]"
            >
              <a-input
                v-model:value="formState.shipperCompanyContactPersonKanji"
              >
                <template #prefix
                  ><search-outlined class="search-icon"
                /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="担当者氏名（カタカナ）"
              name="shipperCompanyContactPersonKatakana"
              :rules="[
                {
                  required: true,
                  message: '担当者氏名（カタカナ）が必須です。',
                },
              ]"
            >
              <a-input
                v-model:value="formState.shipperCompanyContactPersonKatakana"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="会社住所"
              name="shipperCompanyAddress"
              :rules="[{ required: true, message: '会社住所が必須です。' }]"
            >
              <a-textarea
                v-model:value="formState.shipperCompanyAddress"
                :rows="4"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <!-- 受取会社情報 -->
      <a-typography-title :level="4">受取会社情報</a-typography-title>
      <div class="paper">
        <a-row
          :gutter="[16, 16]"
          v-for="(consigneeInfo, index) in formState.consigneeInfoList"
          :key="index"
        >
          <a-divider v-if="index !== 0" />
          <a-col :span="24">
            <a-typography-title :level="5" style="float: left">{{
              index + 1
            }}</a-typography-title>
            <a-button
              v-if="formState.consigneeInfoList.length > 1"
              style="float: right; border-color: #4096ff; color: #4096ff"
            >
              <template #icon>
                <delete-outlined />
              </template>
              削除
            </a-button>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="会社名"
              :name="['consigneeInfoList', index, 'name']"
              :rules="[{ required: true, message: '会社名が必須です。' }]"
            >
              <a-input v-model:value="consigneeInfo.name" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="郵便番号"
              :name="['consigneeInfoList', index, 'postalCode']"
              :rules="[{ required: true, message: '郵便番号が必須です。' }]"
            >
              <a-input v-model:value="consigneeInfo.postalCode">
                <template #prefix>〒</template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="電話"
              :name="['consigneeInfoList', index, 'teleNumber']"
              :rules="[{ required: true, message: '電話が必須です。' }]"
            >
              <a-input-number
                v-model:value="consigneeInfo.teleNumber"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="FAX"
              :name="['consigneeInfoList', index, 'fax']"
              :rules="[{ required: true, message: 'FAXが必須です。' }]"
            >
              <a-input v-model:value="consigneeInfo.fax" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="担当者氏名（漢字）"
              :name="['consigneeInfoList', index, 'contactPersonKanji']"
              :rules="[
                { required: true, message: '担当者氏名（漢字）が必須です。' },
              ]"
            >
              <a-input v-model:value="consigneeInfo.contactPersonKanji" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="担当者氏名（カタカナ）"
              :name="['consigneeInfoList', index, 'contactPersonKatakana']"
              :rules="[
                {
                  required: true,
                  message: '担当者氏名（カタカナ）が必須です。',
                },
              ]"
            >
              <a-input v-model:value="consigneeInfo.contactPersonKatakana" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="会社住所"
              :name="['consigneeInfoList', index, 'address']"
              :rules="[{ required: true, message: 'アドレスが必須です。' }]"
            >
              <a-textarea v-model:value="consigneeInfo.address" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-button
          style="border-color: #4096ff; color: #4096ff; margin: 20px 0"
          shape="round"
          @Click="addConsigneeInfo"
        >
          <template #icon>
            <plus-outlined />
          </template>
          追加
        </a-button>
      </div>
      <!-- 商品情報 -->
      <a-typography-title :level="4">商品情報</a-typography-title>
      <div class="paper">
        <a-row :gutter="[16, 16]">
          <a-col :span="24">
            <a-form-item name="productPicture">
              <AppUpload />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="商品名"
              name="productName"
              :rules="[{ required: true, message: '商品名が必須です。' }]"
            >
              <a-input v-model:value="formState.productName" />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="単品重量"
              name="unitWeight"
              :rules="[{ required: true, message: '単品重量が必須です。' }]"
            >
              <a-input-number
                v-model:value="formState.unitWeight"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="単価"
              name="unitPrice"
              :rules="[{ required: true, message: '単価が必須です。' }]"
            >
              <a-input-number
                prefix="＄"
                v-model:value="formState.unitPrice"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="数量"
              name="quantity"
              :rules="[{ required: true, message: '数量が必須です。' }]"
            >
              <a-input-number
                v-model:value="formState.quantity"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-tag color="#55acee">
              <template #icon> N.wt： </template>
              0 kg
            </a-tag>
            <a-tag color="#55acee">
              <template #icon> G.wt： </template>
              0 kg
            </a-tag>
            <a-tag color="#55acee">
              <template #icon> 金額： </template>
              0 ＄
            </a-tag>
          </a-col>
          <a-col :span="24">
            <a-form-item label="詳細" name="productDetails">
              <a-textarea v-model:value="formState.productDetails" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <!-- 船運会社情報 -->
      <a-typography-title :level="4">船運会社情報</a-typography-title>
      <div class="paper">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="会社名"
              name="shippingCompanyName"
              :rules="[
                { required: true, message: '船運会社を選択してください。' },
              ]"
            >
              <a-select
                v-model:value="formState.shippingCompanyName"
                style="width: 100%"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="本船名"
              name="shipName"
              :rules="[{ required: true, message: '本船名が必須です。' }]"
            >
              <a-input v-model:value="formState.shipName" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="ブッキングNO."
              name="bookingNo"
              :rules="[
                { required: true, message: 'ブッキングNO.が必須です。' },
              ]"
            >
              <a-input v-model:value="formState.bookingNo" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="出港日"
              name="departureDate"
              :rules="[{ required: true, message: '出港日が必須です。' }]"
            >
              <a-date-picker
                v-model:value="formState.departureDate"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="CY OPEN"
              name="cyOpenDate"
              :rules="[{ required: true, message: 'CY OPENが必須です。' }]"
            >
              <a-date-picker
                v-model:value="formState.cyOpenDate"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="CY CUT"
              name="cyCutDate"
              :rules="[{ required: true, message: 'CY CUTが必須です。' }]"
            >
              <a-date-picker
                v-model:value="formState.cyCutDate"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="書類 CUT"
              name="fileCutDate"
              :rules="[{ required: true, message: '書類 CUTが必須です。' }]"
            >
              <a-date-picker
                v-model:value="formState.fileCutDate"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="積地"
              name="loadingPort"
              :rules="[{ required: true, message: '積地が必須です。' }]"
            >
              <a-input v-model:value="formState.loadingPort" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="揚港"
              name="dischargePort"
              :rules="[{ required: true, message: '揚港が必須です。' }]"
            >
              <a-input v-model:value="formState.dischargePort" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item label="最終仕向地" name="finalDestination">
              <a-input v-model:value="formState.finalDestination" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item label="費用" name="shippingCompanyFreight">
              <a-input-number
                prefix="＄"
                v-model:value="formState.shippingCompanyFreight"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <!-- コンテナ情報 -->
      <a-typography-title :level="4">コンテナ情報</a-typography-title>
      <div class="paper">
        <a-row
          :gutter="[16, 16]"
          v-for="(containerInfo, index) in formState.containerInfoList"
          :key="index"
        >
          <a-divider v-if="index !== 0" />
          <a-col :span="24">
            <a-typography-title :level="5" style="float: left">{{
              index + 1
            }}</a-typography-title>
            <a-button
              v-if="formState.containerInfoList.length > 1"
              style="float: right; border-color: #4096ff; color: #4096ff"
            >
              <template #icon>
                <delete-outlined />
              </template>
              削除
            </a-button>
          </a-col>

          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="Container NO."
              :name="['containerInfoList', index, 'containerNo']"
              :rules="[
                { required: true, message: 'Container NO.が必須です。' },
              ]"
            >
              <a-input
                v-model:value="containerInfo.containerNo"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="シール NO."
              :name="['containerInfoList', index, 'sheetNo']"
              :rules="[{ required: true, message: 'シール NO.が必須です。' }]"
            >
              <a-input v-model:value="containerInfo.sheetNo" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="Container Size"
              :name="['containerInfoList', index, 'containerSize']"
              :rules="[
                {
                  required: true,
                  message: 'Container Sizeを選択してください。',
                },
              ]"
            >
              <a-select
                v-model:value="containerInfo.containerSize"
                style="width: 100%"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="Container Height"
              :name="['containerInfoList', index, 'containerHeight']"
              :rules="[
                {
                  required: true,
                  message: 'Container Heightを選択してください。',
                },
              ]"
            >
              <a-select
                v-model:value="containerInfo.containerHeight"
                style="width: 100%"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="Container Volume"
              :name="['containerInfoList', index, 'containerVolume']"
              :rules="[
                { required: true, message: 'Container Volumeが必須です。' },
              ]"
            >
              <a-input-number
                v-model:value="containerInfo.containerVolume"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6">
            <a-form-item
              label="Container Weight"
              :name="['containerInfoList', index, 'containerWeight']"
              :rules="[
                { required: true, message: 'Container Weightが必須です。' },
              ]"
            >
              <a-input-number
                v-model:value="containerInfo.containerWeight"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-button
          style="border-color: #4096ff; color: #4096ff; margin: 20px 0"
          shape="round"
          @Click="addContainerInfo"
        >
          <template #icon>
            <plus-outlined />
          </template>
          追加
        </a-button>
      </div>
      <div class="paper">
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<style scoped>
.stepper-area {
  padding: 50px;
  padding-bottom: 80px;
  /* overflow-x: auto; */
  margin-bottom: 20px;
}
.paper {
  padding: 30px 20px 10px 20px;
  background-color: #fff;
  margin-bottom: 30px;
}
.search-icon {
  cursor: pointer;
}
.search-icon:hover {
  transform: scale(1.2);
}
</style>