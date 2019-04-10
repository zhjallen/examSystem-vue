<template>
  <div class="agent-add">
    <title-first title="基本信息"/>
    <el-form
      :inline="true"
      ref="basicForm"
      :model="basicFormModel"
      :rules="basicFormRules"
      label-width="120px"
      label-position="right"
      size="small"
    >
      <el-row>
        <template v-for="formItem in agentBasicModel">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="basicFormModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <title-first title="详情信息"/>
    <el-form
      :inline="true"
      ref="detailForm"
      :model="detailFormModel"
      :rules="basicFormRules"
      label-width="120px"
      label-position="right"
      size="small"
    >
      <el-row>
        <template v-for="formItem in agentDetailModel">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="basicFormModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="agent-add-operation">
      <el-button type="primary" size="small" @click="addAgent()">确认</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { agentBasicModel, agentDetailModel } from "../models/agent.add";
import { selectOptions } from "../models/selectOptions";
import CreateFormItem from "../../../components/common/tools/createFormItem.vue";
import TitleFirst from "../../../components/common/title.first.vue";
import "../styles/agent.add.scss";
export default Vue.extend({
  name: "AgentAdd",
  components: {
    CreateFormItem,
    TitleFirst
  },
  data: function() {
    return {
      agentBasicModel: agentBasicModel,
      agentDetailModel: agentDetailModel,
      basicFormModel: {},
      detailFormModel: {},
      basicFormRules: {
        // firstContact: [
        //   { required: true, message: "请输入第一联系人", trigger: "blur" }
        // ]
      },
      detailFormRules: {}
    };
  },
  created: function() {
    const basicFormModel = {};
    const detailFormModel = {};
    const basicFormRules = {};
    const detailFormRules = {};
    agentBasicModel.map(item => {
      basicFormModel[item.key] = "";
      basicFormRules[item.key] = item.options.rules;
      if (item.elementType === "select") {
        item.selectOptions = selectOptions[item.key];
      }
    });
    agentDetailModel.map(item => {
      detailFormModel[item.key] = "";
      detailFormRules[item.key] = item.options.rules;
      if (item.elementType === "select") {
        item.selectOptions = selectOptions[item.key];
      }
    });
    this.basicFormModel = basicFormModel;
    this.basicFormRules = basicFormRules;
    this.detailFormModel = detailFormModel;
    this.detailFormRules = detailFormRules;
    console.log(basicFormRules, "iddd");
  },
  methods: {
    addAgent() {
      this.$refs.basicForm.validate(isValid => {
        console.log(isValid, "valide");
        if (isValid) {
          console.log("form");
          //   this.$emit("addSystem", this.systemForm);
        }
      });
      // console.log(this.basicFormModel, "basic");
    }
  }
});
</script>

