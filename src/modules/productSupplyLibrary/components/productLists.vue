<template>
  <div>
    <productTable
      :productLists="productLists"
      @forbid="forbid"
      @detailList="detailList"
      @editList="editList"
      :isHightest="isHightest"
      :businessType="businessType"
    />
    <disableProduct
      :disableProduct="disableProduct"
      :forbidList="forbidList"
      @submitDis="submitDis"
      @closeDis="closeDis"
    />
  </div>
</template>
<script>
import productTable from "./productTable";
import Bus from "../eventBus.js";
import disableProduct from "./disableProduct";
import { modifyProduct } from "../api.js";
export default {
  components: {
    productTable,
    disableProduct
  },
  data() {
    return {
      disableProduct: false,
      forbidList: {},
      isHightest: false
    };
  },

  props: {
    productLists: {
      type: Array,
      default: () => []
    },
    roleCodeList: {
      type: Array,
      default: () => []
    },
    businessType: {
      type: String,
      default: "1"
    }
  },
  watch: {
    roleCodeList(roles) {
      if (
        roles.length > 0 &&
        roles.findIndex(item => item === "ywk_gylfzc") >= 0
      ) {
        this.isHightest = true;
      }
    }
  },
  methods: {
    detailList(index, list, businessType) {
      let product = {};
      if (list.productCode.indexOf("GYS") == -1) {
        product = Object.assign({}, list, {
          productCode: list.supCode + "-" + list.productCode
        });
      }
      this.$router.push({
        path: "/right/details",
        query: {
          productCode: product.productCode,
          businessType: businessType
        }
      });
    },
    editList(index, list, businessType) {
      let product = {};
      if (list.productCode.indexOf("GYS") == -1) {
        product = Object.assign({}, list, {
          productCode: list.supCode + "-" + list.productCode
        });
      }
      this.$router.push({
        path: "/right/edit",
        query: {
          productCode: product.productCode,
          businessType: businessType
        }
      });
    },
    forbid(index, row) {
      this.disableProduct = true;
      this.$emit("forbid", index, row);
      this.forbidList = row;
    },
    submitDis(productCode) {
      this.disableProduct = false;
      let params = {
        productCode: productCode,
        isEnabled: 0
      };
      modifyProduct(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    closeDis() {
      this.disableProduct = false;
    }
  }
};
</script>
