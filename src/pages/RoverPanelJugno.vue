<template>
  <q-page>
    <q-dialog v-model="dialogPedidoDetalle">
      <q-card class="text-center" style="width:500px">
        <q-card-section>
          <div class="text-h6">Pedido ID: {{ pedidoDetalle.order_id }}</div>
        </q-card-section>

        <q-card-section>
          <div>
            Local: {{ pedidoDetalle.restaurant_name }}
            {{ pedidoDetalle.restaurant_telf }}
          </div>
          <div>{{ pedidoDetalle.DETALLEORDEN }}</div>
          <div>
            Precio Pedido: {{ pedidoDetalle.order_amount }} Envio:
            {{ pedidoDetalle.delivery_charges }}
          </div>
          <div>
            Cliente: {{ pedidoDetalle.user_name }} Numero:
            {{ pedidoDetalle.phone_no }}
          </div>
          <div>Entregar en: {{ pedidoDetalle.delivery_address }}</div>
        </q-card-section>

        <!-- <q-card-section class="q-pt-none">
          {{ pedidoDetalle.nombre_restaurante }}
          <div>Cliente: {{ pedidoDetalle.nombre_cliente }} / {{ pedidoDetalle.celular_cliente }}</div>
          <div>Estado del pedido: {{ pedidoDetalle.estado }}</div>
          <br>
          <table border="1" style="margin: auto">
            <tr>
              <th>Evento</th>
              <th>Hora</th>
            </tr>
            <tr>
              <td>Creado</td>
              <td>{{ pedidoDetalle.creado_en }}</td>
            </tr>
            <tr>
              <td>Asignado</td>
              <td>{{ pedidoDetalle.asignado_en || 'Aun no completado' }}</td>
            </tr>
            <tr>
              <td>Llegar al local</td>
              <td>{{ pedidoDetalle.esperando_en || 'Aun no completado'}}</td>
            </tr>
            <tr>
              <td>En camino al cliente</td>
              <td>{{ pedidoDetalle.despachado_en || 'Aun no completado'}}</td>
            </tr>
            <tr>
              <td>Esperar entregar al cliente</td>
              <td>{{ pedidoDetalle.llegado_en || 'Aun no completado'}}</td>
            </tr>
            <tr>
              <td>Finalizado</td>
              <td>{{ pedidoDetalle.finalizado_en || 'Aun no completado'}}</td>
            </tr>
          </table>
        </q-card-section> -->

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row">
      <div class="col-4 shadow-3">
        <div class="" style="width: 100%">
          <q-tabs
            v-model="roverTab"
            inline-label
            class="bg-primary text-white shadow-2"
            @input="cargarDatosRoverJugno"
          >
            <q-tab
              v-for="(rover, index) in listRover"
              :key="rover.id_jugno"
              :name="index"
              icon="adb"
              :label="`${rover.id_jugno}`"
            >
              <!-- <q-badge color="red" floating>2</q-badge> -->
            </q-tab>
          </q-tabs>
        </div>
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" :src="imagenURLRover" />
            </q-card-section>
            <q-card-section class="col-7 q-pt-xs">
              <div
                class="full-width row wrap justify-between items-start content-start"
              >
                <!-- <div class="text-overline" :style="`${roverDetails.en_linea == 1 ? 'color: green;' : 'color: red;'}`">{{ roverDetails.en_linea == 1 ? 'En linea' : 'Apagado' }}</div>
                <div class="text-overline" v-if="roverDetails.en_linea == 1" :style="`${roverDetails.libre == 1 ? 'color: green;' : 'color: red;'}`">{{ roverDetails.libre == 1 ? 'Libre' : 'Ocupado' }}</div> -->
              </div>
              <div class="text-h5 q-mt-sm q-mb-sm">
                {{ roverDetails["Driver Name"] }}
              </div>
              <div class="text-grey">
                <p>
                  Ultimo Login: {{ moment(roverDetails.last_login).calendar() }}
                </p>
                <!-- <template v-if="roverDetails.en_linea == 1">
                 <p>Encendido: {{ moment(roverDetails.hora_encendido).calendar() }}</p>
                </template>
                <template v-else>
                  <p>Apagado: {{ moment(roverDetails.hora_apagado).calendar() }}</p>
                </template> -->
                <p>
                  Última sincronización:
                  {{ moment(roverDetails.location_updated_at).fromNow() }}
                </p>
                <!-- <p>Tarea actual: {{ tareaActual.descripcion }} {{ moment(tareaActual.creado_en).fromNow() }}</p> -->
                <div
                  class="full-width row wrap justify-between items-center content-start"
                >
                  <!-- <div>
                    <div class="full-width row wrap justify-start items-center content-center">
                      <q-icon color="green" size="24px" name="battery_charging_full" />
                      <div class="text-caption text-green">{{ roverDetails.bateria }}</div>
                    </div>
                  </div>
                  <div>
                    <q-btn color="blue" round flat icon="fas fa-video" />
                  </div>
                  <div>
                    <q-btn color="blue" round flat icon="fas fa-headset" />
                  </div>
                  <div>
                    <q-btn color="red" round flat icon="fas fa-volume-up" />
                  </div> -->
                </div>
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <div>{{ orderList.length }} Pedido(s) en cola</div>
            <!-- <q-btn flat round icon="store" />
            <q-btn flat>Detalles</q-btn>
            <q-btn flat color="primary">Configuración</q-btn> -->
            <!-- <q-btn size="12px" flat color="orange" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(null, 3)" />
            <q-btn size="12px" flat style="color: #416675" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(null, 4)" /> -->
            <q-space />
            <q-btn
              flat
              color="grey"
              icon="refresh"
              @click="cargarDatosRoverJugno"
            />
          </q-card-actions>
        </q-card>
        <div style="height: 400px; width: auto">
          <q-list bordered separator>
            <q-item
            v-if="orderList.length > 0"
              v-for="pedido in orderList"
              :key="pedido.order_id"
              class="cursor-pointer"
              clickable
              v-ripple
              @click="mostrarPedidoEnMapa(pedido)"
            >
              <q-item-section>
                <q-item-label
                  ><b>ID {{ pedido.order_id }}</b></q-item-label
                >
                <q-item-label caption>Desde</q-item-label>
                <q-item-label
                  >{{ pedido.restaurant_name }}
                  {{ pedido.restaurant_telf }}</q-item-label
                >
                <q-item-label caption>Para</q-item-label>
                <q-item-label
                  >{{ pedido.user_name }} {{ pedido.phone_no }}</q-item-label
                >
                <q-item-label>{{ pedido.delivery_address }}</q-item-label>
                <q-item-label caption
                  >Registrado:
                  {{ moment(pedido.FECHA).fromNow() }}</q-item-label
                >
                <q-item-label
                  v-if="pedido.SINCRONIZADO == 0"
                  style="color: orange;"
                  >Pendiente</q-item-label
                >
                <q-item-label
                  v-else-if="pedido.SINCRONIZADO == 2"
                  style="color: green;"
                  >Orden en proceso</q-item-label
                >
                <q-item-label
                  v-else-if="pedido.SINCRONIZADO == 3"
                  style="color: green;"
                  >En camino</q-item-label
                >
                <q-item-label
                  v-else-if="pedido.SINCRONIZADO == 1"
                  style="color: green;"
                  >Entregado</q-item-label
                >
                <!-- <q-item-label v-if="pedido.estado == 0" style="color: orange;" >Pendiente</q-item-label>
                <q-item-label v-else-if="pedido.estado == 2" style="color: orange;" >Esperando recoger el pedido {{ pedido.esperando_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 3" style="color: green;" >Despachado, en camino {{ pedido.despachado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 4" style="color: orange;" >Esperando entregar el pedido {{ pedido.llegado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 5" style="color: green;" >Pedido entregado {{ pedido.finalizado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 9" style="color: red;" >Pedido cancelado</q-item-label> -->
                <q-separator class="q-mt-xs" color="primary"></q-separator>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    flat
                    label="Detalles"
                    @click="mostrarDetallePedido(pedido)"
                  />
                  <!-- <q-btn size="12px" flat dense round icon="more_vert" @click="opcionesPedido(pedido)" /> -->
                </div>
                <div class="text-grey-8 q-gutter-xs q-mt-sm">
                  <q-btn flat color="primary" @click="descargarCoords(pedido)"
                    >Descargar</q-btn
                  >

                  <!-- <q-btn class="gt-xs" size="12px" flat color="red" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(pedido, 1)" />
                  <q-btn size="12px" flat color="blue" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(pedido, 2)" /> -->
                </div>
                <div class="text-grey-8 q-gutter-xs q-mt-sm">
                  <q-btn
                    flat
                    color="orange"
                    v-if="pedido.SINCRONIZADO == 0"
                    @click="tomarLaOrden(pedido)"
                    >Tomar la orden</q-btn
                  >
                  <!-- <q-btn flat color="primary" v-if="pedido.SINCRONIZADO == 2" @click="marcarRecogido(pedido)">Pedido recogido</q-btn>
                  <q-btn flat color="primary" v-if="pedido.SINCRONIZADO == 3" @click="marcarEntregado(pedido)">Entregado</q-btn> -->
                  <q-btn
                    flat
                    color="primary"
                    v-if="pedido.SINCRONIZADO != 0"
                    @click="marcarEntregado(pedido)"
                    >Entregado</q-btn
                  >
                </div>
              </q-item-section>
            </q-item>
            <div v-else>
              No hay ordenes
            </div>
          </q-list>
        </div>
      </div>
      <div class="col-6">
        <map-tracking />
      </div>
      <div class="col-2 shadow-3">
        <q-list bordered padding>
          <q-item
            tag="label"
            v-ripple
            v-for="(local, index) in localesRoverFiltrado"
            :key="index"
          >
            <q-item-section>
              <q-item-label>{{ local[1] }}</q-item-label>
              <q-item-label caption>
                {{ local[3] }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                color="blue"
                :disable="local[6] == 0 ? true : false"
                :value="local[6] == 1 ? true : false"
                @input="actualizarEstadoLocal(index)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import MapRover from "./MapRover.vue";
import MapTracking from "./MapTracking.vue";
import moment from "moment";
moment.locale("es");

var FileSaver = require("file-saver");

export default {
  components: { MapRover, MapTracking },
  mounted() {
    this.getListaRover();

    // this.getMapeoRuta();
  },
  data() {
    return {
      localIndex: [],
      imagenURLRover: "",
      dialogPedidoDetalle: false,
      moment: moment,
      roverTab: 1,
      listRover: [],
      roverDetails: {},
      orderList: [],
      pedidoDetalle: {},

      tareaActual: "",

      refresh_handler: null,
      time_refresh: 30,

      // mapeoRuta: [],
      todosLocalesRover: [],
      localesRoverFiltrado: []
    };
  },
  methods: {
    descargarCoords(pedido) {
      let texto = [
        pedido.local_latitude,
        "\t",
        pedido.local_longitude,
        "\t",
        "Local: " + pedido.restaurant_name,
        "\n",
        pedido.delivery_latitude,
        "\t",
        pedido.delivery_longitude,
        "\t",
        "Cliente: " + pedido.user_name
      ];
      var blob = new Blob(texto, {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "ID-" + pedido.order_id + ".txt");
    },
    async actualizarEstadoLocal(index) {
      switch (this.localesRoverFiltrado[index][6]) {
        case 0:
          alert("No puedes modificar el estado del local. Esta deshabilitado");
          break;
        case 1:
          // alert("Abierto")
          await this.updateLocalJugno(
            this.localesRoverFiltrado[index][0],
            "Cerrar"
          );
          // this.localesRoverFiltrado[index][6] = 2;
          // cerrar
          break;
        case 2:
          // alert("Cerrado")
          await this.updateLocalJugno(
            this.localesRoverFiltrado[index][0],
            "Abrir"
          );
          // this.localesRoverFiltrado[index][6] = 1;
          // abrir
          break;
      }

      await this.getTodosLocalesRover();
      this.filtrarLocalesRover(JSON.parse(this.listRover[this.roverTab].lista));
      // alert(index)
    },
    async tomarLaOrden(pedido) {
      const r = confirm("Tomar la orden " + pedido.order_id);
      if (r) {
        this.$q.loading.show();
        const URI = "https://labs.patio.com.bo/api/pool_pedido";
        const data = new URLSearchParams();
        data.append("id", pedido.id);
        data.append("SINCRONIZADO", 2);
        try {
          const res = await this.$axios.post(URI, data);
          console.log(res.data);
          await this.cargarListaPedidosRover();
          // Asignar la orden al rover
        } catch (error) {
          console.log("No se pudo tomar la orden", error);
        }
        this.$q.loading.hide();
      }
    },
    async marcarRecogido(pedido) {
      alert("Marcar en camino al cliente " + pedido.delivery_id);
      // sincronizado = 3
      // marcar dipatched
    },
    async marcarEntregado(pedido) {
      const r = confirm("Marcar como entregada la orden " + pedido.order_id);
      if (r) {
        this.$q.loading.show();
        const URI = "https://labs.patio.com.bo/api/pool_pedido";
        const data = new URLSearchParams();
        data.append("id", pedido.id);
        data.append("SINCRONIZADO", 1);
        data.append("ENTREGADO", 1);
        try {
          const res = await this.$axios.post(URI, data);
          console.log(res.data);
          // marcar entregado pedido real
          await this.marcarEntregadoJugno(pedido);
          await this.cargarListaPedidosRover();
        } catch (error) {
          console.log("No se pudo entregar la orden", error);
        }
        this.$q.loading.hide();
      }
    },
    async marcarEntregadoJugno(pedido) {
      const URI = "https://dodo.jugnoo.in:8024/force_order_complete";
      const data = new URLSearchParams();
      data.append("access_token", "845c88964029c3c89451c8925a5bf093");
      data.append("driver_name", "Rover Jugno");
      data.append("driver_phone", "+59170855324");
      data.append("driver_subsidy_fare", 0);
      data.append("drop_latitude", pedido.delivery_latitude);
      data.append("drop_longitude", pedido.delivery_longitude);
      data.append("locale", "en");
      data.append("order_id", pedido.delivery_id);
      data.append("parking_fare", 0);
      data.append("pickup_distance", 0);
      data.append("pickup_waiting_time", 0);
      data.append("return_distance", 0);
      data.append("ride_distance", 0);
      data.append("ride_time", 0);
      data.append("waiting_fare", 0);
      try {
        const res = await this.$axios.post(URI, data);
        console.log("JUGNO ENTREGADO", res.data)
      } catch (error) {
        console.log("No se entrego en Jugno", error)
      }
    },
    async updateLocalJugno(id_jugno, label) {
      this.$q.loading.show();
      let auxTexto = "";
      let estado = 0;
      if (label == "Cerrar") {
        auxTexto = "cerrado desde el panel Rover";
        estado = 2;
      } else if (label == "Abrir") {
        auxTexto = "Abierto desde el panel Rover";
        estado = 1;
      }
      const URI =
        "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
      const data = new URLSearchParams();
      data.append("remarks", auxTexto);
      data.append("restaurant_id", id_jugno);
      data.append("activation_status", estado);
      data.append("user_email", "abhishek.kaushik+patio@jungleworks.com");
      data.append("locale", "en");
      data.append("token", "845c88964029c3c89451c8925a5bf093");
      try {
        const res = await this.$axios.post(URI, data);
        if (res.data.message == "Merchant Profile updated") {
          this.$q.notify({
            message: auxTexto,
            color: "primary",
            position: "bottom"
          });
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert(error);
        console.log("No se pudo cerrar", error);
      }
      this.$q.loading.hide();
    },
    async abrirLocalJugno(id_jugno) {},
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
        this.cargarDatosRoverJugno();
        console.log("Refresh ROVER ORDERS...");
      }, this.time_refresh * 1000);
    },
    // async getMapeoRuta() {
    //   const URI = "http://localhost/phpProjects/web-service/?route=rover&type=mapeo_ruta&lat_origen=-17.78377000&lng_origen=-63.18138200";
    //   try {
    //     const res = await this.$axios.get(URI);
    //     let wp = JSON.parse(res.data[0].puntos);
    //     let mapeoRuta = [];
    //     wp.forEach(punto => {
    //       mapeoRuta.push([punto.lat, punto.lng]);
    //     });
    //     console.log(mapeoRuta);
    //     this.$store.commit("geolocalizacion/ruta", mapeoRuta);
    //   } catch (error) {
    //     console.log("Mapeo de rutas", error);
    //   }
    // },
    async getTodosLocalesRover(id_ciudad) {
      const time = Date.now();
      const token = "845c88964029c3c89451c8925a5bf093";

      const URI =
        "https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurants?token=" +
        token +
        "&secret=P7JlZXiRiIvSssQSSzqs&city=" +
        id_ciudad +
        "&locale=en&merchant_category_id=4694&sEcho=2&iColumns=10&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" +
        time;
      try {
        const res = await this.$axios.get(URI);
        // console.log(res.data);
        this.todosLocalesRover = res.data.aaData;
      } catch (error) {
        console.log("GET todos los locales ROVER", error);
      }
    },
    async cargarDatosRoverJugno() {
      this.$q.loading.show();
      this.imagenURLRover = this.listRover[this.roverTab].url_foto;
      const URI =
        "https://api-panels.jugnoo.in:7013/schedule-ride-auth/driver_info?";
      let data = new URLSearchParams();
      data.append("driver_id", this.listRover[this.roverTab].id_jugno);
      data.append("token", "845c88964029c3c89451c8925a5bf093");
      data.append("search_key", 0);
      data.append("paginationDetails[start_from_rides]", 0);
      data.append("paginationDetails[page_size_rides]", 40);
      data.append("paginationDetails[start_from_issues]", 0);
      data.append("paginationDetails[start_from_app_issues]", 0);
      data.append("paginationDetails[page_size_issues]", 40);
      data.append("paginationDetails[page_size_app_issues]", 40);
      data.append("paginationDetails[start_from_dodo]", 0);
      data.append("paginationDetails[page_size_dodo]", 40);
      data.append("paginationDetails[start_from_can_rides]", 0);
      data.append("paginationDetails[page_size_can_rides]", 40);
      data.append("paginationDetails[start_from_agent_history]", 0);
      data.append("paginationDetails[page_size_agent_history]", 40);
      try {
        const res = await this.$axios.post(URI, data);
        // console.log(res.data);
        this.roverDetails = res.data;
        this.$store.commit("geolocalizacion/centerUser", [
          this.roverDetails.last_lat,
          this.roverDetails.last_long
        ]);
        this.$store.commit("geolocalizacion/centerMapa", [
          this.roverDetails.last_lat,
          this.roverDetails.last_long
        ]);
        // this.$store.commit("geolocalizacion/centerParqueo", [this.roverDetails.last_lat, this.roverDetails.last_long]);
        this.filtrarLocalesRover(
          JSON.parse(this.listRover[this.roverTab].lista)
        );
        await this.cargarListaPedidosRover();
      } catch (error) {
        console.log("OBTENER ROVER", error);
      }
      this.$q.loading.hide();
      this.reset_timer();
    },
    async getListaRover() {
      const id_ciudad = 395;
      const nombre_ciudad = "Santa Cruz";
      const URI =
        "https://patioserviceonline.com/api/v1/?route=rover&type=lista_rover&ciudad=" +
        nombre_ciudad;
      try {
        const res = await this.$axios.get(URI);
        if (res.data && res.data.length > 0) {
          this.listRover = res.data;
          // this.imagenURLRover = res.data[0].url_foto;
          // this.roverTab = this.listRover[0].id_jugno;
          this.roverTab = 0;
          await this.getTodosLocalesRover(id_ciudad);
          await this.cargarDatosRoverJugno();
          // await this.cargarListaPedidosRover();
          // console.log(this.listRover)
          // this.roverTab = this.listRover[0].id;
          // this.roverDetails = this.listRover[0];
          // this.$store.commit("geolocalizacion/centerUser", [this.roverDetails.lat, this.roverDetails.lng]);
          // this.$store.commit("geolocalizacion/centerParqueo", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
          // this.cargarPedidosRover();
        }
      } catch (error) {
        console.log("Lista Rover", error);
      }
    },
    async cargarListaPedidosRover() {
      const URI =
        "https://labs.patio.com.bo/api/pool_pedido?ENTREGADO=0&tipo=rover";

      try {
        this.orderList = [];
        const res = await this.$axios.get(URI);
        if (res.data.message != "No products found.") {
          console.log(res.data.records);
          this.orderList = res.data.records;
        }
      } catch (error) {
        console.log("No se pudo obtener los pedido", error);
      }
    },
    filtrarLocalesRover(lista) {
      this.localesRoverFiltrado = [];
      this.todosLocalesRover.forEach(local => {
        const found = lista.find(id => id == local[0]);
        if (found) {
          this.localesRoverFiltrado.push(local);
        }
      });
      // console.log(this.localesRoverFiltrado);
    },
    // async cargarDatosRover() {
    //   // alert(this.roverTab)
    //   const URI = "https://patioserviceonline.com/api/v1/?route=rover&type=obtener_rover&id_rover=" + this.roverTab;
    //   try {
    //     const res = await this.$axios.get(URI);
    //     if (res.data.length > 0) {
    //       // this.listRover = res.data;
    //       // console.log(this.listRover)
    //       // this.roverTab = this.listRover[0].id;
    //       this.roverDetails = res.data[0];
    //       this.$store.commit("geolocalizacion/centerUser", [this.roverDetails.lat, this.roverDetails.lng]);
    //       this.$store.commit("geolocalizacion/centerParqueo", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
    //       this.cargarPedidosRover();
    //     }
    //   } catch (error) {
    //     console.log("Lista Rover", error);
    //   }
    // },
    // async cargarPedidosRover() {
    //   this.orderList = [];
    //   let array = JSON.parse(this.roverDetails.lista);
    //   // console.log(array)
    //   for (let index = 0; index < array.length; index++) {
    //     const URI =
    //       "https://patioserviceonline.com/api/v1/?route=rover&type=lista_pedidos_restaurante&id_restaurante=" +
    //       array[index];
    //     try {
    //       const res = await this.$axios.get(URI);
    //       // console.log("id", res.data);
    //       if (res.data.length > 0) {
    //         this.orderList = res.data;
    //       }
    //       this.obtenerUltimoRegistroRover();
    //     } catch (error) {
    //       console.log("Obtener Pedidos", error);
    //     }
    //   }
    //   // array.forEach(id => {

    //   // });
    //   this.reset_timer();
    // },
    opcionesPedido(pedido) {
      this.$q
        .dialog({
          title: "Opciones disponibles",
          message: "<b>Seleccione una opción</b>",
          html: true,
          options: {
            type: "radio",
            model: "entregado",
            items: [
              {
                label: "Marcar como entregado",
                value: "entregado"
              },
              {
                label: "Marcar como despachado",
                value: "despachado"
              },
              {
                label: "Cancelar el pedido",
                value: "cancelar_jugno"
              },
              {
                label: "Liberar el pedido para una moto",
                value: "liberar_pedido"
              },
              { label: "Quitar de la lista", value: "ocultar" }
            ]
          },
          ok: {
            color: "negative",
            label: "Aceptar",
            push: true
          },
          cancel: {
            label: "Volver",
            push: true,
            color: "primary"
          }
        })
        .onOk(data => {
          this.actualizarPedido(pedido, data);
        });
    },
    async actualizarPedido(pedido, data) {
      alert(pedido.id_pedido + " " + data);
    },
    async obtenerUltimoRegistroRover() {
      const URI =
        "https://patioserviceonline.com/api/v1/?route=rover&type=ultima_bitacora_rover&id_rover=" +
        this.roverDetails.id;
      try {
        const res = await this.$axios.get(URI);
        // console.log(res.data);
        if (res.data.length > 0) {
          this.tareaActual = res.data[0];
        }
      } catch (error) {
        console.log("Obtener Pedidos", error);
      }
    },
    mostrarPedidoEnMapa(pedido) {
      this.$store.commit("geolocalizacion/centerOrigen", [
        pedido.local_latitude,
        pedido.local_longitude
      ]);
      this.$store.commit("geolocalizacion/centerDestino", [
        pedido.delivery_latitude,
        pedido.delivery_longitude
      ]);
      this.$store.commit("geolocalizacion/centerMapa", [
        pedido.local_latitude,
        pedido.local_longitude
      ]);
      // // console.log(pedido)
      // this.$store.commit("geolocalizacion/centerOrigen", [pedido.lat_restaurante, pedido.lng_restaurante]);
      // this.$store.commit("geolocalizacion/centerDestino", [pedido.lat_pedido, pedido.lng_pedido]);
      // // this.$store.commit("geolocalizacion/ruta", JSON.parse(pedido.puntos));
      // this.$store.commit("geolocalizacion/centerMapa", [pedido.lat_restaurante, pedido.lng_restaurante]);
    },
    mostrarDetallePedido(pedido) {
      this.pedidoDetalle = pedido;
      this.dialogPedidoDetalle = true;
    },
    centrarMapa(pedido, marcador) {
      switch (marcador) {
        case 1:
          this.$store.commit("geolocalizacion/centerMapa", [
            pedido.local_latitude,
            pedido.local_longitude
          ]);
          break;
        case 2:
          this.$store.commit("geolocalizacion/centerMapa", [
            pedido.delivery_latitude,
            pedido.delivery_longitude
          ]);
          break;
        // case 3:
        //   this.$store.commit("geolocalizacion/centerMapa", [this.roverDetails.lat, this.roverDetails.lng]);
        //   break;
        // case 4:
        //   this.$store.commit("geolocalizacion/centerMapa", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
        //   break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card .my-card {
  width: 100%;
  max-width: 300px;
}

td {
  padding: 4px 24px;
}
</style>
