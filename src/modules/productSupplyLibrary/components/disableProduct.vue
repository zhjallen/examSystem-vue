<template>
  <div>
    <el-dialog
      title="禁止该产品"
      :visible.sync="disableProduct "
      width="30%"
      :before-close="closeDis"
      center
    >
      <div>
        是否禁止该产品
        <span>{{forbidList.productCode}}？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDis">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitDis(forbidList.productCode)">确 定</el-button>
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
    forbidList: {
      type: Object,
      default: () => {}
    },
     disableProduct:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    closeDis() {
      this.$emit("closeDis");
    },
    submitDis(productCode) {
      this.$emit("submitDis", productCode);
    }
  }
};
</script>