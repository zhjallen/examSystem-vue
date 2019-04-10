<template>
  <div class="product-list-mall">业务库=商城</div>
</template>
<template>
  <div class="product-list-tx">
    <prouduct-list businessType="2"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ProuductList from "./productList.vue";
export default Vue.extend({
  name: "ProductListMall",
  components: {
    ProuductList
  }
});
</script>

