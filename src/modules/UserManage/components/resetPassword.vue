<template>
  <el-dialog
    title="重置密码"
    :visible.sync="resetPassword "
    width="30%"
    :before-close="closeResetPassword"
    center
  >
    <div>是否重置该用户的密码？</div>
    <div>用户名为：{{userList.name}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeResetPassword">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitResetPassword(userList.employeeId)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addUser } from "../api.js";
export default {
  name: "resetPassword",
  props: {
    resetPassword: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closeResetPassword() {
      this.$emit("closeResetPassword");
    },
    submitResetPassword(id) {
      this.$emit("submitResetPassword", id);
    }
  }
};
</script>