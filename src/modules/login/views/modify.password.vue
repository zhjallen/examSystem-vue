<template>
  <div class="modify-password light-border">
    <el-form
      label-suffix=":"
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="form"
    >
      <span class="label">修改密码</span>
      <el-row>
        <el-col :span="24">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="formData.oldPwd" maxlength="50"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="formData.newPwd"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="确认密码" prop="confirmNewPwd">
            <el-input type="password" v-model="formData.confirmNewPwd"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="operation">
        <el-button type="primary" @click="confirmEditPassWord('formData')">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "ModifyPassword",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formData.confirmNewPwd !== "") {
          this.$refs.formData.validateField("confirmNewPwd");
          callback();
        }
      }
    };

    const validateRePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formData.newPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        oldPwd: "",
        newPwd: "",
        confirmNewPwd: ""
      },

      rules: {
        oldPwd: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        confirmNewPwd: [
          {
            validator: validateRePass,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    confirmEditPassWord(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("modifyPasswordAction", {
              oldPwd: this.formData.oldPwd,
              newPwd: this.formData.newPwd
            })
            .then(successData => {
              if (successData.data && successData.data.code === 200) {
                this.$router.replace("/login");
              } else {
                this.$alert(successData.data.message, "提示", {
                  callback: action => {
                    return;
                  }
                });
              }
            })
            .catch(error => {
              console.log(error, "error");
            });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
});
</script>
<style lang="scss" scoped>
.modify-password {
  width: 30%;
  min-width: 200px;
  margin: 20px auto;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.18);
  .form {
    margin-right: 2rem;
    margin-bottom: 2rem;
  }
  .label {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  //   margin-right: 16px;
  .operation {
    display: flex;
    justify-content: center;
  }
}
</style>


