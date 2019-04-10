<template>
  <div>
    <userTable
      :userManageLists="userManageLists"
      @authorClick="authorClick"
      @permissClick="permissClick"
      @resetClick="resetClick"
      @modifyClick="modifyClick"
      @delClick="delClick"
    />
    <!-- 用户授权弹出框 -->
    <staffAuthor
      :checkedKeys="checkedKeys"
      :userList="userList"
      :userAuthorList="userAuthorList"
      :userAuthor="userAuthor"
      @closeUserAuthor="closeUserAuthor"
      @submitUserAuthor="submitUserAuthor"
    />
    <!-- 设置权限弹出框 -->
    <permissionSet
      :userList="userList"
      :permissionSet="permissionSet"
      :systemTree="systemTree.systemTree"
      @closePermissionSet="closePermissionSet"
      @submitPermissionSet="submitPermissionSet"
    />
    <!-- 重置弹出框 -->
    <resetPassword
      :userList="userList"
      :resetPassword="resetPassword"
      :permissionSetRadio="permissionSetRadio"
      @closeResetPassword="closeResetPassword"
      @submitResetPassword="submitResetPassword"
    />
    <!-- 修改弹出框 -->
    <modifyInfor
      :userList="userList"
      :modifyInfor="modifyInfor"
      @submitModify="submitModify"
      @closeModify="closeModify"
    />
    <!-- 删除弹出框 -->
    <deleteStaff
      :userList="userList"
      :deleteUser="deleteUser"
      @closeDel="closeDel"
      @submitDel="submitDel"
    />
  </div>
