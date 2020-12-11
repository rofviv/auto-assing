<template>
  <q-page>
  <!-- <div> -->
    <!-- <div
      style="z-index: 3; position: absolute; height: auto; width: 100%; border-width: 5px; border: 2px solid black;"
    >
      <q-banner class>
        <template v-slot:avatar>
          <q-icon name="fa fa-search-location" color="primary" />
        </template>
        <div class="text-encabezado">Estado del conductor: {{ estadoConductor }}</div>
        <div class="text-encabezado">Datos del conductor</div>
        <div>Nombre: {{ nombre_conductor }}</div>
        <div>Placa: {{ placa_conductor }}</div>
        <template v-slot:action><div class="letra-gris">Ultima sincronización: {{ ultimaSincronizacion }}</div></template>
      </q-banner>
    </div> -->
    <div
      style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;"
    >
      <l-map
        ref="myMap"
        style="z-index:0"
        :zoom="zoom"
        :center="center_mapa"
        :options="{zoomControl: false}"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <l-marker :lat-lng="center_origen" :icon="markerOrigen">
          <l-tooltip>Origen</l-tooltip>
          <l-popup>
            <div>Origen</div>
          </l-popup>
        </l-marker>
        <l-marker :lat-lng="center_destino" :icon="markerDestino">
          <l-tooltip>Destino</l-tooltip>
          <l-popup>
            <div>Destino</div>
          </l-popup>
        </l-marker>
        <!-- <template v-if="showDriver"> -->
          
        <!-- </template> -->
        <l-marker :lat-lng="center_parqueo" :icon="markerParqueo">
          <l-tooltip>Parqueo</l-tooltip>
            <l-popup>
              <div>Parqueo</div>
            </l-popup>
          </l-marker>
          
          <l-polyline :lat-lngs="ruta" color="green"></l-polyline>
          <l-marker :lat-lng="center_user" :icon="markerUser">
            <l-tooltip>Rover</l-tooltip>
            <l-popup>
              <div>Rover</div>
            </l-popup>
          </l-marker>
      </l-map>
    </div>
  <!-- </div> -->
  </q-page>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup, LPolyline, LTooltip } from "vue2-leaflet";
import "leaflet.awesome-markers";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet/dist/leaflet.css";
import moment from "moment";
moment.locale("es");

const markerParqueoAux = L.AwesomeMarkers.icon({
  icon: "parking",
  prefix: "fa",
  markerColor: "cadetblue",
});

const markerUserAux = L.AwesomeMarkers.icon({
  icon: "truck-pickup",
  prefix: "fa",
  markerColor: "orange",
});

const markerOrigenAux = L.AwesomeMarkers.icon({
  icon: "store",
  prefix: "fa",
  markerColor: "red",
});

