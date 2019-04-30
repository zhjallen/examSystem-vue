<template>
  <el-main class="main" id="contentMain">
    <!-- custom scroll bar for main area -->
    <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions">
      <!-- <keep-alive >
        <router-view />
      </keep-alive> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </VuePerfectScrollbar>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "Main",
  data() {
    return {
      scrollOptions: {
        maxScrollbarLength: 500
      }
    };
  },
  computed: {
    ...mapGetters(["cachedViews"])
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  min-width: 800px;
  margin-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  .scroll-area {
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
    }
  }
}
</style>
