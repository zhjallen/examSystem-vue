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
      ref="resourceForm"
      :rules="formRules"
      :model="resourceForm"
      label-width="80px"
      label-position="right"
    >
      <template v-for="item in resourceDetailModel">
        <el-row :key="item.propName">
          <el-col :span="24">
            <el-form-item :label="item.label" :prop="item.propName">
              <el-select
                v-if="item.propName==='resourceType'"
                v-model="resourceForm[`${item.propName}`]"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else
                :disabled="item.disabled"
                v-model.trim="resourceForm[`${item.propName}`]"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-row>
        <el-col :span="8" :offset="16">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
新增和编辑资源组件
 */
import { resourceDetailModel } from "../model";
export default {
  name: "AddSystem",
  data() {
    return {
      resourceDetailModel: resourceDetailModel,
      isVisible: false,
      title: "新增资源",
      orgnization: [],
      resourceForm: {},
      formRules: {},
      options: [
        { label: "BUTTON", value: "BUTTON" },
        { label: "MENU", value: "MENU" }
      ]
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
      default: {
        systemName: ""
      }
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow && this.usedPage === "edit") {
        debugger;
        this.title = "编辑资源";
        const obj = {};
        resourceDetailModel.map(item => {
          const propName = item.propName;
          obj[propName] = this.initObj[propName];
          if (item.required) {
            this.formRules[propName] = [
              {
                required: true,
                message: `请输入${item.label}`,
                trigger: "blur"
              }
            ];
          }
        });
        obj.systemName = this.initObj.system && this.initObj.system.name;
        this.resourceForm = obj;
        console.log(this.initObj, "init");
        // this.resourceForm = this.initObj;
      } else if (isShow) {
        debugger
        resourceDetailModel.map(item => {
          const propName = item.propName;
          if (item.required) {
            this.formRules[propName] = [
              {
                required: true,
                message: `请输入${item.label}`,
                trigger: "blur"
              }
            ];
          }
        });

        this.resourceForm.systemName =
          this.initObj.system && this.initObj.system.name;
        this.resourceForm.parentName = this.initObj.name;
        console.log(this.resourceDetailModel, "form");
        this.title = "新增资源";
      }
    }
  },
  methods: {
    save() {
      this.$refs.resourceForm.validate(isValid => {
        if (isValid) {
          if (this.usedPage === "edit") {
            this.$emit("OnEditNode", this.resourceForm);
          } else if (this.usedPage === "add") {
            this.$emit("OnAddNode", this.resourceForm);
          }
        }
      });
    },
    cancel() {
      this.$emit("addCancle");
    }
  }
};
</script>
