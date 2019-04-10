<template>
  <el-pagination
   class="pagination"
    background
    small
    layout="total ,prev, pager, next, jumper"
    :current-page="paginationObj.currentPage"
    @current-change="handlerEmitChange"
    :total="paginationObj.total"
  ></el-pagination>
</template>
<script>
export default {
  name: "pagination",
  props: {
    paginationObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handlerEmitChange(pageNum) {
      this.$emit("handlerChangePage", pageNum);
    }
  }
};
</script>