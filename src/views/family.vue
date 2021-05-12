<template>
  <div class="app-view-container">
    <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
      <mu-flexbox-item grow="0" class="app-img-title"><img src="../assets/images/title_home.png" style="margin:-5px auto -10px auto"></mu-flexbox-item>
      <mu-flexbox-item class="app-content">
        <app-menunav>
          <app-menunav-item v-for="item,j in items" :to="{name:'familyMember',params:{id:item.userId}}" :title="item.ownerName"><div :style="{'height':'100%','width':'100%','border-radius':'50%','background':'url('+item.photoView+') center center / cover no-repeat'}"></div></app-menunav-item>
        </app-menunav>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
  import services from 'services'
  export default {
    data:function() {
      return {
        items:[]
      }
    },
    mounted: function () {
      this.getData()
    },
    beforeRouteUpdate (to,form,next){
      this.getData()
      next()
    },
    methods: {
      getData (){
     
        //获取用户列表
        services.FamilyService.getFamilyMembers({
          success:(data)=>{
            this.items=data
          }
        })
      }
    }
  }
</script>

<style>
</style>
