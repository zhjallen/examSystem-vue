<template>
  <div>
    <detailsGeneralInfor
      v-if="detalisList.productBasicResult"
      :detalisList="detalisList.productBasicResult"
    />
    <detailsSpecialInfor :exclusiveData="exclusiveData" :exclusive="exclusive"/>
    <detailsPriceInfor
      v-if="detalisList.productPriceResult"
      :detalisList="detalisList.productPriceResult"
    />
  </div>
</template>
<script>
import detailsPriceInfor from "../components/detailsPriceInfor.vue";
import detailsGeneralInfor from "../components/detailsGeneralInfor.vue";
import detailsSpecialInfor from "../components/detailsSpecialInfor.vue";
import Bus from "../eventBus.js";
import { getProductInfo } from "../api.js";
export default {
  name: "productDetail",
  data() {
    return {
      detalisList: {},
      productCode: this.$route.query.productCode,
      exclusive: [],
      exclusiveData:{},
    };
  },
  created() {
    let param = this.$route.query.productCode;
     let businessType = this.$route.query.businessType;
    this.getDetailsList(param,businessType);
  },
  components: {
    detailsPriceInfor,
    detailsGeneralInfor,
    detailsSpecialInfor
  },
  methods: {
    getDetailsList(productCode,businessType) {
      let params = {
        type: businessType,
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
              const item = JSON.parse(key);
              const itemModel = {
                key: item.propertyCode,
                showName: item.propertyName,
                elementType: inputType[item.propertyType],
                propertyDesc:item.propertyDesc||'暂无',
                dataType: "string",
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
            this.exclusiveData=exclusiveData;
            this.exclusive = exclusiveModel;
            this.detalisList = sucessData.data.dataMap;
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>