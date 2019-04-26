<template>
  <div class="my-table">
    <h2>表格封装</h2>
    <slot name="searchForm"></slot>
    <el-form
      v-if="showSearch"
      :inline="true"
      ref="tableSearchForm"
      class="search-form"
      :model="searchFormModel"
      label-width="120px"
      label-position="right"
      size="small"
      label-suffix=":"
    >
      <el-row>
        <template v-for="formItem in searchFormModelArr">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps.span">
            <create-form-item :item="formItem" :formModel="searchFormModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="table"/>
    <slot name="pagination"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CreateFormItem from "./createFormItem.vue";
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
  }
});
</script>

