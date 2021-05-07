<template>
<div class="mu-calendar-monthday-content">
  <div class="mu-calendar-monthday-row" :key="i"  v-for="week, i in weeksArray">
    <day-button @click="handleClick(date)" v-for="date, j in week" :disabled="isDisableDate(date)"  :class="{'day-active':isActiveDate(date)}" :key="'dayButton' + i + '' + j" :selected="equalsDate(date)" :date="date"></day-button>
  </div>
</div>
</template>

<script>
import dayButton from './dayButton'
import * as dateUtils from 'muse-components/datePicker/dateUtils'
export default {
  props: {
    displayDate: {
      type: Date
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    maxDate: {
      type: Date
    },
    minDate: {
      type: Date
    },
    selectedDate: {
      type: Date
    },
    shouldDisableDate: {
      type: Function
    },
    shouldActivedDate: {
      type: Function
    }
  },
  data () {
    return {
      weeksArray: dateUtils.getWeekArray(this.displayDate || new Date(), this.firstDayOfWeek)
    }
  },
  methods: {
    equalsDate (date) {
      return dateUtils.isEqualDate(date, this.selectedDate)
    },
    isDisableDate (day) {
      if (day === null) return false
      let disabled = false
      if (this.maxDate && this.minDate) disabled = !dateUtils.isBetweenDates(day, this.minDate, this.maxDate)
      if (!disabled && this.shouldDisableDate) disabled = this.shouldDisableDate(day)
      return disabled
    },
    isActiveDate (day) {
      if (day === null) return false
      let active = false
      if (this.maxDate && this.minDate&& !dateUtils.isBetweenDates(day, this.minDate, this.maxDate)) 
        return false;
      if (this.shouldActivedDate) active = this.shouldActivedDate(day)
      return active
    },
    handleClick (date) {
      if (date) this.$emit('selected', date)
    }
  },
  watch: {
    displayDate (val) {
      return dateUtils.getWeekArray(val || new Date(), this.firstDayOfWeek)
    }
  },
  components: {
    'day-button': dayButton
  },
  mounted:function() {
  }
}
</script>

<style >

</style>
