<template>
  <div class="hello">
     <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
     <h1 class="mui-title" style="color: #fff">订单列表</h1>        
    </header>
  
         <div style="margin-top: 0px; margin-bottom: 40px" class="content">
             <div class="demo-text" v-for='item,index in List' :key='item.index'>
                  <div class="itemdetail" >
                     <p  style="color: #333;font-size: 17px;padding-top: 6px">{{item.pm}}</p>
                      <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">商品编码：{{item.spbm}}</p>
                       <div class="contentdetail">
                          <p style="padding-top: 10px"><span>厂牌</span><span>{{item.cp}}</span></p>
                         <p><span>规格</span><span>{{item.gg}}</span></p>
                          <p><span>批发价</span><span>{{item.klsj}}</span></p>
                          <p><span>零售价</span><span>{{item.lsj}}</span></p>
                      </div>                                    
                        <div class="contentdetail  morepc"  style="display: none;">
                           <p><span>大包装</span><span>{{item.wldbzs}}</span></p>
                           <p ><span>库存数</span><span>{{item.ywkdsl}}</span></p>                                               
                        </div>                                        
                    <div @click='more(index)'>      
                     <p style="border-top: 1px solid #eee;text-align: right;margin: 0;padding: 6px 0">
                       <span style="color: rgb(33, 150, 243);text-decoration: underline;" class ='qqpc'>展开更多</span>                 
                     </p>                    
                   </div>
                   <div style="width: 100%">
                    <div style="display: inline-block;">
                      <el-input-number v-model="item.num" @change="handleChange(index)" :min="1" :max="100" label="描述文字" size="mini"></el-input-number>
                    </div>
                     <div style="display: inline-block;float: right">
                      <el-button type="warning" icon="el-icon-circle-plus" circle @click='savecar(item)'  size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-star-off" circle  @click='savelike(item)'  size="mini"></el-button>
 
                     </div>  
                      
                   </div>  
                  </div>                           
                </div>
            </div>
    </div> 
  </div>
</template>
<script>
  import 'url-search-params-polyfill';
export default {
  name: 'home',
  data () {
    return {
      enable:true,
      yidong:true,
      pc:false,
      name:'',
      company:'',
      factory:'',
      List:[],
      num1:1,
      page:1,
      hasNext:false,
    options: [
        '紧急严重', '紧急','严重', '一般',
      ],
        scollY: null,// 离底部距离有多少
    }
  },
  created(){
  
  },
  mounted(){
this.getlist();

  },
  methods:{

    back(){
     this.$router.go(-1);
    },
    more(index){
            $($('.morepc')[index]).slideToggle(function(){
                $($('.qqpc')[index]).html('展开更多');
                if($('.morepc').is(":visible")){
                  $($('.qqpc')[index]).html('收起');
 
                }
            });
       
    } ,
 handleChange(value) {
        console.log(value);
      },
  getlist(){
  if(this.$store.state.searchvals!==''){
     let search= this.$store.state.searchvals;
     let vals=JSON.parse(search); 
                                           //获取列表
  console.log(this.$store.state.searchvals);
   let url=this.baseUrl+'/SOA/WSDD/getGoodsList';
      let _this=this;
    _this.$http.get(url,{params: {
                      Ticket:_const.Ticket,
                      sysid:'100121',
                      isky:'1',
                      pm: vals.pm,
                      khdm: vals.khdm,
                      cp: vals.cp,
                      fgsbm:'',}})
    .then( (response) => {
       let res=JSON.parse(response.data);
        for(var i=0;i<res.length;i++){
          res[i].num=1;
        }
         _this.List=res;
    })
    .catch( (error) => {
        console.log(error);
    });
  }else{
    mui.toast('请输入关键词搜索');
    let _this=this;
    setTimeout(function(){
       _this.$router.push({path:'/home'})
     },1000)
   
  } 
 
        
  },
      savecar(item){               
        console.log(item)
        let data={
            pm:item.pm,
            cssj:null,
            dbzs:item.wldbzs,
            gg:item.gg,
            hssj:item.hssj,
            jldw:item.jldw,
            khdm:'014021',
            khhssj:item.hssj,
            cp:item.cp,
            pzwh:item.pzwh,
            sl:item.num,
            spbm:item.spbm,
            tddh:"-",
            tddid:item.id,
            yhm:"100121",
            zbzs:item.dbz,
          }
       let url=this.baseUrl+'/SOA/WSDD/AddtoCart';
       let url2=this.baseUrl+'/SOA/WSDD/getCarCount';
       let _this=this;
          $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
             mui.toast('添加购物车成功')
              console.log(res)

                _this.$http.get(url2,{params: {
                       Ticket:_const.Ticket,
                      khdm:'014021',
                      sysid:"100121",               
                             }})
              .then( (response) => {
                console.log(response)
                  let num=JSON.parse(response.data)[0]                
                console.log(JSON.parse(response.data));
                 _this.$store.commit('newNum',num.total_num);
                    console.log(num.total_num)
              })
            }
          })
      },
      savelike(item){                 //收藏
        console.log(item)
        let data={
           Ticket:_const.Ticket,
            cp:item.cp,
            fgsbm:item.fgsbm,
            gg:item.gg,
            jldw:item.jldw,
            khdm:"014021",
            pm:item.pm,
            sl:item.num,
            spbm:item.spbm,
            sysid:"100121",
          }
       let url=this.baseUrl+'/SOA/WSDD/addGoodTample'
          $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
               mui.toast('添加收藏成功')
              console.log(res)
            }
          })
       
      },


  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mui-bar{
  position: fixed;
  top: 0;
}
h5{
  color: #333;
  font-size: 16px;
}
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
