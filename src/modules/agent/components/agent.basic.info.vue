<template>
  <div class="agent-info">
    <el-form
      :inline="true"
      ref="basicForm"
      :model="basicFormModel"
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
  </div>
</template>
<script>
import CreateFormItem from "../../../components/common/tools/createFormItem.vue";
export default {
  name: "AgentBasicInfo",
  components: {
    CreateFormItem
  },
  props: {
    basicFormModel: {
      type: Object,
      default: () => {},
      required: true
    },
    agentBasicModel: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>