<template>
<div class="app-view-container" ref="view">
  <div class="app-img-title"><img src="../assets/images/title_archives.png"></div>
  <mu-list class="app-list" v-show="!$route.params.cateId||openCategory">
    <template v-for="item,j in fileCategorys">
      <mu-divider v-if="j!==0" />
      <mu-list-item class="item-large" :to="{name:'archivesList',params:{cateId:item.id},query:{belong:$route.query.belong}}" @click.native="openCategory=false">
        <div slot="title">{{item.name}}</div>
        <div class="app-item-icon" slot="left"><img :src="item.icon"></div>
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
    </template>
  </mu-list>
  <div class="app-floatbtn-bar" v-show="!$route.params.cateId||openCategory">
    <mu-float-button icon="add" mini class="demo-float-button"/>
  </div>

  <mu-list class="app-list" v-show="$route.params.cateId&&!openCategory">
    <template v-for="item,j in fileCategorys">
      <mu-list-item class="item-large" v-if="$route.params.cateId+''===item.id+''" @click.native="openCategory=true">
        <div slot="title">{{item.name}}</div>
        <div class="app-item-icon" slot="left"><img :src="item.icon"></div>
        <mu-icon value="expand_more" slot="right"/>
      </mu-list-item>
    </template>
  </mu-list>
  <keep-alive><router-view name='list' v-show="!openCategory"></router-view></keep-alive>
</div>
</template>

<script>
  import services from 'services'
  export default {
    data:function() {
      return {
        openCategory:false,
        fileCategorys:[]
      }
    },
    computed:{
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
        var vm=this
        //获取类型列表
        services.ArchiveService.getFileCategorys({
          success:(data)=>{
            vm.fileCategorys=data
          }
        })
      }
    }
  }
</script>

<style>
</style>
