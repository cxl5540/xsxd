<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
       <!--  <router-link to="/home" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link> -->
    <span @click='back' class="mui-icon mui-icon-left-nav mui-pull-left"></span>
     <h1 class="mui-title" style="color: #fff">下单信息</h1>
   </header>
   <div style="padding: 0 10px;padding-top: 58px;background: #fff">
          <div class="mui-content" style="background: #fff">
            <div class="mui-content-padded" style="margin: 0px;">
              <div class="mui-content-padded" style="margin: 5px;">
                <h5>配送地址：</h5>
                <div class="mui-input-row mui-search">
                   <textarea id="textarea" rows="2" placeholder="请输入备注" v-model='dz'></textarea>
                </div>
                <h5>收货人：</h5>
                <div class="mui-input-row mui-search">
                   <input type="text"  placeholder="请输入" v-model='shr'>
                </div>
                <h5>联系方式：</h5>
                <div class="mui-input-row mui-search">
                  <input type="text"  placeholder="请输入" v-model='lxdh'>
                </div>
              </div>         
                <div class="mui-input-row" style="border: 1px solid rgba(0, 0, 0, .2);border-radius: 3px;width: 97%;margin: auto;">
                  <label>配送方式</label>
                    <select class="selct"  placeholder='请选择'   v-model='psfs'>  
                        <option  v-for="option,index in psfsa" :key="index" :label="option.bmmc" :value="option.bm" >{{option.bmmc}}</option> 
                   </select>
                   <i class="fa fa-caret-down" style="position: absolute;top: 9px;right: 5px"></i>
               </div>                       
               <div class="mui-input-row" style="margin: 10px 5px;">
                  <textarea id="textarea" rows="3" placeholder="请输入备注" v-model='bz'></textarea>
                </div>
            </div>
          </div>          
      </div>
      <div style="width: 100%;position: fixed;bottom: 48px">
        <button type="button"  style="background:#ff3b30;color: #fff;font-size: 16px;width: 100%" @click='submit'>确认下单</button> 
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
      bz:'',
      dz:'',
      shr:'',
      lxdh:'',
      psfs:'1',
    psfsa: [{
          "bm": "1",
          "bmmc": "自提"
        },{
          "bm": "6",
          "bmmc": "直达"
        },{
          "bm": "J",
          "bmmc": "总后"
        },]
    }
  },
  mounted(){
  this.getinfo()
  },
  methods:{
    back(){

    },
    getinfo(){
      let url=this.baseUrl+'/SOA/WSDD/getClientInfo';
      let _this=this;
       this.$http.get(url,{params: {
                      khdm:'014021',             
                             }})
              .then( (response) => {
                  let res=JSON.parse(response.data);
                  _this.dz=res[0].DZ;
                  _this.lxdh=res[0].DHHM1+'/'+res[0].DHHM2;
                  _this.shr=res[0].SHR
                console.log(res)
              })
    },
    submit(){
        let data={
           Ticket:_const.Ticket,
            bz:this.bz,
            dhhm:this.lxdh,
            dz:this.dz,
            fgsbm:'',
            khdm:'014021',
            pslb:this.psfs,
            shr:this.shr,
            yplb:'00',
            SystemId:"100121",
            zhbz:0,
          }
       let url=this.baseUrl+'/SOA/WSDD/Placeorder'
          $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
              if(JSON.parse(res).success==false){

               mui.toast(JSON.parse(res).errorMsg)
              }else{
                mui.toast('下单成功')
              }
             
            }
          })
       
      },
  
  }

}
</script>

<style scoped>
.mui-input-row{
text-align: left;
}
h5{
  text-align: left;
  font-size: 17px;
  margin-bottom: 10px;
}
input{
  margin-bottom: 6px;
}
textarea{
   margin-bottom: 6px;
}
</style>
