<template>
<transition name="fade">
    <div class="app-loading" :style='{"background-color":"rgba(0,0,0,"+(backgroundColor+"")+")"}'>
        <div class="app-loading-ceter">
            <mu-circular-progress :size="55" :strokeWidth="4" color="rgba(255,255,255,.68)"/>
        </div>
    </div>
</transition>
</template>

<script>
/**
 * loading模块 
 * @module components/appLoading
 * @requires muse-ui
 * @param {String|Number} backgroundColor=0 背景透明度0~1
 * @param {Number} timeLimit=10000 超时时间设置
 * @listens timeout 超时时触发
 * @example
 * <app-loading v-if="loading" @timeout="setLoading(false)"></app-loading>
 */
  export default {
    name: 'app-loading',
    data:function() {
      return {
      }
    },
    props:{
        backgroundColor:{
            'type':[String,Number],
            'default':'0'
        },
        timeLimit:{
            'type':Number,
            'default':10000
        }
    },
    mounted (){
       var vm=this
       setTimeout(function(){
           vm.$emit('timeout')
       },vm.timeLimit)
    }
  }
</script>

<style>
    .app-loading{position: absolute;z-index: 999999;top: 0;bottom: 0;left: 0;right: 0;}
    .app-loading-ceter{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);padding: 10px;background-color: rgba(0,0,0,.5);border-radius: 10px;width:75px;height:75px;box-shadow:3px 3px 3px rgba(150,150,150,.3);}
</style>
