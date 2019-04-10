<template>
  <el-pagination
    class="el-pagination-container"
    background
    small
    layout="prev, pager, next"
    :current-page="pageinaPages.pageNum"
    @current-change="handlerEmitChange"
    :total="pageinaPages.total"
  ></el-pagination>
</template>
<script>
export default {
  name: "pagination",
  props: {
    pageinaPages: {
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