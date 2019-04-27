<template>
  <div class="user-list">
    <user-list-search @search="searchUser"></user-list-search>
    <div class="add-user">
      <el-button type="primary" @click="addUser" size="mini">新增用户</el-button>
    </div>

    <el-table :data="userList" stripe size="small" :border="true" class="header-table">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="username" label="用户名" width="120"></el-table-column>
      <el-table-column property="type" label="类别" width="120">
        <template slot-scope="props">
          <span>{{props.row.type | userTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column property="desc" label="描述" ></el-table-column>
      <el-table-column property="operation" label="操作">
        <template slot-scope="props">
          <el-button size="small" @click="editUser(props.row)">编辑</el-button>
          <template v-if="props.row.name!=='admin'">
            <el-button type="danger" size="small" @click="delUser(props.row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-end"
      background
      layout="total,prev, pager, next"
      :total="totalNum"
      :current-page.sync="currentPage"
      @current-change="pageChange"
      small
    ></el-pagination>
    <el-dialog title="新增用户" :visible.sync="isShowUserDialog">
      <el-form
        :model="userForm"
        ref="userForm"
        label-width="100px"
        label-suffix=":"
        :rules="userFormRules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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
        <el-button type="primary" @click="addUserConfirm('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {
  getUserListApi,
  addUserApi,
  delUserApi,
  updateUserApi
} from "../api.js";
import UserAdd from "../components/user.add.vue";
import UserListSearch from "../components/user.list.search.vue";
import { userTypeModel } from "../model/userModel";
import { getQueryParams } from "../../../../utils/functions/objFunc";
import "../styles/user.list.scss";
export default Vue.extend({
  name: "UserList",
  data: function() {
    return {
      userList: [],
      isShowUserDialog: false,
      dialogPage: "add",
      userForm: {
        name: "",
        username: "",
        password: "123456",
        type: "2",
        desc: ""
      },
      userFormRules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      formLabelWidth: "100px",
      queryParams: {},
      currentPage: 1,
      totalNum: 0
    };
  },
  props:{},
  components: {
    UserAdd,
    UserListSearch
  },
  methods: {
    getUserList(params) {
      const queryParams = {
        ...params,
        ...this.queryParams,
        pageSize: 10
      };
      getUserListApi(queryParams)
        .then(getData => {
          this.currentPage = queryParams.page;
          if (getData.status === 200) {
            this.totalNum = getData.data.total;
            this.userList = getData.data.users;
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
      this.queryParams = getQueryParams(searchForm);
      this.getUserList({ page: 1 });
    },
    addUser() {
      this.isShowUserDialog = true;
      this.dialogPage = "add";
      this.userForm = {
        name: "",
        username: "",
        password: "123456",
        type: "2",
        desc: ""
      };
    },

    addUserConfirm(formName) {
      this.$refs[formName].validate(isValid => {
        if (isValid) {
          if (this.dialogPage === "add") {
            addUserApi(this.userForm).then(successData => {
              if (successData.status === 200) {
                this.$message({
                  type: "success",
                  message: "新增用户成功"
                });
                this.$refs[formName].resetFields();
                this.isShowUserDialog = false;
                this.getUserList({ page: 1 });
              }
            });
          } else if (this.dialogPage === "edit") {
            updateUserApi(this.userForm).then(getData => {
              if (getData.status === 200) {
                this.$message({
                  type: "success",
                  message: "更新用户成功"
                });
                this.$refs[formName].resetFields();
                this.isShowUserDialog = false;
                this.getUserList({ page: this.currentPage });
              }
            });
          }
        }
      });
    },
    editUser(user) {
      this.userForm = { ...user, type: String(user.type) };
      this.isShowUserDialog = true;
      this.dialogPage = "edit";
    },
    delUser(user) {
      this.$confirm("确定删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUserApi(user.id).then(getData => {
            if (getData.status === 200) {
              this.getUserList({ page: this.currentPage });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    pageChange(currentPage) {
      this.getUserList({ page: currentPage });
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
    this.getUserList({ page: 1 });
  }
});
</script>
