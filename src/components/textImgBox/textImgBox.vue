<template>
<div class="text-img-box">
    <div class="img" :style='{"height":size+"px","width":size+"px","border-radius":radius?"50%":"0"}'><slot></slot></div>
    <div class="text">{{title}}</div>
</div>
</template>

<script>
/**
 * 图文面板模块
 * @module components/textImgBox
 * @param {Number} size=56 图片大小
 * @param {String} title 图片标题
 * @param {Boolean} radius=true 图片圆边
 * @example
 * <text-img-box title="生日">
  <img src="../assets/images/sign_birthday.png">
</text-img-box>

slots：
  default 图片
 */
  export default {
 		name: 'text-img-box',
    data:function() {
      return {
      }
    },
    props:{
      size:{
        'type':Number,
        'default':56
      },
      title:{
        'type':String
      },
    	radius:{
    		'type':Boolean,
        'default':true
    	}
    }
  }
</script>

<style>
.text-img-box{text-align: center;}
.text-img-box .img{margin:auto;overflow: hidden;}
.text-img-box .img>img{width: 100%;height: 100%;margin:auto;}
.text-img-box .text{margin-top: 5px;color: #333;font-size: 14px}
</style>
