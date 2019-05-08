<template>
  <div class="test-add">
    <test-basic
      ref="testBasic"
      :testBasicModelArr="testBasicModelArr"
      :testBasicModel="testBasicModel"
    />
    <div class="test-users">
      <el-form
        ref="testUsers"
        label-width="100px"
        label-position="right"
        size="small"
        label-suffix=":"
      >
        <el-row>
          <el-form-item label="考生">
            <div>
              <el-button-group>
                <el-button @click="onAddUsers">
                  <i class="fa fa-user-plus">添加考生</i>
                </el-button>
                <el-button>
                  <i class="fa fa-minus">清除考生</i>
                </el-button>
              </el-button-group>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="onAddTest('testBasic')">确定</el-button>
      <el-button size="small" @click="onCancel">取消</el-button>
    </div>
    <el-dialog :visible.sync="isShowUsers" title="选择考生" width="70%">
      <user-list usedPage="addTest"/>
    </el-dialog>
    <el-dialog
      :visible.sync="isShowConfirmModal"
      :close-on-click-modal="false"
      center
      width="30%"
      :show-close="false"
      title="提示"
    >
      <span>试题新建成功</span>
      <span slot="footer">
        <el-button size="small" @click="goTestConfig">配置考试</el-button>
        <el-button size="small" @click="goTestList">返回考试列表</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import CreateFormItem from "../../../../components/create.form.item.vue";
import TestBasic from "../components/test.basic.vue";
import UserList from "../../userManage/views/user.list.vue";
import { testBasicModelArr } from "../constants/test.add";
import { addTestApi } from "../../../../api/test";
import "../styles/test.add.scss";

export default Vue.extend({
  name: "TestAdd",
  components: {
    TestBasic,
    UserList
  },
  data: function() {
    const testBasicModel = {};
    testBasicModelArr.map(item => {
      if (item.key === "testTime") {
        testBasicModel[item.key] = "";
      } else if (item.defaultValue !== undefined) {
        testBasicModel[item.key] = item.defaultValue;
      } else {
        testBasicModel[item.key] = null;
      }
    });
    return {
      testBasicModelArr: testBasicModelArr,
      testBasicModel,
      isShowUsers: false,
      isShowConfirmModal: false
    };
  },
  methods: {
    onAddTest(formName) {
      const isPass = this.$refs[formName].getInfo();
      if (isPass) {
        const testBasicInfo = {
          ...this.testBasicModel,
          startTime: this.testBasicModel["testTime"][0],
          finishTime: this.testBasicModel["testTime"][1]
        };
        addTestApi(testBasicInfo).then(getData => {
          console.log(getData, "dddddddddd");
          if (getData.status === 200) {
            // this.$message({
            //   type: "success",
            //   message: "新增考试成功"
            // });
            // this.closeTag(this.$route);
            this.isShowConfirmModal = true;
          }
        });
      }
    },
    onAddUsers() {
      this.isShowUsers = true;
    },
    goTestList() {
      this.$router.push(`/admin/test/list`);
    },
    goTestConfig() {
      this.$router.push(`/admin/test/config`);
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

