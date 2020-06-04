(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d22cd0e"],{f59b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-md"},[a("q-dialog",{model:{value:t.history,callback:function(e){t.history=e},expression:"history"}},[a("q-card",[a("q-card-section",[t._v("\r\n        Haz click en la orden para visualizarlo en el mapa\r\n      ")]),a("q-card-section",[a("q-list",{attrs:{bordered:"",separator:""}},t._l(t.order_history,(function(e,s){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:s,attrs:{clickable:""},on:{click:function(a){return t.openWindow(e.order_id)}}},[a("q-item-section",[a("q-item-label",[t._v("Orden ID: "+t._s(e.order_id))]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.details))])],1)],1)})),1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK",color:"primary"}})],1)],1)],1),a("q-dialog",{model:{value:t.dialogFind,callback:function(e){t.dialogFind=e},expression:"dialogFind"}},[a("q-card",[a("q-card-section",[t._v("\r\n        Seleccionar una direccion guardada\r\n      ")]),a("q-card-section",[a("q-list",{attrs:{bordered:"",separator:""}},t._l(t.address_list,(function(e,s){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:s,attrs:{clickable:""},on:{click:function(e){return t.selectAddress(s)}}},[a("q-item-section",[a("q-item-label",[t._v(t._s(e.name))]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.reference))])],1)],1)})),1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK",color:"primary"}})],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.dialogSave,callback:function(e){t.dialogSave=e},expression:"dialogSave"}},[a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Guardar direccion como:")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dense:"",autofocus:""},model:{value:t.addressSave,callback:function(e){t.addressSave=e},expression:"addressSave"}})],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancelar"}}),a("q-btn",{attrs:{flat:"",label:"Guardar direccion"},on:{click:t.saveAddressLocal}})],1)],1)],1),a("q-select",{attrs:{"option-label":"city","emit-value":"","map-options":"","option-value":"id",options:t.cityOptions,label:"Ciudad"},on:{input:t.cambiarCiudad},model:{value:t.citySelect,callback:function(e){t.citySelect=e},expression:"citySelect"}}),a("div",{staticClass:"row wrap items-center"},[a("div",{staticClass:"col-7"},[[a("div",{staticClass:"q-py-xs"},[a("q-banner",{class:t.sendOrderMsg.color+" text-white",attrs:{rounded:""}},[t._v("\r\n            ID Orden: "+t._s(t.sendOrderMsg.id)+" "),a("br"),t._v("\r\n            "+t._s(t.sendOrderMsg.msg)+"\r\n          ")])],1)]],2),a("div",{staticClass:"col-5"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"q-gutter-sm text-right"},[a("div",{staticClass:"text-grey-7"},[t._v("Gastos de envío")]),t._v("\r\n            "+t._s(t.deliveryCost)+"\r\n          ")])]),a("div",{staticClass:"col"},[a("div",{staticClass:"q-gutter-sm text-right "},[a("q-btn",{staticClass:"q-mb-sm",attrs:{loading:t.loadDeliveryBtn,color:"primary",size:"10px"},on:{click:t.calculateDelivery}},[t._v("Calcular envío")]),a("q-btn",{staticClass:"q-mb-sm",attrs:{disabled:""==t.details,loading:t.loadBtn,color:"green",size:"10px"},on:{click:t.sendOrder}},[t._v("Finalizar Pedido")]),a("q-btn",{attrs:{flat:"",round:"",icon:"history"},on:{click:function(e){t.history=!0}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[t._v("\r\n                  Historial\r\n                ")])],1)],1)])])])]),a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row q-gutter-x-lg no-wrap justify-center q-py-xs"},[a("div",{staticClass:"col-3"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[t._v("DATOS")]),a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Telefono"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:t.findUser}})]},proxy:!0}]),model:{value:t.celClient,callback:function(e){t.celClient=e},expression:"celClient"}}),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Cliente"},model:{value:t.nameClient,callback:function(e){t.nameClient=e},expression:"nameClient"}}),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Detalle",autogrow:""},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Razon Social"},model:{value:t.nameNit,callback:function(e){t.nameNit=e},expression:"nameNit"}})],1),a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs q-ml-xs",attrs:{filled:"",label:"NIT"},model:{value:t.nit,callback:function(e){t.nit=e},expression:"nit"}})],1)]),a("div",[a("q-input",{attrs:{id:"image",filled:"",type:"file",hint:"Imagen (Opcional)"},on:{input:function(e){t.order_images=e[0]}}})],1)],1)],1)],1),a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[t._v("ORIGEN")]),a("div",{staticClass:"row items-center"},[a("div",{staticClass:"col-9"},[a("q-input",{attrs:{filled:"",label:"URL WhatsApp"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(e){return t.findMap("1")}}})]},proxy:!0}]),model:{value:t.urlWpFrom,callback:function(e){t.urlWpFrom=e},expression:"urlWpFrom"}})],1),a("div",{staticClass:"col-3 q-gutter-sm text-right"},[a("q-btn",{attrs:{flat:"",round:"",icon:"find_in_page"},on:{click:function(e){return t.findAddress("1")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[t._v("\r\n                  Buscar dirección guardada\r\n                ")])],1),a("q-btn",{attrs:{flat:"",round:"",icon:"save"},on:{click:function(e){return t.saveAddress("1")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[t._v("\r\n                  Guardar esta dirección\r\n                ")])],1)],1)]),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Recoger desde",autogrow:""},model:{value:t.from_address,callback:function(e){t.from_address=e},expression:"from_address"}}),a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{staticStyle:{width:"100%",height:"300px"}},[a("l-map",{ref:"myMapFrom",staticStyle:{"z-index":"0"},attrs:{zoom:t.zoom,center:t.from_center,options:{zoomControl:!1}},on:{click:t.updateMarkerFrom}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),a("l-marker",{attrs:{"lat-lng":t.from_center}})],1)],1)])],1),a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[t._v("DESTINO")]),a("div",{staticClass:"row items-center"},[a("div",{staticClass:"col-9"},[a("q-input",{attrs:{filled:"",label:"URL WhatsApp"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(e){return t.findMap("2")}}})]},proxy:!0}]),model:{value:t.urlWpTo,callback:function(e){t.urlWpTo=e},expression:"urlWpTo"}})],1),a("div",{staticClass:"col-3 q-gutter-sm text-right"},[a("q-btn",{attrs:{flat:"",round:"",icon:"find_in_page"},on:{click:function(e){return t.findAddress("2")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[t._v("\r\n                  Buscar dirección guardada\r\n                ")])],1),a("q-btn",{attrs:{flat:"",round:"",icon:"save"},on:{click:function(e){return t.saveAddress("2")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[t._v("\r\n                  Guardar esta dirección\r\n                ")])],1)],1)]),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Entregar En",autogrow:""},model:{value:t.to_address,callback:function(e){t.to_address=e},expression:"to_address"}}),a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{staticStyle:{width:"100%",height:"300px"}},[a("l-map",{ref:"myMapTo",staticStyle:{"z-index":"0"},attrs:{zoom:t.zoom,center:t.to_center,options:{zoomControl:!1}},on:{click:t.updateMarkerTo}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),a("l-marker",{attrs:{"lat-lng":t.to_center}})],1)],1)])],1)])])],1)],1)},i=[],r=a("967e"),n=a.n(r),o=(a("96cf"),a("18d6")),l=(a("c1df"),a("2699")),c=a("a40a"),d=a("4e2b"),p=a("e11eb");a("6cc5"),a("9490");delete p["Icon"].Default.prototype._getIconUrl,p["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var u={components:{"l-map":l["a"],"l-tile-layer":c["a"],"l-marker":d["a"]},mounted:function(){this.cargarCiudad()},data:function(){return{dialogSave:!1,addressSave:"",dialogFind:!1,history:!1,celClient:"",urlWpFrom:"",nameClient:"",urlWpTo:"",order_images:null,details:"",nit:"",nameNit:"",from_address:"",from_center:[-17.783384,-63.18203],to_address:"",to_center:[-17.783384,-63.18203],selectRef:"",selectRefFind:"",deliveryCost:0,sendOrderMsg:{id:-1,color:"bg-white",msg:"No hay pedido realizado",order:{}},loadDeliveryBtn:!1,loadBtn:!1,user_identifier:"f098ca9ec28803",operator_token:"ca3686de8b9cd13abcb362e09e494210",access_token:"91e57f5aad349a0c8778f787d22edabd89558dedf975f3d239e4b943078c8411",zoom:13,url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',citySelect:395,cityOptions:[{city:"Santa Cruz",id:395},{city:"Cochabamba",id:704},{city:"La Paz",id:818},{city:"Tarija",id:859}]}},methods:{cargarCiudad:function(){this.from_center=o["a"].getItem("center")||[-17.783384,-63.18203],this.to_center=o["a"].getItem("center")||[-17.783384,-63.18203],this.citySelect=o["a"].getItem("ciudad")||395},cambiarCiudad:function(){switch(this.citySelect){case 395:o["a"].set("ciudad",this.citySelect),o["a"].set("center",[-17.783384,-63.18203]);break;case 704:o["a"].set("ciudad",this.citySelect),o["a"].set("center",[-17.393868,-66.157481]);break;case 818:o["a"].set("ciudad",this.citySelect),o["a"].set("center",[-16.505147,-68.129631]);break;case 859:o["a"].set("ciudad",this.citySelect),o["a"].set("center",[-21.533739,-64.733768]);break}location.reload()},openWindow:function(t){window.open("https://patioserviceonline.com/sc/#/map/order/"+t)},updateMarkerFrom:function(t){this.from_center=[t.latlng.lat,t.latlng.lng]},updateMarkerTo:function(t){this.to_center=[t.latlng.lat,t.latlng.lng]},findMap:function(t){if("1"==t){var e="https://maps.google.com/maps?q=";if(0==this.urlWpFrom.indexOf(e)){var a="%2C",s="&z=17&hl=es",i=this.urlWpFrom.substring(e.length,this.urlWpFrom.indexOf(a)),r=this.urlWpFrom.substring(this.urlWpFrom.indexOf(a)+a.length,this.urlWpFrom.indexOf(s));this.from_center=[parseFloat(i),parseFloat(r)]}else alert("URL del mapa es invalido")}else{e="https://maps.google.com/maps?q=";if(0==this.urlWpTo.indexOf(e)){a="%2C",s="&z=17&hl=es",i=this.urlWpTo.substring(e.length,this.urlWpTo.indexOf(a)),r=this.urlWpTo.substring(this.urlWpTo.indexOf(a)+a.length,this.urlWpTo.indexOf(s));this.to_center=[parseFloat(i),parseFloat(r)]}else alert("URL del mapa es invalido")}},calculateDelivery:function(){var t,e;return n.a.async((function(a){while(1)switch(a.prev=a.next){case 0:return this.deliveryCost=0,this.loadDeliveryBtn=!0,t="https://prod-fatafat-new.jugnoo.in:4030/get_all_details?device_type=0&app_version=436&to_latitude="+JSON.stringify(this.to_center[0])+"&access_token="+this.access_token+"&login_type=0&from_latitude="+JSON.stringify(this.from_center[0])+"&locale=es&operator_token="+this.operator_token+"&to_longitude="+JSON.stringify(this.to_center[1])+"&customer_package_name=com.movapps.mav.patioservice&from_longitude="+JSON.stringify(this.from_center[1]),a.prev=3,a.next=6,n.a.awrap(this.$axios.get(t));case 6:e=a.sent,e.data.delivery_charges?this.deliveryCost=e.data.delivery_charges.estimated_charges:alert(e.data.message),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](3),console.log("Error al calcular el costo de envio: ",a.t0);case 13:this.loadDeliveryBtn=!1;case 14:case"end":return a.stop()}}),null,this,[[3,10]])},sendOrder:function(){var t,e,a,s;return n.a.async((function(i){while(1)switch(i.prev=i.next){case 0:return this.loadBtn=!0,t="https://prod-fatafat-new.jugnoo.in:4030/place_order",e="",a=new URLSearchParams,this.order_images&&a.append("order_images",this.order_images),""!=this.celClient&&(e+="*CEL: "+this.celClient+" "),""!=this.nameClient&&(e+="*CLI: "+this.nameClient+" "),""==this.nameNit&&""==this.nit||(e+="*NIT: "+this.nit+" - "+this.nameNit+" "),e+="DET: "+this.details,a.append("details",e),a.append("from_address",this.from_address),a.append("from_latitude",JSON.stringify(this.from_center[0])),a.append("from_longitude",JSON.stringify(this.from_center[1])),a.append("payment_mode","1"),a.append("to_address",this.to_address),a.append("to_latitude",JSON.stringify(this.to_center[0])),a.append("to_longitude",JSON.stringify(this.to_center[1])),a.append("is_immediate","1"),a.append("user_identifier",this.user_identifier),a.append("app_version","436"),a.append("device_type","0"),a.append("login_type","0"),a.append("operator_token",this.operator_token),a.append("customer_package_name","com.movapps.mav.patioservice"),a.append("locale","es"),a.append("access_token",this.access_token),i.prev=26,i.next=29,n.a.awrap(this.$axios.post(t,a));case 29:s=i.sent,s.data.order_id?(this.sendOrderMsg.id=s.data.order_id,this.sendOrderMsg.msg=s.data.message,this.sendOrderMsg.color="bg-green-5",this.$store.commit("orderHistory/updateHistory",{order_id:s.data.order_id,details:this.details}),this.clearInputs()):(this.sendOrderMsg.id="ERROR",this.sendOrderMsg.msg=s.data.message,this.sendOrderMsg.color="bg-red-5"),i.next=36;break;case 33:i.prev=33,i.t0=i["catch"](26),console.log("Error SEND ORDER",i.t0);case 36:this.loadBtn=!1;case 37:case"end":return i.stop()}}),null,this,[[26,33]])},findAddress:function(t){this.selectRefFind=t,this.dialogFind=!0},selectAddress:function(t){var e=this.$store.getters["address/getItem"](t);"1"==this.selectRefFind?(this.from_address=e.reference,this.from_center=e.latlng):(this.to_address=e.reference,this.to_center=e.latlng),this.dialogFind=!1},saveAddressLocal:function(){var t={};if("1"==this.selectRef)t={name:this.addressSave,reference:this.from_address,latlng:this.from_center};else{if("2"!=this.selectRef)return;t={name:this.addressSave,reference:this.to_address,latlng:this.to_center}}this.$store.commit("address/updateList",t),this.dialogSave=!1,this.addressSave=""},saveAddress:function(t){this.selectRef=t,"1"==t?""!=this.from_address&&(this.dialogSave=!0):""!=this.to_address&&(this.dialogSave=!0)},clearInputs:function(){this.details="",this.order_images=null,this.from_address="",this.to_address="",this.urlWpFrom="",this.urlWpTo=""},findUser:function(){return n.a.async((function(t){while(1)switch(t.prev=t.next){case 0:this.celClient;case 1:case"end":return t.stop()}}),null,this)}},computed:{order_history:{get:function(){return this.$store.getters["orderHistory/getHistory"]}},address_list:{get:function(){return this.$store.getters["address/getList"]}}}},m=u,f=a("2877"),h=Object(f["a"])(m,s,i,!1,null,null,null);e["default"]=h.exports}}]);