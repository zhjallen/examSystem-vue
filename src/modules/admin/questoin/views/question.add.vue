<template>
  <div class="question-add">
    <question-basic ref="basicInfo" v-on:typeChange="questionTypeChange"/>
    <question-detail :questionType="questionType"/>
    <div class="opetation">
      <el-button type="primary" size="small" @click="confirmAdd">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import QuestionBasic from "../components/question.basic.vue";
import QuestionDetail from "../components/question.detail.vue";
import { addQuestionApi } from "../api.js";
export default Vue.extend({
  name: "QuestionAdd",
  components: {
    QuestionBasic,
    QuestionDetail
  },
  data: function() {
    return {
      questionType: 1
    };
  },
  methods: {
    confirmAdd() {
      // console.log(this.$refs["basicInfo"].save());
      const basicInfo =this.$refs["basicInfo"].save();
      console.log(basicInfo,"basicino")
      if (basicInfo) {
        addQuestionApi(basicInfo);
      }
    },
    questionTypeChange(questionType) {
      console.log(questionType, "type");
      this.questionType = questionType;
    }
  }
});
</script>


