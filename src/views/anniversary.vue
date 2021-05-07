<template>
<div class="app-view-container" ref="view">
  <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
    <mu-flexbox-item grow="0">
      <app-calendar class="app-calendar skin-anniversary" :shouldActivedDate="shouldActivedDate" @selected="handleSelected" @monthChange="handleMonthChange"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="app-content">
      <mu-list class="app-list" style="border: none;margin-bottom:16px">
        <mu-sub-header>纪念日提醒</mu-sub-header>
        <template v-for="item,j in descAnniversaryList">
          <mu-divider v-if="j!==0" />
          <mu-list-item class="item-large" :class="'record'+dateFormat(item.start,'yyyyMMdd')" :to="{name:'anniversaryPage',params:{id:item.id},query:{type:item.anniversaryType}}">
            <div class="app-item-icon" slot="left" v-if="item.anniversaryType==1"><img class="is-round" src="../assets/images/sign_birthday.png"></div>
            <div class="app-item-icon" slot="left" v-if="item.anniversaryType==2"><img class="is-round" src="../assets/images/sign_family.png"></div>
            <div class="app-item-icon" slot="left" v-if="item.anniversaryType==3"><img class="is-round" src="../assets/images/sign_marry.png"></div>
            <div class="app-item-icon" slot="left" v-if="item.anniversaryType==4"><img class="is-round" src="../assets/images/sign_other.png"></div>
            <div slot="title">{{item.title}}</div>
            <mu-icon-menu slot="right" icon="more_vert" :anchorOrigin="{horizontal: 'right', vertical: 'top'}" :targetOrigin="{horizontal: 'right', vertical: 'top'}" @click.native.prevent="">
              <mu-menu-item title="编辑" @click="$router.push({name:'anniversaryEdit',params:{id:item.id,action:'edit'}})"/>
              <mu-menu-item title="删除" @click="deleteItem(item)"/>
            </mu-icon-menu>
            <div slot="describe">
              {{new Date(item.start).getFullYear()+'年'+new Date(item.start).getMonth()+'月'+new Date(item.start).getDate()+'日'}}
            </div>
          </mu-list-item>
        </template>
      </mu-list>
      <div class="app-floatbtn-bar">
        <mu-float-button icon="add" mini class="demo-float-button" :to="{name:'anniversaryEdit',params:{id:'0',action:'add'}}"/>
      </div>
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
  import Vue from 'vue'
  import {isEqualDate,transformMonth,dateFormat} from 'scripts/common'
  import services from 'services'
  export default {
    data () {
      return {
        today:new Date(),
        selectedDate:new Date(),
        displayDate:new Date().setDate(1),
        anniversaryList:[],
        dialog:false,
        selectItem:[],
      }
    },
    computed:{
       inMonthFirstDate (){
        //获取月份最后一天
        return new Date(new Date(this.displayDate).getFullYear(),new Date(this.displayDate).getMonth(),1)
       },
       inMonthLastDate (){
        //获取月份最后一天
        return new Date(new Date(this.displayDate).getFullYear(),new Date(this.displayDate).getMonth()+1,0,23,59,59)
       },
      activeDay () {
        //计算特殊日期
        return this.anniversaryList.map(function(o){return o.start})
      },
      descAnniversaryList () {
        //排序后的纪念日
        this.loopYear=null;
        return this.anniversaryList.sort(function(item1,item2){
          return new Date(item1.start).getTime()<new Date(item2.start).getTime()
        })
      }
    },
    mounted () {
      this.getData();
    },
    beforeRouteUpdate (to,form,next){
      this.getData();
      next()
    },
    methods:{
      getData (){
        //获取
        services.AnniversaryService.getAnniversaryList({
            data:{
            inMonthFirstDate:this.inMonthFirstDate,//本月第一天
            inMonthLastDate:this.inMonthLastDate//本月最后一天
          },
          success:(data)=>{
            this.anniversaryList=data
          }
        })
      },
      handleSelected (date) {
        this.selectedDate=date
        //选择日期，跳转至对应日期的记录上
        var record=document.querySelector('.record'+this.dateFormat(date,'yyyyMMdd'));
        record!== null&&(this.$refs.view.scrollTop=record.offsetTop)
      },
      handleMonthChange (displayDate) {
        //月份切换，displayDate为显示月份的1号
        this.displayDate=displayDate
        this.getData ()
      },
      shouldActivedDate (day) {
        //特殊日期
        for(var item of this.activeDay) {
          if(isEqualDate(new Date(item),day))
            return true
        }
        return false
      },
       isEqualDate:isEqualDate,
       dateFormat: dateFormat,
       deleteItem (item){
          this.selectItem=[item]
          this.dialog=true
       },
       comfirmDelete (){
        var vm=this
        this.dialog=false
        this.setLoading(true)
        //删除纪念日
        services.AnniversaryService.deleteAnniversary({
            data:{
              id: vm.selectItem[0].id
            },
            success:(data)=>{
              vm.$delete(vm.anniversaryList,vm.anniversaryList.indexOf(vm.selectItem[0]))
              vm.selectItem=[]
              vm.showToast('删除成功')
            },
            error:()=>{
              this.showToast('删除失败')
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
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      showToast (toastText,time,callback){  this.$store.dispatch('showToast',{toastText,time,callback}) },
      hideToast (){  this.$store.dispatch('hideToast') }
    }
  }
</script>

<style>
.record-title{color: #338bc8;font-size: 14px;}
.record-subtitle{color: #999;font-size: 12px;line-height:18px;}
.record-content{color: #494949;padding:2px 0}
.record-action{text-align: right;}
</style>
