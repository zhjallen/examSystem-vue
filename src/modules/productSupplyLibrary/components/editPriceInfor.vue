<template>
  <div>
    <h2 class="details-h2">产品价格信息</h2>
    <el-form
      :inline="true"
      size="mini"
      label-width="150px"
      :model="detalisList"
      :rules="rules"
      class="details-price demo-form-inline"
    >
      <el-row :gutter="6">
        <el-col :span="10">
          <el-form-item label="市场价：">
            <el-input v-model.trim="detalisList.marketPrice" placeholder="请填写市场价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="建议指导价：" prop="suggestIndicativePrice">
            <el-input v-model.trim="detalisList.suggestIndicativePrice" placeholder="请填写建议指导价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="出厂价(含税)：">
            <el-input v-model.trim="detalisList.factoryPrice" placeholder="请填写出厂价(含税)">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="到货价(含税)：">
            <el-input v-model.trim="detalisList.deliveredPrice" placeholder="请填写到货价(含税)">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="全包价(含税+安装)：">
            <el-input v-model.trim="detalisList.allInPrice" placeholder="请填写全包价(含税+安装)">
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
      rules: {
        suggestIndicativePrice: [
          { required: true, message: "请输入合法数字", trigger: "blur" },
          {
            pattern: /^[0-9]*$/,
            message: "请输入合法数字",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>