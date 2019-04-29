<template>
  <div class="question-detail">
    <el-form
      :inline="true"
      label-suffix=":"
      label-position="right"
      size="small"
      label-width="100px"
    >
      <el-row>
        <template v-for="item in formArr">
          <el-col
            :span="24"
            :key="item.key"
            v-if="item.key==='options'&&[1,2].includes(optionsObj.type)"
          >
            <el-form-item class="options" label="选项设置">
              <!-- <span>{{optionsObj.type}}</span> -->
              <template v-for="option in optionsObj.options">
                <div class="question-option" :key="option.id">
                  <span>{{option.name}}</span>
                  <span>{{option.content}}</span>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24" :key="item.key" v-else-if="item.key==='answer'">
            <el-form-item class="options" label="试题答案">
              <span>{{optionsObj.answer}}</span>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.key!=='options'" :key="item.key" :span="24">
            <create-form-item :item="item" :formModel="questionDetail"/>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { questionBasicModel } from "../model/questionBasicModel";
import CreateFormItem from "../../../../components/common/tools/createFormItem.vue";
import "../styles/question.detail.scss";
export default Vue.extend({
  name: "QuestionDetail",
  data: function() {
    return {
      formArr: questionBasicModel.basicFormArr.map(item => {
        item.disabled = true;
        return item;
      })
    };
  },
  props: {
    questionDetail: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    optionsObj: function() {
      const { options, type } = this.questionDetail;
      let answer = "";
      if ([1, 2].includes(type)) {
        options.forEach(option => {
          if (option.isRight === 1) {
            answer += option.name;
          }
        });
      } else if (type === 3 && options.length > 0) {
        answer = options[0].name;
      } else if (type === 5 && options.length > 0) {
        answer = options[0].content;
      }
      return {
        options,
        answer,
        type
      };
    }
  },
  components: { CreateFormItem }
});
</script>

