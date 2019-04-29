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
          <el-col :span="24" :key="item.key" v-if="item.key==='options'">
            <el-form-item label="选项设置"></el-form-item>
          </el-col>
          <el-col v-else :key="item.key" :span="24">
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
  components: { CreateFormItem }
});
</script>

