<template>
     <el-form :inline="true" :model="formInline" class="demo-form-inline staffHead">
            <el-form-item label="员工号：">
                <el-input size="small" v-model.trim="formInline.employeeId" placeholder="员工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input  size="small" v-model.trim="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input  size="small" v-model.number.trim="formInline.phoneNumber" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input  size="small" v-model.trim="formInline.mailbox" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    size="small" 
                     @click="searchBtn(formInline)"
                     icon="el-icon-search">
                     搜索
                  </el-button>
            </el-form-item>
        </el-form>
</template>
<script>
    export default {
        name: "userManageHead",
        data () {
            return {
                 formInline: {
                    employeeId: '',
                    name: '',
                    phoneNumber:'',
                    mailbox:''
                }
            }
        },
        methods: {
           searchBtn(formInline){
               this.$emit('handlerSearch',formInline)  
           }
        }
    }
</script>