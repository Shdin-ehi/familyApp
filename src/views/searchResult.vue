<template>
<div class="app-view-container">
  <mu-appbar class="app-popup-topbar">
    <mu-raised-button class="size-s" label="返回" slot="left" @click="$router.back()"/>
    <mu-raised-button class="size-s" label="重新检索" icon="search" slot="right" primary  @click="getData ()"/>
  </mu-appbar>
  <div class="app-popup-content" ref="scrollContainer">
    <mu-list class="app-list">
      <template v-for="item,j in list">
        <mu-divider v-if="j!==0" />
        <mu-list-item  disableRipple  class="item-disable-ripple item-large" :to="{name:'archiveEdit',params:{id:item.id,action:'edit'}}">
          <div slot="title">{{item.fileTitle}}</div>
          <mu-icon slot="right" value="chevron_right"/>
          <mu-row slot="describe">
            <mu-col width="60" tablet="40">日期：{{item.lastOperatorTime}}</mu-col>
            <mu-col width="40" tablet="30">期限：{{item.deadlineName}}</mu-col>
            <mu-col width="100" tablet="30">载体类型：{{item.carrierName}}</mu-col>
          </mu-row>
        </mu-list-item>
      </template>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </mu-list>
  </div>
</div>
</template>

<script>
import services from 'services'
  export default {
    data:function() {
      return {
        list:[],
        currentPage:0,
        totalPage:1,
        loading: false,
        scroller: null
      }
    },
    computed:{
    },
    mounted () {
      this.scroller = this.$refs.scrollContainer;

      this.getData ()
    },
    beforeRouteUpdate (to,form,next){
      this.getData();
      next()
    },
    methods: {
      getData (){
        this.currentPage=0;
        this.list=[];
        this.loadMore ()
      },
      loadMore () {
        var vm=this;
        if (vm.currentPage>=vm.totalPage) return
        vm.loading = true
        //获取档案列表
        services.ArchiveService.getArchiveList({
          data:Object.assign({
            page:vm.currentPage+1,
            pageSize:10,
          },vm.$route.query),
          success:(data)=>{
            vm.currentPage==0&&(vm.list=[])
            vm.list=vm.list.concat(data.aaData);
            vm.totalPage=data.totalPage;
            vm.currentPage++
          },
          complete:()=>{
            vm.loading = false
          }
        })
      }
    }
  }
</script>

<style>
</style>
