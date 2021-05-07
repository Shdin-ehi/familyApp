<template>
<div class="app-view-container" ref="view">
  <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
    <mu-flexbox-item grow="0">
       <app-calendar class="app-calendar" :shouldActivedDate="shouldActivedDate" @selected="handleSelected" @monthChange="handleMonthChange" :maxDate="today"/>
    </mu-flexbox-item>
    <mu-flexbox-item class="app-content">
      <timeline>
        <timeline-item class='timepoint-empty' v-if="descMemos.length==0||!isEqualDate(new Date(descMemos[0].start),today)" :date="dateFormat(today,'dd')" :month="transformMonth(today.getMonth()+1)">
            <span slot="icon">空</span>
            <i class="icon_family"></i>
            <div>噢哦~今天还没有记录大事件哦！</div>
        </timeline-item>
        <template v-for="item,j in descMemos">
          <timeline-item :primary="true" v-if="(j==0&&new Date(item.start).getFullYear()!==today.getFullYear())||(j>0&&new Date(item.start).getFullYear()!==new Date(descMemos[j-1].start).getFullYear())" :date="new Date(item.start).getFullYear()"></timeline-item>
          <timeline-item :date="dateFormat(item.start,'dd')" :month="transformMonth(new Date(item.start).getMonth()+1)" :class="'record'+dateFormat(item.start,'yyyyMMdd')">
            <div class="record-title">{{item.title}}</div>
            <div class="record-subtitle">{{dateFormat(item.start,'yyyy-MM-dd')}}</div>
            <div class="record-content">{{item.content}}</div>
            <div class="record-action"><mu-flat-button class="size-s" label="文件列表" labelPosition="before" icon="unfold_more" color="#34867e" @click="toggleFilelist(item.id)"/></div>
            <app-file-list v-if="typeof fileListState[item.id]!=='undefined'" v-show="fileListState[item.id]&&fileListState[item.id].show"  @click="handleFileClick" :list="fileListState[item.id]?fileListState[item.id].list:[]"></app-file-list>
            <div class="file-loading" v-if="fileListState[item.id]&&fileListState[item.id].loading">文件加载中</div>
          </timeline-item>
        </template>
      </timeline>
      <div class="app-floatbtn-bar">
        <mu-float-button icon="add" mini class="demo-float-button"/>
      </div>
    </mu-flexbox-item>
  </mu-flexbox>
</div>
</template>

<script>
  import Vue from 'vue'
  import {isEqualDate,transformMonth,dateFormat} from 'scripts/common'

  import {timeline,timelineItem} from 'components/timeline'
  Vue.component(timeline.name, timeline)
  Vue.component(timelineItem.name, timelineItem)

  import services from 'services'
  export default {
    data:function() {
      return {
        today:new Date(),
        displayDate:new Date().setDate(1),
        memos:[],
        fileListState:{}
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
      activeDay:function() {
        //计算特殊日期
        return this.memos.map(function(o){return o.start})
      },
      descMemos:function() {
        //排序后的纪念日
        this.loopYear=null;
        return this.memos.sort(function(item1,item2){
          return new Date(item1.start).getTime()<new Date(item2.start).getTime()
        })
      },
      lastFullPaths:function(){ return this.$store.getters.lastFullPaths }
    },
    mounted:function() {
      this.getData();
    },
    beforeRouteUpdate (to,form,next){
      this.getData();
      next()
    },
    beforeRouteLeave (to,form,next){
      if (window.$&&$.fancybox&&$.fancybox.getInstance()&&this.lastFullPaths[0]==to.fullPath) {
        $.fancybox.close();
        next(false)
      }else{
        window.$&&$.fancybox&&$.fancybox.close();
        next()
      }
    },
    methods:{
      getData (){
        //获取本月大事件
        services.BigEventService.getMemos({
          data:{
            inMonthFirstDate:this.inMonthFirstDate,//本月第一天
            inMonthLastDate:this.inMonthLastDate//本月最后一天
          },
          success:(data)=>{
            this.memos=data
          }
        })
      },
      handleSelected (date) {
        //选择日期，跳转至对应日期的大事件上
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
       transformMonth:transformMonth,
      handleFileClick (fileData){
        //点击下载文件
        alert(JSON.stringify(fileData))
      },
      toggleFilelist (id){
        var vm=this
        if (!this.fileListState[id]){
          this.$set(this.fileListState,id,{show:false,loading:true})
          //获取文件列表
          services.BigEventService.getMemoFile({
            data:{
              id:id
            },
            success:(data)=>{
              vm.$set(vm.fileListState[id],'list',data)
            },
            complete:()=>{
              vm.$set(vm.fileListState[id],'loading',false)
            }
          })
        }
        this.$set(this.fileListState[id],'show',!this.fileListState[id].show)
      }
    }
  }
</script>

<style>
.record-title{color: #338bc8;font-size: 14px;}
.record-subtitle{color: #999;font-size: 12px;line-height:18px;}
.record-content{color: #494949;padding:2px 0}
.record-action{text-align: right;}
.file-loading{color: #999;text-align: center;font-size: 12px;}

</style>