</template>
<script>
import {
  addUser,
  delUser,
  modifyUser,
  allUser,
  restPasswordUser,
  associateUserSystem,
  authority,
  systemTreeByUserId
} from "../api.js";
import { getListTree, arrayToObj } from "../../../utils/functions/array.ts";
import { isEmpty } from "../../../utils/functions/isEmpty.js";
import userTable from "./userTable";
import deleteStaff from "./deleteStaff";
import staffAuthor from "./staffAuthor";
import modifyInfor from "./modifyInfor";
import resetPassword from "./resetPassword";
import permissionSet from "./permissionSet";
export default {
  data() {
    return {
      userAuthor: false,
      deleteUser: false,
      modifyInfor: false,
      permissionSet: false,
      resetPassword: false,
      permissionSetRadio: false,
      userAuthorList: [],
      checkedKeys: [],
      systemTree: {},
      userList: {}
    };
  },
  props: {
    userManageLists: {
      type: Array,
      default: () => []
    }
  },
  components: {
    userTable,
    deleteStaff,
    permissionSet,
    resetPassword,
    modifyInfor,
    staffAuthor
  },
  methods: {
    authorClick(index) {
      this.userAuthor = true;
      const item = this.userManageLists[index];
      this.userList = {
        employeeId: item.employeeId
      };
      this.getUserResourceList(item.employeeId);
    },
    permissClick(index) {
      this.permissionSet = true;
      const item = this.userManageLists[index];
      this.userList = {
        employeeId: item.employeeId
      };
      this.getSystemTreeByUser(item.employeeId);
    },
    resetClick(index) {
      this.resetPassword = true;
      const item = this.userManageLists[index];
      this.userList = {
        name: item.name,
        employeeId: item.employeeId
      };
    },
    modifyClick(index) {
      this.modifyInfor = true;
      const item = this.userManageLists[index];
      this.userList = {
        name: item.name,
        birthday: item.birthday,
        employeeId: item.employeeId,
        phoneNumber: item.mobile,
        resource: item.gender,
        mailbox: item.email
      };
    },
    delClick(index) {
      this.deleteUser = true;
      const item = this.userManageLists[index];
      this.userList = {
        name: item.name,
        employeeId: item.employeeId
      };
    },
    getSystemTreeByUser(userId) {
      systemTreeByUserId(userId)
        .then(sucessData => {
          if (sucessData.status === 200) {
            if (sucessData.data.data.isAdmin) {
              this.permissionSetRadio = true;
            } else {
              this.permissionSetRadio = false;
            }
            this.systemTree = sucessData.data.data;
          }
        })
        .catch(error => {
          this.$message.error("获取失败");
          console.log("error");
        });
    },
    //获取用户列表
    getUserResourceList(userId) {
      allUser(userId)
        .then(sucessData => {
          if (sucessData.status === 200) {
            sucessData.data.data.forEach(item => {
              if (item.selected) {
                this.checkedKeys.push(item.treeId);
              }
            });
            let resourceList = arrayToObj(sucessData.data.data, "treeId");
            let treeList = getListTree(resourceList, "treeParentId");
            this.userAuthorList = treeList;
          }
        })
        .catch(error => {
          this.$message.error("获取失败");
          console.log("error");
        });
    },
    closeDel() {
      this.deleteUser = false;
    },
    //删除
    submitDel(userId) {
      let ids = {
        employeeId: userId,
        status: "I"
      };
      delUser(ids)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.deleteUser = false;
            this.$emit("submitDel");
          }
        })
        .catch(error => {
          this.$message.error("删除失败");
          this.deleteUser = true;
          console.log("error");
        });
    },
    //修改
    submitModify(userItem, ruleForm) {
      if (userItem.resource === "男") {
        userItem.resource = "M";
      } else if (userItem.resource === "女") {
        userItem.resource = "F";
      }
      var d = new Date(userItem.birthday),
        year = d.getFullYear(),
        month =
          d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1),
        date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      userItem.birthday = year + "-" + month + "-" + date;
      let params = {
        birthday: userItem.birthday,
        email: userItem.mailbox,
        employeeId: userItem.employeeId,
        gender: userItem.resource,
        mobile: userItem.phoneNumber,
        name: userItem.name
      };
      if (
        isEmpty(params.name) &&
        isEmpty(params.birthday) &&
        isEmpty(params.mailbox) &&
        isEmpty(params.employeeId) &&
        isEmpty(params.resource) &&
        isEmpty(params.phoneNumber)
      ) {
        modifyUser(params)
          .then(sucessData => {
            if (sucessData.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.modifyInfor = false;
              console.log(sucessData, "success");
              this.$emit("submitModify");
            }
          })
          .catch(error => {
            this.$message.error("修改失败");
            this.modifyInfor = true;
            console.log("error");
          });
      }
    },
    closeModify() {
      this.modifyInfor = false;
    },
    //重置密码
    submitResetPassword(userId) {
      let ids = {
        userId: userId
      };
      restPasswordUser(ids)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "密码重置成功",
              type: "success"
            });
            this.resetPassword = false;
            console.log(sucessData, "sucess");
          }
        })
        .catch(error => {
          this.$message.error("密码重置错误");
          this.resetPassword = true;
          console.log("error");
        });
    },
    closeResetPassword() {
      this.resetPassword = false;
    },
    closePermissionSet() {
      this.permissionSet = false;
    },
    //设置管理员
    submitPermissionSet(userId, isSet) {
      let ids = {
        userId: userId,
        isAdmin: isSet
      };
      associateUserSystem(ids)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "权限设置成功",
              type: "success"
            });
            this.permissionSet = false;
            console.log(sucessData, "sucess");
          }
        })
        .catch(error => {
          this.$message.error("权限设置错误");
          this.permissionSet = true;
          console.log("error");
        });
    },
    closeUserAuthor() {
      this.userAuthor = false;
    },
    //授权权限
    submitUserAuthor(id, treeIdArr) {
      let params = {
        userId: id,
        roleIds: treeIdArr.join(",")
      };
      authority(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "授权成功",
              type: "success"
            });
            this.userAuthor = false;
            console.log(sucessData, "authority");
          }
        })
        .catch(error => {
          this.$message.error("请重新授权");
          this.userAuthor = true;
          console.log("error");
        });
    }
  }
};
</script>