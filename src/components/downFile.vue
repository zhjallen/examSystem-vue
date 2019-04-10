<template>
  <a  :href="url" :download="fileName">{{fileName}}
  </a>
</template>
<script>
  import {
    envConfig
  } from "../config/envconfig";

  // 下载文件组件
  export default {
    name: "DownFile",
    props: {
      fileUrl: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
    },
    data: function () {
      return {
        url: "",
        userid: window.userInfo.userId,
      }
    },
    methods:{
      alartUrl(){
        alert(this.url)
      }
    },
    mounted: function () {
      this.url = envConfig['downloadPrivateFile'] + "?key=" + this.fileUrl + "&userid=" + this.userid;
    }
  }
</script>