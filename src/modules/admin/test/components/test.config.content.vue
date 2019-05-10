<template>
  <div class="test-content">
    <template v-for="contentItem in contents">
      <div :key="contentItem.key" class="content">
        <el-form :model="contentItem" inline size="small" label-suffix=":">
          <el-form-item label="章节名称">
            <el-input v-model="contentItem.name"></el-input>
          </el-form-item>
          <el-form-item label="章节描述">
            <el-input v-model="contentItem.desc"></el-input>
          </el-form-item>
          <el-form-item v-model="contentItem.questions">
            <div></div>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TestConfigContent",
  props: {
    contents: {
      type: Array,
      default: () => [],
      required: true
    }
  }
});
</script>

