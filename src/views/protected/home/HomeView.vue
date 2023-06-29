<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<template>
  <a-typography style="background-color: #fff; padding: 20px">
    <a-typography-title :level="4">会社概要</a-typography-title>
    <a-typography-paragraph>
      <blockquote>
        欣和シッピング株式会社は、グローバルな貨物輸送および物流サービスを提供する専門会社です。
        彼らはサプライチェーンの各段階をつなぐ重要な役割を果たし、輸送、倉庫、通関、保険および関連サービスを調整して、
        貨物が出発地から目的地まで安全かつ効率的に輸送されることを確保します。
      </blockquote>
    </a-typography-paragraph>
  </a-typography>
  <a-row :gutter="[16, 16]">
    <a-col :span="6">
      <a-typography class="box">
        <a-typography-title :level="5">1. 国際貨物代理</a-typography-title>
        <a-typography-paragraph>
          欣和シッピング株式会社は、貨物の国際輸送を手配します。海上輸送、航空輸送、陸上輸送を含みます。
          彼らは航空会社、船舶会社、貨物輸送会社と連絡を取り、顧客に最適な輸送計画と価格を提供します。
        </a-typography-paragraph>
      </a-typography>
      <a-typography class="box">
        <a-typography-title :level="5"
          >5. 貨物追跡および情報管理</a-typography-title
        >
        <a-typography-paragraph>
          欣和シッピング株式会社は、最新の情報技術システムを通じて、顧客に貨物の追跡および情報管理サービスを提供します。
          顧客はいつでも貨物の位置と輸送状況、関連する文書やレポートを把握することができます。
        </a-typography-paragraph>
      </a-typography>
    </a-col>

    <a-col :span="6">
      <a-typography class="box">
        <a-typography-title :level="5"
          >2. 通関およびクリアランス</a-typography-title
        >
        <a-typography-paragraph>
          欣和シッピング株式会社は各国の通関およびクリアランス規制に精通し、顧客が貨物を合法的に関税を通過させるために必要なすべての文書と手続きを補助します。
          彼らは税関との緊密な連絡を維持し、スムーズな通関およびクリアランス手続きを確保します。
        </a-typography-paragraph>
      </a-typography>
      <a-typography class="box">
        <a-typography-title :level="5"
          >6. コンサルティングおよび物流計画</a-typography-title
        >
        <a-typography-paragraph>
          欣和シッピング株式会社は豊富な物流経験と専門知識を有しており、顧客にコンサルティングおよび物流計画サービスを提供することができます。
          彼らは顧客のサプライチェーンのニーズを評価し、最適な物流ソリューションを提供し、輸送コストと効率を最適化するのに役立ちます。
        </a-typography-paragraph>
      </a-typography>
    </a-col>

    <a-col :span="6">
      <a-typography class="box">
        <a-typography-title :level="5"
          >3. 倉庫およびディストリビューション</a-typography-title
        >
        <a-typography-paragraph>
          欣和シッピング株式会社は、通常、独自の倉庫または提携倉庫を所有し、貨物の短期または長期の保管サービスを提供します。
          また、貨物のディストリビューションも担当し、サプライヤーからの貨物を集め、顧客の要求に応じて異なる目的地に配分します。
        </a-typography-paragraph>
      </a-typography>
    </a-col>

    <a-col :span="6">
      <a-typography class="box">
        <a-typography-title :level="5">4. 輸送保険</a-typography-title>
        <a-typography-paragraph>
          欣和シッピング株式会社は、貨物の輸送中の安全性を保証するために輸送保険を提供することができます。
          彼らは保険会社と提携し、顧客に適切な保険ポリシーを提供し、貨物が損失や損傷のリスクに直面した場合に備えます。
        </a-typography-paragraph>
      </a-typography>
    </a-col>
  </a-row>
</template>


<style scoped>
.column {
  padding: 20px;
}
.box {
  background-color: #fff;
  padding: 20px;
  margin-top: 10px;
  min-height: 230px;
}
</style>