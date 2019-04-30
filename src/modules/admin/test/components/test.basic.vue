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
            <create-form-item :item="formItem" :formModel="testBasicModel"></create-form-item>
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

