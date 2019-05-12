<template>
  <div class="test-config">
    <h5>考试详情配置，创建考试章节，并向章节中添加试题</h5>
    <div class="layout">
      <div class="test-config-basic">
        <test-config-basic :testInfo="initTest"/>
        <el-button size="mini" @click="onAddContent">新增章节</el-button>
        <test-config-content :contents="contents" ref="testContents"/>
        <div class="operation">
          <el-button size="mini" type="primary" @click="onConfigTest">提交</el-button>
          <el-button size="mini">取消</el-button>
        </div>
      </div>
      <test-config-question-list
        :questions="questions"
        @getQuestionList="getQuestionList"
        @contentAddQuestion="onContentAddQuestion"
        :totalNum="totalNum"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import TestConfigBasic from "../components/test.config.basic.vue";
import TestConfigContent from "../components/test.config.content.vue";
import TestConfigQuestionList from "../components/test.config.question.list.vue";
import { getQuestionListApi } from "../../../../utils/api/question";
import "../styles/test.config.scss";
export default Vue.extend({
  name: "TestConfig",
  computed: {
    ...mapGetters(["testInfo"]),
    initTest: function() {
      return this.testInfo.test;
    }
  },
  data: function() {
    return {
      contents: [
        {
          name: "",
          desc: "",
          questions: [],
          sort: 1,
          key: 1,
          isActive: true
        }
      ],
      questions: [],
      queryParams: {},
      currentPage: 1,
      totalNum: 0
    };
  },
  components: { TestConfigBasic, TestConfigContent, TestConfigQuestionList },
  methods: {
    onConfigTest() {
      this.$refs["testContents"]
        .getTestContents()
        .then(success => {
          console.log(success, "success");
          if (success) {
            console.log(this.contents, "contents");
          }
        })
        .catch(error => {
          console.log(error, "eror");
        });
    },
    onAddContent() {
      const lastContent = this.contents[this.contents.length - 1];
      this.contents.push({
        name: "",
        desc: "",
        questions: [],
        sort: lastContent.sort + 1,
        key: lastContent.key + 1,
        isActive: true
      });
    },
    getQuestionList(params) {
      const queryParams = {
        ...params,
        ...this.queryParams,
        pageSize: 10
      };
      getQuestionListApi(queryParams).then(success => {
        console.log(success, "questionsuccess");
        if (success.status === 200) {
          this.questions = success.data.questions;
          this.totalNum = success.data.total;
        }
      });
    },
    onContentAddQuestion(question) {
      const activeContent = this.contents.filter(
        content => content.isActive
      )[0];
      console.log(activeContent, "acite");
      activeContent.questions.push(question);
    }
  },
  mounted: function() {
    this.getQuestionList({ page: 1 });
  }
});
</script>

