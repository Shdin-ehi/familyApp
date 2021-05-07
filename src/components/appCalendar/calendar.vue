<template>
<div class="mu-calendar" :class="{'mu-calendar-landspace': mode === 'landscape'}">
  <div class="mu-calendar-container">
    <div class="mu-calendar-monthday-container" v-if="displayMonthDay">
      <calendar-toolbar :slideType="slideType" :nextMonth="nextMonth" :prevMonth="prevMonth" @monthChange="handleMonthChange" :displayDates="displayDates" :dateTimeFormat="dateTimeFormat" />
      <div class="mu-calendar-week">
        <span class="mu-calendar-week-day" v-for="weekText, index in weekTexts" :key="index">{{weekText}}</span>
      </div>
      <div class="mu-calendar-monthday">
        <transition :name="'mu-calendar-slide-' + slideType" v-for="displayDate, index in displayDates" :key="index">
          <div class="mu-calendar-monthday-slide" :key="displayDate.getTime()" >
            <calendar-month @selected="handleSelected" :shouldDisableDate="shouldDisableDate" :displayDate="displayDate" :firstDayOfWeek="firstDayOfWeek" :maxDate="maxDate" :minDate="minDate" :selectedDate="selectedDate" :shouldActivedDate="shouldActivedDate" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</div>
</template>

<script> 
/**
 * 日历面板模块。 部分参数详细介绍见文档{@link http://www.muse-ui.org/#/datePicker}
 * @module components/appCalendar
 * @requires muse-ui
 * @requires keycode
 * @param {Object} dateTimeFormat 时间格式化对象，见文档
 * @param {Number} firstDayOfWeek=1 那一天作为一个星期的开始， 默认星期一， 有些情况可能会设置成星期日(0)
 * @param {Date} initialDate=today 初始化显示的日期
 * @param {Date} maxDate 可选择的最大日期
 * @param {Date} minDate 可选择的最小日期
 * @param {String} mode=portrait 竖屏显示，landscape横屏显示
 * @param {Function} shouldDisableDate 判断日期是否不可用的函数，参数为当前做判断的日期,所有返回true的为匹配日期
 * @param {Function} shouldActivedDate 判断日期处于活动状态的函数，参数为当前做判断的日期,所有返回true的为匹配日期
 * @listens selected 日期被选择时触发的事件，参数为被点击日期date
 * @listens monthChange 月份变化时触发，参数为新月份第一天的date
 * @example
 * <app-calendar class="app-calendar" :maxDate="today" :shouldDisableDate="shouldDisableDate" :shouldActivedDate="shouldActivedDate" @selected="handleSelected" @monthChange="handleMonthChange"/>
 */
import calendarToolbar from './calendarToolbar'
import calendarMonth from './calendarMonth'
import * as dateUtils from 'muse-components/datePicker/dateUtils'
import keycode from 'keycode'
export default {
  name:"app-calendar",
  props: {
    dateTimeFormat: {
      type: Object,
      default () {
        return dateUtils.dateTimeFormat
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    initialDate: {
      type: Date,
      default () {
        return new Date()
      }
    },
    maxDate: {
      type: Date,
      default () {
        return dateUtils.addYears(new Date(), 100)
      }
    },
    minDate: {
      type: Date,
      default () {
        return dateUtils.addYears(new Date(), -100)
      }
    },
    mode: {
      type: String,
      default: 'portrait',
      validator (val) {
        return val && ['portrait', 'landscape'].indexOf(val) !== -1
      }
    },
    shouldDisableDate: {
      type: Function
    },
    shouldActivedDate: {
      type: Function
    }
  },
  data () {
    const displayDate = dateUtils.cloneDate(this.initialDate)
    displayDate.setDate(1)
    return {
      weekTexts: this.dateTimeFormat.getWeekDayArray(this.firstDayOfWeek),
      displayDates: [displayDate],
      selectedDate: this.initialDate,
      slideType: 'next',
      displayMonthDay: true
    }
  },
  computed: {
    prevMonth () {
      return this.displayDates && dateUtils.monthDiff(this.displayDates[0], this.minDate) > 0
    },
    nextMonth () {
      return this.displayDates && dateUtils.monthDiff(this.displayDates[0], this.maxDate) < 0
    }
  },
  methods: {
    handleMonthChange (val) {
      const displayDate = dateUtils.addMonths(this.displayDates[0], val)
      this.changeDislayDate(displayDate)
      this.$emit("monthChange",displayDate)
    },
    handleSelected (date) {
      this.setSelected(date)
      this.$emit("selected",date)
    },
    setSelected (date) {
      this.selectedDate = date
      this.changeDislayDate(date)
    },
    changeDislayDate (date) {
      const oldDate = this.displayDates[0]
      if (date.getFullYear() === oldDate.getFullYear() && date.getMonth() === oldDate.getMonth()) return
      this.slideType = date.getTime() > oldDate.getTime() ? 'next' : 'prev'
      const displayDate = dateUtils.cloneDate(date)
      displayDate.setDate(1)
      this.displayDates.push(displayDate)
      this.displayDates.splice(0, 1)
    }
  },
  mounted () {
   
  },
  beforeDestory () {
   
  },
  watch: {
    initialDate (val) {
      this.selectedDate = val
    }
  },
  components: {
    'calendar-toolbar': calendarToolbar,
    'calendar-month': calendarMonth
  }
}
</script>

<style >


</style>
