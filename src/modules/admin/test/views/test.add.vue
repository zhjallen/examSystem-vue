<template>
  <div class="test-add">
    <test-basic
      ref="testBasic"
      :testBasicModelArr="testBasicModelArr"
      :testBasicModel="testBasicModel"
    />
    <div class="operation">
      <el-button size="small" type="primary" @click="onAddTest('testBasic')">确定</el-button>
      <el-button size="small" @click="onCancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import CreateFormItem from "../../../../components/create.form.item.vue";
import TestBasic from "../components/test.basic.vue";
import { testBasicModelArr } from "../constants/test.add";
import { addTestApi } from "../../../../api/modules/test";

export default Vue.extend({
  name: "TestAdd",
  components: {
    TestBasic
  },
  data: function() {
    const testBasicModel = {};
    testBasicModelArr.map(item => {
      if (item.defaultValue !== undefined) {
        testBasicModel[item.key] = item.defaultValue;
      } else {
        testBasicModel[item.key] = null;
      }
    });
    return {
      testBasicModelArr: testBasicModelArr,
      testBasicModel
    };
  },
  methods: {
    onAddTest(formName) {
      const isPass = this.$refs[formName].getInfo();
      if (isPass) {
        console.log(this.testBasicModel, "ispass");
        addTestApi(this.testBasicModel);
      }
    },
    onCancel() {
      this.$confirm("确认取消吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.closeTag(this.$route);
        })
        .catch(() => {});
    }
  }
});
</script>

