(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0c576b"],{"3ecf":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-h6"},[e._v("MENUS")])]),a("div",{staticClass:"col-2 q-mb-sm"},[a("q-input",{attrs:{type:"number",outlined:"",label:"Tiempo (Seg.)"},on:{input:e.validateNumber},model:{value:e.time_refresh,callback:function(t){e.time_refresh=t},expression:"time_refresh"}})],1)]),a("div",{staticClass:"row q-pb-md"},[a("div",{staticClass:"col-4"},[a("q-toggle",{attrs:{label:"Auto Asignar"},on:{input:e.change_mode},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}})],1),a("div",{staticClass:"col-6"},[a("q-chip",[a("q-avatar",{attrs:{color:"blue","text-color":"white"}},[e._v(e._s(e.cantOrdersTotal))]),e._v("Pedidos\n          ")],1),a("q-chip",[a("q-avatar",{attrs:{color:"green","text-color":"white"}},[e._v(e._s(e.cantOrderAssigned))]),e._v("Auto Asignados\n          ")],1)],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-11"},[a("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[e._v("Historial MENUS")])]),a("q-card-section",[a("q-scroll-area",{ref:"scrollAreaMenus",staticStyle:{height:"300px","max-width":"100%"}},e._l(e.arrayHistory,(function(t,r){return a("div",{key:r},[e._v("\n                  $ "),a("span",{staticClass:"text-weight-light"},[e._v(e._s(t))])])})),0)],1)],1)],1)])]),a("div",{staticClass:"col-6"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"text-h6"},[e._v("DELIVERY")])]),a("div",{staticClass:"col-2 q-mb-sm"},[a("q-input",{attrs:{type:"number",outlined:"",label:"Tiempo (Seg.)"},on:{input:e.validateNumberDelivery},model:{value:e.time_refresh_delivery,callback:function(t){e.time_refresh_delivery=t},expression:"time_refresh_delivery"}})],1)]),a("div",{staticClass:"row q-pb-md"},[a("div",{staticClass:"col-4"},[a("q-toggle",{attrs:{label:"Auto Asignar"},on:{input:e.change_mode_delivery},model:{value:e.activeDelivery,callback:function(t){e.activeDelivery=t},expression:"activeDelivery"}})],1),a("div",{staticClass:"col-6"},[a("q-chip",[a("q-avatar",{attrs:{color:"blue","text-color":"white"}},[e._v(e._s(e.cantOrdersTotalDelivery))]),e._v("Pedidos\n          ")],1),a("q-chip",[a("q-avatar",{attrs:{color:"green","text-color":"white"}},[e._v(e._s(e.cantOrderAssignedDelivery))]),e._v("Auto Asignados\n          ")],1)],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-11"},[a("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[e._v("Historial DELIVERY")])]),a("q-card-section",[a("q-scroll-area",{ref:"scrollAreaDelivery",staticStyle:{height:"300px","max-width":"100%"}},e._l(e.arrayHistoryDelivery,(function(t,r){return a("div",{key:r},[e._v("\n                  $ "),a("span",{staticClass:"text-weight-light"},[e._v(e._s(t))])])})),0)],1)],1)],1)])])])])},s=[],i=a("967e"),l=a.n(i),o=(a("96cf"),a("c1df")),c=a.n(o),n={name:"AutoAssign",mounted:function(){this.change_mode(),this.change_mode_delivery()},data:function(){return{arrayHistory:[],active:!1,cantOrdersTotal:0,cantOrderAssigned:0,refresh_handler:null,time_refresh:30,arrayHistoryDelivery:[],activeDelivery:!1,cantOrdersTotalDelivery:0,cantOrderAssignedDelivery:0,refresh_handler_delivery:null,time_refresh_delivery:30}},methods:{validateNumber:function(){(this.time_refresh<1||""==this.time_refresh||null==this.time_refresh)&&(this.time_refresh=15)},validateNumberDelivery:function(){(this.time_refresh_delivery<1||""==this.time_refresh_delivery||null==this.time_refresh_delivery)&&(this.time_refresh_delivery=15)},change_mode:function(){this.active?(this.getOrders(),this.arrayHistory.push("El sistema MENUS esta ACTIVADO ("+c()().format("LTS")+")")):(clearTimeout(this.refresh_handler),this.arrayHistory.push("El Sistema MENUS esta DETENIDO ("+c()().format("LTS")+")"))},change_mode_delivery:function(){this.activeDelivery?(this.getOrdersDelivery(),this.arrayHistoryDelivery.push("El sistema DELIVERY esta ACTIVADO ("+c()().format("LTS")+")")):(clearTimeout(this.refresh_handler_delivery),this.arrayHistoryDelivery.push("El Sistema DELIVERY esta DETENIDO ("+c()().format("LTS")+")"))},reset_timer:function(){var e=this;clearTimeout(this.refresh_handler),this.refresh_handler=setTimeout((function(){e.getOrders(),console.log("Refresh MENUS...")}),1e3*this.time_refresh)},reset_timer_delivery:function(){var e=this;clearTimeout(this.refresh_handler_delivery),this.refresh_handler_delivery=setTimeout((function(){e.getOrdersDelivery(),console.log("Refresh DELIVERY...")}),1e3*this.time_refresh_delivery)},getOrdersDelivery:function(){var e,t,a,r;return l.a.async((function(s){while(1)switch(s.prev=s.next){case 0:if(!this.activeDelivery){s.next=16;break}return console.log("FINDING ORDERS DELIVERY..."),this.arrayHistoryDelivery.push("Obteniendo lista de ordenes DELIVERY... ("+c()().format("LTS")+")"),e=Date.now(),t=c()().format("YYYY-MM-DD"),a="https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=395&start_date="+t+"&end_date="+t+"&fetch_active_orders=1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=50&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_="+e,s.prev=6,s.next=9,l.a.awrap(this.$axios.get(a));case 9:r=s.sent,this.filterOrderDelivery(r.data.aaData),s.next=16;break;case 13:s.prev=13,s.t0=s["catch"](6),console.log("GET ORDERS DELIVERY PENDING ERROR: "+s.t0);case 16:this.reset_timer_delivery();case 17:case"end":return s.stop()}}),null,this,[[6,13]])},getOrders:function(){var e,t,a,r;return l.a.async((function(s){while(1)switch(s.prev=s.next){case 0:if(!this.active){s.next=18;break}return console.log("FINDING ORDERS MENUS..."),this.arrayHistory.push("Obteniendo lista de ordenes MENUS... ("+c()().format("LTS")+")"),e=Date.now(),t=c()().format("YYYY-MM-DD"),a="https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city=395&start_date="+t+"&end_date="+t+"&fetch_pending_orders=1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=50&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= "+e,s.prev=6,s.next=9,l.a.awrap(this.$axios.get(a));case 9:r=s.sent,this.filterOrderUnasigned(r.data.aaData),s.next=16;break;case 13:s.prev=13,s.t0=s["catch"](6),console.log("GET ORDERS MENUS PENDING ERROR: "+s.t0);case 16:s.next=19;break;case 18:console.log("STATUS: STOP...");case 19:this.reset_timer();case 20:case"end":return s.stop()}}),null,this,[[6,13]])},filterOrderDelivery:function(e){this.cantOrdersTotalDelivery=e.length;for(var t=0;t<e.length;t++){var a=e[t].status,r=e[t].dodo_delivery_id,s=e[t].order_id;0==a&&this.getDeliveryStatus(r,s)}},filterOrderUnasigned:function(e){this.cantOrdersTotal=e.length;for(var t=0;t<e.length;t++){var a=e[t][13].status,r=e[t][13].restaurant_id,s=e[t][13].order_id,i=e[t][10],l=i.substring(i.length-10,i.length);0!=a&&"UNASSIGNED"==l&&this.getDeliveryID(s,r)}},getDeliveryStatus:function(e,t){var a,r,s;return l.a.async((function(i){while(1)switch(i.prev=i.next){case 0:return this.arrayHistoryDelivery.push("Verificando para Auto Asignar Orden ID "+t+" DELIVERY ID "+e+" ("+c()().format("LTS")+")"),a="https://dodo.jugnoo.in:8024/get_complete_task_details",r="access_token=b3de8bde6886e4695cbf5f23fcc363fa&order_id="+e,i.prev=3,i.next=6,l.a.awrap(this.$axios({url:a,method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},data:r}));case 6:s=i.sent,6==s.data.data.status?(this.arrayHistoryDelivery.push("Auto Asignando Orden ID "+t+" DELIVERY ID "+e+" ("+c()().format("LTS")+")"),this.autoAssignDelivery(e)):this.arrayHistoryDelivery.push("No necesita Auto Asignar Orden ID "+t+" DELIVERY ID "+e+" ("+c()().format("LTS")+")"),i.next=12;break;case 10:i.prev=10,i.t0=i["catch"](3);case 12:case"end":return i.stop()}}),null,this,[[3,10]])},getDeliveryID:function(e,t){var a,r,s,i;return l.a.async((function(o){while(1)switch(o.prev=o.next){case 0:return a="https://prod-fresh-api.jugnoo.in:4040/order_details",r="token=b3de8bde6886e4695cbf5f23fcc363fa&order_id="+e+"&restaurant_id="+t,o.prev=2,o.next=5,l.a.awrap(this.$axios({url:a,method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},data:r}));case 5:s=o.sent,i=s.data.order_info[0].delivery_id,this.arrayHistory.push("Auto Asignando ORDER_ID: "+e+" RESTAURANT_ID: "+t+" DELIVERY_ID: "+i+"... ("+c()().format("LTS")+")"),this.autoAssignMenus(i),o.next=14;break;case 11:o.prev=11,o.t0=o["catch"](2),console.log("GET DELIVERY ID ERROR: "+o.t0);case 14:case"end":return o.stop()}}),null,this,[[2,11]])},autoAssignDelivery:function(e){var t;return l.a.async((function(a){while(1)switch(a.prev=a.next){case 0:return t="https://dodo.jugnoo.in:8024/assign_driver",a.prev=1,a.next=4,l.a.awrap(this.$axios.post(t,{access_token:"b3de8bde6886e4695cbf5f23fcc363fa",order_id:e,user_id:null}));case 4:a.sent,this.arrayHistoryDelivery.push("DELIVERY_ID: "+e+" Auto Asignado con exito! ("+c()().format("LTS")+")"),this.cantOrderAssignedDelivery++,a.next=13;break;case 9:a.prev=9,a.t0=a["catch"](1),console.log("AUTO ASIGNAR ERROR: "+a.t0),this.arrayHistoryDelivery.push("DELIVERY_ID: "+e+" NO SE PUDO AUTO ASIGNAR ("+c()().format("LTS")+")");case 13:case"end":return a.stop()}}),null,this,[[1,9]])},autoAssignMenus:function(e){var t;return l.a.async((function(a){while(1)switch(a.prev=a.next){case 0:return t="https://dodo.jugnoo.in:8024/assign_driver",a.prev=1,a.next=4,l.a.awrap(this.$axios.post(t,{access_token:"b3de8bde6886e4695cbf5f23fcc363fa",order_id:e,user_id:null}));case 4:a.sent,this.arrayHistory.push("DELIVERY_ID: "+e+" Auto Asignado con exito! ("+c()().format("LTS")+")"),this.cantOrderAssigned++,a.next=13;break;case 9:a.prev=9,a.t0=a["catch"](1),console.log("AUTO ASIGNAR ERROR: "+a.t0),this.arrayHistory.push("DELIVERY_ID: "+e+" NO SE PUDO AUTO ASIGNAR ("+c()().format("LTS")+")");case 13:case"end":return a.stop()}}),null,this,[[1,9]])}}},_=n,h=a("2877"),d=Object(h["a"])(_,r,s,!1,null,null,null);t["default"]=d.exports}}]);