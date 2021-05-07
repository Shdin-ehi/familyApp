<template>
  <a :href="src" :data-fancybox="group" :data-caption="title" @click.prevent=''>
    <img :src="thumb" :alt="title" @load="loaded"/>
    <slot></slot>
  </a>  
</template>  
  
<script>  
/**
 * 图片编辑模块
 * @module components/vImg
 * @requires Cropper
 * @param {String} src 大图url
 * @param {String} thumb 缩略图url
 * @param {String} title 标题
 * @param {String} group=gallary 分组组名
 * @listens load 参数1为event
 * @example
 * <v-img :src="src" :thumb="thumb" :title="title" @load="setImgSize"></v-img>
 *
 * slots:
 * default  默认在图片后
 */
export default {  
  name:"v-img",
  data () {  
    return {  
    }  
  },  
  props:{
    src:{
      'type':String,
      'default':'assets/images/img-error.png'
    },
    thumb:{
      'type':String,
      'default':'assets/images/img-error.png'
    },
    title:{
      'type':String,
      'default':''
    },
    group:{
      'type':String,
      'default':'gallary'
    }

  },
  mounted () {  
   require(['jquery'],function(jquery){
     window.$=window.jQuery=jquery
     require(['assets/libs/fancybox/jquery.fancybox.min.css','assets/libs/fancybox/jquery.fancybox.min.js'],function(){
       $.fancybox.defaults.hash = true;
     })
   })
  },
  methods:{
    loaded (e){
      this.$emit('load',e)
    }
  }
}  
</script>  
  
<style>  

</style>  