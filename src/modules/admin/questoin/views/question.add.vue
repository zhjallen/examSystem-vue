<template>
  <div class="question-add">
    <question-basic ref="basicInfo" v-on:typeChange="questionTypeChange"/>
    <question-detail ref="detailInfo" :questionType="questionType"/>
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
import "../styles/question.add.scss";
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
      const basicInfo = this.$refs["basicInfo"].save();
      if (basicInfo) {
        const detailOptions = this.$refs["detailInfo"].saveOptions();
        console.log(basicInfo, detailOptions, "basicino");
        addQuestionApi({ basicInfo, options: detailOptions }).then(
          getData => {
            console.log(getData, "add");
          }
        );
      }

      // if (basicInfo) {
      //   addQuestionApi(basicInfo);
      // }
    },
    questionTypeChange(questionType) {
      console.log(questionType, "type");
      this.questionType = questionType;
    }
  }
});
</script>


