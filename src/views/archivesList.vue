<template>
  <mu-list class="app-list">
    <mu-select-field v-model="ownerId" label="档案所属" :fullWidth="true" @change="getData" style="padding:0 20px" v-if="$route.query.belong!=='person'">
      <mu-menu-item v-for="user in userlist" :value="user.id" :title="user.username"/>
    </mu-select-field>
    <template v-for="item,j in list">
      <mu-divider v-if="j!==0" />
      <mu-list-item disableRipple  class="item-disable-ripple item-large" :to="{name:'archiveEdit',params:{id:item.id,action:'edit'}}">
        <div slot="title">{{item.fileTitle}}</div>
        <mu-icon slot="right" value="chevron_right"/>
        <mu-row slot="describe">
          <mu-col width="60" tablet="40">日期：{{item.lastOperatorTime}}</mu-col>
          <mu-col width="40" tablet="30">期限：{{item.deadlineName}}</mu-col>
          <mu-col width="100" tablet="30">载体类型：{{item.carrierName}}</mu-col>
        </mu-row>
      </mu-list-item>
    </template>
    <div class="app-floatbtn-bar">
      <mu-float-button icon="add" mini class="demo-float-button" :to="{name:'archiveEdit',params:{id:'0',action:'add'}}"/>
    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </mu-list>
</template>

<script>
  import services from 'services'
  export default {
    data:function() {
      return {
        openDrawer:false,
        userlist:[],
        list:[],
        ownerId:null,
        currentPage:0,
        totalPage:1,
        loading: false,
        scroller: null
      }
    },
    computed:{
    },
    mounted () {
      this.scroller = this.$parent.$refs.view;

      if (this.$route.query.belong!=='person'&&!this.ownerId) {
        //所属家庭成员时，获用户列表
        services.FamilyService.getFamilyMembers({
          success:(data)=>{
            this.userlist=data
            this.ownerId=this.userlist[0].id
            this.getData ()
          }
        })
      }else{
        this.getData ()
      }
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
          data:{
            ownerId:vm.ownerId,
            cateId:vm.cateId,
            page:vm.currentPage+1,
            pageSize:10
          },
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
