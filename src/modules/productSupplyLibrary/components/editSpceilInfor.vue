<template>
  <div>
    <h2 class="details-h2">产品专用信息</h2>
    <el-form
      v-model="exclusiveData"
      :inline="true"
      label-width="150px"
      size="mini"
      class="demo-form-inline detail-special"
    >
      <el-row>
        <template :label="item.showName+':'" v-for="item in exclusive">
          <el-col
            :key="item.id"
            v-if="item.elementType==='input'"
            :span="item.colProps.span||8"
            :offset="item.colProps.offset||0"
          >
            <el-form-item :label="item.showName+':'" :key="item.id">
              <el-input :type="item.elementType" v-model.trim="exclusiveData[item.key]"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :key="item.id"
            v-else-if="item.elementType==='select'"
            :span="item.colProps.span||8"
            :offset="item.colProps.offset||0"
          >
            <el-form-item :label="item.showName+':'" :key="item.id">
              <el-select v-model="exclusiveData[item.key]">
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "detailsSpecialInfor",
  props: {
    exclusive: {
      type: Array,
      default: () => []
    },
    exclusiveData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>