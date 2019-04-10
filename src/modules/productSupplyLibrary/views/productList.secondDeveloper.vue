<template>
  <div class="product-list-second-developer">
    <!-- <el-button @click="close">关闭标签</el-button> -->
    <product-list businessType="1"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ProductList from "./productList.vue";
// import { closeTag } from "../../../utils/functions/commonFunc";
export default Vue.extend({
  name: "ProductListSecondDeveloper",
  components: {
    ProductList
  },
  methods: {
    close() {
      this.$route && this.$route.path && this.closeTag(this.$route);
    //   this.$router.go(-1);
    }
  }
});
</script>

