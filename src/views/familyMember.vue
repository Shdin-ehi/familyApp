<template>
<div class="app-view-container">
  <app-user-box :avatar="user.photoView" :username="user.userName">
    <div>档案所属号：{{user.ownerIdcard}}</div>
  </app-user-box>
  <div class="app-lefttop-btn-wr"><mu-raised-button class="size-s" label="返回" @click.native="$router.back()"/></div>
  <mu-list class="app-list">
     <mu-list-item title="家庭角色">
       <div slot="after">{{user.familyRole}}</div>
     </mu-list-item>
  </mu-list>
   <mu-list class="app-list">
     <mu-list-item title="真实姓名">
       <div slot="after">{{user.ownerName}}</div>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="手机号码">
       <div slot="after">{{user.phone}}</div>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="联系地址">
       <div slot="after">{{user.linkAddress}}</div>
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
        user:{id:'',userName:'',ownerIdcard:'',photoView:'',familyRole:'',ownerName:'',phone:'',linkAddress:''}
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
        services.FamilyService.getFamilyMemberData({data:{userId:this.$route.params.id},
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
