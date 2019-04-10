<template>
  <div class="product-list-tx">
    <prouduct-list businessType="3"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ProuductList from "./productList.vue";
export default Vue.extend({
  name: "ProductListTx",
  components: {
    ProuductList
  }
});
</script>

