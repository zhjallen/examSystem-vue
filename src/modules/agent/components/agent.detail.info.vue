<template>
  <div class="agent-info">
    <el-form
      :inline="true"
      ref="detailForm"
      :model="detailFormModel"
      label-width="120px"
      label-position="right"
      size="small"
    >
      <el-row>
        <template v-for="formItem in agentDetailModel">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="detailFormModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import CreateFormItem from "../../../components/common/tools/createFormItem.vue";
export default {
  name: "AgentDetailInfo",
  components: {
    CreateFormItem
  },
  props: {
    detailFormModel: {
      type: Object,
      default: () => {},
      required: true
    },
    agentDetailModel: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>