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
      <el-form label-width="100px" label-suffix=":">
        <el-form-item label="答案设置">
          <el-input type="textarea"/>
        </el-form-item>
      </el-form>
    </template>
    <div class="anser">
      <el-form label-width="100px" label-suffix=":">
        <el-row>
          <el-col :span="20">
            <el-form-item label="答案解析">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
      },
      type2Model: {
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
    }
  }
});
</script>

