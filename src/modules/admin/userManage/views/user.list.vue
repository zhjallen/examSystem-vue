<template>
  <div class="user-list">
    <user-list-search @search="searchUser"></user-list-search>
    <div class="add-user">
      <el-button type="primary" @click="addUser" size="mini">新增用户</el-button>
    </div>

    <el-table :data="userList" stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column property="name" label="名称" width="120"></el-table-column>
      <el-table-column property="username" label="用户名" width="120"></el-table-column>
      <el-table-column property="type" label="类别" width="120">
        <template slot-scope="props">
          <span>{{props.row.type | userTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column property="desc" label="描述" width="120"></el-table-column>
      <el-table-column property="operation" label="操作">
        <template slot-scope="props">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增用户" :visible.sync="isShowUserDialog">
      <el-form :model="userForm" label-width="100px" label-suffix=":">
        <el-form-item label="名称">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="userForm.type" placeholder="请选择活动区域">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="userForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getUserListApi, addUserApi } from "../api.js";
import UserAdd from "../components/user.add.vue";
import UserListSearch from "../components/user.list.search.vue";
import { userTypeModel } from "../model/userModel";
export default Vue.extend({
  name: "UserList",
  data: function() {
    return {
      userList: [],
      isShowUserDialog: false,
      userForm: {
        name: "",
        username: "",
        password: "123456",
        type: "2",
        desc: ""
      },
      formLabelWidth: "100px",
      defaultQueryParams: {
        page: 1,
        pageSize: 10
      }
    };
  },
  components: {
    UserAdd,
    UserListSearch
  },
  methods: {
    getUserList(params) {
      getUserListApi(params)
        .then(getData => {
          console.log(getData, "data");
          if (getData.status === 200) {
            this.userList = getData.data;
          }
        })
        .catch(error =>
          this.$message({
            type: "error",
            message: "出现错误"
          })
        );
    },
    searchUser(searchForm) {
      console.log(searchForm, "dddddddddd");
    },
    addUser() {
      console.log("dd");
      this.isShowUserDialog = true;
    },
    addUserConfirm() {
      addUserApi(this.userForm).then(successData => {
        console.log(successData, "data");
      });
    },
    delUser(user) {
      this.$confirm("确定删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(user, "user");
        })
        .catch(() => {
          return;
        });
    }
  },
  filters: {
    userTypeFilter(type) {
      if (type) {
        return userTypeModel[type];
      }
    }
  },
  mounted: function() {
    this.getUserList(this.defaultQueryParams);
  }
});
</script>
