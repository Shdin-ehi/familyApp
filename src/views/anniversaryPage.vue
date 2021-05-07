<template>
  <div class="anniversary-page" :class="'anniversary-page-'+$route.query.type||itemData.anniversaryType">
    <mu-appbar class="app-popup-topbar" title="">
      <mu-icon-button icon="arrow_back" @click.native="cancel()" slot="left"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="编辑" @click="$router.push({name:'anniversaryEdit',params:{action:'edit'}})"/>
        <mu-menu-item title="删除" @click="deleteItem()"/>
      </mu-icon-menu>
    </mu-appbar>
    <mu-flexbox class="anniversary-page-content">
       <mu-flexbox-item>
        <div class="anniversary-page-content-day"><em>xxxx</em><span>天</span></div>
        <div class="anniversary-page-content-title">{{itemData.title}}</div>
        <div class="anniversary-page-content-time">{{itemData.start}}</div>
       </mu-flexbox-item>
    </mu-flexbox>
     <mu-dialog :open="dialog" title="警告" @close="close('dialog')">
      是否要删除该纪念日？
      <mu-flat-button slot="actions" @click="close('dialog')" default label="取消"/>
      <mu-flat-button slot="actions" primary @click="comfirmDelete" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
import {dateFormat} from 'scripts/common'
  import services from 'services'
export default {
  data () {
    return {
      itemData:{},
      dialog:false,
    }
  },
  computed:{
  },
  components:{
  },
  mounted () {
    this.getData();
  },
  beforeRouteUpdate (to,form,next){
    this.getData();
    next()
  },
  methods: {
    getData (){
      var vm=this
      //获取纪念日信息
      services.AnniversaryService.getAnniversary({
        data:{
          id: vm.itemData.id
        },
        success:(data)=>{
          vm.itemData=data
          vm.itemData.start=dateFormat(vm.itemData.start,'YYYY年M月D日')
        }
      })
    },
    cancel (){
      this.$root.$router.back()
    },
     deleteItem (){
        this.dialog=true
     },
     comfirmDelete (){
      var vm=this
      this.dialog=false
      this.setLoading(true)
      //删除纪念日
      services.AnniversaryService.deleteAnniversary({
        data:{
          id: vm.itemData.id
        },
        success:(data)=>{
          vm.showToast('删除成功',800,vm.cancel)
        },
        error:()=>{
          vm.showToast('删除失败')
        },
        complete:()=>{
          vm.setLoading(false)
        }
      })
     },
       open (contrl) {
        this[contrl] = true
      },
      close (contrl) {
        this[contrl] = false
      },
      dateFormat,
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (toastText,time,callback){  this.$store.dispatch('showToast',{toastText,time,callback}) },
      hideToast (){  this.$store.dispatch('hideToast') }
  }
}
</script>

<style>
.anniversary-page{position: absolute;top: 0;bottom:-44px;left: 0;right: 0;z-index: 10;background-size: cover;background-repeat: no-repeat;background-position: center;}
.anniversary-page-1{background-image: url(../assets/images/bg_anniversary_birthday.jpg);}
.anniversary-page-2{background-image: url(../assets/images/bg_anniversary_family.jpg);}
.anniversary-page-3{background-image: url(../assets/images/bg_anniversary_marry.jpg);}
.anniversary-page-4{background-image: url(../assets/images/bg_anniversary_other.jpg);}
.anniversary-page-content{position: absolute;bottom: 0;left: 0;right: 0;top: 50%;padding-top:50px;padding-left:40px;padding-right:20px;color: #fff;font-size:16px;}
.anniversary-page-2 .anniversary-page-content{color: #4b4b4b}
.anniversary-page-3 .anniversary-page-content{color: #715940}
.anniversary-page-4 .anniversary-page-content{color: #745236}
.anniversary-page-content-day em{font-size:50px;vertical-align: text-top;display: inline-block;line-height:64px;font-style: normal;}
.anniversary-page-content-day span{font-size:16px; vertical-align: text-top;display: inline-block;line-height: 44px;margin-left: 5px;font-weight: bold;}
.anniversary-page-content-title{margin-top: 5px;font-size:20px;}
</style>
