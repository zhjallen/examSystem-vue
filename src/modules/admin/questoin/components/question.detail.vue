<template>
  <div class="question-detail">试题详情信息</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "QuestionDetail",
  props: {
    questionType: {
      type: Number,
      default: 1,
      required: true
    }
  }
});
</script>

