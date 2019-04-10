<template>
  <el-table :data="characterLists" stripe header-row-class-name="header-table" style="width: 100%">
    <el-table-column label="序号" type="index" width="50"></el-table-column>
    <el-table-column label="角色编号" background="#6b8ba2">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="角色编码">
      <template slot-scope="scope">
        <span>{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="角色名称">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="所属系统">
      <template slot-scope="scope">
        <span>{{ scope.row.systemName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-dropdown trigger="click">
          <el-button size="mini" class="el-dropdown-link">
            操作
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="viewClick(scope.$index,scope.row)" command="view">
              <i class="el-icon-tickets"></i>
              查看
            </el-dropdown-item>
            <el-dropdown-item @click.native="authorClick(scope.$index,scope.row)" command="author">
              <i class="el-icon-menu"></i>
              授权
            </el-dropdown-item>
            <el-dropdown-item
              @click.native="modifyClick(scope.$index,scope.row)"
              command="modifyInfor"
            >
              <i class="el-icon-edit"></i>
              修改
            </el-dropdown-item>
            <el-dropdown-item
              @click.native="delClick(scope.$index,scope.row)"
              command="deleteCharacter"
            >
              <i class="el-icon-delete"></i>
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    characterLists: {
      type: Array,
      default: () => []
    },
    system: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    viewClick(index) {
      this.$emit("viewClick", index);
    },
    authorClick(index) {
      this.$emit("authorClick", index);
    },
    modifyClick(index) {
      this.$emit("modifyClick", index);
    },
    delClick(index) {
      this.$emit("delClick", index);
    }
  }
};
</script>