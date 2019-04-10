<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline characterHead">
    <el-form-item label="所属系统：" prop="system">
      <el-select v-model="formInline.system">
        <el-option
          v-for="item in system"
          :key="item.id"
          :label="item.name"
          :value="String(item.id)"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="角色编码：">
      <el-input size="small" v-model.trim="formInline.coding" placeholder="角色编码"></el-input>
    </el-form-item>
    <el-form-item label="角色名称：">
      <el-input size="small" v-model.trim="formInline.name" placeholder="角色名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click="searchBtn(formInline)"
        icon="el-icon-search"
      >搜索</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "characterHead",
  data() {
    return {
      formInline: {
        name: "", //名称
        coding: "", //编码
        system: '' //系统 
      }
    };
  },
   props: {
    system: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    searchBtn(formInline) { 
      this.$emit("handlerSearch",formInline);
    }
  }
};
</script>