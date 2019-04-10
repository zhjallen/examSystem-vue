<template>
  <div>
    <userManageHead @handlerSearch="handlerSearch"/>
    <addModal @submitAdd="refreshAddList"/>
    <staffLists
      :userManageLists="userManageList.list"
      @submitDel="refreshDelList"
      @submitModify="refreshModifyList"
    />
    <div class="user-footer-pagination">
        <span>
        共：
        <span>{{userManageList.total}}</span> 条
      </span>
      <pagination :pageinaPages="userManageList" @handlerChangePage="handlerChangePage"/>
      <div class="pageGoTo">
        <div class="goto">跳转到：</div>
        <el-input size="mini" class="pageSize" v-model.trim="pageNum" placeholder></el-input>
        <el-button size="mini" @click="goToPage(pageNum)">GO</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import userManageHead from "../components/staffManageHead";
import addModal from "../components/addStaffModal";
import staffLists from "../components/userContent";
import pagination from "../components/pagination";
import {
  getUserManageList,
  delUser,
  addUser,
  searchUserManageList
} from "../api.js";
import "../styles/staff.scss";
export default {
  name: "staffManage",
  data() {
    return {
      userManageList: {},
      pageNum: ""
    };
  },
  components: {
    userManageHead,
    addModal,
    staffLists,
    pagination
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getStaffList(params) {
      getUserManageList(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.userManageList = {};
            this.userManageList = {
              ...this.userManageList,
              ...sucessData.data.data
            };
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    getUserList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    },
    refreshModifyList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    },
    refreshDelList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    },
    refreshAddList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    },
    handlerChangePage(pageNum) {
      let params = {
        pageSize: 10,
        pageNo: pageNum,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    },
    handlerSearch(userList) {
      let params = {
        pageSize: 10,
        pageNo: 1,
        employeeId: userList.employeeId,
        userName: "",
        name: userList.name,
        mobile: userList.phoneNumber,
        email: userList.mailbox
      };
      searchUserManageList(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.userManageList = {};
            this.userManageList = {
              ...this.userManageList,
              ...sucessData.data.data
            };
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    goToPage(pageNum) {
      let params = {
        pageSize: 10,
        pageNo: pageNum,
        employeeId: "",
        userName: "",
        mobile: "",
        email: ""
      };
      this.getStaffList(params);
    }
  }
};
</script>