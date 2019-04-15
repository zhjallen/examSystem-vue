<template>
  <div class="question-detail">
    <template v-if="questionType===1">
      <div class="add-option">
        <el-button size="small">增加选项</el-button>
      </div>
      <div class="options">
        <el-form label-width="100px" label-suffix=":">
          <el-form-item label="选项设置">
            <template v-for="item in type1Model.options">
              <div :key="item.key" class="option">
                <el-radio v-model="type1Model.radioModel" :label="item.key">选项{{item.key}}</el-radio>
                <el-input></el-input>
                <i class="el-icon-close"></i>
              </div>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template v-if="questionType===2">
      <div class="add-option">
        <el-button size="small">增加选项</el-button>
      </div>
      <div class="options">
        <el-form label-width="100px" label-suffix=":">
          <el-form-item label="选项设置">
            <el-radio v-model="type3radio" :label="true">正确</el-radio>
            <el-radio v-model="type3radio" :label="false">错误</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template v-if="questionType===3">
      <el-form label-width="100px" label-suffix=":">
        <el-form-item label="答案设置">
          <el-radio v-model="type3radio" :label="true">正确</el-radio>
          <el-radio v-model="type3radio" :label="false">错误</el-radio>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "QuestionDetail",
  data: function() {
    return {
      type3radio: true,
      type1Model: {
        radioModel: "",
        options: [
          {
            selected: false,
            content: "",
            key: "A"
          },
          {
            selected: false,
            content: "",
            key: "B"
          },
          {
            selected: false,
            content: "",
            key: "C"
          },
          {
            selected: false,
            content: "",
            key: "D"
          }
        ]
      }
    };
  },
  props: {
    questionType: {
      type: Number,
      default: 1,
      required: true
    }
  }
});
</script>

