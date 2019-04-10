<template>
  <div>
    <productHead v-on:productQuery="handleProductQuery"/>
    <productList
      :businessType="businessType"
      :productLists="productLists"
      :roleCodeList="roleCodeList"
    />
    <pagination :paginationObj="paginationObj" @handlerChangePage="handlerChangePage"/>
  </div>
</template>
<script lang="ts">
import { getProductList } from "../api.js";
import productHead from "../components/productHead.vue";
import productList from "../components/productLists.vue";
import pagination from "../components/pagination.vue";
import { mapGetters } from "vuex";
import "../styles/product.scss";
export default {
  name: "ProductList",
  components: {
    productHead,
    productList,
    pagination
  },
  data() {
    return {
      productLists: [],
      roleCodeList: [],
      pageNum: "",
      paginationObj: {
        total: 0,
        currentPage: 1
      },
      defaultQueryParams: {
        pageSize: 10,
        pageNo: 1,
        businessType: "1"
      },
      queryParams: {
        pageNo: 1
      }
    };
  },
  props: {
    businessType: {
      type: String,
      default: "1"
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.getProductList();
    this.getUserRoles();
  },
  methods: {
    getUserRoles() {
      if (this.userInfo && this.userInfo.userDetail) {
        this.roleCodeList = this.userInfo.userDetail.roleCodeList;
      }
    },
    productList(params) {
      getProductList({ ...params, businessType: this.businessType })
        .then(sucessData => {
          console.log("successdata", sucessData);
          if (sucessData.status === 200) {
            const productList = sucessData.data.dataMap.data;
            this.paginationObj = Object.assign(this.paginationObj, {
              total: sucessData.data.dataMap.totalResult
            });
            this.productLists = productList.map(product => {
              let productCode = "";
              if (product.productCode.indexOf("GYS")!=-1) {
                const productCodeArr = product.productCode.split("-");
                productCode = productCodeArr[1];
              } else {
                productCode = product.productCode;
              }
              return Object.assign({}, product, {
                productCode
              });
            });
          }
        })
        .catch(error => {
          console.log("error");
          this.$alert("查询出错");
          this.productLists = [];
          this.paginationObj = {
            total: 0
          };
        });
    },
    getProductList() {
      this.productList(this.defaultQueryParams);
    },
    handleProductQuery(params) {
      const newParams = {
        pageNo: 1
      };
      Object.keys(params).map(key => {
        if (params[key]) {
          newParams[key] = params[key].trim();
        }
      });
      this.queryParams = newParams;
      this.productList({ ...this.defaultQueryParams, ...newParams });
    },
    handlerChangePage(pageNum) {
      this.paginationObj.currentPage = pageNum;
      this.productList({
        ...this.defaultQueryParams,
        ...this.queryParams,
        pageNo: pageNum
      });
    }
  }
};
</script>
