<template>
  <div class="product-details">
    <h2 class="details-h2">产品通用信息</h2>
    <el-form
      :inline="true"
      :label-position="labelPosition"
      size="mini"
      :model="detalisList"
      label-width="120px"
      class="demo-form-inline details-general"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应产品编码：">
            <el-input
              :readonly="readonly"
              v-model="detalisList.productCode"
              placeholder="请填写供应产品编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-input :readonly="readonly" v-model="detalisList.brandName" placeholder="请填写品牌"></el-input>
          </el-form-item>
          <el-form-item label="系列：">
            <el-input :readonly="readonly" v-model="detalisList.series" placeholder="请填写系列"></el-input>
          </el-form-item>
          <el-form-item label="产品规格：">
            <el-input
              :readonly="readonly"
              v-model="detalisList.productSpecification"
              placeholder="请填写产品规格"
            >
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最小包装数：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.minimumPackageNum"
              placeholder="请填写最小包装数"
            ></el-input>
          </el-form-item>
          <el-form-item label="关联产品型号：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.relatedProducts"
              placeholder="请填写关联产品型号"
            ></el-input>
          </el-form-item>
          <el-form-item label="安装图片：">
            <template>
              <div v-if="detalisList.installPics!=''">
                <img :src="detalisList.installPics[0]" alt>
              </div>
              <div v-else>暂无</div>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商编号：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.supCode"
              placeholder="请填写供应商编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.productName"
              placeholder="请填写名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="材质：">
            <el-input :readonly="readonly" v-model.trim="detalisList.material" placeholder="请填写材质"></el-input>
          </el-form-item>
          <el-form-item label="安装开孔尺寸：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.installOpenSize"
              placeholder="请填写安装开孔尺寸"
            ></el-input>
          </el-form-item>
          <el-form-item label="能否去标(OEM)：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.isDemark"
              placeholder="请填写能否去标(OEM)"
            ></el-input>
          </el-form-item>
          <el-form-item label="推荐等级：">
            <el-input :readonly="readonly" v-model.trim="detalisList.levelNum" placeholder></el-input>
          </el-form-item>
          <el-form-item label="产品图片：">
            <div class="productPics">
              <div class="productPics-left">
                <img :src="detalisList.productPics[0].fileUrl" alt>
                <el-radio v-model="checked" label="1">默认图</el-radio>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.brandName"
              placeholder="请填写供应商名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="型号：">
            <el-input :readonly="readonly" v-model.trim="detalisList.model" placeholder="请填写型号"></el-input>
          </el-form-item>
          <el-form-item label="产品净重：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.productNetWeight"
              placeholder="请填写产品净重"
            ></el-input>
          </el-form-item>
          <el-form-item label="独立包装尺寸：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.independentPackageSize"
              placeholder="请填写独立包装尺寸"
            ></el-input>
          </el-form-item>
          <el-form-item label="计价单位：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.valuationUnits"
              placeholder="请填写计价单位"
            >
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="产品卖点描述：">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.productSellPoint"
              placeholder="请填写产品卖点描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品资料：">
            <div class="productInfo">
              <!-- <img :src="imgUrl+detalisList.productInfo[0].fileUrl" alt> -->
              <div
                class="fileName"
                v-if="detalisList.productInfo[0]"
              >{{detalisList.productInfo[0].fileName}}</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { envConfig } from "../../../config/envconfig.js";
export default {
  data() {
    return {
      imgUrl: envConfig.downloadPrivateFile + "?key=",
      labelPosition: "right",
      imageUrl: "",
      checked: "1",
      readonly: true
    };
  },
  props: {
    detalisList: {
      type: Object,
      default: () => {}
    }
  }
};
</script>