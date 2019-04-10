<template>
  <div class="agent-list">
    <el-form
      :inline="true"
      ref="searchForm"
      class="search-form"
      :model="searchModel"
      label-width="120px"
      label-position="right"
      size="small"
      label-suffix=":"
    >
      <el-row>
        <template v-for="formItem in agentSeachModel">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="searchModel"></create-form-item>
          </el-col>
        </template>
        <el-col :span="6" class="search-col">
          <el-button size="small" icon="el-icon-search" type="primary">查询</el-button>
          <el-button size="small" icon="el-icon-refresh" @click="resetForm('searchForm')">清空</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="add">
      <el-button type="primary" size="small" @click="addAgent()">新增</el-button>
    </div>
    <el-table
      :data="agentList"
      row-key="agentCode"
      stripe
      header-row-class-name="header-table"
      :highlight-current-row="true"
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="agentCode" label="代理商编码"></el-table-column>
      <el-table-column prop="agentName" label="代理商名称"></el-table-column>
      <el-table-column prop="firstContact" label="第一联系人"></el-table-column>
      <el-table-column prop="firstContactPost" label="级别"></el-table-column>
      <el-table-column prop="firstContactMobile" label="电话号码"></el-table-column>
      <el-table-column prop="registeredAddress" label="注册地址"></el-table-column>
      <el-table-column prop="agentLevel" label="级别"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      small
      layout="total ,prev, pager, next, jumper"
      :total="100"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import "../styles/agent.list.scss";
import CreateFormItem from "../../../components/common/tools/createFormItem.vue";
import { agentSeachModel } from "../models/agent.list.search";
export default Vue.extend({
  name: "AgentList",
  data: function() {
    return {
      agentList: [
        {
          agentCode: "001",
          agentName: "test",
          firstContact: "hx",
          firstContactMobile: "12345678900",
          agentArea: "陕西/西安",
          firstContactPost: "经理",
          registeredAddress: "陕西省西安市",
          agentLevel: "一级"
        }
      ],
      searchModel: {},
      agentSeachModel: agentSeachModel
    };
  },
  components: {
    CreateFormItem
  },
  methods: {
    addAgent() {
      this.$router.push("/agent/add");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(index, row) {
      this.$router.push(`/agent/edit/${row.agentCode}`);
    },
    handleDetail(index, row) {
      this.$router.push(`/agent/detail/${row.agentCode}`);
    }
  },
  created: function() {
    const searchModel = {};

    agentSeachModel.map(item => {
      searchModel[item.key] = "";
      //   basicFormRules[item.key] = item.options.rules;
      //   if (item.elementType === "select") {
      //     item.selectOptions = selectOptions[item.key];
      //   }
    });

    this.searchModel = searchModel;

    console.log(searchModel, agentSeachModel, "iddd");
  }
});
</script>
