<template>
  <div class="footer">
     <router-link to="/home">
     <i class="fa fa-search fa-3x"></i>
     <span>查询</span>
     </router-link>
      <router-link to="/detail">
     <i class="fa fa-list fa-3x"></i>
     <span>列表</span>
     </router-link>
      <router-link to="/model">
     <i class="fa fa-heart fa-3x"></i>
     <span>收藏</span>
     </router-link>
      <router-link to="/goodscar">
     <i class="fa  fa-shopping-cart  fa-3x"></i>
     <span>购物车</span>
     </router-link> 
     <router-link to="/rate">
     <i class="fa fa-pencil-square-o  fa-3x"></i>
     <span>审评</span>
     </router-link>
    
  <div class="num"><span>{{this.$store.state.count}}</span></div>    
  </div>
</template>
<script>
  export default {
    data(){
      return {
        num:''
      }
    },
    computed:{
      count(){
            return this.$store.state.count
          }
      },
 mounted(){
    this.getcounts();
  },
  methods:{
     getcounts(){
      let url=this.baseUrl+'/SOA/WSDD/getCarCount';
      let _this=this;
       this.$http.get(url,{params: {
                       Ticket:_const.Ticket,
                      khdm:'014021',
                      sysid:"100121",               
                             }})
              .then( (response) => {
                    console.log(response)
                    let num=JSON.parse(response.data)[0]
                   _this.$store.commit('newNum',num.total_num);
              })

    },
   }
}
</script>
<style scoped lang="less">
  .footer{
      position: fixed;
      display: flex;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      z-index: 1000; 
     a{
      display: flex;
      flex-direction:column;
      flex:1;
      justify-content:center;
      align-items:center;
      color:gray;
      background:#fff;
      font-size:14px;
      z-index: 1000;
    
      }
      i{
        font-size:18px;
       }
   
   }
 .active{
      color:#0093db !important;
    }
    .num{
      width: 20px;
      height: 20px;
      background: red;
      color: #fff;
      position: absolute;
      bottom: 30px;
      right: 80px;
      z-index: 9999;
      border-radius: 50%;
      font-size: 12px;
    }
</style>
