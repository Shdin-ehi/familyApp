<template>
<div class="app-menunav-item" is="mu-flexbox-item" :grow="0" :shrink="0" @click.native="to&&$router.push(to)">
  <div class="app-menunav-item-imgwr"><slot></slot></div>
  <div class="app-menunav-item-ttwr"><span class="app-menunav-item-tt">{{title}}</span></div>
</div>
</template>

<script>
/**
 * 九宫格菜单项模块
 * @module components/menuNava/menuNavaItem
 * @example
  <app-menunav-item :to="{name:'archives'}" title="档案查询">
    <img src="../assets/images/menu_archives.png" style="height:60px;width:60px">
  </app-menunav-item>
   
  slots：
    default 图片容器里面 
 */
  export default {
    name: 'app-menunav-item',
    data:function() {
      return {
      }
    },
    props:["to","title"]
  }
</script>

<style>
.app-menunav .app-menunav-item{display: block;float: left; position: relative;top: 1px;left: 1px;width: 50%;box-sizing:border-box;border-right: 1px solid #d0d0d0;border-bottom: 1px solid #d0d0d0;-webkit-tap-highlight-color: rgba(33, 150, 243, 0.1);}
.app-menunav-item>a{display: block;}
.app-menunav-item-imgwr{height:76px;width:76px;max-width: 100%;text-align: center;margin:12px auto 8px auto;position: relative;}
.app-menunav-item-imgwr>*{ position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);}
.app-menunav-item-ttwr{width: 100%; text-align: center;margin:0 4px 12px 4px}
.app-menunav-item-tt{ font-size: 16px;color: #414141;height: 44px;line-height: 22px;}
.app-menunav-item:active .app-menunav-item-tt{color: #177bc0;}
</style>
