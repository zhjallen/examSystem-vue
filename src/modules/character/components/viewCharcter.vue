<template>
  <el-dialog title="查看角色授权" :visible.sync="view " :before-close="closeView" width="30%" center>
    <el-tree
      :data="resourceLists"
      show-checkbox
      node-key="treeId"
      :default-checked-keys="checkedKeys"
      :expand-on-click-node="false"
      class="viewAuthor"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.text}}</span>
      </span>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submitView">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    resourceLists: {
      type: Array,
      default: () => []
    },
    checkedKeys:{
      type: Array,
      default: () => []  
    },
    view:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    closeView() {
      this.$emit("closeView");
    },
    submitView() {
      this.$emit("submitView");
    }
  }
};
</script>
<style lang='scss' scope>
.viewAuthor{
   max-height: 350px;
   overflow-y: scroll;
}
</style>