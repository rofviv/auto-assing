(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"35d6":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"q-pa-md"},[t("q-stepper",{ref:"stepper",attrs:{flat:"",color:"bg-green","done-color":"secondary","active-color":"deep-orange",bordered:""},scopedSlots:e._u([{key:"message",fn:function(){return[t("q-banner",{class:e.orderMsg.color+" text-white",scopedSlots:e._u([{key:"avatar",fn:function(){return[t("q-icon",{attrs:{name:e.orderMsg.icon,size:"30px"}})]},proxy:!0},{key:"action",fn:function(){return[t("div",{staticClass:"text-caption"},[t("q-icon",{attrs:{name:"motorcycle",size:"22px"}}),e._v("\n              "+e._s(e.orderMsg.driver_name)+"  "+e._s(e.driver_phone)+"\n            ")],1)]},proxy:!0}])},[t("div",{staticClass:"text-subtitle1"},[e._v("\n            "+e._s(e.orderMsg.order)+"\n          ")]),t("div",{staticClass:"text-caption"},[e._v("\n            "+e._s(e.orderMsg.details)+"\n          ")])]),t("div",{staticClass:"text-right q-mt-xs"},[10!=e.status&&1!=e.status?t("q-btn",{attrs:{loading:e.loadCancel,color:"red",label:"Cancelar Orden"},on:{click:e.cancelOrder}}):e._e()],1)]},proxy:!0}]),model:{value:e.status,callback:function(a){e.status=a},expression:"status"}},[t("q-step",{attrs:{name:7,title:"Confirmando pedido",icon:"done","done-icon":"done","active-icon":"done",done:0==e.status||1==e.status||4==e.status||10==e.status}}),t("q-step",{attrs:{name:0,title:"Orden Confirmada",icon:"done_all","done-icon":"done_all","active-icon":"done_all",done:1==e.status||4==e.status||10==e.status}}),t("q-step",{attrs:{name:4,title:"Recogiendo Orden",icon:"shopping_basket","done-icon":"shopping_basket","active-icon":"shopping_basket",done:1==e.status||10==e.status}}),t("q-step",{attrs:{name:1,title:"En camino",icon:"motorcycle","done-icon":"motorcycle","active-icon":"motorcycle",done:10==e.status}}),t("q-step",{attrs:{name:10,title:"Orden Entregada",icon:"home","done-icon":"home","active-icon":"home"}})],1)],1),t("div",{staticStyle:{width:"100%",height:"550px"}},[t("l-map",{ref:"myMap",staticStyle:{"z-index":"0"},attrs:{zoom:e.zoom,center:e.center,options:{zoomControl:!1}}},[t("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),t("l-marker",{attrs:{"lat-lng":e.center_origen,icon:e.icon_origen}}),t("l-marker",{attrs:{"lat-lng":e.center_destino,icon:e.icon_destino}}),e.showDriver?[t("l-marker",{attrs:{"lat-lng":e.center,icon:e.icon_driver}})]:e._e()],2)],1)])},s=[],n=(t("20d6"),t("a34a")),c=t.n(n),o=(t("96cf"),t("c973")),i=t.n(o),d=t("c1df"),l=t.n(d),b=t("2699"),f=t("a40a"),u=t("4e2b"),_=t("e11e"),h=(t("6cc5"),t("18d6"));delete _["Icon"].Default.prototype._getIconUrl,_["Icon"].Default.mergeOptions({iconRetinaUrl:t("584d"),iconUrl:t("6397"),shadowUrl:t("e2b9")});var j={components:{"l-map":b["a"],"l-tile-layer":f["a"],"l-marker":u["a"]},created:function(){this.checkParams(),this.cargarCiudad()},data:function(){return{orderMsg:{color:"bg-primary",icon:"search",order:"Confirmando",details:"Asignando orden",driver_name:""},status:7,orderFailed:!1,showDriver:!1,order_id:"",details:"",driver_id:null,driver_name:"",driver_phone:"",dodo_delivery_id:null,zoom:13,url:"https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',center:[0,0],center_origen:[0,0],center_destino:[0,0],icon_origen:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-origen.png",iconSize:[64,64],iconAnchor:[24,64]}),icon_destino:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-destino.png",iconSize:[64,64],iconAnchor:[34,64]}),icon_driver:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-driver.png",iconSize:[64,64],iconAnchor:[30,64]}),access_token:"36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d",operator_token:"ca3686de8b9cd13abcb362e09e494210",refresh_handler:null,time_refresh:15,reload:!1,loadCancel:!1,citySelect:395}},methods:{cargarCiudad:function(){switch(this.center=h["a"].getItem("center")||[-17.783384,-63.18203],h["a"].getItem("ciudad")){case"Santa Cruz":this.citySelect=395;break;case"Cochabamba":this.citySelect=704;break;case"La Paz":this.citySelect=818;break;case"Tarija":this.citySelect=859;break;case"Sucre":this.citySelect=933;break;case"Villa Imperial de Potosí":this.citySelect=1796;break;case"Arequipa":this.citySelect=786;break;case"Montevideo":this.citySelect=997;break;case"San José de Mayo":this.citySelect=3190;break}},checkParams:function(){var e=this.$route.params.order_id;e&&(this.order_id=e,this.monitoringOrderDelivery())},cancelOrder:function(){var e=this;return i()(c.a.mark((function a(){var t,r,s,n;return c.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.loadCancel=!0,t=confirm("¿Esta seguro de cancelar esta orden?"),!t){a.next=16;break}return r="https://dodo.jugnoo.in:8024/update_order",s={key_type:5,order_id:e.dodo_delivery_id,access_token:"845c88964029c3c89451c8925a5bf093"},a.prev=5,a.next=8,e.$axios.post(r,s);case 8:n=a.sent,console.log("CANCELANDO ",n),alert("ORDEN CANCELADA"),a.next=16;break;case 13:a.prev=13,a.t0=a["catch"](5),console.log("CANCEL ERROR ",a.t0);case 16:e.loadCancel=!1;case 17:case"end":return a.stop()}}),a,null,[[5,13]])})))()},monitoringOrderDelivery:function(){var e=this;return i()(c.a.mark((function a(){var t,r,s,n;return c.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t=Date.now(),r=l()().format("YYYY-MM-DD"),s="https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=845c88964029c3c89451c8925a5bf093&secret=P7JlZXiRiIvSssQSSzqs&city_id="+e.citySelect+"&start_date="+r+"&end_date="+r+"&fetch_active_orders=1&order_id="+e.order_id+"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_="+t,a.prev=3,a.next=6,e.$axios.get(s);case 6:n=a.sent,n.data.aaData.length>0?(e.reload||(e.details=n.data.aaData[0].details,e.center_origen=[n.data.aaData[0].pickup_latitude,n.data.aaData[0].pickup_longitude],e.center_destino=[n.data.aaData[0].to_latitude,n.data.aaData[0].to_longitude]),e.dodo_delivery_id=n.data.aaData[0].dodo_delivery_id,e.driver_id=n.data.aaData[0].driver_id,e.status=n.data.aaData[0].dodo_delivery_status,e.driver_id&&(e.getCoordsDriver(),e.driver_name=n.data.aaData[0].driver_name,e.updateMsg("bg-green","done","Orden "+e.order_id,e.details,e.driver_name))):(e.orderFailed=!0,e.status=10,console.log("No se encuentra la Orden "+e.order_id),e.driver_phone="",e.updateMsg("bg-green","home","Orden entregada","",""),clearTimeout(e.refresh_handler),e.refresh_handler=null),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](3),console.log(a.t0);case 13:e.reset_timer();case 14:case"end":return a.stop()}}),a,null,[[3,10]])})))()},reset_timer:function(){var e=this;clearTimeout(this.refresh_handler),this.refresh_handler=setTimeout((function(){e.reload=!0,e.monitoringOrderDelivery(),console.log("Refresh DRIVER...")}),1e3*this.time_refresh)},getCoordsDriver:function(){var e=this;return i()(c.a.mark((function a(){var t,r,s,n;return c.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t="https://api-panels.jugnoo.in:8020/get_driver_details?token=845c88964029c3c89451c8925a5bf093&city_id="+e.citySelect+"&status=1&delivery_enabled=1&is_delivery_panel=1",a.prev=1,a.next=4,e.$axios.get(t);case 4:r=a.sent,r.data.data.length>0&&(s=r.data.data,n=s.findIndex((function(a){return a.driver_id==e.driver_id})),n>=0?(e.center=[s[n].current_latitude,s[n].current_longitude],e.zoom=15,e.showDriver=!0,e.driver_phone=s[n].phone_no):(e.status=10,e.orderFailed=!0,console.log("NO SE ENCONTRO LA MOTO"),e.updateMsg("bg-green","home","Orden entregada","",""),clearTimeout(e.refresh_handler),e.refresh_handler=null)),a.next=11;break;case 8:a.prev=8,a.t0=a["catch"](1),console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[1,8]])})))()},updateMsg:function(e,a,t,r,s){this.orderMsg={color:e,icon:a,order:t,details:r,driver_name:s}}}},p=j,m=t("2877"),g=t("f531"),v=t("87fe"),S=t("54e1"),k=t("0016"),y=t("9c40"),x=t("eebe"),D=t.n(x),C=Object(m["a"])(p,r,s,!1,null,null,null);a["default"]=C.exports;D()(C,"components",{QStepper:g["a"],QStep:v["a"],QBanner:S["a"],QIcon:k["a"],QBtn:y["a"]})},4678:function(e,a,t){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"73332","./en-il.js":"73332","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var a=n(e);return t(a)}function n(e){if(!t.o(r,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return r[e]}s.keys=function(){return Object.keys(r)},s.resolve=n,e.exports=s,s.id="4678"}}]);