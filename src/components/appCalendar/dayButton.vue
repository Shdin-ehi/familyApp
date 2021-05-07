<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hover: false
    }
  },
  computed: {
    isNow () {
      const now = new Date()
      return this.date && this.date.getYear() === now.getYear() && this.date.getMonth() === now.getMonth() && this.date.getDate() === now.getDate()
    },
    dayButtonClass () {
      return {
        selected: this.selected,
        hover: this.hover,
        'mu-day-button': true,
        disabled: this.disabled,
        now: this.isNow
      }
    }
  },
  methods: {
    handleHover () {
      if (this.isPC() && !this.disabled) this.hover = true
    },
    handleHoverExit () {
      this.hover = false
    },
    handleClick (event) {
      this.$emit('click', event)
    },
    getUA () {  
      return window.navigator.userAgent.toLowerCase()
    },
    isAndroid () {
      return (/android|htc/i.test(this.getUA()))||(/linux/i.test(window.navigator.platform+""))
    },
    //判断是否是IPad
    isIPad () {
      return !this.isAndroid()&&(/ipad/i.test(this.getUA()))
    },
    //判断是否是IPhone
    isIPhone () {
      return !this.isAndroid()&&(/ipod|iphone/i.test(this.getUA()))
    },
    isIOS () {
      return this.isIPad()||this.isIPhone()
    },
    isWinPhone () {
      return (/windows phone/i.test(this.getUA()))
    },
    isPC () {
      return !this.isAndroid() && !this.isIOS() && !this.isWinPhone()
    }
  },
  render (h) {
    return this.date ? h('button', {
      class: this.dayButtonClass,
      on: {
        mouseenter: this.handleHover,
        mouseleave: this.handleHoverExit,
        click: this.handleClick
      },
      domProps: {
        disabled: this.disabled
      }
    }, [
      h('div', {class: 'mu-day-button-bg'}),
      h('span', {
        class: 'mu-day-button-text',
        domProps: {
          innerHTML: this.date.getDate()
        }
      })
    ]) : h('span', {class: 'mu-day-empty'})
  }
}
</script>

<style>

</style>
