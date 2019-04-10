<template>
  <div class="main-hearder">
    <div class="logo">
      <!-- <img src="../../../../../assets/logo.png" alt="">-->
      <span>红星云供</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MainHeader"
});
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  border-bottom: 1px solid black;
  color: black;
  height: 4rem;
  line-height: 4rem;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 2rem;
    font-size: 1.4rem;
  }

  img {
    height: 1.5rem;
  }
}
</style>


