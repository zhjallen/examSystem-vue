<template>
  <div class="layout">
    <sidebar v-if="userInfo" :menus="userInfo.menuData"/>
    <div
      class="main-content"
      v-bind:style="{width:`calc(100% - ${sidebarState.width})`,left:`${sidebarState.width}`}"
    >
      <headers :userInfo="userInfo"/>
      <tag-tabs/>
      <app-main class="main-wrapper" id="mainWrapper">首页数据</app-main>
    </div>
  </div>
</template>

<script>
import headers from "../components/header";
import sidebar from "../components/sidebar";
import tagTabs from "../components/tagTabs";
import appMain from "../components/main.vue";

import { mapGetters } from "vuex";
import api from "../../../utils/api";

export default {
  name: "Layout",
  components: {
    headers,
    sidebar,
    tagTabs,
    appMain
  },
  computed: {
    ...mapGetters(["sidebarState", "windowMaxState", "userInfo"])
  },
  methods: {}
};
</script>

<style lang="scss">
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main-content {
    flex: 1 auto;
    display: inherit;
    flex-direction: column;
    transition: all 0.3s ease-in-out 0s;
    position: absolute;
    height: 100%;
    .main-wrapper {
      flex: 1;
    }
  }
}
</style>