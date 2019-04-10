<template>
  <div class="agent-edit">
    <title-first title="基本信息"/>
    <agent-basic-info :agentBasicModel="agentBasicModel" :basicFormModel="basicFormModel"></agent-basic-info>
    <title-first title="详情信息"/>
    <agent-detail-info :detailFormModel="detailFormModel" :agentDetailModel="agentDetailModel"/>
    <div class="agent-add-operation">
      <el-button type="primary" size="small" @click="editAgent()">确认</el-button>
      <el-button size="small" @click="cancle()">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { agentBasicModel, agentDetailModel } from "../models/agent.add";
import AgentBasicInfo from "../components/agent.basic.info.vue";
import AgentDetailInfo from "../components/agent.detail.info.vue";
import TitleFirst from "../../../components/common/title.first.vue";
export default {
  name: "AgentEdit",
  components: {
    TitleFirst,
    AgentBasicInfo,
    AgentDetailInfo
  },
  data: function() {
    return {
      agentBasicModel: agentBasicModel,
      agentDetailModel: agentDetailModel,
      basicFormModel: {},
      detailFormModel: {}
    };
  },
  created: function() {
    const basicFormModel = {};
    const detailFormModel = {};
    const basicFormRules = {};
    const detailFormRules = {};
    agentBasicModel.map(item => {
      basicFormModel[item.key] = item.showName;
      basicFormRules[item.key] = item.options.rules;
      //   if (item.elementType === "select") {
      //     item.selectOptions = selectOptions[item.key];
      //   }
      item.elementType = "input";
    });
    agentDetailModel.map(item => {
      detailFormModel[item.key] = item.showName;
      detailFormRules[item.key] = item.options.rules;
      //   if (item.elementType === "select") {
      //     item.selectOptions = selectOptions[item.key];
      //   }
      item.elementType = "input";
    });
    this.basicFormModel = basicFormModel;
    this.basicFormRules = basicFormRules;
    this.detailFormModel = detailFormModel;
    this.detailFormRules = detailFormRules;
  },
  methods: {
    editAgent() {},
    cancle() {
      this.$route && this.$route.path && this.closeTag(this.$route);
    }
  }
};
</script>

