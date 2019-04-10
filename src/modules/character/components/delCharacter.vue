<template>
  <div>
    <el-dialog
      title="删除角色"
      :visible.sync="deleteCharacter "
      width="30%"
      :before-close="closeDel"
      center
    >
      <div>是否删除该角色？</div>
      <div>
        用户名为：
        <span>{{characterLists.name}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDel">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitDel(characterLists.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    characterLists: {
      type: Object,
      default: () => {}
    },
     deleteCharacter:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    closeDel() {
      this.$emit("closeDel");
    },
    submitDel(id) {
      this.$emit("submitDel", id);
    }
  }
};
</script>