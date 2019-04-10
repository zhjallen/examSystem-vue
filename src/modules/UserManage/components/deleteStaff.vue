<template>
  <el-dialog title="删除用户" :visible.sync="deleteUser " width="30%" :before-close="closeDel" center>
    <div>是否删除该用户？</div>
    <div>
      用户名为：
      <span>{{userList.name}}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDel">取 消</el-button>
      <el-button type="primary" @click="submitDel(userList.employeeId)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    userList: {
      type: Object,
      default: () => {}
    },
    deleteUser: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitDel(id) {
      this.$emit("submitDel", id);
    },
    closeDel() {
      this.$emit("closeDel");
    }
  }
};
</script>