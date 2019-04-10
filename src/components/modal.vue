<template>
    <div>
        <div class="md-modal" v-bind:class="{'md-show':show}">
            <div class="dialog-box">
                <slot name="dialogBody" ></slot>
            </div>
            <button class="btn-primary" @click="close()"><span>关闭</span></button>
        </div>
        <div v-if="show" class="mask"></div>
    </div>
</template>

<script>
  export default {
    name: "modal",
    props:['show'],
    data(){
      return {}
    },
    created(){

    },
    methods:{
      close () {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 200;
        left: 0;
        top: 0;
    }
    .md-modal.md-show {
        visibility: visible;
    }

    .md-modal {
        padding: 20px 0;
        background-color: #ffffff;
        border-radius: 5px;
        border: 1px solid #E1E1E1;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 90%;
        height: auto;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        visibility: hidden;
        z-index: 201;
    }

</style>

