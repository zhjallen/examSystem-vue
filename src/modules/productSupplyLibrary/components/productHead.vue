<template>
  <el-form
    :inline="true"
    size="small"
    :model="productHeadFrom"
    class="demo-form-inline search-form"
    label-suffix=":"
    label-position="right"
    label-width="100px"
    ref="productSearch"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model.trim="productHeadFrom.productCode" placeholder="请填写产品编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="供应商编码" prop="supCode">
          <el-input v-model.trim="productHeadFrom.supCode" placeholder="请填写供应商编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="品牌" prop="brandName">
          <el-input v-model.trim="productHeadFrom.brandName" placeholder="请填写品牌"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="品类" prop="queryCategoryName">
          <el-input v-model.trim="productHeadFrom.queryCategoryName" placeholder="请填写品类"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="产品型号" prop="model">
          <el-input v-model.trim="productHeadFrom.model" placeholder="请填写产品型号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="品牌类别" prop="brandCategory">
          <el-select v-model="productHeadFrom.brandCategory">
            <el-option
              v-for="item in brandCategory"
              :key="item.id"
              :label="item.brandCategory"
              :value="String(item.id)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item style="margin-left:100px">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn()">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetForm('productSearch')">清空</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
export default {
  name: "characterHead",
  data() {
    return {
      productHeadFrom: {
        productCode: "", //产品编码
        supCode: "", //供应商编码
        productName: "", //
        brandCategory: "", //
        minorClassName: "", //
        brandName: "", //品牌名称
        queryCategoryName: "", //品牌类别
        model: "" //产品型号
      },
      brandCategory: [
        { id: 1, brandCategory: "进口" },
        { id: 2, brandCategory: "合资" },
        { id: 3, brandCategory: "国内一线" },
        { id: 8, brandCategory: "红星直选" }
      ]
    };
  },
  props: {
    system: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    searchBtn() {
      console.log("search");
      this.$emit("productQuery", this.productHeadFrom);
    },
    resetForm(formName) {
      console.log(formName, "fomrname", this.$refs);
      this.$refs[formName].resetFields();
    }
  }
};
</script>
