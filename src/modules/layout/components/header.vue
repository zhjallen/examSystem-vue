<template>
  <div class="header">
    <div
      class="handle-dent fa"
      :class="{'fa-outdent':sidebarState.isOpen,'fa-indent':!sidebarState.isOpen}"
      @click="slideSidebar"
    />
    <div class="user">
      <!-- <el-button @click="consoleuser">eee</el-button> -->
      <!-- <span>你好，</span> -->
      <ul>
        <li>
          <el-dropdown size="small">
            <i class="fa fa-user">{{ userInfo&&userInfo.name}}</i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="fa fa-key" @click.native="modifyPassword">修改密码</el-dropdown-item>
              <br>
              <el-dropdown-item class="fa fa-sign-out" @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "../styles/header.scss";
import { mapGetters } from "vuex";

// import PersonalSetting from './Settings'
// import HeaderShortcut from './HeaderShortcut'

// api
// import { commonLogout } from '@/api/my'

export default {
  name: "Headers",
  data() {
    return {
      dayTime: "",
      commonDialog: null
    };
  },
  computed: {
    ...mapGetters(["sidebarState"])
  },
  mounted() {
    // const now = parseInt(moment().format('HH'))
    // if (now < 12) this.dayTime = '早上'
    // else if (now >= 12 && now < 18) this.dayTime = '下午'
    // else if (now >= 18 && now <= 23) this.dayTime = '晚上'
    // else this.dayTime = ''
    
  },
  props: {
    userInfo: {
      type: Object,
      default: {
        userDetail: { name: "" }
      },
      required: true
    }
  },
  methods: {
    slideSidebar() {
     

      this.$store.dispatch("collapseSidebar", !this.sidebarState.isOpen);
    },
    consoleuser() {
      console.log(this.userInfo, "usei");
    },
    modifyPassword() {
      this.$router.replace({
        path: "/modifypassword"
      });
    },
    logout() {
      this.$confirm("确认要登出系统吗？", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          // this.$store
          //   .dispatch("userLogout", {
          //     redirectUrl: "/login"
          //   })
          //   .then(successData => {
              this.$router.replace("/login");
            // });
        })
        .catch(() => {});
    }
  },
  components: {
    // PersonalSetting,
    // HeaderShortcut
  }
};
</script>