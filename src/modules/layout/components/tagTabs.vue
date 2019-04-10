<template>
  <div class="tag-tabs">
    <scroll-pane v-if="openTags.length>0">
      <router-link
        tag="div"
        class="tab-item"
        v-for="tab in openTags"
        :to="tab.fullPath"
        :key="tab.fullPath"
        :class="{active: isActive(tab), isShowCloseBtn: !isShowCloseBtn(tab)}"
      >
        <span>
          <span class="top-line"></span>
          {{ tab.meta.title }}
        </span>
        <span
          v-if="isShowCloseBtn(tab)"
          class="close el-icon-close"
          @click.prevent.stop="closeTab(tab)"
        ></span>
      </router-link>
    </scroll-pane>
    <!-- <el-button @click="addTag">增加标签</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scrollPane from "../../../components/scrollPane/index";
// import { baseTheme } from '@/utils/theme';
// import eventBus from '@/components/eventBus'

export default {
  name: "TagTabs",
  data() {
    return {
      isDashboard: false,
      isDisableCloseItem: false
    };
  },
  computed: {
    ...mapGetters(["openTags"])
    // systemThemeColor: function () {
    //   return baseTheme[this.systemTheme]
    // }
  },
  watch: {
    $route() {
      this.addViewToVisided();
    }
  },
  mounted() {
    this.addViewToVisided();
  },
  methods: {
    addTag() {
      console.log("新增tag", this.openTags);
    },
    isActive(tab) {
      // if(tab.name===this.$router.name){
      //   return true;
      // }
      // return false;
      return tab.path === this.$route.path;
    },
    isShowCloseBtn(view) {
      return view.path !== "/dash";
    },
    addViewToVisided() {
      // console.log(this.$route, "router");
      const thisRoute = this.$route.name ? this.$route : null;
      // let tag = {
      //   path: Math.random(),
      //   name: "xxs"
      // };
      // this.$store.dispatch(
      //   "addTag",
      //   Object.assign({}, menuItem, {
      //     selected: true
      //   })
      // );
      this.$store.dispatch("addTag", Object.assign({}, thisRoute));
      // if (thisRoute) this.$store.dispatch('addVisitedViews', thisRoute)
    },
    closeTab(view) {
      this.$store.dispatch("removeTag", view).then(res => {
        this.$nextTick(() => {
          console.log(res, "res");
          if (res && res.fullPath) {
            this.$router.push(res.fullPath);
          }
          // 移除过后的visitedViews Array object
          // const views = [...res.views];
          // // 移除view的下一个view, 用于帮助自动Acitve下一个view
          // const nextView = res.theNextView;
          // // 如果移除的是已Active的View才需要协助触发一些后续操作
          // if (this.isActive(view)) {
          //   // 如果没有下一个view,可能当前移除的已经是最后一个,那么需要返回 visitedViews的最后一个
          //   const lastView = nextView === null && views.slice(-1)[0];
          //   // 如果有下一个则直接跳转路由
          //   if (nextView) {
          //     this.$router.push(nextView.path);
          //     // 如果当前移除的已经是最后一个,则应该跳转至visitedViews的最后一个路由
          //   } else {
          //     if (lastView) {
          //       this.$router.push(lastView.path);
          //     } else {
          //       // 保证最后不能出现空visitedList
          //       // TODO 应该做一个可以默认无法关闭的首页view
          //       this.$router.push({
          //         path: "/",
          //         query: {
          //           t: new Date().getTime()
          //         }
          //       });
          //       // if (view.path === '/dash') this.$store.dispatch('addVisitedViews', view)
          //     }
          //   }
          // }
        });
        // 关闭标签时触发一个广播
        // TODO: 暂时不发送广播
        // eventBus.$emit('plateform.navTab.removed', { removed: view })
      });
    }
  },
  components: {
    scrollPane
  }
};
</script>

<style lang="scss" scoped>
.tag-tabs {
  background-color: #ffffff;
  // box-shadow: 10px 0 15px -6px rgba(0, 0, 0, 0.4) inset;
  height: 30px;
  // margin-top: 5px;
  // padding: 7px 0;
  border-bottom: 1px solid #f1f1f1;
  :first-child.tab-item {
    // border-left: 2px solid #0d90ee;
  }
  .tab-item {
    display: flex;
    align-items: center;
    padding:6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    transition: all 0.2s ease 0s;
    border: 1px solid #d8dce5;
    margin: 0 2px;
    &.isShowCloseBtn > span {
      padding-right: 10px;
    }

    > span {
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;

      > i {
        color: lighten($base-dark-color, 30%);
        position: relative;
        top: 1px;
        margin-right: 5px;
      }

      &.close {
        width: 14px;
        height: 14px;
        border-radius: 15px;
        margin: 1px 0 0 2px;
        display: flex;
        align-items: center;
        justify-content:center;
        &:before {
          position: relative;
          top: 1px;
        }

        &:hover {
          color: #fff;
          font-weight: 600;
          background-color: #b4bccc;
        }
      }
    }

    &.active {
      // position: relative;
      background-color: #0d90ee;
      color: #fff;
      border: 1px solid #0d90ee;

      span.top-line {
        width: 100%;
        height: 3px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &:hover:not(.active) {
      background-color: lighten($base-gray-color, 24%);
      
    }
  }
}
</style>