<template>
  <div class="test-list">
    <my-table
      :showSearch="true"
      :searchFormModelArr="testListSearchFormArr"
      :searchFormModel="searchModel"
      @search="onSearchTest"
    >
      <div slot="operation">
        <el-button type="primary" size="small" @click="onAddTest">新增考试</el-button>
      </div>
      <div slot="table">
        <el-table :data="testList" :stripe="true" size="small" :border="true" class="header-table">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="name" label="考试名称" width="180"></el-table-column>
          <el-table-column prop="status" label="考试状态" width="100">
            <template slot-scope="props">
              <span>{{testDataOptions["status"][props.row.status]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间设定" width="180">
            <template slot-scope="props">
              <span>{{props.row.startTime}}-{{props.row.finishTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="length" label="考试时长" width="120"></el-table-column>
          <el-table-column prop="type" label="考试类型" width="100">
            <template slot-scope="props">
              <span>{{testDataOptions["type"][props.row.type]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalScore" label="卷面总分"></el-table-column>
          <el-table-column prop="status" label="考试人数"></el-table-column>
          <el-table-column prop="operation" label="操作"></el-table-column>
        </el-table>
      </div>
      <div slot="pagination">分页</div>
    </my-table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MyTable from "../../../../components/my.table.vue";
import { testListSearchFormArr, testDataOptions } from "../constants/test.list";
import { getTestListApi } from "../../../../api/test";
import moment, { relativeTimeThreshold } from "moment";
import { getQueryParams } from "../../../../utils/functions/objFunc";
export default Vue.extend({
  name: "TestList",
  components: {
    MyTable
  },
  data: function() {
    const searchModel = {};
    testListSearchFormArr.map(item => {
      searchModel[item.key] = null;
    });
    return {
      testListSearchFormArr: testListSearchFormArr,
      searchModel,
      testDataOptions: testDataOptions,
      queryParams: {},
      testList: [],
      totalNum: 0
    };
  },
  methods: {
    getTestList(params) {
      const queryParams = {
        ...params,
        ...this.queryParams,
        pageSize: 10
      };
      getTestListApi(queryParams).then(getData => {
        console.log(getData, "getdata");
        if (getData.status === 200) {
          this.testList = getData.data.tests.map(item => {
            return Object.assign({}, item, {
              startTime: moment(item.startTime)
                .utc()
                .zone(-8)
                .format("YYYY-MM-DD HH:mm:ss"),
              finishTime: moment(item.finishTime)
                .utc()
                .zone(-8)
                .format("YYYY-MM-DD HH:mm:ss")
            });
          });
        }
      });
    },
    onSearchTest(searchFormModel) {
      this.queryParams = getQueryParams(searchFormModel);
      this.getTestList({ page: 1 });
    },
    onAddTest() {
      this.$router.push(`/admin/test/add`);
    }
  },
  mounted: function() {
    this.getTestList({ page: 1 });
  }
});
</script>

