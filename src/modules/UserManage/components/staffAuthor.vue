<template>
  <el-dialog
    title="用户授权"
    :visible.sync="userAuthor "
    width="30%"
    :before-close="closeUserAuthor"
    center
  >
    <el-tree
      :data="userAuthorList"
      expand-on-click-node
      show-checkbox
      node-key="treeId"
      ref="tree"
      :default-checked-keys="checkedKeys"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.text}}</span>
      </span>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeUserAuthor">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitUserAuthor(userList.employeeId)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "staffAuthor",
  data() {
    return {};
  },
  props: {
    userAuthorList: {
      type: Array,
      default: () => []
    },
    userList: {
      type: Object,
      default: () => {}
    },
    userAuthor: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    closeUserAuthor() {
      this.$emit("closeUserAuthor");
    },
    submitUserAuthor(id,treeIdArr) {
       treeIdArr= this.$refs.tree.getCheckedKeys()
      this.$emit("submitUserAuthor",id,treeIdArr);
    }
  }
};
</script>