const markerDestinoAux = L.AwesomeMarkers.icon({
  icon: "house-user",
  prefix: "fa",
  markerColor: "blue",
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolyline,
    LTooltip
  },
  async mounted() {
    // await this.rastrearOrden();
  },
  data() {
    return {
      markerParqueo: markerParqueoAux,
      markerUser: markerUserAux,
      markerOrigen: markerOrigenAux,
      markerDestino: markerDestinoAux,
      nombre_conductor: "",
      placa_conductor: "",
      zoom: 20,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // center: [-17.783512, -63.181862],
      // center_user: [0, 0],
      // center_origen: [0, 1],
      // center_destino: [0, 2],
      refresh_handler: null,
      time_refresh: 30,      

      estadoConductor: "",
      ultimaSincronizacion: "",
      showDriver: false,
      driver_id: null,
      ordenRastreo: {},
    };
  },
  methods: {
    async rastrearOrden() {
      const URI =
        "https://taneneka.com/api/v1/?route=orden&type=rastrear";
      const data = "id=" + this.$route.params.id;
      try {
        const res = await this.$axios.post(URI, data);
        if (res.data.length > 0) {
          if (res.data.estado != "0") {
            this.ordenRastreo = res.data[0];
            // console.log(res.data);
            this.nombre_conductor = this.ordenRastreo.nombre_conductor;
            this.placa_conductor = this.ordenRastreo.placa;
            this.center_origen = [
              this.ordenRastreo.lat_origen,
              this.ordenRastreo.lng_origen,
            ];
            this.center_destino = [
              this.ordenRastreo.lat_destino,
              this.ordenRastreo.lng_destino,
            ];
            this.driver_id = this.ordenRastreo.id_jugno;
            if (this.driver_id) {
              this.getCoordsDriver();
            } else {
              alert("No hay conductor asignado");
            }
          } else {
            alert("Este envio ya se completo");
          }
        } else {
          alert("Orden no encontrada");
        }
      } catch (error) {
        console.log("No se pudo rastrear", error);
        alert(error);
      }
    },
    // openPopup: function (event) {
    //   this.$nextTick(() => {
    //     event.target.openPopup();
    //   });
    // },
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
        this.getCoordsDriver();
        console.log("Refresh DRIVER...");
      }, this.time_refresh * 1000);
    },
    async getCoordsDriver() {
      // const URI =
      //   "https://api-panels.jugnoo.in:8020/get_driver_details?token=5e26d40edd82f1035e8fe0d12e7304df&city_id=997&status=1&delivery_enabled=1&is_delivery_panel=1";
      const URI =
        "https://api-panels.jugnoo.in:8020/get_driver_details?token=845c88964029c3c89451c8925a5bf093&city_id=997&status=0&delivery_enabled=1&is_delivery_panel=1";
      try {
        const res = await this.$axios.get(URI);
        // console.log("ACTIVOS", res.data);
        if (res.data.data.length > 0) {
          const array = res.data.data;
          const index = array.findIndex(
            (driver) => driver.driver_id == this.driver_id
          );
          if (index >= 0) {
            this.center_user = [
              array[index].current_latitude,
              array[index].current_longitude,
            ];
            this.zoom = 13;
            this.showDriver = true;
            this.estadoConductor = "En linea";
            this.ultimaSincronizacion = "Hace 30 segundos";
          } else {
            this.getCoordsDriverBusy();
            // this.getDriverInactive();
          }
        } else {
          this.getCoordsDriverBusy();
          // this.getDriverInactive();
        }
      } catch (error) {
        console.log("Driver Free", error);
      }
      this.reset_timer();
    },
    async getCoordsDriverBusy() {
      // const URI =
      //   "https://api-panels.jugnoo.in:8020/get_driver_details?token=5e26d40edd82f1035e8fe0d12e7304df&city_id=997&status=1&delivery_enabled=1&is_delivery_panel=1";
      const URI =
        "https://api-panels.jugnoo.in:8020/get_driver_details?token=845c88964029c3c89451c8925a5bf093&city_id=997&status=1&delivery_enabled=1&is_delivery_panel=1";
      try {
        const res = await this.$axios.get(URI);
        // console.log("ACTIVOS", res.data);
        if (res.data.data.length > 0) {
          const array = res.data.data;
          const index = array.findIndex(
            (driver) => driver.driver_id == this.driver_id
          );
          if (index >= 0) {
            this.center_user = [
              array[index].current_latitude,
              array[index].current_longitude,
            ];
            this.zoom = 13;
            this.showDriver = true;
            this.estadoConductor = "En linea";
            this.ultimaSincronizacion = "Hace 30 segundos";
          } else {
            this.getDriverInactive();
          }
        } else {
          this.getDriverInactive();
        }
      } catch (error) {
        console.log("Driver Free", error);
      }
      this.reset_timer();
    },
    async getDriverInactive() {
      const URI =
        "https://api-panels.jugnoo.in:8020/get_driver_details?token=845c88964029c3c89451c8925a5bf093&city_id=997&status=2&delivery_enabled=1&is_delivery_panel=1";
      try {
        const res = await this.$axios.get(URI);
        // console.log("INACTIVOS", res.data);
        if (res.data.data.length > 0) {
          const array = res.data.data;
          const index = array.findIndex(
            (driver) => driver.driver_id == this.driver_id
          );
          if (index >= 0) {
            this.center_user = [
              array[index].current_latitude,
              array[index].current_longitude,
            ];
            this.zoom = 13;
            this.showDriver = true;
            this.estadoConductor = "Sin señal";
            this.ultimaSincronizacion = moment(
              array[index].last_active_time
            ).fromNow();
          } else {
            alert("El conductor no esta disponible");
          }
        }
      } catch (error) {
        console.log("Driver Inactive", error);
      }
    },
  },
  computed: {
    ruta() {
      return this.$store.getters["geolocalizacion/getRuta"];
    },
    center_mapa() {
      return this.$store.getters["geolocalizacion/getCenterMapa"];
    },
    center_parqueo() {
      return this.$store.getters["geolocalizacion/getCenterParqueo"];
    },
    center_user() {
      return this.$store.getters["geolocalizacion/getCenterUser"];
    },
    center_origen() {
      return this.$store.getters["geolocalizacion/getCenterOrigen"];
    },
    center_destino() {
      return this.$store.getters["geolocalizacion/getCenterDestino"];
    }
  }
};
</script>
<style scoped>
.text-encabezado {
  font-weight: 500;
  font-size: 18px;
}


.letra-gris {
  padding-bottom: 12px;
  font-weight: 500;
  font-size: 14px;
  opacity: .6;
  text-transform: uppercase;
}
</style>