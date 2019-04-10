<template>
  <el-dialog
    title="关联系统"
    :visible.sync="permissionSet "
    width="30%"
    :before-close="closePermissionSet"
    center
  >
    <div class="checkSystem">
      <el-checkbox-group v-model="CheckedSystemLists" @change="handleCheckedSystemChange">
        <el-checkbox
          v-for="item in systemTree"
          :label="item.treeId"
          :key="item.treeId"
          :checked="item.selected"
        >{{item.text}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-checkbox @change="changeSetPer" v-model="permissionSetRadio">设置系统管理员</el-checkbox>
      <el-button size="mini" @click="closePermissionSet">取 消</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="submitPermissionSet(userList.employeeId,permissionSetRadio)"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addUser } from "../api.js";
export default {
  name: "permissionSet",
  data() {
    return {
      permissionSetRadio: false,
      CheckedSystemLists: []
    };
  },
  props: {
    permissionSet: {
      type: Boolean,
      default: false
    },
    systemTree: {
      type: Array,
      default: () => []
    },
    userList: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.isChecked();
  },
  methods: {
    isChecked() {
      this.systemTree.forEach(item => {
        if (item.selected) {
          this.CheckedSystemLists.push(item.treeId);
        }
      });
    },
    handleCheckedSystemChange(val) {
      console.log(val);
    },
    closePermissionSet() {
      this.$emit("closePermissionSet");
    },
    submitPermissionSet(id, isSet) {
      this.$emit("submitPermissionSet", id, isSet);
    },
    changeSetPer(val) {
      this.permissionSetRadio = val;
      if (val) {
        this.CheckedSystemLists = [];
      }
    }
  }
};
</script>