<template>
  <el-table
    :highlight-current-row="true"
    header-row-class-name="header-table"
    :data="productLists"
    stripe
    size="mini"
  >
    <el-table-column label="序号" width="45">
      <template slot-scope="scope">
        <span>{{ scope.$index+1 }}</span>
      </template>
    </el-table-column>
    <el-table-column label="产品编号">
      <template slot-scope="scope">
        <span>{{ scope.row.productCode }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" min-width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.productName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="供应商编码">
      <template slot-scope="scope">
        <span>{{ scope.row.supCode }}</span>
      </template>
    </el-table-column>
    <el-table-column label="大类" width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.bigClassName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="中类" width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.minorClassName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="小类" width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.smallClassName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="品牌" width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.brandName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="品牌类别">
      <template slot-scope="scope">
        <span>{{ scope.row.brandCategory |brandCategory}}</span>
      </template>
    </el-table-column>
    <el-table-column label="产品型号" width="60">
      <template slot-scope="scope">
        <span>{{ scope.row.model }}</span>
      </template>
    </el-table-column>
    <el-table-column label="产品规格" width="60">
      <template slot-scope="scope">
        <span>{{ scope.row.productSpecification }}</span>
      </template>
    </el-table-column>
    <el-table-column label="图片" min-width="60">
      <template slot-scope="scope">
        <img style="height:50px" :src="scope.row.productPic" alt>
      </template>
    </el-table-column>
    <el-table-column label="出厂价（含税）">
      <template slot-scope="scope">
        <span>{{ scope.row.factoryPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column label="到货价（含税）">
      <template slot-scope="scope">
        <span>{{ scope.row.deliveredPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column label="全包价（配送+安装）">
      <template slot-scope="scope">
        <span>{{ scope.row.allInPrice }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="资料下载" width="50">
      <template slot-scope="scope">
        <a :href="url+ scope.row.productInfo" :download="url+ scope.row.productInfo">
          <i @click="down(scope.$index,scope.row)" class="el-icon-download"></i>
        </a>
      </template>
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div v-if="scope.row.isEnabled===0" class="detailBtn">
          <span @click="detailList(scope.$index,scope.row,businessType)">详情</span>
        </div>
        <div v-else class="detailBtn">
          <span @click="detailList(scope.$index,scope.row,businessType)">详情</span>
          <span v-if="isHightest" @click="editList(scope.$index,scope.row,businessType)">编辑</span>
          <!-- <span @click="forbid(scope.$index,scope.row)">禁用</span> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { envConfig } from "../../../config/envconfig.js";
export default {
  props: {
    productLists: {
      type: Array,
      default: () => []
    },
    isHightest: {
      type: Boolean,
      default: false
    },
    businessType: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      url: envConfig.downloadPrivateFile + "?key="
    };
  },
  mounted() {
    console.log(envConfig.downloadPrivateFile);
  },
  methods: {
    detailList(index, row,businessType) {
      this.$emit("detailList", index, row,businessType);
    },
    editList(index, row, businessType) {
      this.$emit("editList", index, row, businessType);
    },
    forbid(index, row) {
      this.$emit("forbid", index, row);
    },
    down(index, row) {
      console.log(row.productInfo);
    }
  },
  filters: {
    numberToChinese: function(num) {
      if (num == "" || num == null) return;
      let chineseNum;
      switch (num) {
        case 1:
          chineseNum = "一";
          break;
        case 2:
          chineseNum = "二";
          break;
        case 3:
          chineseNum = "三";
          break;
        case 4:
          chineseNum = "四";
          break;
        case 5:
          chineseNum = "五";
          break;
        case 6:
          chineseNum = "六";
          break;
        case 7:
          chineseNum = "七";
          break;
        case 8:
          chineseNum = "八";
          break;
        case 9:
          chineseNum = "九";
          break;
      }
      return chineseNum;
    },
    brandCategory(val) {
      if (val == "" || val == null) return;
      let category;
      switch (val) {
        case 1:
          category = "进口";
          break;
        case 2:
          category = "合资";
          break;
        case 3:
          category = "国内一线";
          break;
        case 8:
          category = "红星直选";
          break;
      }
      return category;
    }
  }
};
</script>