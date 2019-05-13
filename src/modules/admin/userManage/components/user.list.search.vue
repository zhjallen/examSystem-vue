<template>
  <div class="user-list-search light-border">
    <el-form
      :model="searchForm"
      ref="userSearchForm"
      label-width="100px"
      label-suffix=":"
      size="small"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="searchForm.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="button">
          <el-button type="primary" size="small" @click="searchUser">查询</el-button>
          <el-button size="small" @click="resetSearch">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "UserListSearch",
  data: function() {
    return {
      searchForm: {
        name: "",
        userName: ""
      }
    };
  },
  methods: {
    searchUser() {
      console.log(this.searchForm, "searchform");
      this.$emit("search", this.searchForm);
    },
    resetSearch() {
      this.$refs["userSearchForm"].resetFields();
    }
  }
});
</script>

