<template>
  <div class="add-Staff-modal">
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="addUserVisible = true">添加用户</el-button>
    <el-dialog title="新增用户" class="add-dialog" :visible.sync="addUserVisible">
      <el-form
        :model="addList"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="员工号" prop="employeeId">
          <el-input v-model.trim="addList.employeeId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="addList.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model.number.trim="addList.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
          <el-radio-group v-model="addList.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="birthday">
          <el-date-picker v-model="addList.birthday" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model.trim="addList.mailbox"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(addList,'ruleForm')">提交</el-button>
          <el-button size="mini" @click="addUserVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addUser } from "../api.js";
export default {
  name: "addStaffModal",
  data() {
    return {
      addList: {
        name: "",
        birthday: "",
        employeeId: "",
        phoneNumber: "",
        resource: "男",
        mailbox: ""
      },
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
            pattern: /^1[345768]\d{9}$/,
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
      },
      addUserVisible: false
    };
  },
  methods: {
    submitForm(formName, ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (formName.resource === "男") {
            formName.resource = "M";
          } else {
            formName.resource = "F";
          }
          var d = new Date(formName.birthday),
            year = d.getFullYear(),
            month =
              d.getMonth() + 1 >= 10
                ? d.getMonth() + 1
                : "0" + (d.getMonth() + 1),
            date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
          formName.birthday = year + "-" + month + "-" + date;

          let params = {
            birthday: formName.birthday,
            email: formName.mailbox,
            employeeId: formName.employeeId,
            gender: formName.resource,
            mobile: formName.phoneNumber,
            name: formName.name
          };
          addUser(params)
            .then(sucessData => {
              if (sucessData.status === 200) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.addUserVisible = false;
                this.$emit('submitAdd')
              }
            })
            .catch(error => {
              this.$message.error("新增失败");
              this.addUserVisible = true;
              console.log("error");
            });
        } else {
           this.$message({
            message: "请填写用户相关信息",
            type: "warning"
          });
          console.log("error submit!!");
          return false;
        }
      });

      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>
