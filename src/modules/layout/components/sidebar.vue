<template>
   <transition name="scale-left">
     <div class="sidebar" :class="{ open: sidebarState.isOpen }">
    <VuePerfectScrollbar :settings="scrollOption">
      <el-menu
        mode="vertical"
        class="vertical-menu"
        :default-active="$route.path"
        :router="true"
        :collapse="!sidebarState.isOpen"
        background-color="#202a3a"
        text-color="#fff"
      >
        <template v-for="item in userMenus">
          <el-submenu :index="item.key" :key="item.key">
            <template slot="title">
              <i class="fa fa-user"/>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-if="item.children&&item.children.length>0">
              <template v-for="childItem in item.children">
                <el-menu-item
                  :index="childItem.link"
                  :key="childItem.key"
                  class="{active:item.}"
                  @click="handleMenuItem(childItem)"
                >{{childItem.title}}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </VuePerfectScrollbar>
    </div>
   </transition>
</template>

<script>
import { mapGetters } from "vuex";
// import SidebarMenuItem from './SidebarMenuItem'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "../styles/sidebar.scss";
import menus from "../model.ts";

export default {
  name: "Sidebar",
  components: {
    // SidebarMenuItem,
    VuePerfectScrollbar
  },
  data() {
    return {
      scrollOption: {
        suppressScrollX: true
      },
      menus: menus
    };
  },
  computed: {
    ...mapGetters(["sidebarState", "systemTheme"]),
    // 这里必须根据条件结合ElementUI的sidebar来调整颜色,保证自定义主题和sidebar的内置颜色一致.
    systemThemeColor: function() {
      switch (this.systemTheme) {
        case "batman":
        case "belles":
          return "#37474F";
        default:
          return "#304156";
      }
    },
    userMenus() {
      console.log(this.menus);
      return this.menus.admin;
    }
  },
  props: {
    // menus: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // }
  },
  methods: {
    handleMenuItem(menuItem) {}
  }
};
</script>

<style lang="scss" scoped>
$sidebar-background-color: #304156;

.sidebar {
  display: flex;
  flex-direction: column;
  flex: none;
  transition: all 0.3s ease-in-out 0s;
  overflow: hidden;
  position: absolute;
  height: 100%;
  background-color: #202a3a;
  .el-menu-item {
    width: 100%;
  }

  // sidebar menu css override
  .vertical-menu:not(.el-menu--collapse) {
    width: 180px;
    border-right: none;
  }

  .el-menu--collapse i {
    font-size: 1.6rem;
  }
}
</style> 