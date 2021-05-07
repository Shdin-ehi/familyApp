<template>
  <div class="app-view-container" ref="view">
    <div class="app-img-title"><img src="../assets/images/title_album.png"></div>
    <mu-list class="app-list">
      <mu-list-item class="item-large" disableRipple>
        <div slot="title">
          <span v-if="!editingName">{{item.title}}</span>
          <vue-form :state="formstate" v-if="editingName">
            <validate>
              <mu-text-field ref="inputTitle" fullWidth name="title" v-model="item.title" required :maxlength="10" :errorText="matchError(formstate,'title',{required:'必填项',maxlength:'必须小于10个字符'})"/>
            </validate>
          </vue-form>
        </div>
        <div class="app-item-icon" slot="left"><div :style="{'height':'56px','width':'56px','border-radius':'50%','background':'url('+item.src+') center center / cover no-repeat '}"></div></div>
          <mu-raised-button class="size-s" label="编辑" primary v-show="!editingName"  @click.native="editStart" slot="after"/>
          <mu-raised-button class="size-s" label="保存" primary v-show="editingName"  @click.native="editEnd" slot="after"/>
      </mu-list-item>
    </mu-list>
    <div class="gallary-container" style="margin-top:8px">
      <div class="gallary-item">
        <router-link :to="{name:'albumAdd'}" class="picker">
          <img src="../assets/images/picker.png" style="height:40px" />
        </router-link>
      </div>
    </div>
    <template v-for="itemList,i in listArray">
      <mu-sub-header>{{dateFormat(itemList[0].uploadTime,'YYYY年M月D日')}}</mu-sub-header>
      <div class="gallary-container">
        <div class="gallary-item" v-for="item,j in itemList">
          <v-img :src="item.src"  :thumb="item.thumb"  :title="item.title" @load="setImgSize" />
        </div>
      </div>
    </template>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
  import {dateFormat,setImgSize} from 'scripts/common'
  import services from 'services'
  export default {
    data:function() {
      return {
        editingName:false,
        formstate:{},
        item:{},
        list:[],
        currentPage:0,
        totalPage:1,
        loading: false,
        scroller: null
      }
    },
    computed:{
      listArray (){
        var theList=this.list.concat([])
        if (theList.length==0) {return []}
        if (theList.length==1) {return [theList]}
        var orderList=theList.sort(function(x,y){
          return parseInt(dateFormat(y.uploadTime,'YYYYMMDD'))-parseInt(dateFormat(x.uploadTime,'YYYYMMDD'))
        })
        var rs=[[orderList[0]]],groupNum=0,time=parseInt(dateFormat(orderList[0].uploadTime,'YYYYMMDD'));
        for (var i = 1; i < orderList.length; i++) {
          if (time==parseInt(dateFormat(orderList[i].uploadTime,'YYYYMMDD'))) {
            rs[groupNum].push(orderList[i])
          }else{
            groupNum++
            time=parseInt(dateFormat(orderList[i].uploadTime,'YYYYMMDD'))
            rs.push([orderList[i]])
          }
        }
        return rs
      },
      lastFullPaths:function(){ return this.$store.getters.lastFullPaths }
    },
    components:{
    },
    mounted (){
      var vm=this;
      vm.scroller = vm.$refs.view;
      vm.getData()
    },
    beforeRouteUpdate (to,form,next){
      this.getData()
      next()
    },
    // beforeRouteLeave (to,form,next){
    //   if (window.$&&$.fancybox&&$.fancybox.getInstance()&&this.lastFullPaths[0]==to.fullPath) {
    //     $.fancybox.close();
    //     next(false)
    //   }else{
    //     window.$&&$.fancybox&&$.fancybox.close();
    //     next()
    //   }
    // },
    methods: {
      getData (){
        //获取纪念日信息
        services.FamilyService.getAlbum({
          data:{id:this.$route.params.id},
          success:(data)=>{
            this.item=data
          }
        })
        this.currentPage=0;
        this.list=[];
        this.loadMore ()
      },
      loadMore () {
        var vm=this;
        if (vm.currentPage>=vm.totalPage) return
        vm.loading = true

        //获取纪念日信息
        services.FamilyService.getPhotos({
          data:{
            id:this.$route.params.id,
            day:vm.currentPage+1,
            daySize:4//一次加载4天的图片
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
      },
      dateFormat,
      setImgSize,
      editStart (){
        this.editingName=true
        setTimeout(()=>{
          this.$refs.inputTitle.$el.querySelector('input,textarea').focus()
        },0)
      },
      editEnd (){
        var vm=this
        if (vm.formstate.$invalid) {return}
        if (vm.formstate.$pristine) {vm.editingName=false;return}
        vm.setLoading(true)
        //修改相册基本信息
        services.FamilyService.editAlbum({
          data:{
            id:vm.$route.params.id,
            title:vm.item.title
          },
          success:(data)=>{
            vm.editingName=false
            vm.showToast('修改成功')
          },
          error:()=>{
            vm.showToast('修改失败，请重试')
          },
          complete:()=>{
            vm.setLoading(false)
          }
        })
      },
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (text,time){  this.$store.dispatch('showToast',{toastText:text,time:time}) },
      hideToast (){  this.$store.dispatch('hideToast') }
      
    }
  }
</script>

<style>
.gallary-container:after{display: block;content: '';visibility: hidden;height: 0;clear: both;}
.gallary-container .gallary-item{width:33.33%;height: 100px;max-width: 125px;float: left;margin:3px 0}
.gallary-container .gallary-item .picker{-webkit-tap-highlight-color: rgba(0,0,0,.1)}
.gallary-container a{display: block;width: 100px;height: 100px;margin: auto;position: relative;overflow: hidden;box-sizing:border-box;border:1px solid #e3e3e3;background-color: #fefefe;border-radius: 2px}
.gallary-container a img{position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)}
</style>
