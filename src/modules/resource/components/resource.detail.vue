<template>
  <div>
    <el-row class="resource-operation">
      <template v-if="isShowEditAndDel">
        <el-button size="mini" type="primary" @click="editNode">编辑</el-button>
        <el-button size="mini" type="danger" @click="delNode">删除</el-button>
      </template>
      <el-button size="mini" @click="addChild">添加子节点</el-button>
    </el-row>
    <el-row class="row-detail light-border">
      <template v-for="item in resourceDetailModel">
        <template v-if="item.propName==='systemName'">
          <el-col class="col-detail" :key="item.propName" :span="item.span||6">
            <span class="label">{{item.label}}：</span>
            <span class="value">{{initData.system && initData.system.name}}</span>
          </el-col>
        </template>
        <template v-else>
          <el-col class="col-detail" :key="item.propName" :span="item.span||6">
            <span class="label">{{item.label}}：</span>
            <span class="value">{{initData[item.propName]}}</span>
          </el-col>
        </template>
      </template>
    </el-row>
    <add-system
      :show="isShowModal"
      :usedPage="usedPage"
      :initObj="editNodeObj"
      v-on:OnEditNode="editNodeConfirm"
      v-on:OnAddNode="addNodeConfirm"
      v-on:addCancle="addCancle"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { resourceDetailModel } from "../model";
import "../styles/resource.detail.scss";
import AddSystem from "./resource.add.vue";
import { getDetailById, editNodeApi, addNodeApi } from "../api.js";

export default Vue.extend({
  name: "ResourceDetail",
  data: function() {
    return {
      // selectedNode: {}
      initData: {
        id: "",
        system: {}
      },
      resourceDetailModel: resourceDetailModel,
      isShowModal: false,
      editNodeObj: {},
      usedPage: "edit",
      isShowEditAndDel: false
    };
  },
  components: {
    AddSystem
  },
  props: {
    selectedNode: {
      type: Object,
      required: true,
      default: {}
    },
    selectedSystemId:{
      type:String
    }
  },
  watch: {
    selectedNode(selectedNode) {
      console.log(selectedNode, "selectNode");
      this.initData = selectedNode;
      this.getNodeDetail();
      if (this.initData.id.includes("SYSTEM")) {
        this.isShowEditAndDel = false;
      } else {
        this.isShowEditAndDel = true;
      }
    }
  },
  methods: {
    getNodeDetail() {
      if (this.selectedNode && this.selectedNode.parentId)
        getDetailById(this.selectedNode.id)
          .then(successData => {
            if (successData.status === 200) {
              this.initData = successData.data.data;
              console.log(this.initData, "sucess");
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    delNode() {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("onDelNode");
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    editNode() {
      console.log(this.initData, "selectedNode");
      if (!this.initData.id) {
        this.$alert("请先选择需要编辑的资源");
        return;
      }
      this.isShowModal = true;
      this.editNodeObj = this.initData;
    },
    editNodeConfirm(formData) {
      editNodeApi({
        ...formData,
        id: this.editNodeObj.id,
        parentId: this.editNodeObj.parentId,
        systemId: this.editNodeObj.systemId
      })
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.getNodeDetail();
            this.isShowModal = false;
            this.editNodeObj = {};
            // 只有在名称变化时重新获取
            if (formData.name !== this.editNode.name) {
              this.$emit("getResourceList");
            }
          }
          console.log(sucessData, "successData");
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    addNodeConfirm(formData) {
      debugger;
      if(this.editNodeObj.systemId){
       this.editNodeObj.systemId=this.editNodeObj.systemId
      }else{
        this.editNodeObj.id='',
        this.editNodeObj.systemId=Number(this.selectedSystemId) 
      }
      addNodeApi({
        ...formData,
        parentId: this.editNodeObj.id,
        systemId: this.editNodeObj.systemId
      }).then(successData => {
        console.log(successData, "successdata");
        if (successData.data.code === 200) {
          this.isShowModal = false;
          this.$emit("getResourceList");
        }
      });
    },
    addChild() {
      if (!this.initData.id) {
        this.$alert("请先选择父节点");
        return;
      }
      this.usedPage = "add";
      this.isShowModal = true;
      this.editNodeObj = this.initData;
      console.log(this.editNodeObj.id, "idddddddddd");
    },
    addCancle() {
      this.isShowModal = false;
      this.editNodeObj = {};
    }
  }
});
</script>

