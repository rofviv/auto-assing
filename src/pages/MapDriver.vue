<template>
  <div>
    <div class="q-pa-md">
      <q-stepper
        v-model="status"
        ref="stepper"
        flat
        color="bg-green"
        done-color="secondary"
        active-color="deep-orange"
        bordered
      >
        <q-step
          :name="7"
          title="Confirmando pedido"
          icon="done"
          done-icon="done"
          active-icon="done"
          :done="status == 0 || status == 1 || status == 4 || status == 10"
        >
        </q-step>
        <q-step
          :name="0"
          title="Orden Confirmada"
          icon="done_all"
          done-icon="done_all"
          active-icon="done_all"
          :done="status == 1  || status == 4 || status == 10"
        >
        </q-step>
        <q-step
          :name="4"
          title="Recogiendo Orden"
          icon="shopping_basket"
          done-icon="shopping_basket"
          active-icon="shopping_basket"
          :done="status == 1 || status == 10"
        >
        </q-step>
        <q-step
          :name="1"
          title="En camino"
          icon="motorcycle"
          done-icon="motorcycle"
          active-icon="motorcycle"
          :done="status == 10"
        >
        </q-step>

        <q-step
          :name="10"
          title="Orden Entregada"
          icon="home"
          done-icon="home"
          active-icon="home"
        >
        </q-step>
        <template v-slot:message>
          <q-banner :class="`${orderMsg.color} text-white`">
            <template v-slot:avatar>
              <q-icon :name="orderMsg.icon" size="30px" />
            </template>
            <div class="text-subtitle1">
              {{ orderMsg.order }}
            </div>
            <div class="text-caption">
              {{ orderMsg.details }}
            </div>
            <template v-slot:action>
              <div class="text-caption">
                <q-icon name="motorcycle" size="22px" />
                {{ orderMsg.driver_name }}  {{ driver_phone }}
              </div>
            </template>
          </q-banner>
          <div class="text-right q-mt-xs">
            <q-btn v-if="status != 10 && status != 1" @click="cancelOrder" :loading="loadCancel" color="red" label="Cancelar Orden" />
          </div>
        </template>
      </q-stepper>
    </div>
    <div style="width:100%; height:550px">
      <l-map
        ref="myMap"
        style="z-index:0"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: false}"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <l-marker :lat-lng="center_origen" :icon="icon_origen" ></l-marker>
        <l-marker :lat-lng="center_destino" :icon="icon_destino" ></l-marker>
        <template v-if="showDriver">
          <l-marker :lat-lng="center" :icon="icon_driver" ></l-marker>
        </template>
      </l-map>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LocalStorage } from 'quasar';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: { "l-map": LMap, "l-tile-layer": LTileLayer, 'l-marker': LMarker },
  created() {
    this.checkParams();
    this.cargarCiudad();
  },
  data() {
    return {
      orderMsg: {
        color: 'bg-primary',
        icon: 'search',
        order: 'Confirmando',
        details: 'Asignando orden',
        driver_name: ''
      },

      status: 7,
      orderFailed: false,
      showDriver: false,
      order_id: '',
      details: '',
      driver_id: null,
      driver_name: '',
      driver_phone: '',
      dodo_delivery_id: null,

      zoom: 13,
      url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [0, 0],
      center_origen: [0, 0],
      center_destino: [0, 0],

      icon_origen: L.icon({
        iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-origen.png',
        // iconUrl: '/statics/marker-origen.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [24, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      icon_destino: L.icon({
        iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-destino.png',
        // iconUrl: '/statics/marker-destino.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [34, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      icon_driver: L.icon({
        iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-driver.png',
        // iconUrl: '/statics/marker-driver.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [30, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      access_token: "22bbd12d874c646dd014fa94d0da3436a2e94648cf7c9971439b80cc3b8e6e72",
      operator_token: "ca3686de8b9cd13abcb362e09e494210",

      refresh_handler: null,
      time_refresh: 15,

      reload: false,
      loadCancel: false,

      citySelect: 395,
    }
  },
  methods: {
    cargarCiudad() {
      this.center = LocalStorage.getItem('center') || [-17.783384, -63.18203];
      switch (LocalStorage.getItem('ciudad')) {
        case 'Santa Cruz':
          this.citySelect = 395;
          break;
        case 'Cochabamba':
          this.citySelect = 704;
          break;
        case 'La Paz':
          this.citySelect = 818;
          break;
        case 'Tarija':
          this.citySelect = 859;
          break;
        case 'Sucre':
          this.citySelect = 933;
          break;
        case 'Villa Imperial de Potosí':
          this.citySelect = 1796;
          break;
        case 'Arequipa':
          this.citySelect = 786;
          break;
        case 'Montevideo':
          this.citySelect = 997;
          break;
        case 'San José de Mayo':
          this.citySelect = 3190;
          break;
        case 'El Alto':
          this.citySelect = 3265;
          break;
        case 'Juliaca':
          this.citySelect = 3262;
          break;
      }
    },
    checkParams() {
      var id = this.$route.params.order_id;
      if (id) {
        this.order_id = id;
        this.monitoringOrderDelivery();
      }
    },
    async cancelOrder() {
      this.loadCancel = true;
      const res = confirm('¿Esta seguro de cancelar esta orden?');
      if (res) {
        const URI = "https://dodo.jugnoo.in:8024/update_order";
        const data = {
          "key_type": 5,
          "order_id": this.dodo_delivery_id,
          // "access_token": "845c88964029c3c89451c8925a5bf093"
          "access_token": "845c88964029c3c89451c8925a5bf093"
        }
        try {
          const res = await this.$axios.post(URI, data)
          console.log("CANCELANDO ", res)
          alert("ORDEN CANCELADA");
        } catch (error) {
          console.log("CANCEL ERROR ", error);
        }
      }
      this.loadCancel = false;
    },
    async monitoringOrderDelivery() {
      const time = Date.now();
      const date = moment().format("YYYY-MM-DD");
      const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=845c88964029c3c89451c8925a5bf093&secret=P7JlZXiRiIvSssQSSzqs&city_id=" + this.citySelect + "&start_date=" + date + "&end_date=" + date + "&fetch_active_orders=1&order_id=" + this.order_id +"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;

      try {
        const res = await this.$axios.get(URI);
        if (res.data.aaData.length > 0) {
          if (!this.reload) {
            this.details = res.data.aaData[0].details;
            this.center_origen = [res.data.aaData[0].pickup_latitude, res.data.aaData[0].pickup_longitude];
            this.center_destino = [res.data.aaData[0].to_latitude, res.data.aaData[0].to_longitude];
          }
          this.dodo_delivery_id = res.data.aaData[0].dodo_delivery_id;
          this.driver_id = res.data.aaData[0].driver_id;
          this.status = res.data.aaData[0].dodo_delivery_status;
          if (this.driver_id) {
            this.getCoordsDriver();
            this.driver_name = res.data.aaData[0].driver_name;
            this.updateMsg('bg-green', 'done', 'Orden ' + this.order_id, this.details, this.driver_name);
          }
        } else {
          this.orderFailed = true;
          this.status = 10;
          console.log("No se encuentra la Orden " + this.order_id);
          this.driver_phone = '';
          this.updateMsg('bg-green', 'home', 'Orden entregada', '', '');
          clearTimeout(this.refresh_handler);
          this.refresh_handler = null;
        }
      } catch (error) {
        console.log(error)
      }
      this.reset_timer();
    },
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
          this.reload = true;
          this.monitoringOrderDelivery();
          console.log('Refresh DRIVER...');
      }, this.time_refresh * 1000);
    },
    async getCoordsDriver() {
      const URI = "https://api-panels.jugnoo.in:8020/get_driver_details?token=845c88964029c3c89451c8925a5bf093&city_id=" + this.citySelect + "&status=1&delivery_enabled=1&is_delivery_panel=1"
      try {
        const res = await this.$axios.get(URI);
        if (res.data.data.length > 0) {
          const array = res.data.data;
          const index = array.findIndex(driver => driver.driver_id == this.driver_id)
          if (index >= 0) {
            this.center = [array[index].current_latitude, array[index].current_longitude];
            this.zoom = 15;
            this.showDriver = true;
            this.driver_phone = array[index].phone_no;
            // this.updateStatus();
          } else {
            this.status = 10;
            this.orderFailed = true;
            console.log("NO SE ENCONTRO LA MOTO")
            this.updateMsg('bg-green', 'home', 'Orden entregada', '', '');
            clearTimeout(this.refresh_handler);
            this.refresh_handler = null;
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateMsg(color, icon, order, details, driver_name) {
      this.orderMsg = {
        color: color,
        icon: icon,
        order: order,
        details: details,
        driver_name: driver_name
      }
    }
    // async updateStatus() {
    //   const time = Date.now();
    //   const date = moment().format("YYYY-MM-DD");
    //   const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=" + this.citySelect + "&start_date=" + date + "&end_date=" + date + "&fetch_active_orders=1&order_id=" + this.order_id +"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;

    //   try {
    //     const res = await this.$axios.get(URI);
    //     if (res.data.aaData.length > 0) {
    //       this.status = res.data.aaData[0].dodo_delivery_status;
    //     } else {
    //       this.status = 10;
    //       this.orderFailed = true;
    //       console.log("No se encuentra la Orden " + this.order_id);
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>