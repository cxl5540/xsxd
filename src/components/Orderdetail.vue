<template>
  <div>
  <div>
    <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
      <h1 class="mui-title" style="color: #fff">审评详情</h1>
     </header>
  </div>
  <div style="margin-top: 0px; margin-bottom:60px" class="content">
         <div class="demo-text" v-for='item,index in List' :key='item.index'>
              <div class="itemdetail" >
                 <p  style="color: #333;font-size: 17px;padding-top: 6px">{{item.pm}}</p>
                  <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">订单编号：{{item.dddjh}}</p>
                   <div class="contentdetail">
                      <p><span>商品编码</span><span>{{item.spbm}}</span></p>
                     <p><span>厂牌</span><span>{{item.cp}}</span></p>
                      <p><span>规格</span><span>{{item.gg}}</span></p>
                      <p><span>单位</span><span>{{item.yhm}}</span></p>
                      <p><span>库存</span><span>{{item.ywkdsl}}</span></p>
                      <p><span>批发价</span><span>{{item.gjpj}}</span></p>
                       <p><span>零售价</span><span>{{item.lsj}}</span></p>
                      <p style="margin-bottom: 0"><span style="line-height: 42px">维护价</span><span style="text-align: right;width:30%;color: red;text-align: right;"><input type="number" v-model=item.whjg @blur='getwhjg(item,index)'></span></p>
                       <p style="margin-bottom: 0"><span style="line-height: 42px">评审价</span><span style="text-align: right;width:30%;color: red;text-align: right;"><input type="number" v-model=item.xsjg @blur='getxsjg(item,index)'></span></p>
                       <p style="margin-bottom: 0"><span style="line-height: 42px">评审数</span><span style="text-align: right;width:30%;color: red;text-align: right;"><input type="number" v-model=item.sl @blur='getsl(item,index)'></span></p>
                  </div>
              </div>
               <div style="width: 100%;position: fixed;bottom: 48px">
              <button type="button"  style="background:#ff3b30;color: #fff;font-size: 16px;width: 100%" @click='submit(item)'>提交评审</button> 
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
  mounted(){
   this.getlist();

  },
  methods:{

    more(index){

    },
    getlist(){               //获取评审列表
       let url=this.baseUrl+'/SOA/WSDD/GetExamineListDetail';
        let _this=this;
    _this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      sysid:'100121',
                      khdm:_this.$route.query.khdm,
                      dddjh:_this.$route.query.dddjh,}})
    .then( (response) => {    
      let res=JSON.parse(response.data);
       console.log(response);
       _this.List=res;
       if(_this.List.length==0){
        mui.toast('已审评');
        _this.$router.go(-1);
       }
     })

    },
    getwhjg(item,index){
    let url=this.baseUrl+'/SOA/WSDD/eidtExamineDetail';
    let data={
                  Ticket:_const.Ticket,
                  sysid:'100121',
                  khdm:0,
                  cp:item.cp,
                  psjg:item.gjpj,
                  spbm:item.spbm,
                  ddmixid:item.ddmxid,
                  whj:item.whjg,
                  pss:item.sl,
             }

             console.log(data)
            let _this=this;
            $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
             mui.toast('修改成功')
            }
          })
  
    },
    getxsjg(item,index){
      let url=this.baseUrl+'/SOA/WSDD/eidtExamineDetail';
    let data={
                  Ticket:_const.Ticket,
                  sysid:'100121',
                  khdm:0,
                  cp:item.cp,
                  psjg:item.gjpj,
                  spbm:item.spbm,
                  ddmixid:item.ddmxid,
                  whj:item.whjg,
                  pss:item.sl,
             }

             console.log(data)
            let _this=this;
            $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
             mui.toast('修改成功')
            }
          })
    },
    getsl(item,index){
       let url=this.baseUrl+'/SOA/WSDD/eidtExamineDetail';
        let data={
                      Ticket:_const.Ticket,
                      sysid:'100121',
                      khdm:0,
                      cp:item.cp,
                      psjg:item.gjpj,
                      spbm:item.spbm,
                      ddmixid:item.ddmxid,
                      whj:item.whjg,
                      pss:item.sl,
                 }
            let _this=this;
            $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
             mui.toast('修改成功')
            }
          })

    },
    submit(item){
       console.log(item);
       let url=this.baseUrl+'/SOA/WSDD/doExamine';
       let data={
          "data": [
            {
              "Ticket": _const.Ticket,
              "sysid": "100121",
              "ddmxid": item.ddmxid,
              "audit_status":1,
              "dddjh":item.dddjh,
            }
          ]
        };
       
        console.log(data);
         $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
             mui.toast('提交成功')
            }
          })
    }
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
