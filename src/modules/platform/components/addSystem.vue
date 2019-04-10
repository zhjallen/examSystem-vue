<template>
  <el-dialog
    width="600px"
    :title="title"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="systemForm"
      :model="systemForm"
      :rules="formRules"
      label-width="80px"
      label-position="right"
      size="small"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="系统编号" prop="code">
            <el-input v-model="systemForm.code" maxlength="50"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="系统名称" prop="name">
            <el-input v-model="systemForm.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
新增和编辑系统组件
 */

export default {
  name: "AddSystem",
  data() {
    return {
      isVisible: false,
      title: "新增系统",
      orgnization: [],
      systemForm: {
        code: "",
        name: ""
      },
      formRules: {
        code: [
          { required: true, message: "请输入系统编码", trigger: "blur" }
          //   { validator: Validator.account, trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入系统名称", trigger: "blur" }]
      },
      options: []
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    usedPage: {
      type: String,
      required: true,
      default: "add"
    },
    initObj: {
      type: Object,
      default: {}
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow && this.usedPage === "edit") {
        // 显示
        this.title = "编辑系统";
        this.systemForm = {...this.initObj};
      } else if (isShow) {
        this.title = "新增系统";
        this.systemForm = {};
      }
    }
  },
  methods: {
    save() {
      this.$refs.systemForm.validate(isValid => {
        if (isValid) {
          console.log(this.systemForm, "form");
          this.$emit("addSystem", this.systemForm);
        }
      });
    },
    cancel() {
      console.log("cancel");
      this.$emit("addCancle");
    }
  }
};
</script>
