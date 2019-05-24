<template>
  <div>
  <div>
    <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
      <h1 class="mui-title" style="color: #fff">审评</h1>
     </header>
  </div>
  <div style="margin-top: 48px; margin-bottom: 50px" class="content">
         <div class="demo-text" v-for='item,index in List' :key='item.index'>
              <div class="itemdetail" >
                 <p  style="color: #333;font-size: 17px;padding-top: 6px">{{item.khmc}}</p>
                  <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">订单编号：{{item.dddjh}}</p>
                   <div class="contentdetail">
                      <p style="padding-top: 10px"><span>订货客户</span><span>{{item.khdm}}</span></p>
                     <p><span>订货时间</span><span>{{item.cssj}}</span></p>
                      <p><span>订单类别</span><span>{{item.ddlb}}</span></p>
                      <p><span>下单人</span><span>{{item.yhm}}</span></p>
                      <p><span>订单状态</span><span>{{item.status}}</span></p>
                  </div>                                                                        
                <div @click='more(index,item)'>      
                 <p style="border-top: 1px solid #eee;text-align: right;margin: 0;padding: 6px 0">
                   <span style="color: rgb(33, 150, 243);text-decoration: underline;" class ='qqpc'>审评详情</span>                 
                 </p>                    
               </div>
                 
              </div>                           
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      List:'',
    }
  },
  created(){
  $('.spinnerloading').css('display','block');
  },
  mounted(){
   this.GetExamineAuth();
   this.GetClient();
   this.GetCarConut();
  },
  methods:{
    more(index,item){
      console.log(item);

      this.$router.push({path:'/orderdetail',query:{khdm:item.khdm,dddjh:item.dddjh}})
    },
    GetExamineAuth(){            //判断评审权限
      let url=this.baseUrl+'/SOA/WSDD/GetExamineAuth';
        let _this=this;
    _this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      sysid:'100121',}})
    .then( (response) => {    
      let res=JSON.parse(response.data);
       console.log(res);
       if(res.success==false){
         mui.toast('无权限审评')
       }else{
        _this.getlist();
       }
     })
    },
    GetClient(){            //获取用户
      let url=this.baseUrl+'/SOA/WSDD/getClientByUser';
        let _this=this;
    _this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      sysid:'100121',}})
    .then( (response) => {    
      let res=JSON.parse(response.data);
       console.log(res);
     })
    },
    getlist(){               //获取评审列表
       let url=this.baseUrl+'/SOA/WSDD/GetExamineList';
        let _this=this;
    _this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      sysid:'100121',}})
    .then( (response) => {    
      let res=JSON.parse(response.data);
       console.log(res);
       _this.List=res;
     })

    },
    GetCarConut(){            //获取购物车数量
      let url=this.baseUrl+'/SOA/WSDD/getCarCount';
        let _this=this;
      this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      khdm:'014021',
                      sysid:"100121",}})
    .then( (response) => {    
       console.log(response);
     })
    },

  }

}
</script>

<style scoped>
.itemdetail>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail>a>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail{
 margin: 6px 8px ;
 border: 1px solid #eee;
 background: #fff;
 border-radius: 6px;
 text-align: left;
 padding: 0px 8px;
  box-shadow:0px 2px 2px #eee;
}
.itemdetail>div{
  color: #999;
  font-size: 13px;
}
.contentdetail>p{
  display: flex;
  justify-content: space-between;
}
p>span:last-child{
  color: #000;
}
.el-input-number--mini{
  width: 92px;
}
</style>
