<template>
  <div class="test-content">
    <template v-for="contentItem in contents">
      <div :key="contentItem.key" class="content-item">
        <el-form
          :ref="`testContent${contentItem.key}`"
          :model="contentItem"
          inline
          size="small"
          label-suffix=":"
          label-width="100px"
        >
          <el-form-item label="章节名称" prop="name" :rules="contentRules.contentName">
            <el-input v-model="contentItem.name"></el-input>
          </el-form-item>
          <el-form-item label="章节描述">
            <el-input v-model="contentItem.desc"></el-input>
          </el-form-item>
          <el-form-item label="内容" v-model="contentItem.questions">
            <div
              class="question"
              v-bind:class="{active:contentItem.isActive}"
              @click="onActiveContent(contentItem)"
            >
              <template v-for="question in contentItem.questions">
                <div :key="question.id">{{question.question_main}}</div>
              </template>
            </div>
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
  },
  data: function() {
    return {
      contentRules: {
        contentName: [
          { required: true, message: "请输入章节名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onActiveContent(contentItem) {
      console.log(contentItem, "contentItem");
      contentItem.isActive = true;
      this.contents.map(item => {
        if (item.key === contentItem.key) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
    getTestContents() {
      const newArr = [];
      this.contents.map(content => {
        const result = new Promise((resolve, reject) => {
          this.$refs[`testContent${content.key}`][0].validate(valid => {
            if (valid) {
              resolve();
            } else {
              reject();
            }
          });
        });
        newArr.push(result);
      });
      return Promise.all(newArr)
        .then(success => {
          return true;
        })
        .catch(error => {
          return false;
        });
      // return results;
    }
  }
});
</script>

