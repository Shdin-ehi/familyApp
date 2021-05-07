<template>
  <div class="app-view-container">
    <mu-appbar class="app-popup-topbar" title="文件上传">
      <mu-raised-button class="size-s" label="返回" @click.native="$router.back()" slot="left"/>
      <div slot="right" style="width:60px"></div>
    </mu-appbar>
    <div class="app-popup-content app-list">
        <my-webuploader :rotatable="false" :config="{
          server:'/add',
            compress:{//压缩，仅支持jpeg
              width:1600,
              height:1600,
              quality:80,
              allowMagnify: false,
              crop: false,
              compressSize:40
            }
          }" @uploadSuccess="uploadSuccess"></my-webuploader>
    </div>
  </div>
</template>

<script>
  export default {
    data:function() {
      return {
      }
    },
    computed:{
    },
    components:{
      'my-webuploader':(resolve)=>{require(['components/myWebuploader/myWebuploader'],resolve)}
    },
    mounted (){
    },
    methods: {
      uploadSuccess (file,res){
        //根据服务器返回值判断成功与否
        if (true) {
          this.showToast('上传成功')
        }
      },
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (text,time){  this.$store.dispatch('showToast',{toastText:text,time:time}) },
      hideToast (){  this.$store.dispatch('hideToast') }
    }
  }
</script>

<style>
.gallary-container:after{display: block;content: '';visibility: hidden;height: 0;clear: both;}
.gallary-container .gallary-item{width:33.33%;height: 100px;max-width: 125px;float: left;margin:3px 0}
.gallary-container .gallary-item .picker{-webkit-tap-highlight-color: rgba(0,0,0,.1)}
.gallary-container a{display: block;width: 100px;height: 100px;margin: auto;position: relative;overflow: hidden;box-sizing:border-box;border:1px solid #e3e3e3;background-color: #fefefe;border-radius: 2px}
.gallary-container a img{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)}
</style>
