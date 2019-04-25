<template>
  <div class="question-list">
    <question-list-search @searchQuestion="searchQuestion"/>
    <el-button size="small" type="primary" class="add-queston">新增试题</el-button>
    <el-table :data="questionList" :stripe="true" size="small" :border="true">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="试题名称" width="180"></el-table-column>
      <el-table-column prop="difficulty" label="难易程度" width="180">
        <template slot-scope="props">
          <span>{{props.row.difficulty|questionDifficultyFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="试题类型">
        <template slot-scope="props">
          <span>{{props.row.type| questionTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="question_main" label="试题题干"></el-table-column>
      <el-table-column prop="created_at" label="创建时间">
      
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="props">
          <span>
            <el-button type="text" size="small" @click="handleDetail(props.row)">详情</el-button>
            <el-button type="danger" size="small" @click="handleDel(props.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-end"
      background
      layout="total, prev, pager, next"
      :total="totalNum"
      small
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getQuestionListApi, delQuestionApi, getQuestionApi } from "../api.js";
import { questionBasicModel } from "../model/questionBasicModel";
import QuestionListSearch from "../components/question.list.search.vue";
import { getQueryParams } from "../../../../utils/functions/objFunc";
import "../styles/question-list.scss";
import moment from "moment";
export default Vue.extend({
  name: "QuestionList",
  data: function() {
    return {
      questionList: [],
      queryParams: {},
      currentPage: 1,
      totalNum: 0
    };
  },
  components: { QuestionListSearch },
  mounted: function() {
    this.getQuestionList({ page: 1 });
  },
  methods: {
    getQuestionList(params) {
      const queryParams = {
        ...params,
        ...this.queryParams,
        pageSize: 10
      };
      getQuestionListApi(queryParams).then(success => {
        if (success.status === 200) {
          this.questionList = success.data.questions.map(item => {
            return Object.assign({}, item, {
              created_at: moment(item.created_at).utc().zone(0).format("YYYY-MM-DD HH:mm:ss")
            });
          });
          this.totalNum = success.data.total;
        }
      });
    },
    searchQuestion(searchForm) {
      this.queryParams = getQueryParams(searchForm);
      this.getQuestionList({ page: 1 });
    },
    handleDetail(question) {
      getQuestionApi(question.id).then(getData => {
        console.log(getData.data, "data");
      });
    },

    handleDel(question) {
      this.$confirm(`确定删除试题${question.name}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delQuestionApi(question.id)
            .then(getData => {
              if (getData.status === 200) {
                this.getQuestionList({ page: this.currentPage });
              }
            })
            .catch(error => this.$message("出现错误"));
        })
        .catch(() => {
          return;
        });
    }
  },
  filters: {
    questionTypeFilter(type) {
      if (type) {
        const typeObj = questionBasicModel.typeModel.find(
          item => item.value == type
        );
        if (typeObj) {
          return typeObj.label;
        }
      }
    },
    questionDifficultyFilter(difficulty) {
      if (difficulty) {
        const difficultyObj = questionBasicModel.difficultyModel.find(
          item => item.value == difficulty
        );
        return difficultyObj && difficultyObj.label;
      }
    }
  }
});
</script>

