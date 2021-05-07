<template>
<div class="app-view-container">
  <app-user-box :avatar="user.avatar" :username="user.username">
    <div>档案所属号：{{user.own}}</div>
  </app-user-box>
  <div class="app-lefttop-btn-wr"><mu-raised-button class="size-s" label="返回" @click.native="$router.back()"/></div>
  <mu-list class="app-list">
     <mu-list-item title="家庭角色">
       <div slot="after">{{user.character}}</div>
     </mu-list-item>
  </mu-list>
   <mu-list class="app-list">
     <mu-list-item title="真实姓名">
       <div slot="after">{{user.realName}}</div>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="手机号码">
       <div slot="after">{{user.phone}}</div>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="联系地址">
       <div slot="after">{{user.address}}</div>
     </mu-list-item>
   </mu-list>
</div>
</template>

<script>
  import appUseBox from 'components/appUseBox'
  import services from 'services'
  export default {
    data:function() {
      return {
        user:{id:'',username:'',own:'',avatar:'',character:'',realName:'',phone:'',address:''}
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
        //获取用户信息
        services.FamilyService.getFamilyMemberData({
          success:(data)=>{
            this.user=data
          }
        })
      }
    }
  }
</script>

<style>
.app-lefttop-btn-wr{position: absolute;left:10px;top:10px;}
</style>
