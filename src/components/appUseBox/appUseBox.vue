<template>
<div class="app-user-box">
    <router-link class="app-user-img-wr" :to="to||''">
        <img class="app-user-img" v-if="avatar" :src="avatar" @load="setImgSize">
        <img class="app-user-img" v-else src="./avatar-default.png" @load="setImgSize">
    </router-link>
    <div class="app-user-name">{{username||''}}</div>
    <div class="app-user-other">
        <slot></slot>
    </div>
</div>
</template>

<script>
/**
 * 用户信息框模块
 * @module components/appUserBox
 * @requires scripts/common
 * @param {String} avatar 头像url
 * @param {String} username 用户名
 * @param {Object} to 头像链接地址
 * @example
 * <app-user-box :avatar="user.avatar" :username="user.username" :to="{name:'userData'}">
    <div>手机号：13549315</div>
  </app-user-box>
   
  slots：
  	default 名称之后 
 */
  import {setImgSize} from 'scripts/common'
  export default {
	name: 'app-user-box',
    data:function() {
      return {}
    },
    props:{
        avatar:{
            'type':String
        },
        username:{
            'type':String
        },
    	to:{
            'type':Object
    	}
    },
    methods:{
        setImgSize
    }
  }
</script>

<style>
    .app-user-box{text-align: center;padding: 10px;position: relative;}
    .app-user-img-wr{display:block;text-align: center;margin:auto;position: relative;height: 110px;width: 110px;overflow: hidden;border-radius: 50%;border:3px solid #fff;background-color: #fff;-webkit-tap-highlight-color:rgba(255,255,255,.1)}
    .app-user-img-wr img{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);}
    .app-user-name{font-size: 16px;color: #338bc8;padding:10px 0 5px 0}
    .app-user-other{font-size: 13px;color: #666;}
</style>
