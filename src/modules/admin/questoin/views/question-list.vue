<template>
  <div class="question-list">
    <question-list-search @searchQuestion="searchQuestion"/>
    <el-button size="small" type="primary" class="add-queston" @click="enterAddQuestion">新增试题</el-button>
    <el-table :data="questionList" :stripe="true" size="small" :border="true" class="header-table">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
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
      <el-table-column prop="score" label="分数" width="80"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
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
    <el-dialog :visible.sync="isShowDetail" title="试题详情">
      <!-- <slot name="title">
        <span>试题详情</span>
      </slot>-->
      <question-detail :questionDetail="questionInfo"/>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import QuestionDetail from "./question.detail.vue";
import { getQuestionListApi, delQuestionApi, getQuestionApi } from "../api.js";
import { questionBasicModel } from "../model/questionBasicModel";
import QuestionListSearch from "../components/question.list.search.vue";
import { getQueryParams } from "../../../../utils/functions/objFunc";
import * as questionFunc from "../func";
import "../styles/question-list.scss";
import moment from "moment";
export default Vue.extend({
  name: "QuestionList",
  data: function() {
    return {
      questionList: [],
      queryParams: {},
      currentPage: 1,
      totalNum: 0,
      isShowDetail: false,
      questionInfo: {}
    };
  },
  components: { QuestionListSearch, QuestionDetail },
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
              created_at: moment(item.created_at)
                .utc()
                .zone(0)
                .format("YYYY-MM-DD HH:mm:ss")
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
        if (getData.status === 200) {
          console.log(getData.data, "ddddddddd");
          const questionInfo = getData.data;
          const questionBasicInfo = {
            ...questionInfo,
            type: questionFunc.getQuestionType(questionInfo.type),
            difficulty: questionFunc.getQuestionDifficulty(
              questionInfo.difficulty
            )
          };
          this.questionInfo = questionBasicInfo;
          this.isShowDetail = true;
        }
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
    },
    enterAddQuestion() {
      this.$router.push("/admin/question/add");
    }
  },
  filters: {
    questionTypeFilter(type) {
      return questionFunc.getQuestionType(type);
    },
    questionDifficultyFilter(difficulty) {
      return questionFunc.getQuestionDifficulty(difficulty);
    }
  }
});
</script>

