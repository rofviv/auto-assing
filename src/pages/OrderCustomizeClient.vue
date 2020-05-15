<template>
<q-page class="q-pa-md">
  <q-dialog v-model="history">
    <q-card>
      <q-card-section>
        Haz click en la orden para visualizarlo en el mapa
      </q-card-section>
      <q-card-section>
        <template v-if="order_history.length > 0">
          <q-list bordered separator>
            <q-item clickable v-ripple @click="openWindow(item.order_id)" v-for="(item, index) in order_history" :key="index">
              <q-item-section>
                <q-item-label>Orden ID: {{ item.order_id }}</q-item-label>
                <q-item-label caption>{{ item.details }}</q-item-label>
                <q-item-label caption>{{ date.formatDate(item.created_at, 'D MMM hh:mm a') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
        <template v-else>
          <div>
            <q-circular-progress
              indeterminate
              size="50px"
              class="q-ma-md"
            />
          </div>
        </template>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :loading="loadMoreHistory" label="Mostrar más" color="orange" @click="loadHistory(1)" />
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogFind">
    <q-card>
      <q-card-section>
        Seleccionar una direccion guardada
        <q-input
          class="q-pb-xs"
          v-model="filterAddress"
          filled
          dense
          label="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item clickable v-ripple @click="selectAddress(item)" v-for="(item, index) in arrayFilterAddress" :key="index">
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>{{ item.reference }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogSave" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Guardar direccion como:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="addressSave" autofocus />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Guardar direccion" @click="saveAddressLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div class="row wrap items-center">
    <div class="col-7">
      <template>
        <div class="q-py-xs">
          <q-banner rounded :class="`${sendOrderMsg.color} text-white`">
            ID Orden: {{ sendOrderMsg.id }} <br />
            {{ sendOrderMsg.msg }}
          </q-banner>
        </div>
      </template>
    </div>
    <div class="col-5">
      <div class="row">
        <div class="col-4">
          <div class="q-gutter-sm text-right">
            <div class="text-grey-7">Gastos de envío</div>
            {{ deliveryCost }}
          </div>
        </div>
        <div class="col">
          <div class="q-gutter-sm text-right ">
            <q-btn class="q-mb-sm" :loading="loadDeliveryBtn" @click="calculateDelivery" color="primary" size="10px">Calcular envío</q-btn>
            <q-btn class="q-mb-sm" :disabled="details == ''" :loading="loadBtn" @click="sendOrder" color="green" size="10px">Finalizar Pedido</q-btn>
            <q-btn flat round icon="history" @click="loadHistory(0)">
              <q-tooltip anchor="top middle" self="center middle">
                  Historial
                </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-card flat bordered>
    <q-card-section>
      <div class="row q-gutter-x-lg no-wrap justify-center q-py-xs">
        <div class="col-3">
          <div class="text-center text-grey-6 q-pb-xs">DATOS</div>
          <q-card flat bordered>
            <q-card-section>
              <q-input
                class="q-pb-xs"
                v-model="celClient"
                filled
                label="Telefono"
              >
                <template v-slot:append>
                  <q-icon name="search" @click="findUser" class="cursor-pointer" />
                </template>
              </q-input>
              <q-input class="q-pb-xs"
                v-model="nameClient"
                filled
                label="Cliente"
              />
              <q-input class="q-pb-xs"
                v-model="details"
                filled
                label="*Detalle (Obligatorio)"
                autogrow
              />
              <div class="row">
                <div class="col">
                  <q-input class="q-pb-xs"
                    v-model="nameNit"
                    filled
                    label="Razon Social"
                  />
                </div>
                <div class="col">
                  <q-input class="q-pb-xs q-ml-xs"
                    v-model="nit"
                    filled
                    label="NIT"
                  />
                </div>
              </div>
              <div>
                <q-input
                  id="image"
                  @input="val => { order_images = val[0] }"
                  filled
                  type="file"
                  hint="Imagen (Opcional)"
                />
                
              </div>
              <div class="q-mt-md">
                <q-btn class="q-mb-sm" :loading="loadSaveUser" @click="saveUsers" color="green" size="10px" icon="save" label="Guardar Usuario" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <div class="text-center text-grey-6 q-pb-xs">ORIGEN</div>
          <div class="row items-center">
            <div class="col-9">
              <q-input
                v-model="urlWpFrom"
                filled
                label="URL WhatsApp"
              >
                <template v-slot:append>
                  <q-icon name="search" @click="findMap('1')" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="col-3 q-gutter-sm text-right">
              <q-btn flat round icon="find_in_page" @click="findAddress('1')">
                <q-tooltip anchor="top middle" self="center middle">
                  Buscar dirección guardada
                </q-tooltip>
              </q-btn>
              <q-btn flat round icon="save" @click="saveAddress('1')">
                <q-tooltip anchor="top middle" self="center middle">
                  Guardar esta dirección
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          
          <q-input class="q-pb-xs"
            v-model="from_address"
            filled
            label="Recoger desde*"
            autogrow
          />
          <q-card flat bordered>
            <div style="width:100%; height:300px">
              <l-map
                ref="myMapFrom"
                style="z-index:0"
                :zoom="zoom"
                :center="from_center"
                :options="{zoomControl: false}"
                @click="updateMarkerFrom"
              >
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="from_center" ></l-marker>
              </l-map>
            </div>
          </q-card>
          <q-input
            v-model="searchFromAddress"
            filled
            dense
            label="Buscar una direccion"
            class="q-mt-xs"
            hint="Ejm: Calle dechia"
          >
            <template v-slot:append>
              <q-icon name="search" @click="searchAddressGeo('1')" class="cursor-pointer" />
            </template>
          </q-input>
          <div v-if="listFromAddress.length > 0">
            <ul>
              <li v-for="(item, index) in listFromAddress" :key="index" class="q-mb-xs">
                {{ item.label }}
                <q-btn flat color="primary" label="Seleccionar" @click="selectGeoAddress(item, '1')" />
              </li>
            </ul>
            <q-btn flat color="orange" label="Limpiar Lista" @click="listFromAddress = []" />
          </div>
        </div>
        <div class="col-4">
          <div class="text-center text-grey-6 q-pb-xs">DESTINO</div>
          <div class="row items-center">
            <div class="col-9">
              <q-input
                v-model="urlWpTo"
                filled
                label="URL WhatsApp"
              >
                <template v-slot:append>
                  <q-icon name="search" @click="findMap('2')" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="col-3 q-gutter-sm text-right">
              <q-btn flat round icon="find_in_page" @click="findAddress('2')">
                <q-tooltip anchor="top middle" self="center middle">
                  Buscar dirección guardada
                </q-tooltip>
              </q-btn>
              <q-btn flat round icon="save" @click="saveAddress('2')">
                <q-tooltip anchor="top middle" self="center middle">
                  Guardar esta dirección
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <q-input class="q-pb-xs"
            v-model="to_address"
            filled
            label="Entregar en*"
            autogrow
          />
          <q-card flat bordered>
            <div style="width:100%; height:300px">
              <l-map
                ref="myMapTo"
                style="z-index:0"
                :zoom="zoom"
                :center="to_center"
                :options="{zoomControl: false}"
                @click="updateMarkerTo"
              >
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="to_center" ></l-marker>
              </l-map>
            </div>
          </q-card>
          <q-input
            v-model="searchToAddress"
            filled
            dense
            label="Buscar una direccion"
            class="q-mt-xs"
            hint="Ejm: av grigota"
            @keyup.enter="searchAddressGeo('2')"
          >
            <template v-slot:append>
              <q-icon name="search" @click="searchAddressGeo('2')" class="cursor-pointer" />
            </template>
          </q-input>
          <div v-if="listToAddress.length > 0">
            <ul>
              <li v-for="(item, index) in listToAddress" :key="index" class="q-mb-xs">
                {{ item.label }}
                <q-btn flat color="primary" label="Seleccionar" @click="selectGeoAddress(item, '2')" />
              </li>
            </ul>
            <q-btn flat color="orange" label="Limpiar Lista" @click="listToAddress = []" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</q-page>
</template>
<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { db } from 'boot/firebase';
import { date } from 'quasar'
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { get } from 'http';

let  latlngDist  =  require('latlng-distance');

const provider = new OpenStreetMapProvider();

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: { "l-map": LMap, "l-tile-layer": LTileLayer, 'l-marker': LMarker },
  async mounted() {
    try {
      await this.getClientData();
    } catch (error) {
      console.log("Error al inicio")
    }
  },
  data() {
    return {
      loadMoreHistory: false,
      date: date,
      distanceText: 'Menor a 5KM',
      textAddressFilter: '',
      arrayFilterAddress: [],
      dialogSave: false,
      addressSave: '',
      dialogFind: false,
      history: false,
      celClient: '',
      urlWpFrom: '',
      nameClient: '',
      urlWpTo: '',
      order_images: null,
      details: '',
      nit: '',
      nameNit: '',
      from_address: '',
      from_center: [-17.783384, -63.18203],
      to_address: '',
      to_center: [-17.783384, -63.18203],
      selectRef: '',
      selectRefFind: '',     
      address_list: [],
      deliveryCost: 0,
      sendOrderMsg: {
        id: -1,
        color: 'bg-white',
        msg: "No hay pedido realizado",
        order: {}
      },

      loadDeliveryBtn: false,
      loadBtn: false,
      loadSaveUser: false,

      //CAMBIAR
      user_identifier: '',
      operator_token: '',
      access_token: '',
      collection_bd: '',

      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      searchToAddress: '',
      searchFromAddress: '',
      listToAddress: [],
      listFromAddress: [],

      start_from: 0,
      order_history: []
    }
  },
  methods: {
    async getClientData() {
      const URI = "https://patioserviceonline.com/usuarios-jugno/usuarios.php?name=" + this.$route.params.client;
      try {
        const res = await this.$axios.get(URI);
        if (res.data != '-1') {
          this.user_identifier = res.data.user_identifier;
          this.operator_token = res.data.operator_token;
          this.access_token = res.data.access_token;
          this.collection_bd = res.data.collection_bd;
          await this.getAddress();
        } else {
          this.$router.push({ path: `/error` })
        }
      } catch (error) {
        console.log("GET CLIENT", error);
      }
    },
    async getAddress() {
      try {
        // CAMBIAR
        const res = await db.collection(this.collection_bd).get();
        res.forEach(doc => {
          this.address_list.push(doc.data())
        })
        this.arrayFilterAddress = this.address_list;
      } catch (error) {
        console.log("FIREBASE ERROR ", error)
      }
    },
    selectGeoAddress(item, val) {
      if (val == '1') {
        this.from_center = [parseFloat(item.y), parseFloat(item.x)]
      } else {
        this.to_center = [parseFloat(item.y), parseFloat(item.x)]
      }
    },
    async searchAddressGeo(val) {
      if (val == '1') {
        this.listFromAddress = []
        const results = await provider.search({ query: this.searchFromAddress + ', santa cruz'});
        if (results.length > 0) {
          results.forEach(el => {
            this.listFromAddress.push(el)
          })
        } else {
          alert('No hay resultados para esta direccion')
        }
      } else {
        this.listToAddress = []
        const results = await provider.search({ query: this.searchToAddress + ', santa cruz' });
        if (results.length > 0) {
          results.forEach(el => {
            this.listToAddress.push(el)
          })
        } else {
          alert('No hay resultados para esta direccion')
        }
      }
    },
    openWindow(id) {
      window.open("https://patioserviceonline.com/sc/#/map/order/" + id);
    },
    updateMarkerFrom(latlng) {
       this.from_center = [latlng.latlng.lat, latlng.latlng.lng];
    },
    updateMarkerTo(latlng) {
       this.to_center = [latlng.latlng.lat, latlng.latlng.lng];
       this.medirDistancia();
    },
    findMap(val) {
      if (val == "1") {
        var prim = "https://maps.google.com/maps?q=";
        if (this.urlWpFrom.indexOf(prim) == 0) {
          var seg = "%2C";
          var ter= "&z=17&hl=es";
          var lat = this.urlWpFrom.substring(prim.length, this.urlWpFrom.indexOf(seg));
          var lng = this.urlWpFrom.substring(this.urlWpFrom.indexOf(seg) + seg.length, this.urlWpFrom.indexOf(ter));
          this.from_center = [parseFloat(lat), parseFloat(lng)];
        } else {
          alert("URL del mapa es invalido");
        }
      } else {
        var prim = "https://maps.google.com/maps?q=";
        if (this.urlWpTo.indexOf(prim) == 0) {
          var seg = "%2C";
          var ter= "&z=17&hl=es";
          var lat = this.urlWpTo.substring(prim.length, this.urlWpTo.indexOf(seg));
          var lng = this.urlWpTo.substring(this.urlWpTo.indexOf(seg) + seg.length, this.urlWpTo.indexOf(ter));
          this.to_center = [parseFloat(lat), parseFloat(lng)];
        } else {
          alert("URL del mapa es invalido");
        }
      }
    },
    async calculateDelivery() {
      this.deliveryCost = 0;
      this.loadDeliveryBtn = true;
      const URI = "https://prod-fatafat-new.jugnoo.in:4030/get_all_details?device_type=0&app_version=436&to_latitude=" + JSON.stringify(this.to_center[0]) + "&access_token=" + this.access_token + "&login_type=0&from_latitude=" + JSON.stringify(this.from_center[0]) + "&locale=es&operator_token=" + this.operator_token + "&to_longitude=" + JSON.stringify(this.to_center[1]) + "&customer_package_name=com.movapps.mav.patioservice&from_longitude=" + JSON.stringify(this.from_center[1])
      try {
        const res = await this.$axios.get(URI);
        if (res.data.delivery_charges) {
          this.deliveryCost = res.data.delivery_charges.estimated_charges;
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.log("Error al calcular el costo de envio: ", err)
      }
      this.loadDeliveryBtn = false;
    },
    async loadHistory(start) {
      if (start == 0) {
        this.start_from = 0;
        this.order_history = [];
      }
      this.loadMoreHistory = true;
      this.history = true;
      const URI = 'https://prod-autos-api.jugnoo.in/autos_integrated_order_history';
      const data = new URLSearchParams();
      data.append("access_token", this.access_token);
      data.append("customer_package_name", 'com.movapps.mav.patioservice');
      data.append("start_from", this.start_from);
      data.append("show_custom_fields", '1');
      data.append("operator_token", this.operator_token);
      data.append("app_version", '436');
      data.append("login_type", '0');
      data.append("device_type", '0');
      data.append("locale", 'es');

      try {
        const res = await this.$axios.post(URI, data);
        res.data.data.forEach(element => {
          this.order_history.push(element);
        })
        this.start_from += 10;
      } catch (error) {
        console.log("Error HISTORY", error);
      }
      this.loadMoreHistory = false;
    },
    async sendOrder() {
      this.loadBtn = true;
      const URI = "https://prod-fatafat-new.jugnoo.in:4030/place_order";
      var auxDetails = '';

      const data = new URLSearchParams();
      if (this.order_images) {
        data.append("order_images", this.order_images);
      }
      if (this.celClient != '') {
        auxDetails += '*CEL: ' + this.celClient + " ";
      }
      if (this.nameClient != '') {
        auxDetails += '*CLI: ' + this.nameClient + " ";
      }
      if (this.nameNit != '' || this.nit != '') {
        auxDetails += '*NIT: ' + this.nit + " - " + this.nameNit + " ";
      }
      auxDetails += "DET: " + this.details + ' ' + this.distanceText;
      data.append("details", auxDetails);
      data.append("from_address", this.from_address);
      data.append("from_latitude", JSON.stringify(this.from_center[0]));
      data.append("from_longitude", JSON.stringify(this.from_center[1]));
      data.append("payment_mode", "1");
      data.append("to_address", this.to_address);
      data.append("to_latitude", JSON.stringify(this.to_center[0]));
      data.append("to_longitude", JSON.stringify(this.to_center[1]));
      data.append("is_immediate", "1");
      data.append("user_identifier", this.user_identifier);
      data.append("app_version", "436");
      data.append("device_type", "0");
      data.append("login_type", "0");
      data.append("operator_token", this.operator_token);
      data.append("customer_package_name", "com.movapps.mav.patioservice");
      data.append("locale", "es");
      data.append("access_token", this.access_token);

      try {
        const res = await this.$axios.post(URI, data);
        if (res.data.order_id) {
          this.sendOrderMsg.id = res.data.order_id;
          this.sendOrderMsg.msg = res.data.message;
          this.sendOrderMsg.color = "bg-green-5";
          this.$store.commit('orderHistory/updateHistory', {
            order_id: res.data.order_id,
            details: this.details
          });
          this.clearInputs();
        } else {
          this.sendOrderMsg.id = "ERROR";
          this.sendOrderMsg.msg = res.data.message;
          this.sendOrderMsg.color = "bg-red-5";
        }
        
      } catch (error) {
        console.log("Error SEND ORDER", error);
      }
      this.loadBtn = false;
    },
    findAddress(val) {
      this.selectRefFind = val;
      this.dialogFind = true;
    },
    selectAddress(item) {
       if (this.selectRefFind == '1') {
        this.from_address = item.reference;
        this.from_center = [item.latlng.latitude, item.latlng.longitude];
      } else {
        this.to_address = item.reference;
        this.to_center = [item.latlng.latitude, item.latlng.longitude];
        this.medirDistancia();
      }
      this.filterAddress = '';
      this.dialogFind = false;
    },
    medirDistancia() {
      let dist = latlngDist.distanceDiffInKm(
        {
          lat: this.from_center[0],
          lon: this.from_center[1]
        },
        {
          lat: this.to_center[0],
          lon: this.to_center[1]
        },
      );
      if (dist >= 5.1) {
        this.confirmDistance();
        this.distanceText = 'MAYOR a 5KM';
      } else {
        this.distanceText = 'Menor a 5KM';
      }
    },
    confirmDistance () {
      this.$q.dialog({
        title: 'Distancias',
        message: 'La distancia entre punto y punto superan los <strong>5 KM</strong>, ¿Estas seguro de continuar? <span class="text-red">puede haber cargos adicionales</span>',
        html: true,
        cancel: {
          label: 'Elegir otra sucursal'
        },
        ok: {
          label: 'Si, estoy seguro',
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        //
      }).onCancel(() => {
        this.to_address = '';
        this.to_center = [-17.783384, -63.18203];
        this.findAddress('2')
      })
    },
    async saveAddressLocal() {
      this.$q.loading.show()
      var auxAddress = {};
      if (this.selectRef == '1') {
        auxAddress = {
          name: this.addressSave,
          reference: this.from_address,
          latlng: {
            latitude: this.from_center[0],
            longitude: this.from_center[1],
          }
        }
      } else if (this.selectRef == '2') {
        auxAddress = {
          name: this.addressSave,
          reference: this.to_address,
          latlng: {
            latitude: this.to_center[0],
            longitude: this.to_center[1]
          }
        }
      } else {
        return;
      }
      try {
        // CAMBIAR
        const res = await db.collection(this.collection_bd).add(auxAddress);
        if (res.id) {
          this.address_list.push(auxAddress);
          this.dialogSave = false;
          this.addressSave = '';
        }
      } catch (error) {
        console.log("ERROR SAVE ADDRESS ", error)
      }
      this.$q.loading.hide()
    },
    saveAddress(val) {
      this.selectRef = val;
      if (val == '1') {
        if (this.from_address != '') {
          this.dialogSave = true;
        }
      } else {
        if (this.to_address != '') {
          this.dialogSave = true;
        }
      }
    },
    clearInputs() {
      this.details = '';
      this.order_images = null;
      this.from_address = '';
      this.to_address = '';
      this.urlWpFrom = '';
      this.urlWpTo = '';
      this.celClient = '';
      this.nameClient = '';
      // document.getElementById("image").value = "";
    },
    async findUser() {
      this.$q.loading.show()
      if (this.celClient != '') {
        try {
          const docRef = await db.collection('users').doc(this.celClient);
          const doc = await docRef.get();
          if (doc.exists) {
            this.nameClient = doc.data().name;
            this.nit = doc.data().nit;
            this.nameNit = doc.data().nameNit;
            this.to_address = doc.data().address;
            this.to_center = [doc.data().coords.latitude, doc.data().coords.longitude]
            this.$q.notify({
              message: 'Datos Cargados',
              icon: 'check',
              color: 'green',
              position: 'top',
              timeout: 1000
            })
          } else {
            this.$q.notify({
              message: 'No existe el usuario',
              icon: 'close',
              color: 'negative',
              position: 'top',
              timeout: 1000
            })
          }

        } catch (error) {
          console.log("FIREBASE ERROR ", error)
        }
      }
      this.$q.loading.hide()
    },
    async saveUsers() {
      if (this.nameClient != '' && this.to_address != '' && this.celClient != '') {
        this.loadSaveUser = true;
        try {
          await db.collection('users').doc(this.celClient).set({
            name: this.nameClient,
            nit: this.nit,
            nameNit: this.nameNit,
            address: this.to_address,
            coords: {
              latitude: this.to_center[0],
              longitude: this.to_center[1]
            }
          })
          this.$q.notify({
            message: 'Usuario Guardado',
            icon: 'check',
            color: 'green',
            position: 'top',
            timeout: 1000
          })
        } catch (error) {
          console.log("FIREBASE ERROR SAVE ",error)
        }
        this.loadSaveUser = false;
      } else {
        alert('Los campos: Cliente, Telefono y direccion de entrega No pueden estar vacios')
      }
    }
  },
  computed: {
    // order_history: {
    //   get() {
    //     return this.$store.getters['orderHistory/getHistory'];
    //   }
    // },
    filterAddress: {
      get() {
        return this.textAddressFilter;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFilterAddress = this.address_list.filter(item => item.name.toLowerCase().indexOf(value) != -1);
        this.textAddressFilter = value;
      }
    }
    // address_list: {
    //   get() {
    //     return this.$store.getters['address/getList'];
    //   }
    // }
  }
}
</script>