<template>
  <div class="question-list">
    <el-form label-width="120" :inline="true" label-suffix=":" size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button size="small" type="primary" class="add-queston">新增试题</el-button>
    <el-table :data="questionList" :stripe="true" size="small" :border="true">
      <el-table-column prop="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="题目名称" width="180"></el-table-column>
      <el-table-column prop="difficulty" label="难易程度" width="180"></el-table-column>
      <el-table-column prop="type" label="试题类型"></el-table-column>
      <el-table-column prop="question_main" label="试题题干"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="props">
          <span>
            <el-button type="text" size="small" @click="handleDetail(props.row)">详情</el-button>
            <el-button type="danger" size="small" @click="handleDel(props.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" small></el-pagination>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getQuestionListApi } from "../api.js";
import "../styles/question-list.scss";
export default Vue.extend({
  name: "QuestionList",
  data: function() {
    return {
      questionList: []
    };
  },
  mounted: function() {
    this.getQuestionList();
  },
  methods: {
    getQuestionList() {
      getQuestionListApi({}).then(success => {
        console.log(success);
        if (success.status === 200) {
          this.questionList = success.data;
        }
      });
    },
    handleDetail(question) {},
    handleDel(question) {
        this.$confirm()
    }
  }
});
</script>

