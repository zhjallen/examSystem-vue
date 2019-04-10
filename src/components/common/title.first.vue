<template>
  <div class="title-first-content">
    <label class="u-title-block">{{title}}</label>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TitleFirst",
  data: function() {
    return {
    
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  watch: {
   
  }
});
</script>
<style lang="scss" scoped>
.title-first-content {
  display: block;
  border-bottom: 1px solid #2088d8;
  margin-bottom: 20px;
  .u-title-block {
    display: inline-block;
    min-width: 110px;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    text-align: center;
    letter-spacing: 1px;
    color: #2088d8;
  }
}
</style>


