<template>
  <div>
    <h2 class="details-h2">产品价格信息</h2>
    <el-form
      :inline="true"
      size="mini"
      label-width="150px"
      :model="detalisList"
      class="details-price demo-form-inline"
    >
      <el-row :gutter="6">
        <el-col :span="10">
          <el-form-item label="市场价：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.marketPrice"
              placeholder=""
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="建议指导价：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.suggestIndicativePrice"
              placeholder=""
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="出厂价(含税)：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.factoryPrice"
              placeholder=""
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="到货价(含税)：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.deliveredPrice"
              placeholder=""
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="全包价(含税+安装)：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.allInPrice"
              placeholder=""
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "detailsPriceInfor",
  props: {
    detalisList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      readonly: true
    };
  }
};
</script>