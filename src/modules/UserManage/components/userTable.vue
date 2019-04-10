<template>
  <el-table  :highlight-current-row="true" header-row-class-name="header-table" :data="userManageLists" stripe class="table-lists" style="width: 100%">
    <el-table-column label="序号" >
      <template slot-scope="scope">
        <span>{{scope.$index+1}}</span>
      </template>
    </el-table-column>
    <el-table-column label="员工号" >
      <template slot-scope="scope">
        <span>{{ scope.row.employeeId }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" >
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="性别" >
      <template slot-scope="scope">
        <span v-if=" scope.row.gender ==='M'">男</span>
        <span v-else-if=" scope.row.gender ==='F'">女</span>
        <span v-else>男</span>
      </template>
    </el-table-column>
    <el-table-column label="手机号">
      <template slot-scope="scope">
        <span>{{ scope.row.mobile }}</span>
      </template>
    </el-table-column>
    <el-table-column label="邮箱" width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-dropdown trigger="click">
          <el-button size="mini" class="el-dropdown-link">
            操作
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="authorClick(scope.$index)" command="userAuthor">
              <i class="el-icon-menu"></i>
              用户授权
            </el-dropdown-item>
            <el-dropdown-item @click.native="permissClick(scope.$index)" command="permissionSet">
              <i class="el-icon-setting"></i>
              设置系统权限
            </el-dropdown-item>
            <el-dropdown-item @click.native="resetClick(scope.$index)" command="resetPassword">
              <i class="el-icon-message"></i>
              重置密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="modifyClick(scope.$index)" command="modifyInfor">
              <i class="el-icon-edit"></i>
              修改用户信息
            </el-dropdown-item>
            <el-dropdown-item @click.native="delClick(scope.$index)" command="deleteUser">
              <i class="el-icon-delete"></i>
              删除用户
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    userManageLists: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    authorClick(index) {
      this.$emit("authorClick", index);
    },
    permissClick(index) {
      this.$emit("permissClick", index);
    },
    resetClick(index) {
      this.$emit("resetClick", index);
    },
    modifyClick(index) {
      this.$emit("modifyClick", index);
    },
    delClick(index) {
      this.$emit("delClick", index);
    }
  }
};
</script>