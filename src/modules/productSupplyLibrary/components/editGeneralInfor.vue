<template>
  <div class="product-details" v-if="detalisList">
    <h2 class="details-h2">产品通用信息</h2>
    <el-form
      :inline="true"
      :label-position="labelPosition"
      size="mini"
      :model="detalisList"
      :rules="rules"
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
            <el-input v-model="detalisList.series" placeholder="请填写系列"></el-input>
          </el-form-item>
          <el-form-item label="产品规格：">
            <el-input v-model="detalisList.productSpecification" placeholder="请填写产品规格">
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最小包装数：">
            <el-input v-model.trim="detalisList.minimumPackageNum" placeholder="请填写最小包装数"></el-input>
          </el-form-item>
          <el-form-item label="关联产品型号：">
            <el-input v-model.trim="detalisList.relatedProducts" placeholder="请填写关联产品型号"></el-input>
          </el-form-item>
          <el-form-item label="安装图片：">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              disabled
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
          <el-form-item label="名称：" prop="productName">
            <el-input v-model.trim="detalisList.productName" placeholder="请填写名称"></el-input>
          </el-form-item>
          <el-form-item label="材质：">
            <el-input v-model.trim="detalisList.material" placeholder="请填写材质"></el-input>
          </el-form-item>
          <el-form-item label="安装开孔尺寸：">
            <el-input v-model.trim="detalisList.installOpenSize" placeholder="请填写安装开孔尺寸"></el-input>
          </el-form-item>
          <el-form-item label="能否去标(OEM)：">
            <el-select v-model="detalisList.isDemark">
              <el-option
                v-for="item in oem"
                :key="item.id"
                :label="item.name"
                :value="String(item.id)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐等级：">
            <el-select v-model="detalisList.levelNum">
              <el-option
                v-for="item in level"
                :key="item.id"
                :label="item.name"
                :value="String(item.id)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品图片：">
            <div class="productPics">
              <div class="productPics-left" v-if="isShowImg">
                <i @click="closeImg" class="el-icon-circle-close del-btn"></i>
                <img :src="detalisList.productPics[0].fileUrl" alt>
                <el-radio v-model="checked" label="1">默认图</el-radio>
              </div>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称：" prop="supName">
            <el-input
              :readonly="readonly"
              v-model.trim="detalisList.supName"
              placeholder="请填写供应商名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="型号：">
            <el-input v-model.trim="detalisList.model" placeholder="请填写型号"></el-input>
          </el-form-item>
          <el-form-item label="产品净重：">
            <el-input v-model.trim="detalisList.productNetWeight" placeholder="请填写产品净重"></el-input>
          </el-form-item>
          <el-form-item label="独立包装尺寸：">
            <el-input v-model.trim="detalisList.independentPackageSize" placeholder="请填写独立包装尺寸"></el-input>
          </el-form-item>
          <el-form-item label="计价单位：">
            <el-input v-model.trim="detalisList.valuationUnits" placeholder="请填写计价单位">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="产品卖点描述：">
            <el-input v-model.trim="detalisList.productSellPoint" placeholder="请填写产品卖点描述"></el-input>
          </el-form-item>
          <el-form-item label="产品资料：">
            <div class="productPics">
              <!-- <div
                class="productPics-left"
                v-if="isShowInfo"
                @mouseleave="hideDown"
                @mouseenter="showDown"
              >
                <a
                  :href="imgUrl+detalisList.productInfo[0].fileUrl"
                  :download="imgUrl+detalisList.productInfo[0].fileUrl"
                  v-if="isDownImg"
                >
                  <i class="el-icon-download downImg"></i>
                </a>
                
                <i @click="closeInfo" class="el-icon-circle-close del-btn"></i>
                <img :src="imgUrl+detalisList.productInfo[0].fileUrl" alt>
              </div>-->
              <div class="productInfo">
                <div
                  class="fileName"
                  v-if="detalisList.productInfo[0]"
                >{{detalisList.productInfo[0].fileName}}</div>
              </div>

              <!-- <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
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
      rules: {
        productName: [
          { required: true, message: "请填写产品名称", trigger: "blur" }
        ],
        supName: [
          { required: true, message: "请填写供应商名称", trigger: "blur" }
        ]
      },
      level: [
        { id: 1, name: "一星" },
        { id: 2, name: "二星" },
        { id: 3, name: "三星" }
      ],
      oem: [{ id: 0, name: "是" }, { id: 1, name: "否" }],
      isShowImg: true,
      readonly: true,
      isShowInfo: true,
      isDownImg: false
    };
  },
  props: {
    detalisList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    showDown() {
      console.log(88888888);
      this.isDownImg = true;
    },
    hideDown() {
      this.isDownImg = false;
    },
    closeInfo() {
      this.isShowInfo = false;
      this.detalisList.productInfo[0].fileUrl = "";
    },
    closeImg() {
      this.isShowImg = false;
      this.detalisList.productPics[0].fileUrl = "";
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      return false;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>