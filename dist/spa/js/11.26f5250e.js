(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{4:function(e,t){},5:function(e,t){},9414:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-pa-md"},[a("q-dialog",{model:{value:e.history,callback:function(t){e.history=t},expression:"history"}},[a("q-card",[a("q-card-section",[e._v("\r\n        Haz click en la orden para visualizarlo en el mapa\r\n      ")]),a("q-card-section",[e.order_history.length>0?[a("q-list",{attrs:{bordered:"",separator:""}},e._l(e.order_history,(function(t,r){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:r,attrs:{clickable:""},on:{click:function(a){return e.openWindow(t.order_id)}}},[a("q-item-section",[a("q-item-label",[e._v("Orden ID: "+e._s(t.order_id))]),a("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.details))]),a("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.date.formatDate(t.created_at,"D MMM hh:mm a")))])],1)],1)})),1)]:[a("div",[a("q-circular-progress",{staticClass:"q-ma-md",attrs:{indeterminate:"",size:"50px"}})],1)]],2),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{attrs:{flat:"",loading:e.loadMoreHistory,label:"Mostrar más",color:"orange"},on:{click:function(t){return e.loadHistory(1)}}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cerrar",color:"primary"}})],1)],1)],1),a("q-dialog",{model:{value:e.dialogFind,callback:function(t){e.dialogFind=t},expression:"dialogFind"}},[a("q-card",[a("q-card-section",[e._v("\r\n        Seleccionar una direccion guardada\r\n        "),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",dense:"",label:"Buscar"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filterAddress,callback:function(t){e.filterAddress=t},expression:"filterAddress"}})],1),a("q-card-section",[a("q-list",{attrs:{bordered:"",separator:""}},e._l(e.arrayFilterAddress,(function(t,r){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:r,attrs:{clickable:""},on:{click:function(a){return e.selectAddress(t)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(t.name))]),a("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.reference))])],1)],1)})),1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK",color:"primary"}})],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:e.dialogSave,callback:function(t){e.dialogSave=t},expression:"dialogSave"}},[a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[e._v("Guardar direccion como:")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dense:"",autofocus:""},model:{value:e.addressSave,callback:function(t){e.addressSave=t},expression:"addressSave"}})],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancelar"}}),a("q-btn",{attrs:{flat:"",label:"Guardar direccion"},on:{click:e.saveAddressLocal}})],1)],1)],1),a("div",{staticClass:"row wrap items-center"},[a("div",{staticClass:"col-4"},[[a("div",{staticClass:"q-py-xs"},[a("q-banner",{class:e.sendOrderMsg.color+" text-white",attrs:{rounded:""}},[e._v("\r\n            ID Orden: "+e._s(e.sendOrderMsg.id)+" "),a("br"),e._v("\r\n            "+e._s(e.sendOrderMsg.msg)+"\r\n          ")])],1)]],2),a("div",{staticClass:"col-3"},[a("q-select",{attrs:{square:"",outlined:"",options:e.cityOptions,dense:""},on:{input:e.cambiarCiudad},model:{value:e.citySelect,callback:function(t){e.citySelect=t},expression:"citySelect"}})],1),a("div",{staticClass:"col-5"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"q-gutter-sm text-right"},[a("div",{staticClass:"text-grey-7"},[e._v("Gastos de envío")]),e._v("\r\n            "+e._s(e.deliveryCost)+"\r\n          ")])]),a("div",{staticClass:"col"},[a("div",{staticClass:"q-gutter-sm text-right "},[a("q-btn",{staticClass:"q-mb-sm",attrs:{loading:e.loadDeliveryBtn,color:"primary",size:"10px"},on:{click:e.calculateDelivery}},[e._v("Calcular envío")]),a("q-btn",{staticClass:"q-mb-sm",attrs:{disabled:""==e.details,loading:e.loadBtn,color:"green",size:"10px"},on:{click:e.sendOrder}},[e._v("Finalizar Pedido")]),a("q-btn",{attrs:{flat:"",round:"",icon:"history"},on:{click:function(t){return e.loadHistory(0)}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[e._v("\r\n                  Historial\r\n                ")])],1)],1)])])])]),a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row q-gutter-x-lg no-wrap justify-center q-py-xs"},[a("div",{staticClass:"col-3"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[e._v("DATOS")]),a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Telefono"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:e.findUser}})]},proxy:!0}]),model:{value:e.celClient,callback:function(t){e.celClient=t},expression:"celClient"}}),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Cliente"},model:{value:e.nameClient,callback:function(t){e.nameClient=t},expression:"nameClient"}}),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"*Detalle (Obligatorio)",autogrow:""},model:{value:e.details,callback:function(t){e.details=t},expression:"details"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Razon Social"},model:{value:e.nameNit,callback:function(t){e.nameNit=t},expression:"nameNit"}})],1),a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs q-ml-xs",attrs:{filled:"",label:"NIT"},model:{value:e.nit,callback:function(t){e.nit=t},expression:"nit"}})],1)]),a("div",[a("q-input",{attrs:{id:"image",filled:"",type:"file",hint:"Imagen (Opcional)"},on:{input:function(t){e.order_images=t[0]}}})],1),a("div",{staticClass:"q-mt-md"},[a("q-btn",{staticClass:"q-mb-sm",attrs:{loading:e.loadSaveUser,color:"green",size:"10px",icon:"save",label:"Guardar Usuario"},on:{click:e.saveUsers}})],1)],1)],1)],1),a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[e._v("ORIGEN")]),a("div",{staticClass:"row items-center"},[a("div",{staticClass:"col-9"},[a("q-input",{attrs:{filled:"",label:"URL WhatsApp"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(t){return e.findMap("1")}}})]},proxy:!0}]),model:{value:e.urlWpFrom,callback:function(t){e.urlWpFrom=t},expression:"urlWpFrom"}})],1),a("div",{staticClass:"col-3 q-gutter-sm text-right"},[a("q-btn",{attrs:{flat:"",round:"",icon:"find_in_page"},on:{click:function(t){return e.findAddress("1")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[e._v("\r\n                  Buscar dirección guardada\r\n                ")])],1),a("q-btn",{attrs:{flat:"",round:"",icon:"save"},on:{click:function(t){return e.saveAddress("1")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[e._v("\r\n                  Guardar esta dirección\r\n                ")])],1)],1)]),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Recoger desde*",autogrow:""},model:{value:e.from_address,callback:function(t){e.from_address=t},expression:"from_address"}}),a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{staticStyle:{width:"100%",height:"300px"}},[a("l-map",{ref:"myMapFrom",staticStyle:{"z-index":"0"},attrs:{zoom:e.zoom,center:e.from_center,options:{zoomControl:!1}},on:{click:e.updateMarkerFrom}},[a("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),a("l-marker",{attrs:{"lat-lng":e.from_center}})],1)],1)]),a("q-input",{staticClass:"q-mt-xs",attrs:{filled:"",dense:"",label:"Buscar una direccion",hint:"Ejm: Calle dechia"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(t){return e.searchAddressGeo("1")}}})]},proxy:!0}]),model:{value:e.searchFromAddress,callback:function(t){e.searchFromAddress=t},expression:"searchFromAddress"}}),e.listFromAddress.length>0?a("div",[a("ul",e._l(e.listFromAddress,(function(t,r){return a("li",{key:r,staticClass:"q-mb-xs"},[e._v("\r\n                "+e._s(t.label)+"\r\n                "),a("q-btn",{attrs:{flat:"",color:"primary",label:"Seleccionar"},on:{click:function(a){return e.selectGeoAddress(t,"1")}}})],1)})),0),a("q-btn",{attrs:{flat:"",color:"orange",label:"Limpiar Lista"},on:{click:function(t){e.listFromAddress=[]}}})],1):e._e()],1),a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-center text-grey-6 q-pb-xs"},[e._v("DESTINO")]),a("div",{staticClass:"row items-center"},[a("div",{staticClass:"col-9"},[a("q-input",{attrs:{filled:"",label:"URL WhatsApp"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(t){return e.findMap("2")}}})]},proxy:!0}]),model:{value:e.urlWpTo,callback:function(t){e.urlWpTo=t},expression:"urlWpTo"}})],1),a("div",{staticClass:"col-3 q-gutter-sm text-right"},[a("q-btn",{attrs:{flat:"",round:"",icon:"find_in_page"},on:{click:function(t){return e.findAddress("2")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[e._v("\r\n                  Buscar dirección guardada\r\n                ")])],1),a("q-btn",{attrs:{flat:"",round:"",icon:"save"},on:{click:function(t){return e.saveAddress("2")}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"center middle"}},[e._v("\r\n                  Guardar esta dirección\r\n                ")])],1)],1)]),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Entregar en*",autogrow:""},model:{value:e.to_address,callback:function(t){e.to_address=t},expression:"to_address"}}),a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{staticStyle:{width:"100%",height:"300px"}},[a("l-map",{ref:"myMapTo",staticStyle:{"z-index":"0"},attrs:{zoom:e.zoom,center:e.to_center,options:{zoomControl:!1}},on:{click:e.updateMarkerTo}},[a("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),a("l-marker",{attrs:{"lat-lng":e.to_center}})],1)],1)]),a("q-input",{staticClass:"q-mt-xs",attrs:{filled:"",dense:"",label:"Buscar una direccion",hint:"Ejm: av grigota"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchAddressGeo("2")}},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:function(t){return e.searchAddressGeo("2")}}})]},proxy:!0}]),model:{value:e.searchToAddress,callback:function(t){e.searchToAddress=t},expression:"searchToAddress"}}),e.listToAddress.length>0?a("div",[a("ul",e._l(e.listToAddress,(function(t,r){return a("li",{key:r,staticClass:"q-mb-xs"},[e._v("\r\n                "+e._s(t.label)+"\r\n                "),a("q-btn",{attrs:{flat:"",color:"primary",label:"Seleccionar"},on:{click:function(a){return e.selectGeoAddress(t,"2")}}})],1)})),0),a("q-btn",{attrs:{flat:"",color:"orange",label:"Limpiar Lista"},on:{click:function(t){e.listToAddress=[]}}})],1):e._e()],1)])])],1)],1)},s=[],n=(a("7f7f"),a("386d"),a("a34a")),i=a.n(n),o=(a("96cf"),a("c973")),c=a.n(o),l=a("18d6"),d=a("c6e0"),u=a("fc1b"),p=a("bd4c"),m=a("2699"),f=a("a40a"),h=a("4e2b"),g=a("e11e"),v=(a("6cc5"),a("9490"),a("ca4b")),_=new d["OpenStreetMapProvider"];delete g["Icon"].Default.prototype._getIconUrl,g["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var b={components:{"l-map":m["a"],"l-tile-layer":f["a"],"l-marker":h["a"]},mounted:function(){var e=this;return c()(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.cargarCiudad(),t.next=4,e.getClientData();case 4:t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log("Error al inicio");case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},data:function(){return{citySelect:"Santa Cruz",cityOptions:["Santa Cruz","Cochabamba","La Paz","Tarija"],loadMoreHistory:!1,date:p["a"],distanceText:"Menor a 5KM",textAddressFilter:"",arrayFilterAddress:[],dialogSave:!1,addressSave:"",dialogFind:!1,history:!1,celClient:"",urlWpFrom:"",nameClient:"",urlWpTo:"",order_images:null,details:"",nit:"",nameNit:"",from_address:"",from_center:[-17.783384,-63.18203],to_address:"",to_center:[-17.783384,-63.18203],selectRef:"",selectRefFind:"",address_list:[],deliveryCost:0,sendOrderMsg:{id:-1,color:"bg-white",msg:"No hay pedido realizado",order:{}},loadDeliveryBtn:!1,loadBtn:!1,loadSaveUser:!1,user_identifier:"",operator_token:"",access_token:"",collection_bd:"",zoom:13,url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',searchToAddress:"",searchFromAddress:"",listToAddress:[],listFromAddress:[],start_from:0,order_history:[]}},methods:{cargarCiudad:function(){this.from_center=l["a"].getItem("center")||[-17.783384,-63.18203],this.to_center=l["a"].getItem("center")||[-17.783384,-63.18203],this.citySelect=l["a"].getItem("ciudad")||"Santa Cruz"},cambiarCiudad:function(){switch(this.citySelect){case"Santa Cruz":l["a"].set("ciudad","Santa Cruz"),l["a"].set("center",[-17.783384,-63.18203]);break;case"Cochabamba":l["a"].set("ciudad","Cochabamba"),l["a"].set("center",[-17.393868,-66.157481]);break;case"La Paz":l["a"].set("ciudad","La Paz"),l["a"].set("center",[-16.505147,-68.129631]);break;case"Tarija":l["a"].set("ciudad","Tarija"),l["a"].set("center",[-21.533739,-64.733768]);break}location.reload()},getClientData:function(){var e=this;return c()(i.a.mark((function t(){var a,r;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a="https://patioserviceonline.com/usuarios-jugno/usuarios.php?name="+e.$route.params.client,t.prev=1,t.next=4,e.$axios.get(a);case 4:if(r=t.sent,"-1"==r.data){t.next=14;break}return e.user_identifier=r.data.user_identifier,e.operator_token=r.data.operator_token,e.access_token=r.data.access_token,e.collection_bd=r.data.collection_bd,t.next=12,e.getAddress();case 12:t.next=15;break;case 14:e.$router.push({path:"/error"});case 15:t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](1),console.log("GET CLIENT",t.t0);case 20:case"end":return t.stop()}}),t,null,[[1,17]])})))()},getAddress:function(){var e=this;return c()(i.a.mark((function t(){var a;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u["a"].collection(e.collection_bd).get();case 3:a=t.sent,a.forEach((function(t){e.address_list.push(t.data())})),e.arrayFilterAddress=e.address_list,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log("FIREBASE ERROR ",t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},selectGeoAddress:function(e,t){"1"==t?this.from_center=[parseFloat(e.y),parseFloat(e.x)]:this.to_center=[parseFloat(e.y),parseFloat(e.x)]},searchAddressGeo:function(e){var t=this;return c()(i.a.mark((function a(){var r,s;return i.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if("1"!=e){a.next=8;break}return t.listFromAddress=[],a.next=4,_.search({query:t.searchFromAddress+", "+t.citySelect});case 4:r=a.sent,r.length>0?r.forEach((function(e){t.listFromAddress.push(e)})):alert("No hay resultados para esta direccion"),a.next=13;break;case 8:return t.listToAddress=[],a.next=11,_.search({query:t.searchToAddress+", "+t.citySelect});case 11:s=a.sent,s.length>0?s.forEach((function(e){t.listToAddress.push(e)})):alert("No hay resultados para esta direccion");case 13:case"end":return a.stop()}}),a)})))()},openWindow:function(e){window.open("https://patioserviceonline.com/sc/#/map/order/"+e)},updateMarkerFrom:function(e){this.from_center=[e.latlng.lat,e.latlng.lng]},updateMarkerTo:function(e){this.to_center=[e.latlng.lat,e.latlng.lng],this.medirDistancia()},findMap:function(e){if("1"==e){var t="https://maps.google.com/maps?q=";if(0==this.urlWpFrom.indexOf(t)){var a="%2C",r="&z=17&hl=es",s=this.urlWpFrom.substring(t.length,this.urlWpFrom.indexOf(a)),n=this.urlWpFrom.substring(this.urlWpFrom.indexOf(a)+a.length,this.urlWpFrom.indexOf(r));this.from_center=[parseFloat(s),parseFloat(n)]}else alert("URL del mapa es invalido")}else{t="https://maps.google.com/maps?q=";if(0==this.urlWpTo.indexOf(t)){a="%2C",r="&z=17&hl=es",s=this.urlWpTo.substring(t.length,this.urlWpTo.indexOf(a)),n=this.urlWpTo.substring(this.urlWpTo.indexOf(a)+a.length,this.urlWpTo.indexOf(r));this.to_center=[parseFloat(s),parseFloat(n)]}else alert("URL del mapa es invalido")}},calculateDelivery:function(){var e=this;return c()(i.a.mark((function t(){var a,r;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.deliveryCost=0,e.loadDeliveryBtn=!0,a="https://prod-fatafat-new.jugnoo.in:4030/get_all_details?device_type=0&app_version=436&to_latitude="+JSON.stringify(e.to_center[0])+"&access_token="+e.access_token+"&login_type=0&from_latitude="+JSON.stringify(e.from_center[0])+"&locale=es&operator_token="+e.operator_token+"&to_longitude="+JSON.stringify(e.to_center[1])+"&customer_package_name=com.movapps.mav.patioservice&from_longitude="+JSON.stringify(e.from_center[1]),t.prev=3,t.next=6,e.$axios.get(a);case 6:r=t.sent,r.data.delivery_charges?e.deliveryCost=r.data.delivery_charges.estimated_charges:alert(r.data.message),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),console.log("Error al calcular el costo de envio: ",t.t0);case 13:e.loadDeliveryBtn=!1;case 14:case"end":return t.stop()}}),t,null,[[3,10]])})))()},loadHistory:function(e){var t=this;return c()(i.a.mark((function a(){var r,s,n;return i.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return 0==e&&(t.start_from=0,t.order_history=[]),t.loadMoreHistory=!0,t.history=!0,r="https://prod-autos-api.jugnoo.in/autos_integrated_order_history",s=new URLSearchParams,s.append("access_token",t.access_token),s.append("customer_package_name","com.movapps.mav.patioservice"),s.append("start_from",t.start_from),s.append("show_custom_fields","1"),s.append("operator_token",t.operator_token),s.append("app_version","436"),s.append("login_type","0"),s.append("device_type","0"),s.append("locale","es"),a.prev=14,a.next=17,t.$axios.post(r,s);case 17:n=a.sent,n.data.data.forEach((function(e){t.order_history.push(e)})),t.start_from+=10,a.next=25;break;case 22:a.prev=22,a.t0=a["catch"](14),console.log("Error HISTORY",a.t0);case 25:t.loadMoreHistory=!1;case 26:case"end":return a.stop()}}),a,null,[[14,22]])})))()},sendOrder:function(){var e=this;return c()(i.a.mark((function t(){var a,r,s,n;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadBtn=!0,a="https://prod-fatafat-new.jugnoo.in:4030/place_order",r="",s=new URLSearchParams,e.order_images&&s.append("order_images",e.order_images),""!=e.celClient&&(r+="*CEL: "+e.celClient+" "),""!=e.nameClient&&(r+="*CLI: "+e.nameClient+" "),""==e.nameNit&&""==e.nit||(r+="*NIT: "+e.nit+" - "+e.nameNit+" "),r+="DET: "+e.details+" "+e.distanceText,s.append("details",r),s.append("from_address",e.from_address),s.append("from_latitude",JSON.stringify(e.from_center[0])),s.append("from_longitude",JSON.stringify(e.from_center[1])),s.append("payment_mode","1"),s.append("to_address",e.to_address),s.append("to_latitude",JSON.stringify(e.to_center[0])),s.append("to_longitude",JSON.stringify(e.to_center[1])),s.append("is_immediate","1"),s.append("user_identifier",e.user_identifier),s.append("app_version","436"),s.append("device_type","0"),s.append("login_type","0"),s.append("operator_token",e.operator_token),s.append("customer_package_name","com.movapps.mav.patioservice"),s.append("locale","es"),s.append("access_token",e.access_token),t.prev=26,t.next=29,e.$axios.post(a,s);case 29:n=t.sent,n.data.order_id?(e.sendOrderMsg.id=n.data.order_id,e.sendOrderMsg.msg=n.data.message,e.sendOrderMsg.color="bg-green-5",e.$store.commit("orderHistory/updateHistory",{order_id:n.data.order_id,details:e.details}),e.clearInputs()):(e.sendOrderMsg.id="ERROR",e.sendOrderMsg.msg=n.data.message,e.sendOrderMsg.color="bg-red-5"),t.next=36;break;case 33:t.prev=33,t.t0=t["catch"](26),console.log("Error SEND ORDER",t.t0);case 36:e.loadBtn=!1;case 37:case"end":return t.stop()}}),t,null,[[26,33]])})))()},findAddress:function(e){this.selectRefFind=e,this.dialogFind=!0},selectAddress:function(e){"1"==this.selectRefFind?(this.from_address=e.reference,this.from_center=[e.latlng.latitude,e.latlng.longitude]):(this.to_address=e.reference,this.to_center=[e.latlng.latitude,e.latlng.longitude],this.medirDistancia()),this.filterAddress="",this.dialogFind=!1},medirDistancia:function(){var e=v.distanceDiffInKm({lat:this.from_center[0],lon:this.from_center[1]},{lat:this.to_center[0],lon:this.to_center[1]});e>=5.1?(this.confirmDistance(),this.distanceText="MAYOR a 5KM"):this.distanceText="Menor a 5KM"},confirmDistance:function(){var e=this;this.$q.dialog({title:"Distancias",message:'La distancia entre punto y punto superan los <strong>5 KM</strong>, ¿Estas seguro de continuar? <span class="text-red">puede haber cargos adicionales</span>',html:!0,cancel:{label:"Elegir otra sucursal"},ok:{label:"Si, estoy seguro",color:"negative"},persistent:!0}).onOk((function(){})).onCancel((function(){e.to_address="",e.to_center=[-17.783384,-63.18203],e.findAddress("2")}))},saveAddressLocal:function(){var e=this;return c()(i.a.mark((function t(){var a,r;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$q.loading.show(),a={},"1"!=e.selectRef){t.next=6;break}a={name:e.addressSave,reference:e.from_address,latlng:{latitude:e.from_center[0],longitude:e.from_center[1]}},t.next=11;break;case 6:if("2"!=e.selectRef){t.next=10;break}a={name:e.addressSave,reference:e.to_address,latlng:{latitude:e.to_center[0],longitude:e.to_center[1]}},t.next=11;break;case 10:return t.abrupt("return");case 11:return t.prev=11,t.next=14,u["a"].collection(e.collection_bd).add(a);case 14:r=t.sent,r.id&&(e.address_list.push(a),e.dialogSave=!1,e.addressSave=""),t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](11),console.log("ERROR SAVE ADDRESS ",t.t0);case 21:e.$q.loading.hide();case 22:case"end":return t.stop()}}),t,null,[[11,18]])})))()},saveAddress:function(e){this.selectRef=e,"1"==e?""!=this.from_address&&(this.dialogSave=!0):""!=this.to_address&&(this.dialogSave=!0)},clearInputs:function(){this.details="",this.order_images=null,this.from_address="",this.to_address="",this.urlWpFrom="",this.urlWpTo="",this.celClient="",this.nameClient=""},findUser:function(){var e=this;return c()(i.a.mark((function t(){var a,r;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$q.loading.show(),""==e.celClient){t.next=15;break}return t.prev=2,t.next=5,u["a"].collection("users").doc(e.celClient);case 5:return a=t.sent,t.next=8,a.get();case 8:r=t.sent,r.exists?(e.nameClient=r.data().name,e.nit=r.data().nit,e.nameNit=r.data().nameNit,e.to_address=r.data().address,e.to_center=[r.data().coords.latitude,r.data().coords.longitude],e.$q.notify({message:"Datos Cargados",icon:"check",color:"green",position:"top",timeout:1e3})):e.$q.notify({message:"No existe el usuario",icon:"close",color:"negative",position:"top",timeout:1e3}),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](2),console.log("FIREBASE ERROR ",t.t0);case 15:e.$q.loading.hide();case 16:case"end":return t.stop()}}),t,null,[[2,12]])})))()},saveUsers:function(){var e=this;return c()(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""==e.nameClient||""==e.to_address||""==e.celClient){t.next=14;break}return e.loadSaveUser=!0,t.prev=2,t.next=5,u["a"].collection("users").doc(e.celClient).set({name:e.nameClient,nit:e.nit,nameNit:e.nameNit,address:e.to_address,coords:{latitude:e.to_center[0],longitude:e.to_center[1]}});case 5:e.$q.notify({message:"Usuario Guardado",icon:"check",color:"green",position:"top",timeout:1e3}),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](2),console.log("FIREBASE ERROR SAVE ",t.t0);case 11:e.loadSaveUser=!1,t.next=15;break;case 14:alert("Los campos: Cliente, Telefono y direccion de entrega No pueden estar vacios");case 15:case"end":return t.stop()}}),t,null,[[2,8]])})))()}},computed:{filterAddress:{get:function(){return this.textAddressFilter},set:function(e){e=e.toLowerCase(),this.arrayFilterAddress=this.address_list.filter((function(t){return-1!=t.name.toLowerCase().indexOf(e)})),this.textAddressFilter=e}}}},x=b,k=a("2877"),y=a("9989"),q=a("24e8"),C=a("f09f"),w=a("a370"),S=a("1c1c"),A=a("66e5"),F=a("4074"),O=a("0170"),T=a("58ea"),R=a("4b7e"),E=a("9c40"),M=a("27f9"),N=a("0016"),D=a("54e1"),z=a("ddd8"),I=a("05c0"),W=a("714f"),L=a("7f67"),U=a("eebe"),B=a.n(U),G=Object(k["a"])(x,r,s,!1,null,null,null);t["default"]=G.exports;B()(G,"components",{QPage:y["a"],QDialog:q["a"],QCard:C["a"],QCardSection:w["a"],QList:S["a"],QItem:A["a"],QItemSection:F["a"],QItemLabel:O["a"],QCircularProgress:T["a"],QCardActions:R["a"],QBtn:E["a"],QInput:M["a"],QIcon:N["a"],QBanner:D["a"],QSelect:z["a"],QTooltip:I["a"]}),B()(G,"directives",{Ripple:W["a"],ClosePopup:L["a"]})}}]);