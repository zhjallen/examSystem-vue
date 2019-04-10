<template>
  <el-dialog title="角色授权" :visible.sync="author " :before-close="closeAuthor" width="30%" center>
    <el-tree
      :data="resourceLists"
      show-checkbox
      node-key="treeId"
      ref="tree"
      :default-checked-keys="checkedKeys"
      :expand-on-click-node="false"
      highlight-current
      class="author"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.text}}</span>
      </span>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeAuthor">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitAuthor(characterLists.id,resourceIds)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      resourceIds: []
    };
  },
  props: {
    resourceLists: {
      type: Array,
      default: () => []
    },
    characterLists: {
      type: Object,
      default: () => {}
    },
    author: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    closeAuthor() {
      this.$emit("closeAuthor");
    },
    submitAuthor(id, treeIdArr) {
      treeIdArr = this.$refs.tree.getCheckedKeys();
      this.$emit("submitAuthor", id, treeIdArr);
    }
  }
};
</script>
<style lang='scss' scope>
.author {
  max-height: 350px;
  overflow-y: scroll;
}
</style>