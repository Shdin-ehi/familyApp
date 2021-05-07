<template>
  <div class="app-menunav" is="mu-flexbox" wrap="wrap"  align="stretch" >
  	<slot></slot>
 	 </div>
</template>

<script>
/**
 * 九宫格菜单模块
 * @module components/menuNava/menuNava
 * @requires components/menuNava/menuNavaItem
 * @example
    <app-menunav>
      <app-menunav-item :to="{name:'archives'}" title="档案查询">
      	<img src="../assets/images/menu_archives.png" style="height:60px;width:60px">
      </app-menunav-item>
      <app-menunav-item :to="{name:'search'}" title="全文检索">
      	<img src="../assets/images/menu_search.png" style="height:60px;width:60px">
      </app-menunav-item>
    </app-menunav>
   
  slots：
  	default 容器里面 
 */
  export default {
 		name: 'app-menunav',
    data:function() {
      return {
      }
    }
  }
</script>

<style>
.app-menunav{position: relative;top: -1px;left: -1px;overflow: hidden;}
.app-menunav:after{content: '';display: block;visibility: hidden;height: 0;clear: both;}
</style>
