// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from '../router/index.js'
import axios from "axios"
import axio from './axio'
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
import  '../static/js/goble.js'
import Vuex from 'vuex';
import store from './store/store'
Vue.use(Vuex);
import "vue-awesome-mui/mui/js/mui.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, DatePicker,InputNumber,MessageBox} from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(DatePicker.name, DatePicker);
Vue.component(InputNumber.name, InputNumber);
Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$alert = MessageBox.alert;


import defines from './config'

Vue.prototype.defines = defines

import "vue-awesome-mui/mui/examples/hello-mui/css/icons-extra.css";

import 'url-search-params-polyfill';
import "babel-polyfill";
Vue.use(Mui)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.baseUrl = "http://apptest.cq-p.com.cn:1014" ;
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
    Vue.prototype.ticket=function (){
       let reg = new RegExp("(^|\\?|&)" + 'ticket' + "=([^&]*)(\\s|&|$)","i");
      if(reg.test(window.location.href)){
        let ticket=unescape(RegExp.$2.replace(/\+/g," "))
        return ticket;
      };
    },
    Vue.prototype.getScrollTop=function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    //浏览器视口的高度
     Vue.prototype.getScrollHeight=function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    //浏览器视口的高度
     Vue.prototype.getWindowHeight=function () {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    axio,
    store,
  components: { App },
  template: '<App/>'
})
