<template>
<div class="app-view-container">
  <app-user-box :avatar="user.avatar" :username="user.username" :to="{name:'userData'}">
    <div>档案所属号：{{user.own}}</div>
  </app-user-box>
  <div class="app-righttop-btn-wr"><router-link class="app-righttop-btn" :to="{name:'userData'}">个人资料</router-link></div>
  <mu-list class="app-list">
    <template v-for="item,j in fileCategorys">
      <mu-divider v-if="j!==0" />
      <mu-list-item class="item-large" :to="{name:'archivesList',params:{cateId:item.id},query:{belong:'person'}}">
        <div slot="title">{{item.name}}</div>
        <div class="app-item-icon" slot="left"><img :src="item.icon"></div>
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
    </template>
  </mu-list>
</div>
</template>

<script>
  import appUseBox from 'components/appUseBox'
  import services from 'services'
  export default {
    data:function() {
      return {
        fileCategorys:[],
        user:{}
      }
    },
    computed:{
    },
    components:{
      'app-user-box':appUseBox
    },
    mounted () {
      this.getData()
    },
    beforeRouteUpdate (to,form,next){
      this.getData()
      next()
    },
    methods:{
      getData:function(){
        //通过cookie或localStorage获取用户信息
        this.user={id:'131',username:'月无缘',own:'xx00409',avatar:'static/demo/demo1.jpg',character:'女儿',realName:'',phone:'',address:'东莞市'}
        //获取档案类型
        services.ArchiveService.getFileCategorys({
          success:(data)=>{
            this.fileCategorys=data
          }
        })
      }
    }
  }
</script>

<style>
.app-righttop-btn-wr{position: absolute;right:10px;top:10px;}
.app-righttop-btn{display: inline-block;background-color: #338bc8;font-size: 14px;color: #fff;line-height: 32px;padding: 0 10px;text-align: center;-webkit-tap-highlight-color:rgba(255,255,255,.1)}
</style>
