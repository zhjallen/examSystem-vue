<template>
  <div class="question-list-config">
    <VuePerfectScrollbar>
      <div>从题库中筛选试题加入到当前试卷</div>
      <div class="question-search">
        <el-form :model="searchForm" ref="questinSearchForm" label-suffix=":" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="name">
                <el-input v-model="searchForm.name" placeholder="试题名称"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="难易程度" prop="difficulty">
                <el-select v-model="searchForm.difficulty" clearable>
                  <template v-for="item in difficultyModel">
                    <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item prop="type">
                <el-select v-model="searchForm.type" clearable placeholder="类型">
                  <template v-for="item in typeModel">
                    <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="button">
              <el-button type="primary" size="small" @click="searchQuestion">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="list">
        <template v-for="question in questions">
          <div class="question-item" :key="question.id">
            <span>{{question.question_main}}</span>
            <el-button size="mini" round @click="onContentAddQuestion(question)">加入考试</el-button>
          </div>
        </template>
      </div>
      <div class="pagination">
        <el-pagination small background layout="total, prev, pager, next" :total="totalNum"/>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { questionBasicModel } from "../../questoin/model/questionBasicModel";
export default Vue.extend({
  name: "TestConfigQuestionList",
  components: { VuePerfectScrollbar },
  props: {
    questions: {
      type: Array,
      default: () => [],
      required: true
    },
    totalNum: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      typeModel: questionBasicModel.typeModel,
      difficultyModel: questionBasicModel.difficultyModel,
      searchForm: {
        name: "",
        type: "",
        difficulty: ""
      }
    };
  },
  methods: {
    searchQuestion() {
      this.$emit("getQuestionList", { ...this.searchForm, page: 1 });
    },
    onContentAddQuestion(question) {
      this.$emit("contentAddQuestion", question);
    }
  }
});
</script>

