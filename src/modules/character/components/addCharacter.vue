<template>
  <div class="add-character-modal">
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addCharcaterVisible = true">添加</el-button>
    <el-dialog title="新增" class="add-dialog" :visible.sync="addCharcaterVisible">
      <el-form
        :model="addList"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="角色编码" prop="coding">
          <el-input v-model.trim="addList.coding"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="addList.name"></el-input>
        </el-form-item>
        <el-form-item label="所属系统" prop="system">
          <el-select v-model="addList.system">
            <el-option
              v-for="item in system"
              :key="item.id"
              :label="item.name"
              :value="String(item.id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input type="textarea" v-model.trim="addList.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCharacter(addList,'ruleForm')">提交</el-button>
          <el-button size="mini" @click="addCharcaterVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { saveCharacter } from "../api.js";
export default {
  name: "addCharacter",
  data() {
    return {
      selectSystem: 1,
      addList: {
        name: "", //名称
        coding: "", //编码
        system: "权限管理", //系统
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "请输入姓名", trigger: "blur" }
        ],
        coding: [
          { required: true, message: "请输入编码", trigger: "blur" },
          { min: 1, max: 20, message: "请输入合理的编码", trigger: "blur" }
        ],
        system: [
          { required: true, message: "请选择所属系统", trigger: "change" },
          { message: "请选择所属系统", trigger: "change" }
        ]
      },
      addCharcaterVisible: false
    };
  },
  props: {
    system: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addCharacter(addList, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (addList.system === "权限管理") {
            addList.system = 1;
          }
          let params = {
            name: addList.name,
            code: addList.coding,
            systemId: addList.system,
            description: addList.desc,
            common: false,
            id: "",
            roleMarketEntities: []
          };
          saveCharacter(params)
            .then(sucessData => {
              if (sucessData.status === 200) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.$emit("addCharacter");
                console.log(sucessData, "success");
              }
            })
            .catch(error => {
              this.$message.error("新增失败");
              console.log("error");
            });
          this.addCharcaterVisible = false;
        } else {
          console.log("error submit!!");
          this.$message({
            message: "请填写相关信息",
            type: "warning"
          });
          return false;
        }
      });
      this.$refs[formName].resetFields();
    }
  }
};
</script>
