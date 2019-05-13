<template>
  <div class="config-basic">
    
      <h4>{{testInfo.name}}</h4>
      <div>
          <label>考试时间：</label>
          <span>{{testInfo.startTime}}--{{testInfo.finishTime}}</span>
          <label>考试时长：</label>
          <span>{{testInfo.length}}分钟</span>
         </div>
    
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TestConfigBasic",
  
  data: function() {
    return {};
  },
  props: {
    testInfo: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed:{
      getTestInfo:function(){
          console.log(this.testInfo,"test")
      }
  },
});
</script>

