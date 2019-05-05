<template>
  <div class="test-basic">
    <el-form
      :inline="true"
      ref="testBasic"
      :model="testBasicModel"
      label-width="100px"
      label-position="right"
      size="small"
      label-suffix=":"
    >
      <el-row>
        <template v-for="formItem in testBasicModelArr">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps&&formItem.colProps.span">
            <el-form-item
              v-if="formItem.key==='startTime'"
              label="考试时间"
              prop="testTime"
              :rules="formItem.rules"
            >
              <el-date-picker
                v-model="testBasicModel.testTime"
                type="datetime"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <create-form-item v-else :item="formItem" :formModel="testBasicModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CreateFormItem from "../../../../components/create.form.item.vue";
export default Vue.extend({
  name: "TestBasic",
  components: {
    CreateFormItem
  },
  props: {
    testBasicModelArr: {
      type: Array,
      default: () => [],
      required: true
    },
    testBasicModel: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    getInfo() {
      let isPass = false;
      this.$refs["testBasic"].validate(valid => {
        console.log(valid, "valid");
        isPass = valid;
      });
      return isPass;
    }
  }
});
</script>

