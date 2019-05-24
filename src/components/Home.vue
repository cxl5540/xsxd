<template>
  <div class="hello">
      <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
         <!--    <router-link to="/home" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link> -->
         <h1 class="mui-title" style="color: #fff">销售下单查询</h1>
      </header>

       <div style="padding: 0 10px;margin-top: 48px;background: #fff">
          <div class="mui-content" style="background: #fff">
            <div class="mui-content-padded" style="margin: 0px;">
              <form class="mui-input-group">
                <div class="mui-input-row" >
                  <label>商品编号</label>
                  <input type="text" placeholder="请输入名称或编码" v-model='pm'>
                 <!--   <i class="fa fa-camera" style="position: absolute;right:3px;top: 25%;" @click='photo'></i> -->
                </div>
                <div class="mui-input-row">
                  <label>厂牌</label>
                  <input type="text"  placeholder="请输入" v-model='cp'>
                </div>
                <div class="mui-input-row">
                  <label>客户</label>
                    <select class="selct"  placeholder='请选择'   v-model='khdm'>  
                        <option value="014021" selected >重庆医司</option> 
                        <option  v-for="option,index in fgsbm" :key="index" :label="option.bmmc" :value="option.bm" >{{option.bmmc}}</option> 
                   </select>
                </div>
                                           
                <div style="padding: 20px 0">
                  <button type="button"  style="background:  #2196f3;color: #fff;width: 100%;font-size: 16px" @click='submit'>查询</button>&nbsp;&nbsp;
                 <!--  <button type="button" class="mui-btn " onclick="return false;">取消</button> -->
                </div> 
              </form>
            </div>
          </div> 

      </div>
</div>

</template>

<script>
/*import '../../static/js/foundation-datepicker.js';*/
export default {
  name: 'home',
  data () {
    return {
      pc:false,
      yidong:false,
      pm:'',
      cp:'',
      khdm:'014021',
      spbm:'',
      fgsbm: [{
          "bm": "014021",
          "bmmc": "重庆医司"
        },]    
    }
  },
  created(){
  this.getTicket();
  },
  mounted(){

    this.init();
 /*$('.fa-angle-up').hide();*/
  },
  methods:{ 
    init(){
      if(this.$store.state.searchvals!==''){
         let search= this.$store.state.searchvals;
          let vals=JSON.parse(search);  
          this.cp=vals.cp;
           this.pm=vals.pm;
           this.khdm=vals.khdm;
      }  
  },
     getTicket(){            //获取用户信息
      let reg = new RegExp("(^|\\?|&)" + 'ticket' + "=([^&]*)(\\s|&|$)","i");
      if(reg.test(window.location.href)){
        let ticket=unescape(RegExp.$2.replace(/\+/g," "));     
        let url=this.baseUrl+'/SOA/WSDD/GetUserOpenID';
        let url2=this.baseUrl+'/SOA/WSDD/getSystemBySystemAid';
        let _this=this;
      _this.$http.get(url,{params: {
                        ticket: ticket,                 
                       }})
      .then( (response) => {
         if(response){
          let openid=response.data;
              openid = openid.replace(/\"/g, "");
              if(openid){
                   console.log(openid);
                    _this.$http.get(url2,{params: {
                        empid: openid,
                        sysid:10026,
                        targersysid:10010

                       }})
                       .then( (response) => {
                        if(response){
                          let res=JSON.parse(response.data)
                          _const.EMPUID=res.RESPONSE.LIST[0].EMPUID;
                          _const.SYSTEMID=res.RESPONSE.LIST[0].SYSTEMID;

                          console.log(_const.SYSTEMID);
                        }

                       }).catch( (error) => {
                            console.log(error);
                        });
              }else{
                 mui.toast('无openid');
                 return false;
              }
         
         }else{
          mui.toast('无ticket');
          return false;
         }         

        }).catch( (error) => {
            console.log(error);
        });
      }
    },

    submit(){
      alert(1);
     this.$router.push({path:'/detail'});
      let obj = new Object();
      obj['cp']=this.cp;
      obj['pm']=this.pm;
      obj['khdm']=this.khdm;
      let searchval=JSON.stringify(obj);
      this.$store.commit('search',searchval);
      console.log(this.$store.state.searchvals);
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:-ms-input-placeholder{
    color:#999;
}
.mui-bar{
  position: fixed;
  top: 0;
}
.mui-input-row{
text-align: left;
}
.timepc{
  text-align: left;
  margin-left: 15px;
}
.el-date-editor{
  margin-left: 58px;
  font-size: 17px;
  color: #000;
}

</style>
