<template>
  <div>
    <detailsGeneralInfor
      v-if="detalisList.productBasicResult"
      :detalisList="detalisList.productBasicResult"
    />
    <detailsSpecialInfor v-if="exclusive" :exclusive="exclusive" :exclusiveData="exclusiveData"/>
    <detailsPriceInfor
      v-if="detalisList.productPriceResult"
      :detalisList="detalisList.productPriceResult"
    />
    <el-row style="margin-bottom:16px">
      <el-button @click="editSubmit(detalisList)" type="primary" size="mini">确认</el-button>
      <el-button @click="editClose(view)" size="mini" plain>取消</el-button>
    </el-row>
  </div>
</template>
<script>
import detailsPriceInfor from "../components/editPriceInfor";
import detailsGeneralInfor from "../components/editGeneralInfor";
import detailsSpecialInfor from "../components/editSpceilInfor";
import { updateProduct, getProductInfo } from "../api.js";
import { closeTag } from "../../../utils/functions/commonFunc";
import { isEmpty } from "../../../utils/functions/isEmpty.js";
export default {
  name: "productDetail",
  data() {
    return {
      detalisList: {},
      productCode: "",
      exclusive: [],
      view: [],
      businessType: "",
      exclusiveData: {}
    };
  },
  // watch: {
  //   $route(to, from) {
  //     this.view = to;
  //     console.log(to);
  //     if (to.path === "/right/edit" && to.query.productCode) {
  //       this.getEditLists(to.query.productCode);
  //     }
  //     this.addViewToVisided();
  //   },
  // },
  created() {
    let param = this.$route.query.productCode;
    let businessType = this.$route.query.businessType;
    this.productCode = param;
    this.businessType = businessType;
    this.getEditLists(param,businessType);
  },
  components: {
    detailsPriceInfor,
    detailsGeneralInfor,
    detailsSpecialInfor
  },

  methods: {
    getEditLists(productCode,businessType) {
      let params = {
        type:businessType,
        productCode: productCode
      };
      const inputType = {
        1: "input",
        2: "input",
        3: "select",
        4: "datePicker",
        5: "empty"
      };
      getProductInfo(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.detalisList = {};
            const productBasicResult =
              sucessData.data.dataMap.productBasicResult;
            if (productBasicResult.isOem === "0") {
              productBasicResult.isDemark = "否";
            } else {
              productBasicResult.isDemark = "是";
            }
            if (productBasicResult.productCode.indexOf("GYS") != -1) {
              let productCodeArr = productBasicResult.productCode.split("-");
              productBasicResult.productCode = productCodeArr[1];
            }

            if (productBasicResult.recommendLevel === 1) {
              productBasicResult.levelNum = "一星";
            } else if (productBasicResult.recommendLevel === 2) {
              productBasicResult.levelNum = "二星";
            } else if (productBasicResult.recommendLevel === 3) {
              productBasicResult.levelNum = "三星";
            }
            const data = sucessData.data.dataMap;
            const exclusiveData = {};
            const exclusiveModel = [];
            const exclusiveInfo = data.productExclusiveResult.exclusiveParams;
            Object.keys(exclusiveInfo).map(key => {
              console.log(key, "key");
              const item = JSON.parse(key);
              const itemModel = {
                key: item.propertyCode,
                showName: item.propertyName,
                elementType: inputType[item.propertyType],
                dataType: "string",
                propertyDesc: item.propertyDesc,
                colProps: item.width
                  ? {
                      span: item.width && Number(item.width),
                      offset: Number(item.offset || 0)
                    }
                  : null,
                selectOptions: [],
                options: {}
              };
              if (item.propertyType == 3) {
                itemModel.options = JSON.parse(item.propertyDesc).map(item => ({
                  value: item.code,
                  label: item.desc
                }));
              }
              exclusiveData[item.propertyCode] =
                data.productExclusiveResult.exclusiveParams[key];
              exclusiveModel.push(itemModel);
            });
           
            this.exclusiveData = exclusiveData;
            this.exclusive = exclusiveModel;
            this.detalisList = sucessData.data.dataMap;
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    editSubmit() {
      let productBasicParam = this.detalisList.productBasicResult;
      productBasicParam.productCode = this.productCode;
      if (productBasicParam.isDemark === "否") {
        productBasicParam.isOem = "0";
      } else {
        productBasicParam.isOem = "1";
      }
      if (productBasicParam.levelNum === "1") {
        productBasicParam.recommendLevel = 1;
      } else if (productBasicParam.levelNum === "2") {
        productBasicParam.recommendLevel = 2;
      } else if (productBasicParam.levelNum === "3") {
        productBasicParam.recommendLevel = 3;
      }

      if (
        productBasicParam.productName != null &&
        productBasicParam.productName != "" &&
        (productBasicParam.supName != null && productBasicParam.supName != "")
      ) {
        let params = {
          businessType: this.businessType,
          productBasicParam: this.detalisList.productBasicResult,
          productExclusiveParam: {
            exclusiveParams: this.exclusiveData,
            productCode: this.productCode
          },
          productPriceParam: this.detalisList.productPriceResult
        };
        console.log(params);

        updateProduct(params)
          .then(sucessData => {
            if (sucessData.status === 200) {
              this.$message({
                message: "编辑成功",
                type: "success"
              });

              this.$route && this.$route.path && closeTag(this.$route);
              this.$router.go(-1);
              console.log(sucessData, "success");
            }
          })
          .catch(error => {
            console.log("error");
          });
      } else {
        this.$message.error("请填写相关信息");
      }
    },

    editClose() {
      this.$route && this.$route.path && closeTag(this.$route);
      this.$router.go(-1);
    }
  }
};
</script>