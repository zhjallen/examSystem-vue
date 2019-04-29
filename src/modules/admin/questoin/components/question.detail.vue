<template>
  <div class="question-detail">
    <template v-if="questionType===1">
      <div class="add-option">
        <el-button size="small" @click="addOption(1)">增加选项</el-button>
      </div>
      <div class="options">
        <el-form label-width="100px" label-suffix=":">
          <el-form-item label="选项设置">
            <template v-for="item in type1Model.options">
              <div :key="item.key" class="option">
                <el-radio v-model="type1Model.radioModel" :label="item.key">选项{{item.key}}</el-radio>
                <el-input v-model="item.content"></el-input>
                <i class="el-icon-close" @click="delOption(1,item)"></i>
              </div>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template v-if="questionType===2">
      <div class="add-option">
        <el-button size="small" @click="addOption(2)">增加选项</el-button>
      </div>
      <div class="options">
        <el-form label-width="100px" label-suffix=":">
          <el-form-item label="选项设置">
            <template v-for="item in type2Model.options">
              <div :key="item.key" class="option">
                <el-checkbox v-model="item.selected" :label="item.key">选项{{item.key}}</el-checkbox>
                <el-input v-model="item.content"></el-input>
                <i class="el-icon-close" @click="delOption(2,item)"></i>
              </div>
            </template>
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
    <template v-if="questionType===5">
      <el-form ref="questionAndAnswer" :model="type5Model" label-width="100px" label-suffix=":">
        <el-form-item
          label="答案设置"
          prop="content"
          :rules="[{ required: true, message: '请输入试题答案', trigger: 'blur' }]"
        >
          <el-input v-model="type5Model.content" type="textarea"/>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { delQuestionApi } from "../api";
export default Vue.extend({
  name: "QuestionDetail",
  data: function() {
    return {
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
      },
      type2Model: {
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
      },
      type3radio: true,
      type5Model: {
        content: ""
      }
    };
  },
  props: {
    questionType: {
      type: Number,
      default: 1,
      required: true
    }
  },
  methods: {
    addOption(type) {
      const model = this[`type${type}Model`];
      console.log(model, this);
      const length = model.options.length;
      if (length >= 10) {
        this.$message({
          message: "最多可以增加10个选项",
          type: "warning"
        });
        return;
      } else {
        const lastAscii = model.options[length - 1].key.charCodeAt();
        model.options.push({
          selected: false,
          content: "",
          key: String.fromCharCode(lastAscii + 1)
        });
        // this[`type${type}Model`] = model;
      }
    },
    delOption(type, item) {
      const model = this[`type${type}Model`];
      model.radioModel = null;
      if (type === 1) {
        if (model.options.length > 2) {
          const findIndex = model.options.findIndex(
            option => option.key === item.key
          );
          if (findIndex >= 0) {
            model.options.splice(findIndex, 1);
          }
        } else {
          this.$message({
            message: "至少需要2个选项",
            type: "warning"
          });
          return;
        }
        // const model = this[`type${type}Model`];
      }
    },
    saveOptions() {
      const detailModel = this[`type${this.questionType}Model`];
      switch (this.questionType) {
        case 1:
          if (!detailModel.radioModel) {
            this.$message({
              type: "error",
              message: "至少选择一项"
            });
            return;
          } else {
            return detailModel.options.map(item => {
              return Object.assign({}, item, {
                name: `选项${item.key}`,
                isRight: item.key === detailModel.radioModel ? 1 : 0
              });
            });
          }
        case 2:
          const selectedOptions = detailModel.options.filter(
            item => item.selected === true
          );
          if (selectedOptions.length < 1) {
            this.$message({
              type: "error",
              message: "至少需要选择一项"
            });
            return;
          } else {
            return detailModel.options.map(item => {
              return Object.assign({}, item, {
                name: `选项${item.key}`,
                isRight: item.selected ? 1 : 0
              });
            });
          }
        case 3:
          const option = {
            name: "正确",
            isRight: 1
          };
          if (!this.type3radio) {
            option.name = "错误";
          }
          return [option];
        case 5:
          let questionAndAnswerOptions = [];
          this.$refs["questionAndAnswer"].validate(valid => {
            if (valid) {
              questionAndAnswerOptions = [
                {
                  content: this.type5Model.content
                }
              ];
            }
          });
          if (questionAndAnswerOptions.length > 0) {
            return questionAndAnswerOptions;
          }
        default:
          break;
      }
    }
  }
});
</script>
