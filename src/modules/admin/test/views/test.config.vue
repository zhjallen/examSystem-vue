<template>
  <div class="test-config">
    <h5>考试详情配置，创建考试章节，并向章节中添加试题</h5>
    <div class="layout">
      <div class="test-config-basic">
        <test-config-basic :testInfo="initTest"/>
        <el-button size="mini" @click="onAddContent">新增章节</el-button>
        <test-config-content :contents="contents"/>
        <div class="operation">
          <el-button size="mini" type="primary" @click="onConfigTest">提交</el-button>
          <el-button size="mini">取消</el-button>
        </div>
      </div>
      <div class="question-list">试题列表</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import TestConfigBasic from "../components/test.config.basic.vue";
import TestConfigContent from "../components/test.config.content.vue";
import "../styles/test.config.scss";
export default Vue.extend({
  name: "TestConfig",
  computed: {
    ...mapGetters(["testInfo"]),
    initTest: function() {
      return this.testInfo.test;
    }
  },
  data: function() {
    return {
      contents: [
        {
          name: "",
          desc: "",
          questions: [],
          sort: 1,
          key: 1
        }
      ]
    };
  },
  components: { TestConfigBasic, TestConfigContent },
  methods: {
    onConfigTest() {
      console.dir(this.initTest, "testInfo");
    },
    onAddContent() {
      const lastContent = this.contents[this.contents.length - 1];
      this.contents.push({
        name: "",
        desc: "",
        questions: [],
        sort: lastContent.sort + 1,
        key: lastContent.key + 1
      });
    }
  }
});
</script>

