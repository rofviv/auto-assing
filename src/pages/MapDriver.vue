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
                {{ orderMsg.driver_name }}
              </div>
            </template>
          </q-banner>


          <!-- ---------------- -->
          <!-- <template v-if="!driver_id">
            <template v-if="orderFailed">
              <q-banner class="bg-green text-white">
                <template v-slot:avatar>
                  <q-icon name="home" size="30px" />
                </template>
                <div class="text-subtitle1">
                  Orden entregada
                </div>
              </q-banner>
            </template>
            <template v-else>
              <q-banner class="bg-primary text-white">
                <template v-slot:avatar>
                  <q-circular-progress
                    indeterminate
                    size="20px"
                    class="q-ma-xs"
                  />
                </template>
                <div class="text-subtitle1">
                  Confirmando orden ID: {{ order_id }}
                </div>
                <div class="text-caption">
                  {{ details }}
                </div>
              </q-banner>
            </template>
          </template>
          <template v-else>
            <q-banner class="bg-green text-white">
              <template v-slot:avatar>
                <q-icon name="check" size="30px" />
              </template>
              <div class="text-subtitle1">
                Orden ID: {{ order_id }}
              </div>
              <div class="text-caption">
                {{ details }}
              </div>
              <template v-slot:action>
                <div class="text-caption">
                  <q-icon name="motorcycle" size="22px" />
                  {{ driver_name }}
                </div>
              </template>
            </q-banner>
          </template> -->
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

      zoom: 13,
      url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [-17.783384, -63.18203],
      center_origen: [0, 0],
      center_destino: [0, 0],

      icon_origen: L.icon({
        // iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-origen.png',
        iconUrl: '/statics/marker-origen.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [24, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      icon_destino: L.icon({
        // iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-destino.png',
        iconUrl: '/statics/marker-destino.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [34, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      icon_driver: L.icon({
        // iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-driver.png',
        iconUrl: '/statics/marker-driver.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [30, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),

      access_token: "36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d",
      operator_token: "ca3686de8b9cd13abcb362e09e494210",

      refresh_handler: null,
      time_refresh: 15,

      reload: false
    }
  },
  methods: {
    checkParams() {
      var id = this.$route.params.order_id;
      if (id) {
        this.order_id = id;
        this.monitoringOrderDelivery();
        // this.live_tracking(id);
      }
    },
    // async live_tracking(id) {
    //   const URI = "https://prod-autos-api.jugnoo.in/menus_live_tracking";

    //   const data = new URLSearchParams();
    //   data.append("device_type", "0");
    //   data.append("app_version", "436");
    //   data.append("login_type", "0");
    //   data.append("delivery_id", "1637398");
    //   data.append("access_token", this.access_token);
    //   data.append("locale", "es");
    //   data.append("operator_token", this.operator_token);
    //   data.append("customer_package_name", "com.movapps.mav.patioservice");

    //   try {
    //     const res = await this.$axios.post(URI, data);
    //     console.log("LIVE TRACKING:", res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async monitoringOrderDelivery() {
      const time = Date.now();
      const date = moment().format("YYYY-MM-DD");
      const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=395&start_date=" + date + "&end_date=" + date + "&fetch_active_orders=1&order_id=" + this.order_id +"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;

      try {
        const res = await this.$axios.get(URI);
        if (res.data.aaData.length > 0) {
          if (!this.reload) {
            this.details = res.data.aaData[0].details;
            this.center_origen = [res.data.aaData[0].pickup_latitude, res.data.aaData[0].pickup_longitude];
            this.center_destino = [res.data.aaData[0].to_latitude, res.data.aaData[0].to_longitude];
          }
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
      const URI = "https://api-panels.jugnoo.in:8020/get_driver_details?token=b3de8bde6886e4695cbf5f23fcc363fa&city_id=395&status=1&delivery_enabled=1&is_delivery_panel=1"
      try {
        const res = await this.$axios.get(URI);
        if (res.data.data.length > 0) {
          const array = res.data.data;
          const index = array.findIndex(driver => driver.driver_id == this.driver_id)
          if (index >= 0) {
            this.center = [array[index].current_latitude, array[index].current_longitude];
            this.zoom = 15;
            this.showDriver = true;
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
    //   const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city_id=395&start_date=" + date + "&end_date=" + date + "&fetch_active_orders=1&order_id=" + this.order_id +"&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;

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