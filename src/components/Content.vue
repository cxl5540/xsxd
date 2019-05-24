<template>
  <div >   
   <div class="num"><span>{{msg}}</span></div>        
  </div>
</template>
<script>
  export default {
    data(){
      return {
        num:''
      }
    },
    props:['msg'],
 mounted(){
alert(this.msg)
    this.getcounts();
  },
  methods:{
     getcounts(){
      let url=this.baseUrl+'/SOA/WSDD/getCarCount';
      let _this=this;
       this.$http.get(url,{params: {
                       Ticket:"07c3011544f23ff94828e1b5cd0cd9bf",
                      khdm:'014021',
                      sysid:"100121",               
                             }})
              .then( (response) => {
                    console.log(response)
                    let num=JSON.parse(response.data)[0]
                console.log(JSON.parse(response.data));
                _const.count=num.total_num;
                _this.num= _const.count;
              })

    },
   }
}
</script>
<style scoped lang="less">
 
    .num{
      width: 20px;
      height: 20px;
      background: red;
      color: #fff;
      position: absolute;
      bottom: 30px;
      right: 136px;
      z-index: 9999;
      border-radius: 50%;
      font-size: 12px;
    }
</style>
