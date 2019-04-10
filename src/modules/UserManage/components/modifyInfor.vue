<template>
  <el-dialog
    title="修改用户"
    :visible.sync="modifyInfor "
    width="30%"
    :before-close="closeModify"
    center
  >
    <el-form
      :model="userList"
      size="mini"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="员工号" prop="employeeId">
        <el-input v-model.trim="userList.employeeId"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="userList.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model.trim="userList.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="resource">
        <el-radio-group v-model="userList.resource">
          <el-radio label="M">男</el-radio>
          <el-radio label="F">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker v-model.trim="userList.birthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="邮箱" prop="mailbox">
        <el-input v-model.trim="userList.mailbox"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitModify(userList,'ruleForm')">提交</el-button>
        <el-button @click="closeModify">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addUser } from "../api.js";
export default {
  name: "modifyInfor",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        employeeId: [
          { required: true, message: "请输入员工号", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "仅支持大陆手机号码",
            trigger: "blur"
          }
        ],
        mailbox: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ],
        birthday: [
          { required: true, message: "请选择出生年月", trigger: "change" }
        ],
        resource: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  props: {
    modifyInfor: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    submitModify(userList) {
      this.$emit("submitModify", userList);
    },
    closeModify() {
      this.$emit("closeModify");
    }
  }
};
</script>