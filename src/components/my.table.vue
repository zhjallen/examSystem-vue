<template>
  <div class="my-table">
    <slot name="searchForm"></slot>
    <el-form
      v-if="showSearch"
      :inline="true"
      ref="tableSearchForm"
      class="search-form"
      :model="searchFormModel"
      label-width="100px"
      label-position="right"
      size="small"
      label-suffix=":"
    >
      <el-row>
        <template v-for="formItem in searchFormModelArr">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps&&formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="searchFormModel"></create-form-item>
          </el-col>
        </template>
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSearch">查询</el-button>
          <el-button size="small" @click="onReset('tableSearchForm')">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
    <slot name="operation"/>
    <slot name="table"/>
    <slot name="pagination"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CreateFormItem from "./common/tools/createFormItem.vue";
export default Vue.extend({
  name: "MyTable",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
      required: true
    },
    searchFormModel: {
      type: Object,
      default: () => {}
    },
    searchFormModelArr: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CreateFormItem
  },
  methods: {
    onSearch() {
      console.log(this.searchFormModel, "model");
    },
    onReset(formName) {
      this.$refs[formName].resetFields();
    }
  }
});
</script>

