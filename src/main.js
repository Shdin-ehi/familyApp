import 'babel-polyfill'


/** @namespace Vue **/
import Vue from 'vue'
import VueForm from 'vue-form'
import vueRouter from 'vue-router'
import axios from 'axios'

import museUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './styles/themes/blue.less'
import './assets/fonts/MaterialIcons/material-icons.css'

import configRouter from './routes'
import configValid from './scripts/configValid'
import store from './store'
import './services'

Vue.use(VueForm,configValid)
Vue.use(vueRouter)
Vue.use(museUI)
var router = new vueRouter(configRouter);

//登录跳转
router.beforeEach(function (to, from, next) {
   if (to.name=='login'||loggedIn()) {
  	next()
   }else{
  	next({path:'/login',query:{redirect:to.fullPath}})
   }
})
axios.interceptors.response.use(function (response) {
            console.log(response)
  if (response.data&&response.data.status&&response.data.status.toLowerCase=='nl') {
    router.push({path:'/login',query:{redirect:router.currentRoute.fullPath}})
  }
  return response;
})

//转场loading
router.beforeEach(function (to, from, next) {
  store.dispatch('setLoading',true) 
  next()
})
router.afterEach(function (to) {
  store.dispatch('setLoading',false) 
})

//自定义组件
import appLoading from './components/appLoading'
Vue.component(appLoading.name, appLoading)

import {menuNav,menuNavItem} from './components/menuNav'
Vue.component(menuNav.name, menuNav)
Vue.component(menuNavItem.name, menuNavItem)

import appCalendar from './components/appCalendar'
Vue.component(appCalendar.name, appCalendar)

import vImg from './components/vImg'
Vue.component(vImg.name, vImg)

import fileList from './components/fileList'
Vue.component(fileList.name, fileList)

import mySelectPage from './components/mySelectPage'
Vue.component(mySelectPage.name, mySelectPage)

import myInputPage from './components/myInputPage'
Vue.component(myInputPage.name, myInputPage)

//自定义样式
import './styles/app.css'

import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router:router
})

//判断是否登录
window.isLogged=false
function loggedIn(){
	return window.isLogged
}

//vue全局函数注册
import vueAPIRegister from './scripts/vueMethods'
vueAPIRegister(Vue)