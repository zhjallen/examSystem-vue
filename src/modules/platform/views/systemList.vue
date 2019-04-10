<template>
  <div class="systemlist">
    <el-form
      label-width="80px"
      ref="formSystemSearch"
      size="small"
      label-suffix=":"
      :model="formSystemSearch"
      class="light-border"
    >
      <el-row v-on:keyup.enter.native="onSubmit">
        <el-col :span="6">
          <el-form-item label="系统编号" prop="code">
            <el-input v-model="formSystemSearch.code" placeholder="系统编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="系统名称" prop="name">
            <el-input v-model="formSystemSearch.name" placeholder="系统名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="reset('formSystemSearch')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <nav-button class="operation-button">
      <el-button-group>
        <el-button
          size="mini"
          type="primary"
          icon="icon-add-new"
          v-on:click="showAddSystemFunc(true)"
        >新增系统</el-button>
      </el-button-group>
    </nav-button>
    <common-content size="small" :flex="200">
      <template>
        <el-table :highlight-current-row="true" :data="systemList" row-key="id" stripe header-row-class-name="header-table">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="code" label="系统编号"></el-table-column>
          <el-table-column prop="name" label="系统名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template >
        <el-pagination
          background
          small
          class="resource-pagination"
          layout="total, prev, pager, next"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="handlePageChange"
        ></el-pagination>
      </template>
    </common-content>
    <add-system
      :usedPage="usedPage"
      :show="showAddSystem"
      :initObj="editSystemObj"
      v-on:addCancle="showAddSystemFunc(false)"
      v-on:addSystem="addSystem"
    ></add-system>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import "../styles/system.list.scss";
import { getSystemList, addSystem, delSystem, updateSystem } from "../api.js";
import CommonTable from "../../../components/commonTable/index.vue";
import CommonContent from "../../../components/commonContent.vue";
import NavButton from "../../../components/navButton/index.vue";
import AddSystem from "../components/addSystem.vue";

export default Vue.extend({
  name: "SystemList",
  data: function() {
    return {
      systemList: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      showAddSystem: false,
      usedPage: "add",
      editSystemObj: {},
      formSystemSearch: {
        code: "",
        name: ""
      },
      defaultPageSearch: {
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  components: {
    CommonTable,
    NavButton,
    AddSystem,
    CommonContent
  },
  mounted: function() {
    this.getList(this.defaultPageSearch);
  },
  methods: {
    getList(params) {
      getSystemList(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.systemList = sucessData.data.data.list;
            this.pagination = {
              ...this.pagination,
              total: sucessData.data.data.total
            };
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    handleEdit(index, row) {
      this.usedPage = "edit";
      this.editSystemObj = row;
      this.showAddSystemFunc(true);
    },
    handleDelete(index, row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSystem(row.id).then(successData => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.onSubmit();
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    handlePageChange() {},
    showAddSystemFunc(isShow) {
      this.showAddSystem = isShow;
    },
    addSystem(data) {
      if (this.usedPage === "add") {
        addSystem({ ...data, platformId: 1 })
          .then(sucessData => {
            if (sucessData.status === 200) {
              this.showAddSystemFunc(false);
              this.onSubmit();
            }
          })
          .catch(error => {
            // todo 错误处理
            // this.showAddSystemFunc(false);
          });
      } else if (this.usedPage === "edit") {
        updateSystem({ ...this.editSystemObj, ...data })
          .then(successData => {
            if (successData.status === 200) {
              this.showAddSystemFunc(false);
              this.onSubmit();
              this.usedPage = "add";
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    onSubmit() {
      this.getList({ ...this.formSystemSearch, ...this.defaultPageSearch });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    // handleheaderStyle({row, rowIndex}){
    //   return {"background-color":"#EEEEEE"}
    // }
  }
});
</script>
