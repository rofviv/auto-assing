(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0ba32a"],{"35d6":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.driver_id?[a("q-banner",{staticClass:"bg-green text-white",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"check",size:"30px"}})]},proxy:!0},{key:"action",fn:function(){return[a("div",{staticClass:"text-caption"},[a("q-icon",{attrs:{name:"motorcycle",size:"22px"}}),e._v("\n          "+e._s(e.driver_name)+"\n        ")],1)]},proxy:!0}])},[a("div",{staticClass:"text-subtitle1"},[e._v("\n        Orden ID: "+e._s(e.order_id)+" Confirmada\n      ")]),a("div",{staticClass:"text-caption"},[e._v("\n        "+e._s(e.details)+"\n      ")])])]:[e.orderFailed?[a("q-banner",{staticClass:"bg-red text-white",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"close",size:"30px"}})]},proxy:!0}],null,!1,1092542251)},[a("div",{staticClass:"text-subtitle1"},[e._v("\n          No se encuentra la orden\n        ")])])]:[a("q-banner",{staticClass:"bg-primary text-white",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-circular-progress",{staticClass:"q-ma-xs",attrs:{indeterminate:"",size:"20px"}})]},proxy:!0}],null,!1,700358776)},[a("div",{staticClass:"text-subtitle1"},[e._v("\n          Confirmando orden ID: "+e._s(e.order_id)+"\n        ")]),a("div",{staticClass:"text-caption"},[e._v("\n          "+e._s(e.details)+"\n        ")])])]],a("div",{staticStyle:{width:"100%",height:"550px"}},[a("l-map",{ref:"myMap",staticStyle:{"z-index":"0"},attrs:{zoom:e.zoom,center:e.center,options:{zoomControl:!1}}},[a("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),a("l-marker",{attrs:{"lat-lng":e.center_origen,icon:e.icon_origen}}),a("l-marker",{attrs:{"lat-lng":e.center_destino,icon:e.icon_destino}}),e.showDriver?[a("l-marker",{attrs:{"lat-lng":e.center,icon:e.icon_driver}})]:e._e()],2)],1)],2)},i=[],n=(a("20d6"),a("967e")),s=a.n(n),o=(a("96cf"),a("c1df")),c=a.n(o),l=a("2699"),d=a("a40a"),_=a("4e2b"),b=a("e11eb");a("6cc5");delete b["Icon"].Default.prototype._getIconUrl,b["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var h={components:{"l-map":l["a"],"l-tile-layer":d["a"],"l-marker":_["a"]},created:function(){this.checkParams()},data:function(){return{orderFailed:!1,showDriver:!1,order_id:"",details:"",driver_id:null,driver_name:"",zoom:13,url:"https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',center:[-17.783384,-63.18203],center_origen:[0,0],center_destino:[0,0],icon_origen:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-origen.png",iconSize:[64,64],iconAnchor:[24,64]}),icon_destino:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-destino.png",iconSize:[64,64],iconAnchor:[0,64]}),icon_driver:L.icon({iconUrl:"http://patioserviceonline.com/sc/statics/marker-driver.png",iconSize:[64,64],iconAnchor:[30,64]}),access_token:"36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d",operator_token:"ca3686de8b9cd13abcb362e09e494210"}},methods:{checkParams:function(){var e=this.$route.params.order_id;e&&this.monitoringOrderDelivery(e)},monitoringOrderDelivery:function(e){var t,a,r,i;return s.a.async((function(n){while(1)switch(n.prev=n.next){case 0:return this.order_id=e,t=Date.now(),a=c()().format("YYYY-MM-DD"),r="https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=395&start_date="+a+"&end_date="+a+"&fetch_active_orders=1&order_id="+this.order_id+"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_="+t,n.prev=4,n.next=7,s.a.awrap(this.$axios.get(r));case 7:i=n.sent,i.data.aaData.length>0?(this.driver_id=i.data.aaData[0].driver_id,this.details=i.data.aaData[0].details,this.driver_name=i.data.aaData[0].driver_name,this.center_origen=[i.data.aaData[0].pickup_latitude,i.data.aaData[0].pickup_longitude],this.center_destino=[i.data.aaData[0].to_latitude,i.data.aaData[0].to_longitude],this.driver_id&&this.getCoordsDriver()):(this.orderFailed=!0,console.log("No se encuentra la Orden "+this.order_id)),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](4),console.log(n.t0);case 14:case"end":return n.stop()}}),null,this,[[4,11]])},getCoordsDriver:function(){var e,t,a,r,i=this;return s.a.async((function(n){while(1)switch(n.prev=n.next){case 0:return e="https://api-panels.jugnoo.in:8020/get_driver_details?token=b3de8bde6886e4695cbf5f23fcc363fa&city_id=395&status=1&delivery_enabled=1&is_delivery_panel=1",n.prev=1,n.next=4,s.a.awrap(this.$axios.get(e));case 4:t=n.sent,t.data.data.length>0&&(a=t.data.data,r=a.findIndex((function(e){return e.driver_id==i.driver_id})),r>=0?(this.center=[a[r].current_latitude,a[r].current_longitude],this.showDriver=!0):console.log("NO SE ENCONTRO LA MOTO")),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](1),console.log(n.t0);case 11:case"end":return n.stop()}}),null,this,[[1,8]])}}},p=h,u=a("2877"),f=Object(u["a"])(p,r,i,!1,null,null,null);t["default"]=f.exports}}]);