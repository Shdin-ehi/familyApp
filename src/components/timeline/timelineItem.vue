<template>
<div class="timepoint" :class="{'timepoint-primary':primary,'timepoint-secondary':!primary}">
  <div class="timepoint-date">
    <div class="timepoint-date-date">{{date}}</div>
    <div class="timepoint-date-month">{{month}}</div>
  </div>
  <i class="timepoint-i"><slot name="icon"></slot></i>
  <div class="timepoint-content" v-if="!primary">
    <slot></slot>
  </div>
</div>
</template>

<script>
/**
 * 时间线子模块
 * @module components/timeline/timelineItem
 * @param {String|Number} date 显示的日期
 * @param {Boolean} primary=false 是否是年份节点
 * @param {String|Number} month 月份节点显示的月份
 * @example
 * <timeline>
    <timeline-item class='timepoint-empty' :date="'24'" :month="'五月'">
        <span slot="icon">空</span>
        <i class="icon_family"></i>
        <div>噢哦~今天还没有记录大事件哦！</div>
    </timeline-item>
    <timeline-item :primary="true" :date="'2017年'"></timeline-item>
    <timeline-item :date="'11'" :month="'四月'" :class="'record'+dateFormat(item.start,'yyyyMMdd')">
      <div class="record-title">{{item.title}}</div>
      <div class="record-subtitle">{{dateFormat(item.start,'yyyy-MM-dd')}}</div>
      <div class="record-content">{{item.content}}</div>
    </timeline-item>
  </timeline>

  slots：
    default 时间线内容
 */
  export default {
 		name: 'timeline-item',
    data:function() {
      return {
      }
    },
    props:{
      primary: {
        type: Boolean,
        default: false
      },
      month: {
        type: [String,Number]
      },
      date: {
        type: [String,Number]
      }
    }
  }
</script>

<style>
.timepoint {  position: relative;  margin: 0px; line-height:22px;font-size: 13px;min-height: 48px;} 
.timepoint+.timepoint{  margin-top: 24px;} 
.timepoint-primary+.timepoint-secondary{margin-top: 10px;}
.timepoint-i{display: inline-block;position: absolute;top: 0px;left: 0px;width:22px;height: 22px;border-radius:50%;box-shadow: 1px 1px 2px 2px rgba(150,150,150,.3)}
.timepoint-primary .timepoint-i{background: url('./icon_time.png') no-repeat center center;background-size:100%; background-color:#50aceb;margin-left: 4px;margin-top: 2px;}
.timepoint-secondary .timepoint-i{width:30px;height:30px;background: url('./icon_timepoint.png') no-repeat center center;background-size:69%;background-color:#f6f6f6}
.timepoint-date{position: absolute;right: 100%;top: 0px;margin-right: 10px;width: 44px;text-align: right;}
.timepoint-primary .timepoint-date{color: #000;font-size: 16px;}
.timepoint-secondary .timepoint-date{color: #494949;font-size: 18px;}
.timepoint-date-month{color:#494949;font-size: 14px;}
.timepoint-content{margin-left:46px;color:#444;padding: 4px 4px 4px 8px;min-height: 26px; line-height: 20px;background-color: #f8faff;border: 1px solid #d0d0d0;position: relative;font-size: 12px}
.timepoint-content:before{content: '';display: block;position: absolute; top: 10px;right: 100%;border-right:8px solid #d0d0d0; border-bottom:5px solid transparent; border-top:5px solid transparent; }
.timepoint-content:after{content: '';display: block;position: absolute; top: 11px;right: 100%;border-right:7px solid #f8faff; border-bottom:4px solid transparent; border-top:4px solid transparent; }

</style>
