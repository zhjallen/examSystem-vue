<template>
  <div class="basic">
    <el-form
      label-suffix=":"
      size="small"
      label-width="100px"
      ref="basicInfo"
      :rules="basicFormRules"
      :model="basicForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item :label="'名称'" prop="name">
            <el-input :clearable="true" v-model="basicForm.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'试题类型'" prop="type" v-model="basicForm.type">
            <el-select v-model="basicForm.type" @change="typeChange">
              <template v-for="item in typeModel">
                <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'试题难度'" prop="difficulty">
            <el-select v-model="basicForm.difficulty">
              <template v-for="item in difficultyModel">
                <el-option :key="item.value" :value="item.value" :label="item.label"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="试题题干" prop="question_main">
            <el-input :clearable="true" v-model="basicForm.question_main" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { questionBasicModel } from "../model/questionBasicModel";
export default Vue.extend({
  name: "QuestionBasic",
  data: function() {
    return {
      typeModel: questionBasicModel.typeModel,
      difficultyModel: questionBasicModel.difficultyModel,
      basicForm: {
        name: "",
        type: 1,
        difficulty: 1,
        question_main: "",
        status: 1
      },
      basicFormRules: {
        name: [
          { required: true, message: "请输入试题名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "请选择试题类型", trigger: "change" }
        ],
        difficulty: [
          {
            required: true,
            message: "请选择试题难度",
            trigger: "change"
          }
        ],
        question_main: [
          { required: true, message: "请输入试题题干", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],

        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    typeChange() {
      //   console.log(this.basicForm.type, "basicType");
      this.$emit("typeChange", this.basicForm.type);
    },
    save() {
      let basicInfo = {};
      this.$refs.basicInfo.validate(valid => {
        if (valid) {
          basicInfo = this.basicForm;
        } else {
          console.log("error");
          basicInfo = false;
        }
      });
      return basicInfo;
    }
  }
});
</script>

