import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goodscar from '@/components/Goodscar'
import Model from '@/components/Model'
import Rates from '@/components/Rates'
import Setting from '@/components/Setting'
import Detail from '@/components/Detail'
import Oder from '@/components/Oder'
import Orderdetail from '@/components/Orderdetail'
Vue.use(Router)
Router.prototype.go = function (a) {
   sessionStorage.isBack = true
  if(a){
    window.history.go(a)
  }else{
    window.history.go(-1)
  }
}
window.addEventListener("popstate", function(e) {
  sessionStorage.isBack = true
}, false);
export default new Router({
      linkActiveClass: 'active', 
  routes: [
      {
      path:'/',
      redirect:'/home'
    },
    {
       path: '/home',
       name: 'Home',
       component: Home,
    },
    {
       path: '/model',
       name: 'Model',
       component: Model,
  
    },
    {
       path: '/goodscar',
       name: 'Goodscar',
       component: Goodscar,
  
    },
    {
       path: '/rate',
       name: 'Rates',
       component: Rates,
  
    },
     {
       path: '/set',
       name: 'Setting',
       component: Setting,
  
    },
     {
       path: '/detail',
       name: 'Detail',
       component: Detail,
  
    },
    {
       path: '/oder',
       name: 'Oder',
       component: Oder,
  
    },
    {
       path: '/orderdetail',
       name: 'Orderdetail',
       component: Orderdetail,
  
    },

  ]
})
