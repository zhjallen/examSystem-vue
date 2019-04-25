<template>
  <div class="question-list-search light-border">
    <el-form
      :model="searchForm"
      ref="questinSearchForm"
      label-width="100px"
      label-suffix=":"
      size="small"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="试题名称" prop="name">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难易程度" prop="difficulty">
            <el-select v-model="searchForm.difficulty" clearable>
              <template v-for="item in difficultyModel">
                <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型" prop="type">
            <el-select v-model="searchForm.type" clearable>
              <template v-for="item in typeModel">
                <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="button">
          <el-button type="primary" size="small" @click="searchQuestion">查询</el-button>
          <el-button size="small" @click="resetSearch">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { questionBasicModel } from "../model/questionBasicModel";
export default Vue.extend({
  name: "QuestionListSearch",
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
      console.log(this.searchForm, "searchform");
      this.$emit("searchQuestion", this.searchForm);
    },
    resetSearch() {
      this.$refs["questinSearchForm"].resetFields();
    }
  }
});
</script>

