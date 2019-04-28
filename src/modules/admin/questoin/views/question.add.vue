<template>
  <div class="question-add">
    <question-basic ref="basicInfo" v-on:typeChange="questionTypeChange"/>
    <question-detail ref="detailInfo" :questionType="questionType"/>
    <div class="anwser">
      <el-form label-width="100px" label-suffix=":">
        <el-row>
          <el-col :span="20">
            <el-form-item label="答案解析">
              <el-input v-model="answerKey" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
      questionType: 1,
      answerKey: ""
    };
  },
  methods: {
    confirmAdd() {
      // console.log(this.$refs["basicInfo"].save());
      const basicInfo = this.$refs["basicInfo"].save();
      if (basicInfo) {
        const detailOptions = this.$refs["detailInfo"].saveOptions();
        addQuestionApi({
          basicInfo: { ...basicInfo, answerKey: this.answerKey },
          options: detailOptions
        }).then(getData => {
          console.log(getData, "add");
          if (getData.status === 201) {
            this.$message({
              type: "success",
              message: "新增试题成功"
            });
           this.closeTag(this.$route);
          }
        });
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


