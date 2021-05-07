<template>
  <div id="app">
    <div class="app-view-wrapper">
      <transition :name="transitionName"><router-view></router-view></transition>
    </div>
    <mu-paper class="app-footerbar-wrapper">
      <mu-bottom-nav shift :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="index" :to="{name:'index'}" title="主页" icon="home"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="family":to="{name:'family'}" title="我的家庭" icon="people"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="userCenter" :to="{name:'userCenter'}" title="我" icon="person"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-paper>
    <app-loading v-if="loading" @timeout="setLoading(false)"></app-loading>
    <mu-toast v-if="toast" :message="toastText" @close="hideToast"/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        bottomNav:"index",
        transitionName:'',
        firstPage:true,
        openPageTransition:false
      }
    },
    mounted (){
    },
    computed:{
      loading:function(){ return this.$store.getters.loading },
      lastFullPaths:function(){ return this.$store.getters.lastFullPaths },
      toast:function(){ return this.$store.getters.toast },
      toastText:function(){ return this.$store.getters.toastText }
    },
    watch: {
      '$route' (to, from) {
        //路由跳转动画
        this.setLoading(false)
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (this.firstPage) {
          this.firstPage=!this.firstPage
          this.transitionName = ''
        }
        else if (this.lastFullPaths.length>0&&this.lastFullPaths[0]==to.fullPath){
          //返回上级
          if (this.openPageTransition) this.transitionName = 'slide-right'
            else this.transitionName = ''
          this.historyBack()
        } else{
          if (this.openPageTransition) this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            else this.transitionName = ''
          this.addPath(from.fullPath)
        }
      }
    },
    methods:{
      //底部导航切换效果
      handleChange:function(val) {
        this.bottomNav = val
      },
      setLoading (isLoading){  this.$store.dispatch('setLoading',isLoading) },
      addPath (path){  this.$store.dispatch('addPath',path) },
      historyBack (path){  this.$store.dispatch('historyBack') },
      hideToast (){ this.$store.dispatch('hideToast') }
    }
  }
</script>

<style>
.rightbit-enter-active{
  transition: opacity .5s,transform .5s,-webkit-transform .5s}
.rightbit-enter{
  transform:translate3d(10px,0,0);-webkit-transform:translate3d(10px,0,0); opacity: .3}
.upbit-enter-active{
  transition: opacity .5s,transform .5s,-webkit-transform .5s}
.upbit-enter{
  transform:translate3d(0,-30px,0);-webkit-transform:translate3d(0,-30px,0); opacity: .3}


.app-footerbar-wrapper{position: absolute;bottom: 0;left: 0;right: 0;}
.app-footerbar-wrapper .mu-bottom-nav{height: 44px;line-height: 40px;}
.app-footerbar-wrapper .mu-buttom-item+.mu-buttom-item,.app-footerbar-wrapper .mu-bottom-item+.mu-bottom-item{border-left: 1px solid rgba(255,255,255,.1);}
.app-footerbar-wrapper .mu-buttom-item .mu-bottom-item-icon{display: inline-block;vertical-align: text-bottom; line-height: 40px;vertical-align: middle; -webkit-transform:none;transform:none;font-size: 24px}
.app-footerbar-wrapper .mu-buttom-item .mu-bottom-item-text{display: inline-block;opacity: 0.9;-webkit-transform:none;transform:none;font-size: 14px;}
.app-footerbar-wrapper .mu-bottom-nav-shift .mu-buttom-item{ padding: 2px 6px;opacity: 0.9;color: #fff;-webkit-transition: opacity .4s cubic-bezier(.445,.05,.55,.95); transition: opacity .4s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s;}
.app-footerbar-wrapper .mu-bottom-nav-shift .mu-bottom-item-active {background-color: rgba(255,255,255,.2);-webkit-box-flex: 1; -webkit-flex: 1;  -ms-flex: 1; flex: 1;color: #fff;    min-width: 80px; }
.app-footerbar-wrapper .mu-bottom-item-active .mu-bottom-item-icon {opacity: 1;}
.app-footerbar-wrapper .mu-bottom-item-active .mu-bottom-item-text {opacity: 1;}
</style>
