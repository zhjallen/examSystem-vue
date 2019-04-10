<template>
  <div>
    <el-tree
      ref="tree"
      :data="treeData"
      node-key="id"
      :render-content="handleRenderNode"
      :accordion="false"
      :default-expanded-keys="expandedKeys"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "ResouceTree",
  props: {
    treeData: {
      type: Array,
      required: true,
      default: () => {
        [];
      }
    },
    expandedKeys: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    consoleData() {
      console.log(this.$props, "props");
    },
    handleNodeClick(item, node, el) {
      this.$emit("onClickNode", item, node, el);
    },
    handleRenderNode(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {this.$refs.tree.getCurrentNode() &&
            data.id === this.$refs.tree.getCurrentNode().id && (
              <span
                class="select-node"
                style={{
                  backgroundColor: "#6d89ee",
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  right: "3px",
                  top: "3px",
                  borderRadius: "10px"
                }}
              />
            )}
        </span>
      );
    }
  }
});
</script>
<style lang="scss" scoped>
.custom-tree-node {
  position: relative;
}
</style>


