<template>
  <div class="test-basic">
    <el-form
      ref="testBasic"
      :model="testBasicModel"
      label-width="100px"
      label-position="right"
      size="small"
      label-suffix=":"
    >
      <el-row type="flex" justify="space-between">
        <template v-for="formItem in testBasicModelArr.slice(0,2)">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps&&formItem.colProps.span">
            <el-form-item
              v-if="formItem.key==='startTime'"
              label="考试时间"
              prop="testTime"
              :rules="formItem.rules"
            >
              <el-date-picker
                v-model="testBasicModel.testTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="testTimeChange"
              ></el-date-picker>
            </el-form-item>
            <create-form-item v-else :item="formItem" :formModel="testBasicModel"></create-form-item>
          </el-col>
        </template>
      </el-row>
      <el-row justify="space-between">
        <template v-for="formItem in testBasicModelArr.slice(2,10)">
          <el-col v-bind:key="formItem.key" :span="formItem.colProps&&formItem.colProps.span">
            <el-form-item
              v-if="formItem.key==='startTime'"
              label="考试时间"
              prop="testTime"
              :rules="formItem.rules"
            >
              <el-date-picker
                v-model="testBasicModel.testTime"
                type="datetimerange"
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
    },
    testTimeChange(testTime) {
      if (testTime && testTime.length === 2) {
        const testStartSeconds = testTime[0].valueOf();
        const testFinishSeconds = testTime[1].valueOf();

        const testLength = (testFinishSeconds - testStartSeconds) / 1000 / 60;
        console.log(
          testTime,
          testStartSeconds,
          testFinishSeconds,
          testLength,
          "testTime"
        );
        this.testBasicModel.length = testLength;
      }
    }
  }
});
</script>

