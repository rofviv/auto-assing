(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["62176efc"],{"4c3d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-md"},[a("q-dialog",{model:{value:t.dialogItemDetails,callback:function(e){t.dialogItemDetails=e},expression:"dialogItemDetails"}},[a("q-card",{staticStyle:{width:"500px","max-width":"80vw"}},[a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"text-h6"},[t._v(t._s(t.itemSelected.item_name))])]),a("div",{staticClass:"col"},[a("div",{staticClass:"text-h6"},[t._v("Bs."+t._s(t.itemSelected.price))])]),a("div",[a("q-btn",{attrs:{size:"sm",round:"",color:"primary",icon:"add"},on:{click:t.addCantItem}}),a("span",{staticClass:"text-h6 q-px-sm"},[t._v(t._s(t.cantItem))]),a("q-btn",{attrs:{size:"sm",round:"",color:"secondary",icon:"remove"},on:{click:t.removeCantItem}})],1)])]),t.itemSelected.customize_item?[a("q-card-section",t._l(t.customize_item,(function(e,i){return a("div",{key:i,staticClass:"q-my-xs"},[a("q-select",{attrs:{outlined:"",label:e.options.customize_item_name,options:e.suboptions,"option-value":"customize_option_id","option-label":"customize_option_name"},model:{value:e.option,callback:function(a){t.$set(e,"option",a)},expression:"item.option"}})],1)})),0)]:t._e(),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Añadir",color:"primary"},on:{click:t.addItem}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancelar",color:"negative"},on:{click:function(e){t.listAdditional=[]}}})],1)],2)],1),t.sendOrderOk?[a("div",{staticClass:"q-py-md"},[a("q-banner",{class:t.sendOrderMsg.color+" text-white",attrs:{rounded:""},scopedSlots:t._u([{key:"action",fn:function(){return[a("q-btn",{attrs:{flat:"",color:"white",icon:"file_copy"}})]},proxy:!0}],null,!1,2840476012)},[t._v("\n        ID Orden: "+t._s(t.sendOrderMsg.id)+" "),a("br"),t._v("\n        "+t._s(t.sendOrderMsg.msg)+"\n        ")])],1)]:t._e(),a("q-list",{staticClass:"rounded-borders",attrs:{bordered:""}},[a("q-expansion-item",{attrs:{icon:"perm_identity",label:"Informacion del pedido",caption:"Datos"},model:{value:t.expanded,callback:function(e){t.expanded=e},expression:"expanded"}},[a("div",{staticClass:"row q-gutter-x-md no-wrap justify-center q-py-sm"},[a("div",{staticClass:"col-3"},[a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Cliente"},model:{value:t.nameClient,callback:function(e){t.nameClient=e},expression:"nameClient"}})],1),a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs q-ml-xs",attrs:{filled:"",label:"Celular"},model:{value:t.celClient,callback:function(e){t.celClient=e},expression:"celClient"}})],1)]),a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Direccion"},model:{value:t.dataClient,callback:function(e){t.dataClient=e},expression:"dataClient"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs",attrs:{filled:"",label:"Razon Social"},model:{value:t.nameNit,callback:function(e){t.nameNit=e},expression:"nameNit"}})],1),a("div",{staticClass:"col"},[a("q-input",{staticClass:"q-pb-xs q-ml-xs",attrs:{filled:"",label:"NIT"},model:{value:t.nit,callback:function(e){t.nit=e},expression:"nit"}})],1)]),a("q-input",{attrs:{filled:"",label:"URL WhatsApp"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"search"},on:{click:t.findMap}})]},proxy:!0}]),model:{value:t.urlWp,callback:function(e){t.urlWp=e},expression:"urlWp"}})],1)],1)],1),a("div",{staticClass:"col-4"},[a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{staticStyle:{width:"100%",height:"370px"}},[a("l-map",{ref:"myMap",staticStyle:{"z-index":"0"},attrs:{zoom:t.zoom,center:t.center,options:{zoomControl:!1}},on:{click:t.updateMarker}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),a("l-marker",{attrs:{"lat-lng":t.center}})],1)],1)])],1),a("div",{staticClass:"col-4"},[a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-scroll-area",{staticStyle:{height:"300px","max-width":"100%"}},[0!=t.arrayCart.length?[a("div",{staticClass:"text-right"},[a("q-btn",{attrs:{size:"8px",flat:"",round:"",icon:"file_copy"}})],1),a("q-list",[t._l(t.arrayCart,(function(e,i){return a("q-item",{key:i},[a("q-item-section",[a("q-item-label",[t._v(t._s(e.cant)+"x "+t._s(e.name))]),a("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v(t._s(e.extra))])],1),a("q-item-section",{attrs:{side:"",top:""}},[a("q-item-label",{attrs:{caption:""}},[t._v("Bs."+t._s(e.price))]),a("q-item-label",{attrs:{caption:""}},[a("q-btn",{attrs:{size:"8px",dark:"",flat:"",round:"",color:"red",icon:"close"},on:{click:function(e){return t.removeItemCart(i)}}})],1)],1)],1)})),a("q-separator",{attrs:{spaced:"",inset:""}}),a("div",{staticClass:"text-right q-pr-lg"},[a("span",{staticClass:"text-subtitle1"},[t._v("Pedido: "+t._s(t.priceOrder))]),a("br"),a("span",{staticClass:"text-subtitle1"},[t._v("Delivery: "+t._s(t.priceDelivery))]),a("br"),a("span",{staticClass:"text-h6"},[t._v("Total: "+t._s(t.priceOrder+t.priceDelivery))])])],2)]:[a("div",{staticClass:"text-center q-pr-lg"},[a("span",{staticClass:"text-h6"},[t._v("Carrito Vacio")])])]],2)],1),a("q-card-actions",{attrs:{vertical:""}},[a("q-btn",{staticClass:"q-mb-sm",attrs:{loading:t.loadDeliveryBtn,disable:0==t.cart.length,color:"primary",size:"10px"},on:{click:t.calculateDelivery}},[t._v("Calcular Costo del envío")]),a("q-input",{attrs:{filled:"",label:"Comentario"},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}}),a("q-btn",{attrs:{loading:t.loadBtn,disable:0==t.cart.length,color:"green",size:"10px"},on:{click:t.sendOrder}},[t._v("Finalizar Pedido")])],1)],1)],1)])])],1),a("p"),a("q-card",{attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row q-col-gutter-sm"},[a("div",{staticClass:"col-3 q-gutter-y-sm"},[a("div",{staticClass:"row q-col-gutter-sm q-gutter-y-sm"},[a("div",{staticClass:"col-10"},[a("q-input",{attrs:{outlined:"",label:"Buscar Restaurante",dense:!0},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filterMerchant,callback:function(e){t.filterMerchant=e},expression:"filterMerchant"}})],1),a("div",{staticClass:"col-2"},[a("q-btn",{attrs:{round:"",icon:"autorenew"},on:{click:t.getMerchants}})],1)]),a("q-scroll-area",{staticStyle:{height:"500px","max-width":"100%"}},[0==t.listMerchant?[a("div",{staticClass:"justify-center"},[a("q-circular-progress",{staticClass:"q-ma-md",attrs:{indeterminate:"",size:"50px",color:"primary"}})],1)]:[a("q-list",{attrs:{bordered:"",separator:""}},t._l(t.listFilterMerchant,(function(e,i){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:i,attrs:{disable:t.cart.length>0||1!=e[6],clickable:""},on:{click:function(e){return t.getMenuMerchant(i)}}},[a("q-item-section",[a("q-item-label",[t._v(t._s(e[1]))]),1==e[6]?[a("q-item-label",{attrs:{caption:""}},[t._v("Abierto")])]:2==e[6]?[a("q-item-label",{attrs:{caption:""}},[t._v("Cerrado")])]:[a("q-item-label",{attrs:{caption:""}},[t._v("Listing")])]],2)],1)})),1)]],2)],1),a("div",{staticClass:"col-9 q-gutter-y-sm"},[a("div",{staticClass:"row q-col-gutter-sm q-gutter-y-sm"},[a("div",{staticClass:"col-6"},[a("q-select",{attrs:{dense:!0,outlined:"",options:t.optionsCategory,label:"Categorias"},on:{input:t.loadItemsFromCategory},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}})],1),a("div",{staticClass:"col-6"},[a("q-input",{attrs:{outlined:"",label:"Buscar Producto",dense:!0},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filterMenu,callback:function(e){t.filterMenu=e},expression:"filterMenu"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-card",{staticStyle:{width:"100%",height:"500px"},attrs:{flat:"",bordered:""}},[t.loadMenu?[a("div",{staticClass:"justify-center"},[a("q-circular-progress",{staticClass:"q-ma-md",attrs:{indeterminate:"",size:"50px",color:"primary"}})],1)]:[a("q-scroll-area",{staticStyle:{height:"500px","max-width":"100%"}},[a("q-card-section",[a("div",{staticClass:"row q-gutter-sm"},t._l(t.arrayFilterItems,(function(e,i){return a("q-card",{key:i,staticClass:"card-items"},[a("q-card-section",{staticClass:"bg-primary text-white"},[a("div",{staticClass:"text-caption text-right"},[t._v("Bs."+t._s(e.price))]),a("div",{staticClass:"text-body1 text-center"},[t._v(t._s(e.item_name))]),a("div",{staticClass:"text-caption text-weight-light"},[t._v(t._s(e.item_details))])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{attrs:{size:"sm",flat:""},on:{click:function(a){return t.loadDetailsItem(e)}}},[t._v("Agregar")])],1)],1)})),1)])],1)]],2)],1)])])])])],1)],2)},s=[],r=a("967e"),n=a.n(r),o=(a("96cf"),a("c1df"),a("2699")),l=a("a40a"),c=a("4e2b"),d=a("e11eb");a("6cc5");delete d["Icon"].Default.prototype._getIconUrl,d["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var p={name:"CallCenter",components:{"l-map":o["a"],"l-tile-layer":l["a"],"l-marker":c["a"]},mounted:function(){this.getMerchants()},data:function(){return{textFilter:"",listFilterMerchant:[],expanded:!0,urlWp:"",dataClient:"",nameClient:"",celClient:"",nameNit:"",nit:"",cantItem:1,listAdditional:[],dialogItemDetails:!1,listMerchant:[],category:null,optionsCategory:[],arrayTodoMenu:[],arrayItems:[],arrayFilterItems:[],textMenuFilter:"",itemSelected:{},comment:"",arrayCart:[],access_token_client:"36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d",client_id:"DC311uhPSZV6tKjT",operator_token:"ca3686de8b9cd13abcb362e09e494210",restaurant_id:-1,cart:[],priceOrder:0,priceDelivery:0,loadMenu:!1,loadBtn:!1,loadDeliveryBtn:!1,sendOrderOk:!1,sendOrderMsg:{id:-1,color:"bg-green-5",msg:"Mensaje",order:{}},customize_item:[],zoom:13,center:[-17.783384,-63.18203],url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}},methods:{updateMarker:function(t){return n.a.async((function(e){while(1)switch(e.prev=e.next){case 0:this.center=[t.latlng.lat,t.latlng.lng];case 1:case"end":return e.stop()}}),null,this)},getMerchants:function(){var t,e,a,i;return n.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return this.listMerchant=[],t=Date.now(),e=400,a="https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurants?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city=395&sEcho=1&iColumns=11&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength="+e+"&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_="+t,s.prev=4,s.next=7,n.a.awrap(this.$axios.get(a));case 7:i=s.sent,this.filterMerchantActivated(i.data.aaData),s.next=14;break;case 11:s.prev=11,s.t0=s["catch"](4),console.log("GET MERCHANTS ERROR: "+s.t0);case 14:case"end":return s.stop()}}),null,this,[[4,11]])},filterMerchantActivated:function(t){for(var e=0;e<t.length;e++){var a=t[e][6];0!=a&&this.listMerchant.push(t[e])}this.listFilterMerchant=this.listMerchant},getMenuMerchant:function(t){var e,a,i,s,r,o,l;return n.a.async((function(c){while(1)switch(c.prev=c.next){case 0:return this.loadMenu=!0,e="https://prod-fresh-api.jugnoo.in:4040/v2/restaurant_menu",this.restaurant_id=this.listFilterMerchant[t][0],a=this.center[0],i=this.center[1],s="access_token="+this.access_token_client+"&app_version=435&client_id="+this.client_id+"&customer_package_name=production.patioservice.customer&device_type=0&integrated=1&latitude="+JSON.stringify(a)+"&locale=es&login_type=0&longitude="+JSON.stringify(i)+"&operator_token="+this.operator_token+"&restaurant_id="+this.restaurant_id,c.prev=6,c.next=9,n.a.awrap(this.$axios({url:e,method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},data:s}));case 9:for(r=c.sent,this.arrayTodoMenu=r.data.categories,this.optionsCategory=[],o=0;o<this.arrayTodoMenu.length;o++)l=this.arrayTodoMenu[o].category_name,this.optionsCategory.push(l);this.category=this.optionsCategory[0],this.loadItemsFromCategory(),this.loadMenu=!1,c.next=21;break;case 18:c.prev=18,c.t0=c["catch"](6),console.log("GET MENU MERCHANT ERROR: "+c.t0);case 21:case"end":return c.stop()}}),null,this,[[6,18]])},loadItemsFromCategory:function(){var t=this.arrayTodoMenu.map((function(t){return t.category_name})).indexOf(this.category);this.arrayItems=this.arrayTodoMenu[t].items,this.arrayFilterItems=this.arrayItems},loadDetailsItem:function(t){if(this.itemSelected=t,this.customize_item=[],this.itemSelected.customize_item)for(var e=0;e<this.itemSelected.customize_item.length;e++)this.customize_item.push({option:null,options:this.itemSelected.customize_item[e],suboptions:this.itemSelected.customize_item[e].customize_options});this.dialogItemDetails=!0},addItem:function(){var t=this;this.listCustomisations=[];var e="",a=0;this.customize_item.forEach((function(i){i.option&&(t.listCustomisations.push({id:i.options.customize_id,options:[{id:i.option.customize_option_id}]}),e+=i.option.customize_option_name+", ",a+=i.option.customize_price)}));var i={cant:this.cantItem,name:this.itemSelected.item_name,extra:e,price:this.cantItem*this.itemSelected.price+this.cantItem*a};this.priceOrder+=i.price,this.arrayCart.push(i),this.listCustomisations.length>0?this.cart.push({item_id:this.itemSelected.restaurant_item_id,quantity:this.cantItem,customisations:this.listCustomisations}):this.cart.push({item_id:this.itemSelected.restaurant_item_id,quantity:this.cantItem}),this.cantItem=1,this.listAdditional=[]},addCantItem:function(){this.cantItem++},removeCantItem:function(){this.cantItem>1&&this.cantItem--},findMap:function(){var t="https://maps.google.com/maps?q=";if(0==this.urlWp.indexOf(t)){var e="%2C",a="&z=17&hl=es",i=this.urlWp.substring(t.length,this.urlWp.indexOf(e)),s=this.urlWp.substring(this.urlWp.indexOf(e)+e.length,this.urlWp.indexOf(a));this.center=[parseFloat(i),parseFloat(s)]}else alert("URL del mapa es invalido")},removeItemCart:function(t){var e=this.arrayCart[t].price;this.arrayCart.splice(t,1),this.cart.splice(t,1),this.priceOrder-=e},sendOrder:function(){var t,e,a,i,s,r,o,l,c,d,p,u,m,h,_;return n.a.async((function(g){while(1)switch(g.prev=g.next){case 0:return this.loadBtn=!0,t="https://prod-fresh-api.jugnoo.in:4040/place_order",e="436",a="com.movapps.mav.patioservice",i="CLIENTE: "+this.nameClient+" CELULAR: "+this.celClient+" DIRECCION: "+this.dataClient+" NIT: "+this.nit+" - "+this.nameNit+" COMENTARIO: "+this.comment,s="1441945",r="Home",o="0",l="1",c="es",d="0",p="1",u=JSON.stringify(this.center[0]),m=JSON.stringify(this.center[1]),h=new URLSearchParams,h.append("access_token",this.access_token_client),h.append("app_version",e),h.append("cart",JSON.stringify(this.cart)),h.append("client_id",this.client_id),h.append("customer_package_name",a),h.append("delivery_address",i),h.append("delivery_address_id",s),h.append("delivery_address_type",r),h.append("delivery_latitude",u),h.append("delivery_longitude",m),h.append("delivery_notes",this.comment),h.append("device_type",o),h.append("integrated",l),h.append("latitude",u),h.append("locale",c),h.append("login_type",d),h.append("longitude",m),h.append("menu_latitude",u),h.append("menu_longitude",m),h.append("operator_token",this.operator_token),h.append("payment_mode",p),h.append("restaurant_id",this.restaurant_id),g.prev=37,g.next=40,n.a.awrap(this.$axios.post(t,h));case 40:_=g.sent,console.log(_),_.data.order_id?(this.cart=[],this.arrayCart=[],this.priceOrder=0,this.priceDelivery=0,this.nameClient="",this.celClient="",this.nit="",this.nameNit="",this.dataClient="",this.urlWp="",this.comment="",this.sendOrderMsg.id=_.data.order_id,this.sendOrderMsg.msg="Pedido generado con éxito",this.sendOrderMsg.color="bg-green-5"):(this.sendOrderMsg.id="ERROR",this.sendOrderMsg.msg=_.data.message,this.sendOrderMsg.color="bg-red-5"),g.next=51;break;case 45:g.prev=45,g.t0=g["catch"](37),console.log("ERROR SEND ORDER: "+g.t0),this.sendOrderMsg.id="ERROR",this.sendOrderMsg.msg="Ocurrio un error",this.sendOrderMsg.color="bg-red-5";case 51:this.loadBtn=!1,this.sendOrderOk=!0;case 53:case"end":return g.stop()}}),null,this,[[37,45]])},calculateDelivery:function(){var t,e,a,i,s,r,o,l,c,d,p,u;return n.a.async((function(m){while(1)switch(m.prev=m.next){case 0:return this.loadDeliveryBtn=!0,t="https://prod-fresh-api.jugnoo.in:4040/user_checkout_data",e="436",a="com.movapps.mav.patioservice",i="0",s="1",r="es",o="0",l={"":""},c=JSON.stringify(this.center[0]),d=JSON.stringify(this.center[1]),p=new URLSearchParams,p.append("access_token",this.access_token_client),p.append("app_version",e),p.append("cart",JSON.stringify(this.cart)),p.append("client_id",this.client_id),p.append("current_latitude",c),p.append("current_longitude",d),p.append("customer_package_name",a),p.append("device_type",i),p.append("integrated",s),p.append("latitude",c),p.append("locale",r),p.append("login_type",o),p.append("longitude",d),p.append("operator_token",this.operator_token),p.append("order_amount",this.priceOrder+""),p.append("restaurant_data",JSON.stringify(l)),p.append("restaurant_id",this.restaurant_id),m.prev=29,m.next=32,n.a.awrap(this.$axios.post(t,p));case 32:u=m.sent,u.data.charges?this.priceDelivery=u.data.charges[2].value:alert("No se puede calcular el costo de envio, quiza este fuera de cobertura"),m.next=39;break;case 36:m.prev=36,m.t0=m["catch"](29),console.log("ERROR CALCULATE DELIVERY: "+m.t0);case 39:this.loadDeliveryBtn=!1;case 40:case"end":return m.stop()}}),null,this,[[29,36]])}},computed:{filterMerchant:{get:function(){return this.textFilter},set:function(t){t=t.toLowerCase(),this.listFilterMerchant=this.listMerchant.filter((function(e){return-1!=e[1].toLowerCase().indexOf(t)})),this.textFilter=t}},filterMenu:{get:function(){return this.textMenuFilter},set:function(t){t=t.toLowerCase(),this.arrayFilterItems=this.arrayItems.filter((function(e){return-1!=e.item_name.toLowerCase().indexOf(t)})),this.textMenuFilter=t}}}},u=p,m=(a("610c"),a("2877")),h=Object(m["a"])(u,i,s,!1,null,null,null);e["default"]=h.exports},"610c":function(t,e,a){"use strict";var i=a("b858"),s=a.n(i);s.a},b858:function(t,e,a){}}]);