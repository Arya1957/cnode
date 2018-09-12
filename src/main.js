// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './assets/css/reset.scss' // 顺序 ！ 
import './assets/css/common.scss' 


import axios from 'axios'

// const path = require('path')
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 帖子分类，目前有 ask share job 
Vue.filter('topicType', function (tab) {
  if (typeof tab != 'string') return;
  if (tab === 'ask') {
    return '问答'
  } else if (tab === 'share') {
    return '分享'
  } else if (tab === 'job') {
    return '招聘'
  }
})

// good  top
Vue.filter('topicFormat', function (val,obj) {
  if (obj.top === true) {
    return '置顶'
  } else if (obj.good === true) {
    return '精华'
  } else {
    return val
  }
})
Vue.filter('formatDate', function (str) {
  if (!str) return ''
  let targetTime = +new Date(str);
  let curTime = Date.now();
  let t = (curTime - targetTime) / 1000; // 时间差，单位： 秒
  // 或者 let t = (new Date().getTime() -new Date(str).getTime()) /1000
  if (t < 0) {
    return ''
  } else if (t < 30) {
    return '刚刚' // 30秒内
  } else if (t < 60 * 60) { // 1 小时内
    return parseInt(t / 60) + ' 分钟前'
  } else if (t < 60 * 60 * 24) { // 1 天内
    return parseInt(t / (60 * 60)) + ' 小时前'
  } else if (t < 60 * 60 * 24 * 31) { // 一个月内
    return parseInt(t / (60 * 60 * 24)) + ' 天前'
  } else if (t < 60 * 60 * 24 * 30 * 12) { // 一年内
    return parseInt(t / (60 * 60 * 24 * 30)) + ' 个月前'
  } else { //  一年以上
    return parseInt(t / (60 * 60 * 24 * 365)) + ' 年前'
  }

})
