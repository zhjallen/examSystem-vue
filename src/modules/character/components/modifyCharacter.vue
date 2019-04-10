<template>
  <el-dialog
    title="修改角色"
    :visible.sync="modifyInfor"
    width="30%"
    :before-close="closeModify"
    center
  >
    <el-form
      :model="characterList"
      :rules="rules"
      label-width="90px"
      size="mini"
      class="demo-ruleForm"
    >
      <el-form-item label="角色编码" prop="coding">
        <el-input v-model.trim="characterList.code"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model.trim="characterList.name"></el-input>
      </el-form-item>
      <el-form-item label="所属系统" prop="system">
        <el-select v-model="characterList.system">
          <el-option
            v-for="item in system"
            :key="item.id"
            :label="item.name"
            :value="String(item.id)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input type="textarea" v-model.trim="characterList.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitModify(characterList,'ruleForm')">提交</el-button>
        <el-button size="mini" @click="closeModify">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        name: [ { required: true, message: "请输入姓名", trigger: "blur" }],
        coding: [ { required: true, message: "请输入编码", trigger: "blur" }],
        system: [ { required: true, message: "请选择所属系统", trigger: "change" }]
      }
    };
  },
  props: {
    system: {
      type: Array,
      default: () => []
    },
    characterList: {
      type: Object,
      default: () => {}
    },
    modifyInfor:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    submitModify(ruleForm,formName) {
      this.$emit("submitModify", ruleForm,formName);
    },
    closeModify() {
      this.$emit("closeModify");
    }
  }
};
</script>