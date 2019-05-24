import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={//要设置的全局访问的state对象
     showFooter: true,
     count:0,
     searchvals:''
     //要设置的初始属性值
   };
  const getters = { 
	  count(){  //承载变化的changebleNum的值
	       return state.count
	    },
     searchval(){
        return state.searchvals
     }

  }; 
  const mutations = {
  	 newNum(state,newnum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
       state.count=newnum;
    },
     search(state,str){
       state.searchvals=str;
    }
  };
   const actions = {
   	 getNewNum(context,num){   //同上注释，num为要变化的形参
        context.commit('newNum',num)
     },
     getvals(context,str){
      context.commit('search',num);
     }
   };
 const store = new Vuex.Store({
  
       state,
       getters,
       mutations,
      actions
});
export default store;
 