(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0ba32a"],{"35d6":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"q-pa-md"},[a("q-stepper",{ref:"stepper",attrs:{flat:"",color:"bg-green","done-color":"secondary","active-color":"deep-orange",bordered:""},scopedSlots:e._u([{key:"message",fn:function(){return[a("q-banner",{class:e.orderMsg.color+" text-white",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:e.orderMsg.icon,size:"30px"}})]},proxy:!0},{key:"action",fn:function(){return[a("div",{staticClass:"text-caption"},[a("q-icon",{attrs:{name:"motorcycle",size:"22px"}}),e._v("\n              "+e._s(e.orderMsg.driver_name)+"  "+e._s(e.driver_phone)+"\n            ")],1)]},proxy:!0}])},[a("div",{staticClass:"text-subtitle1"},[e._v("\n            "+e._s(e.orderMsg.order)+"\n          ")]),a("div",{staticClass:"text-caption"},[e._v("\n            "+e._s(e.orderMsg.details)+"\n          ")])]),a("div",{staticClass:"text-right q-mt-xs"},[10!=e.status&&1!=e.status?a("q-btn",{attrs:{loading:e.loadCancel,color:"red",label:"Cancelar Orden"},on:{click:e.cancelOrder}}):e._e()],1)]},proxy:!0}]),model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("q-step",{attrs:{name:7,title:"Confirmando pedido",icon:"done","done-icon":"done","active-icon":"done",done:0==e.status||1==e.status||4==e.status||10==e.status}}),a("q-step",{attrs:{name:0,title:"Orden Confirmada",icon:"done_all","done-icon":"done_all","active-icon":"done_all",done:1==e.status||4==e.status||10==e.status}}),a("q-step",{attrs:{name:4,title:"Recogiendo Orden",icon:"shopping_basket","done-icon":"shopping_basket","active-icon":"shopping_basket",done:1==e.status||10==e.status}}),a("q-step",{attrs:{name:1,title:"En camino",icon:"motorcycle","done-icon":"motorcycle","active-icon":"motorcycle",done:10==e.status}}),a("q-step",{attrs:{name:10,title:"Orden Entregada",icon:"home","done-icon":"home","active-icon":"home"}})],1)],1),a("div",{staticStyle:{width:"100%",height:"550px"}},[a("l-map",{ref:"myMap",staticStyle:{"z-index":"0"},attrs:{zoom:e.zoom,center:e.center,options:{zoomControl:!1}}},[a("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),a("l-marker",{attrs:{"lat-lng":e.center_origen,icon:e.icon_origen}}),a("l-marker",{attrs:{"lat-lng":e.center_destino,icon:e.icon_destino}}),e.showDriver?[a("l-marker",{attrs:{"lat-lng":e.center,icon:e.icon_driver}})]:e._e()],2)],1)])},o=[],s=(a("20d6"),a("967e")),n=a.n(s),i=(a("96cf"),a("c1df")),c=a.n(i),d=a("2699"),l=a("a40a"),_=a("4e2b"),h=a("e11eb");a("6cc5");delete h["Icon"].Default.prototype._getIconUrl,h["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var u={components:{"l-map":d["a"],"l-tile-layer":l["a"],"l-marker":_["a"]},created:function(){this.checkParams()},data:function(){return{orderMsg:{color:"bg-primary",icon:"search",order:"Confirmando",details:"Asignando orden",driver_name:""},status:7,orderFailed:!1,showDriver:!1,order_id:"",details:"",driver_id:null,driver_name:"",driver_phone:"",dodo_delivery_id:null,zoom:13,url:"https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',center:[-17.783384,-63.18203],center_origen:[0,0],center_destino:[0,0],icon_origen:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-origen.png",iconSize:[64,64],iconAnchor:[24,64]}),icon_destino:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-destino.png",iconSize:[64,64],iconAnchor:[34,64]}),icon_driver:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-driver.png",iconSize:[64,64],iconAnchor:[30,64]}),access_token:"36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d",operator_token:"ca3686de8b9cd13abcb362e09e494210",refresh_handler:null,time_refresh:15,reload:!1,loadCancel:!1}},methods:{checkParams:function(){var e=this.$route.params.order_id;e&&(this.order_id=e,this.monitoringOrderDelivery())},cancelOrder:function(){var e,t,a,r;return n.a.async((function(o){while(1)switch(o.prev=o.next){case 0:if(this.loadCancel=!0,e=confirm("¿Esta seguro de cancelar esta orden?"),!e){o.next=16;break}return t="https://dodo.jugnoo.in:8024/update_order",a={key_type:5,order_id:this.dodo_delivery_id,access_token:"b3de8bde6886e4695cbf5f23fcc363fa"},o.prev=5,o.next=8,n.a.awrap(this.$axios.post(t,a));case 8:r=o.sent,console.log("CANCELANDO ",r),alert("ORDEN CANCELADA"),o.next=16;break;case 13:o.prev=13,o.t0=o["catch"](5),console.log("CANCEL ERROR ",o.t0);case 16:this.loadCancel=!1;case 17:case"end":return o.stop()}}),null,this,[[5,13]])},monitoringOrderDelivery:function(){var e,t,a,r;return n.a.async((function(o){while(1)switch(o.prev=o.next){case 0:return e=Date.now(),t=c()().format("YYYY-MM-DD"),a="https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=395&start_date="+t+"&end_date="+t+"&fetch_active_orders=1&order_id="+this.order_id+"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_="+e,o.prev=3,o.next=6,n.a.awrap(this.$axios.get(a));case 6:r=o.sent,r.data.aaData.length>0?(this.reload||(this.details=r.data.aaData[0].details,this.center_origen=[r.data.aaData[0].pickup_latitude,r.data.aaData[0].pickup_longitude],this.center_destino=[r.data.aaData[0].to_latitude,r.data.aaData[0].to_longitude]),this.dodo_delivery_id=r.data.aaData[0].dodo_delivery_id,this.driver_id=r.data.aaData[0].driver_id,this.status=r.data.aaData[0].dodo_delivery_status,this.driver_id&&(this.getCoordsDriver(),this.driver_name=r.data.aaData[0].driver_name,this.updateMsg("bg-green","done","Orden "+this.order_id,this.details,this.driver_name))):(this.orderFailed=!0,this.status=10,console.log("No se encuentra la Orden "+this.order_id),this.driver_phone="",this.updateMsg("bg-green","home","Orden entregada","",""),clearTimeout(this.refresh_handler),this.refresh_handler=null),o.next=13;break;case 10:o.prev=10,o.t0=o["catch"](3),console.log(o.t0);case 13:this.reset_timer();case 14:case"end":return o.stop()}}),null,this,[[3,10]])},reset_timer:function(){var e=this;clearTimeout(this.refresh_handler),this.refresh_handler=setTimeout((function(){e.reload=!0,e.monitoringOrderDelivery(),console.log("Refresh DRIVER...")}),1e3*this.time_refresh)},getCoordsDriver:function(){var e,t,a,r,o=this;return n.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return e="https://api-panels.jugnoo.in:8020/get_driver_details?token=b3de8bde6886e4695cbf5f23fcc363fa&city_id=395&status=1&delivery_enabled=1&is_delivery_panel=1",s.prev=1,s.next=4,n.a.awrap(this.$axios.get(e));case 4:t=s.sent,t.data.data.length>0&&(a=t.data.data,r=a.findIndex((function(e){return e.driver_id==o.driver_id})),r>=0?(this.center=[a[r].current_latitude,a[r].current_longitude],this.zoom=15,this.showDriver=!0,this.driver_phone=a[r].phone_no):(this.status=10,this.orderFailed=!0,console.log("NO SE ENCONTRO LA MOTO"),this.updateMsg("bg-green","home","Orden entregada","",""),clearTimeout(this.refresh_handler),this.refresh_handler=null)),s.next=11;break;case 8:s.prev=8,s.t0=s["catch"](1),console.log(s.t0);case 11:case"end":return s.stop()}}),null,this,[[1,8]])},updateMsg:function(e,t,a,r,o){this.orderMsg={color:e,icon:t,order:a,details:r,driver_name:o}}}},p=u,b=a("2877"),f=Object(b["a"])(p,r,o,!1,null,null,null);t["default"]=f.exports}}]);