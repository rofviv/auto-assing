<template>
  <q-page>
    <q-dialog v-model="dialogPedidoDetalle">
      <q-card class="text-center" style="width:500px">
        <q-card-section>
          <div class="text-h6">Pedido ID: {{ pedidoDetalle.id_pedido }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
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
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row">
      <div class="col-4 shadow-3">
        <div class="" style="width: 100%">
            <q-tabs v-model="roverTab" inline-label class="bg-primary text-white shadow-2" @input="cargarDatosRover">
              <q-tab v-for="rover in listRover" :key="rover.id" :name="rover.id" icon="adb" :label="`Rover #${rover.id}`">
                <!-- <q-badge color="red" floating>2</q-badge> -->
              </q-tab>
            </q-tabs>
        </div>
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" :src="roverDetails.url_foto" />
            </q-card-section>
            <q-card-section class="col-7 q-pt-xs">
              <div class="full-width row wrap justify-between items-start content-start">
                <div class="text-overline" :style="`${roverDetails.en_linea == 1 ? 'color: green;' : 'color: red;'}`">{{ roverDetails.en_linea == 1 ? 'En linea' : 'Apagado' }}</div>
                <div class="text-overline" v-if="roverDetails.en_linea == 1" :style="`${roverDetails.libre == 1 ? 'color: green;' : 'color: red;'}`">{{ roverDetails.libre == 1 ? 'Libre' : 'Ocupado' }}</div>
              </div>
              <div class="text-h5 q-mt-sm q-mb-sm">Rover #{{ roverDetails.id }}</div>
              <div class="text-grey">
                <template v-if="roverDetails.en_linea == 1">
                 <p>Encendido: {{ moment(roverDetails.hora_encendido).calendar() }}</p>
                </template>
                <template v-else>
                  <p>Apagado: {{ moment(roverDetails.hora_apagado).calendar() }}</p>
                </template>
                <p>Última sincronización: {{ moment(roverDetails.ultima_sincronizacion).fromNow() }}</p>
                <p>Tarea actual: {{ tareaActual.descripcion }} {{ moment(tareaActual.creado_en).fromNow() }}</p>
                <div class="full-width row wrap justify-between items-center content-start">
                  <div>
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
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="store" />
            <q-btn flat>Detalles</q-btn>
            <q-btn flat color="primary">Configuración</q-btn>
            <q-btn size="12px" flat color="orange" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(null, 3)" />
            <q-btn size="12px" flat style="color: #416675" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(null, 4)" />
            <q-space />
            <q-btn flat color="grey" icon="refresh" @click="cargarDatosRover" />
          </q-card-actions>
        </q-card>
        <div style="height: 400px; width: auto" >
          <q-list bordered separator>
            <q-item  v-for="pedido in orderList" :key="pedido.id_pedido">
              <q-item-section clickable v-ripple @click="mostrarPedidoEnMapa(pedido)">
                <q-item-label>ID {{ pedido.id_pedido }}</q-item-label>
                <q-item-label caption>{{ pedido.nombre_restaurante }}</q-item-label>
                <q-item-label caption>Registrado: {{ moment(pedido.creado_en).fromNow() }}</q-item-label>
                <q-item-label v-if="pedido.estado == 0" style="color: orange;" >Pendiente</q-item-label>
                <q-item-label v-else-if="pedido.estado == 1" style="color: green;" >Asignado, en camino {{ pedido.asignado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 2" style="color: orange;" >Esperando recoger el pedido {{ pedido.esperando_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 3" style="color: green;" >Despachado, en camino {{ pedido.despachado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 4" style="color: orange;" >Esperando entregar el pedido {{ pedido.llegado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 5" style="color: green;" >Pedido entregado {{ pedido.finalizado_en }}</q-item-label>
                <q-item-label v-else-if="pedido.estado == 9" style="color: red;" >Pedido cancelado</q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="info" @click="mostrarDetallePedido(pedido)" />
                  <q-btn size="12px" flat dense round icon="more_vert" @click="opcionesPedido(pedido)" />
                </div>
                <div class="text-grey-8 q-gutter-xs q-mt-sm">
                  <q-btn class="gt-xs" size="12px" flat color="red" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(pedido, 1)" />
                  <q-btn size="12px" flat color="blue" dense round icon="fas fa-map-marker-alt" @click="centrarMapa(pedido, 2)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-8">
        <map-tracking />
      </div>
    </div>
  </q-page>
</template>

<script>
import MapRover from "./MapRover.vue";
import MapTracking from "./MapTracking.vue";
import moment from 'moment';
moment.locale('es');

export default {
  components: { MapRover, MapTracking },
  mounted() {
    this.getListaRover();

    // this.getMapeoRuta();
  },
  data() {
    return {
      dialogPedidoDetalle: false,
      moment: moment,
      roverTab: 1,
      listRover: [],
      roverDetails: {},
      orderList: [],
      pedidoDetalle: {},

      tareaActual: '',

      refresh_handler: null,
      time_refresh: 30,   

      // mapeoRuta: [],
    };
  },
  methods: {
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
        this.cargarDatosRover();
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
    async getListaRover() {
      const URI = "https://patioserviceonline.com/api/v1/?route=rover&type=lista_rover&ciudad=Santa%20Cruz";
      try {
        const res = await this.$axios.get(URI);
        if (res.data && res.data.length > 0) {
          this.listRover = res.data;
          // console.log(this.listRover)
          this.roverTab = this.listRover[0].id;
          this.roverDetails = this.listRover[0];
          this.$store.commit("geolocalizacion/centerUser", [this.roverDetails.lat, this.roverDetails.lng]);
          this.$store.commit("geolocalizacion/centerParqueo", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
          this.cargarPedidosRover();
        }
      } catch (error) {
        console.log("Lista Rover", error);
      }
    },
    async cargarDatosRover() {
      // alert(this.roverTab)
      const URI = "https://patioserviceonline.com/api/v1/?route=rover&type=obtener_rover&id_rover=" + this.roverTab;
      try {
        const res = await this.$axios.get(URI);
        if (res.data.length > 0) {
          // this.listRover = res.data;
          // console.log(this.listRover)
          // this.roverTab = this.listRover[0].id;
          this.roverDetails = res.data[0];
          this.$store.commit("geolocalizacion/centerUser", [this.roverDetails.lat, this.roverDetails.lng]);
          this.$store.commit("geolocalizacion/centerParqueo", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
          this.cargarPedidosRover();
        }
      } catch (error) {
        console.log("Lista Rover", error);
      }
    },
    async cargarPedidosRover() {
      this.orderList = [];
      let array = JSON.parse(this.roverDetails.lista);
      // console.log(array)
      for (let index = 0; index < array.length; index++) {
        const URI = "https://patioserviceonline.com/api/v1/?route=rover&type=lista_pedidos_restaurante&id_restaurante=" + array[index];
        try {
          const res = await this.$axios.get(URI);
          // console.log("id", res.data);
          if (res.data.length > 0) {
            this.orderList = res.data;
          }
          this.obtenerUltimoRegistroRover();
        } catch (error) {
          console.log("Obtener Pedidos", error)
        }
        
      }
      // array.forEach(id => {
        
      // });
      this.reset_timer();
    },
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
                value: "entregado",
              },
              {
                label: "Marcar como despachado",
                value: "despachado",
              },
              {
                label: "Cancelar el pedido",
                value: "cancelar_jugno",
              },
              { label: "Liberar el pedido para una moto", value: "liberar_pedido" },
              { label: "Quitar de la lista", value: "ocultar" },
            ],
          },
          ok: {
            color: "negative",
            label: "Aceptar",
            push: true,
          },
          cancel: {
            label: "Volver",
            push: true,
            color: "primary",
          },
        })
        .onOk((data) => {
          this.actualizarPedido(pedido, data);
        });
    },
    async actualizarPedido(pedido, data) {
      alert(pedido.id_pedido + " " + data);
    },
    async obtenerUltimoRegistroRover() {
      const URI = "https://patioserviceonline.com/api/v1/?route=rover&type=ultima_bitacora_rover&id_rover=" + this.roverDetails.id;
      try {
        const res = await this.$axios.get(URI);
        // console.log(res.data);
        if (res.data.length > 0) {
          this.tareaActual = res.data[0];
        }
      } catch (error) {
        console.log("Obtener Pedidos", error)
      }
    },
    mostrarPedidoEnMapa(pedido) {
      console.log(pedido)
      this.$store.commit("geolocalizacion/centerOrigen", [pedido.lat_restaurante, pedido.lng_restaurante]);
      this.$store.commit("geolocalizacion/centerDestino", [pedido.lat_pedido, pedido.lng_pedido]);
      // this.$store.commit("geolocalizacion/ruta", JSON.parse(pedido.puntos));
      this.$store.commit("geolocalizacion/centerMapa", [pedido.lat_restaurante, pedido.lng_restaurante]);
    },
    mostrarDetallePedido(pedido) {
      this.pedidoDetalle = pedido;
      this.dialogPedidoDetalle = true;
    },
    centrarMapa(pedido, marcador) {
      switch (marcador) {
        case 1:
          this.$store.commit("geolocalizacion/centerMapa", [pedido.lat_restaurante, pedido.lng_restaurante]);
          break;
        case 2:
          this.$store.commit("geolocalizacion/centerMapa", [pedido.lat_pedido, pedido.lng_pedido]);
          break;
        case 3:
          this.$store.commit("geolocalizacion/centerMapa", [this.roverDetails.lat, this.roverDetails.lng]);
          break;
        case 4:
          this.$store.commit("geolocalizacion/centerMapa", [this.roverDetails.lat_parqueo, this.roverDetails.lng_parqueo]);
          break;
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