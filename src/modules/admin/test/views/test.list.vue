<template>
  <div class="test-list">
    <my-table
      :showSearch="true"
      :searchFormModelArr="testListSearchFormArr"
      :searchFormModel="searchModel"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MyTable from "../../../../components/my.table.vue";
import { testListSearchFormArr } from "../constants/test.list";
export default Vue.extend({
  name: "TestList",
  components: {
    MyTable
  },
  data: function() {
    const searchModel = {};
    testListSearchFormArr.map(item => {
      searchModel[item.key] = null;
    });
    return {
      testListSearchFormArr: testListSearchFormArr,
      searchModel
    };
  }
});
</script>

