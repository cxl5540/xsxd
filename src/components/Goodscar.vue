<template>
  <div class="hello">
     <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
       <!--  <router-link to="/home" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link> -->
    <span @click='back' class="mui-icon mui-icon-left-nav mui-pull-left"></span>
     <h1 class="mui-title" style="color: #fff">购物车列表</h1>
       
    
        </header>
        <div v-show='yidong' style="height: 100vh">
          <scroller :on-refresh="refresh"
                 :on-infinite="infinite"               
                  ref="my_scroller"
                  style="margin-top:40px;"
    
                   >
         <div style="margin-top: 48px; margin-bottom: 40px" class="content">
             <div class="demo-text" v-for='item,index in List' :key='item.index'>
                  <div class="itemdetail" >
                      <p  style="color: #333;font-size: 17px;padding-top: 6px">{{item.pm}}</p>
                      <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">商品编码：{{item.spbm}}</p>
                       <div class="contentdetail">                         
                           <p><span>厂牌</span><span>{{item.cp}}</span></p>
                         <p><span>规格</span><span>{{item.gg}}</span></p>
                          <p><span>批发价</span><span>{{item.gjpj}}</span></p>
                          <p><span>零售价</span><span>{{item.lsj}}</span></p>
                          <p style="margin-bottom: 0"><span style="line-height: 42px">期望价格</span><span style="text-align: right;width:30%;color: red"><input type="number" v-model=item.khhssj @blur='getprice(item,index)' placeholder="请输入"></span></p>
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
                      <el-input-number v-model='item.sl' @change="handleChange(index)" :min="1" :max="100" label="描述文字" size="mini"></el-input-number>
                    </div>
                     <div style="display: inline-block;float: right">
                      
                      <el-button type="danger" icon="el-icon-delete" circle  @click='remove(item,index)'  size="mini"></el-button>
 
                     </div>  
                      
                   </div>  
                  </div>                           
                </div>
            </div>
     </scroller>

    </div>
     <div style="margin-top:46px" v-show='pc'>
            <div class="demo-text" v-for='item,index in List' :key='item.index'>
                 <div class="itemdetail" >
                     <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 17px;padding: 8px 0">商品名称：{{item.spbm}}</p>
                     <div class="contentdetail">
                       <p><span>商品名称</span><span>{{item.pm}}</span></p>
                        <p><span>规格</span><span>{{item.gg}}</span></p>
                       <p><span>分公司</span><span>{{item.fgsbm}}</span></p>
                       <p><span>可调库存</span><span>{{item.ywsl}}</span></p>
                       <p><span>厂牌</span><span>{{item.cp}}</span></p>   
                     </div>
                     <div>
                       <div class="mui-numbox">
                          <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                          <input class="mui-input-numbox" type="number" />
                          <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                     </div>
                       <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                         <span style="color: rgb(33, 150, 243)">查看详情</span>
                         <span  style="font-size: 16px;color: #999>"><i class="fa fa-angle-right"></i></span>
                       </p>
                    
                 </div>
               </div>
           </div> 
        <div style="width: 100%;position: fixed;bottom: 48px">
          <button type="button"  style="background:#ff3b30;color: #fff;font-size: 16px;width: 100%" @click='pay'>提交订单</button> 
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
/*this.init();*/
this.isIE();

  
  },
  mounted(){
this.getlist();

  },
  methods:{


     onScroll() {          //ie滚动
       /*  console.log(this.scollY )*/
         this.scollY = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
           console.log(this.enable)
          if(this.enable){
              this.enable=false;
              if(this.scollY>-10){
                console.log('eee');
                this.page=this.page+1;
                this.getlist();
              }else{
                this.enable=true;
              }
            }


            return;

    },
    back(){
     this.$router.go(-1);
    },
    more(index){
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
               $($('.more')[index]).slideToggle(function(){
                $($('.qq')[index]).html('展开更多');
                if($('.more').is(":visible")){
                  $($('.qq')[index]).html('收起');

                }
            });

          } else {
            $($('.morepc')[index]).slideToggle(function(){
                $($('.qqpc')[index]).html('展开更多');
                if($('.morepc').is(":visible")){
                  $($('.qqpc')[index]).html('收起');
 
                }
            });

          } 
    } ,
    isIE() {        //判断ie
      if (!!window.ActiveXObject || "ActiveXObject" in window) {

     window.addEventListener('scroll', this.onScroll);
        this.pc=true;
         this.yidong=false;
        return true;
      } else {
        this.yidong=true;
        this.pc=false;
        return false;

      }},
 handleChange(value) {
        console.log(value);
      },
  getlist(){                                           //获取列表
    if(this.$store.state.searchvals!==''){
       let search= this.$store.state.searchvals;
    let vals=JSON.parse(search); 
   
    }
      let url=this.baseUrl+'/SOA/WSDD/getCartList';

    let _this=this; 
    _this.$http.get(url,{params: {
                     Ticket:_const.Ticket,
                      sysid:'100121',
                      fgsbm:'',
                      khdm: '014021',}})
    .then( (response) => {

        let res=JSON.parse(response.data);
        console.log(JSON.parse(response.data))
        if(res){
          if(res.length<10){             //无下一页
            _this.hasNext=false;
          }else{
              _this.hasNext=true;           //有下一页 
          }
          if(_this.page==1){
            _this.List=res;
            console.log(_this.List)
          }else{
            for(var i=0;i<res.length;i++){
              _this.List.push(res[i])
            }
          }
        }else{
            _this.hasNext=false;
            if(!!window.ActiveXObject || "ActiveXObject" in window){
              mui.toast('没有更多数据');
              return;
            }
        }
      _this.enable=true;
       console.log(_this.List);
        _this.$store.commit('newNum',_this.List.length);
    })
    .catch( (error) => {
        console.log(error);
    });      
  },
      init(){
       let _this = this  //此this指向的是vue
                window.onmousewheel = function (e) {
            if (e.wheelDelta < 0) {
                _this.$refs.scrollerBottom && (_this.$refs.scrollerBottom.scrollBy(0, 30, false));
                //避免ref中不存在scrollerBottom
            } else {
                _this.$refs.scrollerBottom && (_this.$refs.scrollerBottom.scrollBy(0, -30, false));
            }
          }
      },
     refresh:function(done){         //下拉刷新
        this.page=1;
        let _this=this;
        setTimeout(function(){
            _this.getlist();
            done();
          },1000)
　　　},

       infinite:function(done) {             //上拉加载
        console.log(this.hasNext);

         if(this.hasNext==true){
           
           let _this=this;
            setTimeout(function(){
              if(_this.hasNext==true){
                _this.page=_this.page+1;
                 _this.getlist();
                  $('.top').show();
                  done();
                 _this.hasNext=false;
                  
              }else{
                 done("noDataText");
              }
            },1000)         
         }else{
           done("noDataText");
         }
               
      },
      savecar(){

      },
      remove(item,index){      //删除购物车
        console.log(item)
        let data={
            tddid:item.tddid ,
            sl: 1,
            khhssj:item.khhssj 
          }
       let url=this.baseUrl+'/SOA/WSDD/delCartGoods'
          let url2=this.baseUrl+'/SOA/WSDD/getCarCount';
          let _this=this;
          $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
              _this.List.splice(index,1);
              mui.toast('删除成功')
              console.log(res);
               _this.$http.get(url2,{params: {
                       Ticket:_const.Ticket,
                      khdm:'014021',
                      sysid:"100121",               
                             }})
              .then( (response) => {
                 
                    let num=JSON.parse(response.data)[0]                
                console.log(JSON.parse(response.data));
                 _this.$store.commit('newNum',num.total_num);
                    console.log(num.total_num)
              })
            }
          })
       
      },
      pay(){
        this.$router.push({path:'/oder'})
      
      },
      getprice(item,index){
        console.log(item)
        let data={
            tddid:item.tddid ,
            sl: 1,
            khhssj:item.khhssj 
          }
      let url=this.baseUrl+'/SOA/WSDD/UpadateCartGoods'
          $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) {
              console.log(res);
               mui.toast('更新成功')
            }
          })
      }


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
