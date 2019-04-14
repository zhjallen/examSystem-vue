<template>
  <div class="admin">
    <div class="admin-header">
      <h3>欢迎使用</h3>
      <h4>欢迎使用考试系统</h4>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="12">
          <el-card class="news">
            <div slot="header">
              <span>新闻公告</span>
            </div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="last-test">
            <div slot="header">
              <span>最近的考试</span>
            </div>
            <div>考试列表</div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class></el-card>
        </el-col>
        <el-col :span="12">
          <el-card class></el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
// 管理员首页
import Vue from "vue";
export default Vue.extend({
  name: "HomeAdmin"
});
</script>

