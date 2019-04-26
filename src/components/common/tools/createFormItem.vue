<template>
  <el-form-item :label="item.showName" :rules="item.rules" :prop="item.key">
    <el-input
      v-if="item.elementType==='input'"
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="item.placeholder"
      v-model="formModel[`${item.key}`]"
      :disabled="item.disabled"
    ></el-input>
    <el-select
      @changeLever="change(item.key)"
      :clearable="item.clearable"
      :disabled="item.disabled"
      v-model="formModel[`${item.key}`]"
      v-else-if="item.elementType==='select'"
    >
      <el-option
        v-for="(option,key) in (item.selectOptions||[])"
        :key="key"
        :value="option.value"
        :label="option.label"
      ></el-option>
    </el-select>
    <el-cascader
      v-else-if="item.elementType==='cascader'"
      v-model="formModel[`${item.key}`]"
      :options="item.selectOptions"
      @change="handleChange"
    ></el-cascader>
    <el-date-picker
      v-else-if="item.elementType==='time'"
      v-model="formModel[`${item.key}`]"
      type="date"
      :disabled="item.disabled"
      placeholder="选择日期"
    ></el-date-picker>
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


