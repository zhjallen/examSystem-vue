<template>
  <el-form-item :label="item.showName" :rules="item.rules" :prop="item.key">
    <el-input
      v-if="item.elementType==='input'"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="formModel[`${item.key}`]"
    ></el-input>
    <el-select v-model="formModel[`${item.key}`]" v-else-if="item.elementType==='select'">
      <el-option
        v-for="option in (item.selectOptions||[])"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CreateFormItem",
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true
    },
    formModel: {
      type: Object,
      default: () => {}
    }
  }
});
</script>
<style lang="scss">
.el-form-item {
  width: 100%;
  .el-form-item__content {
    width: 60%;
    input:last-child {
      width: 100%;
    }
  }
}
</style>


