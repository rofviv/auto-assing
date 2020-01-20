<template>
<q-page class="q-pa-md">
  <q-dialog v-model="history">
    <q-card>
      <q-card-section>
        Haz click en la orden para visualizarlo en el mapa
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item clickable v-ripple @click="openWindow(item.order_id)" v-for="(item, index) in order_history" :key="index">
            <q-item-section>
              <q-item-label>Orden ID: {{ item.order_id }}</q-item-label>
              <q-item-label caption>{{ item.details }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogFind">
    <q-card>
      <q-card-section>
        Seleccionar una direccion guardada
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item clickable v-ripple @click="selectAddress(index)" v-for="(item, index) in address_list" :key="index">
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
            <q-btn flat round icon="history" @click="history = true">
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
                label="Detalle"
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
            label="Recoger desde"
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
            label="Entregar En"
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
        </div>
      </div>
    </q-card-section>
  </q-card>
</q-page>
</template>
<script>
import moment from "moment";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { get } from 'http';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: { "l-map": LMap, "l-tile-layer": LTileLayer, 'l-marker': LMarker },
  data() {
    return {
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
      // from_icon: L.icon({
      //   iconUrl: 'https://cdn.pixabay.com/photo/2014/04/03/10/31/marker-310760_960_720.png',
      //   shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
      //   iconSize:     [38, 95],
      //   shadowSize:   [50, 64], 
      //   iconAnchor:   [22, 94],
      //   shadowAnchor: [4, 62], 
      //   popupAnchor:  [-3, -76] 
      // }),      
      deliveryCost: 0,
      sendOrderMsg: {
        id: -1,
        color: 'bg-white',
        msg: "No hay pedido realizado",
        order: {}
      },

      loadDeliveryBtn: false,
      loadBtn: false,

      // user_identifier: 'f098ca9ec28803',
      // operator_token: 'ca3686de8b9cd13abcb362e09e494210',
      // access_token: '6b18cfcf58072251b111562f279f7e81a40c6817086478778df5275e00ed77ed',

      user_identifier: 'ff90ca93c18701',
      operator_token: 'ca3686de8b9cd13abcb362e09e494210',
      access_token: 'eace9570aa38e82929af176b77cee80b30f83081aacfd3149338c1081d7fdbff',

      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  methods: {
    openWindow(id) {
      window.open("https://patioserviceonline.com/sc/#/map/order/" + id);
    },
    updateMarkerFrom(latlng) {
       this.from_center = [latlng.latlng.lat, latlng.latlng.lng];
    },
    updateMarkerTo(latlng) {
       this.to_center = [latlng.latlng.lat, latlng.latlng.lng];
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
      auxDetails += "DET: " + this.details;
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
    selectAddress(index) {
      var auxAddress = this.$store.getters['address/getItem'](index);
      if (this.selectRefFind == '1') {
        this.from_address = auxAddress.reference;
        this.from_center = auxAddress.latlng;
      } else {
        this.to_address = auxAddress.reference;
        this.to_center = auxAddress.latlng;
      }
      this.dialogFind = false;
    },
    saveAddressLocal() {
      var auxAddress = {};
      if (this.selectRef == '1') {
        auxAddress = {
          name: this.addressSave,
          reference: this.from_address,
          latlng: this.from_center
        }
      } else if (this.selectRef == '2') {
        auxAddress = {
          name: this.addressSave,
          reference: this.to_address,
          latlng: this.to_center
        }
      } else {
        return;
      }
      this.$store.commit('address/updateList', auxAddress);
      this.dialogSave = false;
      this.addressSave = '';
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
      // document.getElementById("image").value = "";
    },
    async findUser() {
      if (this.celClient != '') {
        
      }
    }
  },
  computed: {
    order_history: {
      get() {
        return this.$store.getters['orderHistory/getHistory'];
      }
    },
    address_list: {
      get() {
        return this.$store.getters['address/getList'];
      }
    }
  }
}
</script>