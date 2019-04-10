<template>
  <div class="resource-list">
    <div class="resource-tree">
      <VuePerfectScrollbar class="scroll-area" :settings="scrollOption">
        <el-select
          class="system-list"
          size="small"
          v-model="selectedSystemId"
          v-on:change="systemChange"
        >
          <el-option v-for="item in systemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
        <resouce-tree
          :expandedKeys="expandedKeys"
          :treeData="resourceList"
          v-on:onClickNode="onClickNode"
        ></resouce-tree>
      </VuePerfectScrollbar>
    </div>
    <div class="resource-detail">
      <resource-detail
        :selectedNode="selectedNode"
        :selectedSystemId="String(selectedSystemId)"
        v-on:onDelNode="delNode"
        v-on:getResourceList="getResourceList"
      />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import ResouceTree from "../components/resource.tree.vue";
import ResourceDetail from "../components/resource.detail.vue";
import "../styles/resourceList.scss";
import { getResourceApi, delNodeById, getSystemApi } from "../api.js";
import { getResourceListTree, getResourceListOjb } from "../function";
export default Vue.extend({
  name: "ResourceList",
  components: {
    VuePerfectScrollbar,
    ResouceTree,
    ResourceDetail
  },
  data: function() {
    return {
      scrollOption: {
        suppressScrollX: true
      },
      resourceList: [],
      selectedNode: {}, // 选择的节点
      resourceObj: {}, // 资源对象
      systemList: [],
      selectedSystemId: "",
      expandedKeys: [],
      selectKey: ""
    };
  },
  mounted: function() {
    // this.getResourceList();
    console.log("resource");
    this.getSystemList();
  },
  methods: {
    getSystemList() {
      getSystemApi().then(sucessData => {
        if (sucessData.status === 200) {
          this.systemList = sucessData.data.data.filter(
            item => item && item.id
          );
          this.selectedSystemId = this.systemList[0].id;
          this.getResourceList();
        }
      });
    },
    getResourceList() {
      getResourceApi(this.selectedSystemId)
        .then(successData => {
          console.log(successData, "data");
          this.resourceObj = getResourceListOjb(successData.data.data);
          this.resourceList = getResourceListTree(this.resourceObj);
        })
        .catch(error => {
          console.log(error);
        });
    },
    systemChange(selectedSystemID) {
      console.log(selectedSystemID, "sytmet");
      this.getResourceList(selectedSystemID);
    },
    onClickNode(nodeItem, node, nodeComponent) {
      if (node.expanded) {
        this.expandedKeys.push(nodeItem.id);
      } else {
        this.expandedKeys = this.expandedKeys.filter(id => id !== nodeItem.id);
      }
      console.log(this.expandedKeys, "expandedKeys");
      this.selectedNode = nodeItem;
    },
    delNode() {
      const delResourceId = this.selectedNode.id;
      delNodeById(delResourceId)
        .then(successData => {
          debugger;
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //todo 不要重新获取直接操作数据 此时需要注意子节点也要删除
          //this.getResourceList()

          // Object.keys(this.resourceObj).map(key => {
          //   if (this.resourceObj[key].parentId === delResourceId) {
          //     delete this.resourceObj[key];
          //   }

          // });
          //  delete this.resourceObj[delResourceId];
          this.getResourceList();
          this.selectedNode = {};
        })
        .catch(error => {});
    },
    handleData() {
      console.log(this.resourceList, "resourcelist");
    }
  }
});
</script>

