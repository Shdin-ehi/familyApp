<template>
<div class="timeline">
	<slot></slot>
</div>
</template>

<script>
/**
 * 时间线模块
 * @module components/timeline/timeline
 * @requires components/timeline/timelineItem
 * @example
 * <timeline>
    <timeline-item class='timepoint-empty' :date="04" :month="五月">
        <span slot="icon">空</span>
        <i class="icon_family"></i>
        <div>噢哦~今天还没有记录大事件哦！</div>
    </timeline-item>
  </timeline>

  slots：
  	default 容器里
 */
  export default {
 		name: 'timeline',
    data:function() {
      return {
      }
    }
  }
</script>

<style>
.timeline {  position: relative; padding: 0px 0px 30px 54px;  margin: 10px 0px 0px 0px;overflow: hidden;line-height: 26px;} 
.timeline:before {content:'';position:absolute;top:-8px;left:69px;height:100%;width:0;border-right:1px dashed #999;}
</style>
