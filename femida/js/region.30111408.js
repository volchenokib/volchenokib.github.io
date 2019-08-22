(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["region"],{"0e25":function(t,e,a){"use strict";var i=a("f2c7"),n=a.n(i);n.a},"5e90":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"region"},[a("panelGroup"),a("div",{staticClass:"region__charts-layout"},[a("div",{staticClass:"region__pieCharts"},[a("pieChart",{class:"chart",style:{height:"350px",width:"95%"},attrs:{chartData:t.vendorAmountData,title:"Распределение суммы конкурсов по заказчикам"}}),a("br"),a("pieChart",{style:{height:"350px",width:"95%"},attrs:{chartData:t.customerAmountData,title:"Распределение суммы конкурсов по поставщикам"}})],1),a("div",{staticClass:"region__pieCharts"},[a("lineChart",{style:{height:"350px",width:"95%"},attrs:{chartData:t.lineChartData,title:"Динамика CRI по ТО за 2017 год"}}),a("br"),a("lineChartIndex",{style:{height:"350px",width:"95%"},attrs:{chartData:t.lineChartIndexData}})],1)])],1)},n=[],r=a("6da1"),s=a("26f2"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.dataLoading,expression:"dataLoading"}],class:t.className,style:{height:t.height,width:t.width},attrs:{"element-loading-spinner":"el-icon-loading"}})},l=[],c=a("313e"),h=a.n(c),d=a("ed08");a("817d");var u={props:{className:{type:String,default:"chart"},width:{type:String,default:"68%"},height:{type:String,default:"250px"},autoResize:{type:Boolean,default:!0},chartData:{type:Object,required:!0}},data:function(){return{chart:null,sidebarElm:null}},watch:{chartData:{deep:!0,handler:function(t){this.setOptions(t)}}},computed:{dataLoading:function(){return this.$store.getters.getDataState}},mounted:function(){var t=this;this.initChart(),this.autoResize&&(this.__resizeHandler=Object(d["a"])(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHandler)),this.sidebarElm=document.getElementsByClassName("sidebar-container")[0],this.sidebarElm&&this.sidebarElm.addEventListener("transitionend",this.sidebarResizeHandler)},beforeDestroy:function(){this.chart&&(this.autoResize&&window.removeEventListener("resize",this.__resizeHandler),this.sidebarElm&&this.sidebarElm.removeEventListener("transitionend",this.sidebarResizeHandler),this.chart.dispose(),this.chart=null)},methods:{sidebarResizeHandler:function(t){"width"===t.propertyName&&this.__resizeHandler()},setOptions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.expectedData,a=t.markPoint,i=t.titleValue;this.chart.setOption({title:{text:"Ваш CRI меньше чем у ".concat(i,"% регионов"),x:"center",align:"center",textStyle:{color:"#606266",fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",fontWeight:"bold"}},grid:{left:15,right:35,bottom:10,containLabel:!0},xAxis:{type:"value",axisLabel:{formatter:function(t){return t+"%"}},boundaryGap:!1,axisTick:{show:!1}},yAxis:{type:"value",axisTick:{show:!1}},tooltip:{trigger:"axis",axisPointer:{type:"cross"},backgroundColor:"rgba(50, 50, 50, 0.9)",color:"#ff7f50",padding:[15,20],textStyle:{fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",fontSize:14,fontWeight:"lighter"},extraCssText:"text-align: left;"},legend:{data:["CRI"],right:"32",top:"5"},series:[{name:"CRI",itemStyle:{normal:{}},smooth:!0,type:"line",data:e,animationDuration:2800,animationEasing:"cubicInOut",markPoint:{data:[{coord:a}],symbol:"pin"}}]})},initChart:function(){this.chart=h.a.init(this.$el,"macarons"),this.setOptions(this.chartData)}}},p=u,g=a("2877"),m=Object(g["a"])(p,o,l,!1,null,null,null),f=m.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.dataLoading,expression:"dataLoading"}],class:t.className,style:{height:t.height,width:t.width},attrs:{"element-loading-spinner":"el-icon-loading"}})},b=[];a("7ab5");a("817d");var v={props:{chartData:{type:Object,required:!0},className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},title:{type:String,default:"Chart Title"}},data:function(){return{chart:null}},watch:{chartData:{deep:!0,handler:function(t){this.setOptions(t)}}},computed:{dataLoading:function(){return this.$store.getters.getDataState}},mounted:function(){var t=this;this.initChart(),this.__resizeHandler=Object(d["a"])(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHandler)},beforeDestroy:function(){this.chart&&(window.removeEventListener("resize",this.__resizeHandler),this.chart.dispose(),this.chart=null)},methods:{setOptions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.actualData;this.chart.setOption({title:{text:this.title,left:"center",textStyle:{color:"#606266",fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",fontWeight:"bold"}},tooltip:{backgroundColor:"rgba(50, 50, 50, 0.9)",color:"#ff7f50",padding:[15,20],trigger:"item",textStyle:{fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",fontSize:14,fontWeight:"lighter"},extraCssText:"text-align: left;",formatter:function(t){Math.round(t.percent);var e=t.data.cri,a=t.data.contracts,i=t.data.sum,n=t.data.sumUnit;return"CRI: ".concat(e,"% в среднем </br> контрактов: ").concat(a," </br> сумма: ").concat(i," ").concat(n)}},legend:{data:e,type:"scroll",bottom:"10",left:"center",pageIconColor:"#606266"},series:[{name:"",type:"pie",roseType:"radius",radius:[15,95],center:["50%","50%"],data:e,label:{normal:{fontSize:11,formatter:["{d|{d}%}"].join("\n"),rich:{d:{align:"center",fontSize:14}}}},animationEasing:"cubicInOut",animationDuration:2600}],calculable:!0})},initChart:function(){this.chart=h.a.init(this.$el,"macarons"),this.setOptions(this.chartData)}}},x=v,C=Object(g["a"])(x,y,b,!1,null,null,null),D=C.exports,S={name:"region",components:{panelGroup:r["a"],lineChart:s["a"],lineChartIndex:f,pieChart:D},data:function(){return{}},computed:{lineChartData:function(){return this.$store.getters.lineChartData},lineChartIndexData:function(){return this.$store.getters.lineChartIndexData},customerAmountData:function(){return this.$store.getters.customerAmountData},vendorAmountData:function(){return this.$store.getters.vendorAmountData}}},w=S,_=(a("0e25"),Object(g["a"])(w,i,n,!1,null,"f0508d0a",null));e["default"]=_.exports},f2c7:function(t,e,a){}}]);
//# sourceMappingURL=region.30111408.js.map