<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="dialogItemDetails">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-h6">{{ itemSelected.item_name }}</div>
            </div>
            <div class="col">
              <div class="text-h6">Bs.{{ itemSelected.price }}</div>
            </div>
            <div>
              <q-btn size="sm" round color="primary" icon="add" @click="addCantItem" />
              <span class="text-h6 q-px-sm">{{ cantItem }}</span>
              <q-btn size="sm" round color="secondary" icon="remove" @click="removeCantItem"/>
            </div>
          </div>
        </q-card-section>

        <template v-if="itemSelected.customize_item">
          <q-card-section>
            <div v-for="(item, index) of customize_item" :key="index" class="q-my-xs">
              <q-select outlined v-model="item.option" :label="item.options.customize_item_name" :options="item.suboptions" option-value="customize_option_id" option-label="customize_option_name"/>
            </div>
          </q-card-section>
        </template>

        <q-card-actions align="right">
          <q-btn flat label="Añadir" color="primary" @click="addItem" v-close-popup />
          <q-btn flat label="Cancelar" color="negative" @click="listAdditional = []" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <template v-if="sendOrderOk">
      <div class="q-py-md">
        <q-banner rounded :class="`${sendOrderMsg.color} text-white`">
          ID Orden: {{ sendOrderMsg.id }} <br />
          {{ sendOrderMsg.msg }}
          <template v-slot:action>
            <q-btn flat color="white" icon="file_copy" />
          </template>
        </q-banner>
      </div>
    </template>

    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-model="expanded"
        icon="perm_identity"
        label="Informacion del pedido"
        caption="Datos"
      >
        <div class="row q-gutter-x-md no-wrap justify-center q-py-sm">
          <div class="col-3">
            <q-card flat bordered>
              <q-card-section>
                <div class="row">
                  <div class="col">
                    <q-input class="q-pb-xs"
                      v-model="nameClient"
                      filled
                      label="Cliente"
                    />
                  </div>
                  <div class="col">
                    <q-input class="q-pb-xs q-ml-xs"
                      v-model="celClient"
                      filled
                      label="Celular"
                    />
                  </div>
                </div>
                <q-input class="q-pb-xs"
                  v-model="dataClient"
                  filled
                  label="Direccion"
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
                <q-input
                  v-model="urlWp"
                  filled
                  label="URL WhatsApp"
                >
                <template v-slot:append>
                  <q-icon name="search" @click="findMap" class="cursor-pointer" />
                </template>
              </q-input>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered>
                <div style="width:100%; height:370px">
                  <l-map
                    ref="myMap"
                    style="z-index:0"
                    :zoom="zoom"
                    :center="center"
                    :options="{zoomControl: false}"
                    @click="updateMarker"
                  >
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker :lat-lng="center"></l-marker>
                  </l-map>
                </div>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered>
              <q-card-section>
                <q-scroll-area style="height: 300px; max-width: 100%;">
                  <template v-if="arrayCart.length != 0">
                    <div class="text-right">
                      <q-btn size="8px" flat round icon="file_copy" />
                    </div>
                    <q-list>
                      <q-item v-for="(item, index) of arrayCart" :key="index">
                        <q-item-section>
                          <q-item-label>{{ item.cant }}x {{ item.name }}</q-item-label>
                          <q-item-label caption lines="2">{{ item.extra }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                          <q-item-label caption>Bs.{{ item.price }}</q-item-label>
                          <q-item-label caption> <q-btn size="8px" dark flat round color="red" icon="close" @click="removeItemCart(index)" /> </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                      <div class="text-right q-pr-lg">
                        <span class="text-subtitle1">Pedido: {{ priceOrder }}</span><br>
                        <span class="text-subtitle1">Delivery: {{ priceDelivery }}</span><br>
                        <span class="text-h6">Total: {{ priceOrder + priceDelivery }}</span>
                      </div>
                    </q-list>
                  </template>
                  <template v-else>
                    <div class="text-center q-pr-lg">
                      <span class="text-h6">Carrito Vacio</span>
                    </div>
                  </template>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions vertical>
                  <q-btn class="q-mb-sm" :loading="loadDeliveryBtn" :disable="cart.length == 0" color="primary" size="10px" @click="calculateDelivery">Calcular Costo del envío</q-btn>
                  <q-input
                    v-model="comment"
                    filled
                    label="Comentario"
                  />
                  <q-btn :loading="loadBtn" :disable="cart.length == 0" color="green" size="10px" @click="sendOrder">Finalizar Pedido</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-expansion-item>
    </q-list>
    <p></p>
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-3 q-gutter-y-sm">
            <div class="row q-col-gutter-sm q-gutter-y-sm" >
              <div class="col-10" >
                <q-input outlined label="Buscar Restaurante" v-model="filterMerchant" :dense="true">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-2" >
                <q-btn round icon="autorenew" @click="getMerchants" />
              </div>
            </div>
            <q-scroll-area style="height: 500px; max-width: 100%;">
              <template v-if="listMerchant == 0">
                <div class="justify-center">
                  <q-circular-progress
                    indeterminate
                    size="50px"
                    color="primary"
                    class="q-ma-md"
                  />
                </div>
              </template>
              <template v-else>
                <q-list bordered separator>
                  <q-item :disable="cart.length > 0 || n[6] != 1" clickable v-ripple v-for="(n, index) of listFilterMerchant" :key="index" @click="getMenuMerchant(index)">
                    <q-item-section>
                      <q-item-label>{{ n[1] }}</q-item-label>
                      <template v-if="n[6] == 1">
                        <q-item-label caption>Abierto</q-item-label>
                      </template>
                      <template v-else-if="n[6] == 2">
                        <q-item-label caption>Cerrado</q-item-label>
                      </template>
                      <template v-else>
                        <q-item-label caption>Listing</q-item-label>
                      </template>
                    </q-item-section>
                  </q-item>
                </q-list> 
              </template>
            </q-scroll-area>
          </div>
          <div class="col-9 q-gutter-y-sm">
            <div class="row q-col-gutter-sm q-gutter-y-sm" >
              <div class="col-6" >
                <q-select :dense="true" outlined v-model="category" :options="optionsCategory" label="Categorias" @input="loadItemsFromCategory"/>

              </div>
              <div class="col-6">
                <q-input outlined label="Buscar Producto" v-model="filterMenu" :dense="true">

                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>

                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-card flat bordered style="width:100%; height: 500px;">
                  <template v-if="loadMenu">
                    <div class="justify-center">
                      <q-circular-progress
                        indeterminate
                        size="50px"
                        color="primary"
                        class="q-ma-md"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <q-scroll-area style="height: 500px; max-width: 100%;">
                      <q-card-section>
                        <div class="row q-gutter-sm">
                          <q-card v-for="(item, index) in arrayFilterItems" :key="index"
                          class="card-items" >
                            <q-card-section class="bg-primary text-white">
                              <div class="text-caption text-right">Bs.{{ item.price }}</div>
                              <div class="text-body1 text-center">{{ item.item_name }}</div>
                              <div class="text-caption text-weight-light">{{ item.item_details }}</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-actions align="right">
                              <q-btn size="sm" @click="loadDetailsItem(item)" flat>Agregar</q-btn>
                            </q-card-actions>
                          </q-card>
                        </div>
                      </q-card-section>
                    </q-scroll-area>
                  </template>
                </q-card>
              </div>
            </div>
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

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: "CallCenter",
  components: { "l-map": LMap, "l-tile-layer": LTileLayer, 'l-marker': LMarker },
  mounted() {
    this.getMerchants();
  },
  data() {
    return {
      textFilter: '',
      listFilterMerchant: [],
      expanded: true,
      urlWp: '',
      dataClient: '',
      nameClient: '',
      celClient: '',
      nameNit: '',
      nit: '',
      cantItem: 1,
      listAdditional: [],
      dialogItemDetails: false,
      listMerchant: [],
      category: null,
      optionsCategory: [],
      arrayTodoMenu: [],
      arrayItems: [],
      arrayFilterItems: [],
      textMenuFilter: '',
      itemSelected: {},
      comment: '',
      arrayCart: [],
      access_token_client: "6b18cfcf58072251b111562f279f7e81a40c6817086478778df5275e00ed77ed",
      client_id: "DC311uhPSZV6tKjT",
      operator_token: "ca3686de8b9cd13abcb362e09e494210",
      restaurant_id: -1,
      cart: [],
      priceOrder: 0,
      priceDelivery: 0,
      loadMenu: false,
      loadBtn: false,
      loadDeliveryBtn: false,
      sendOrderOk: false,
      sendOrderMsg: {
        id: -1,
        color: 'bg-green-5',
        msg: "Mensaje",
        order: {}
      },

      customize_item: [],

      zoom: 13,
      center: [-17.783384, -63.18203],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  methods: {
    async updateMarker(latlng) {
       this.center = [latlng.latlng.lat, latlng.latlng.lng];
    },
    async getMerchants() {
      this.listMerchant = [];
      const time = Date.now();
      const cantMaxMerchant = 400;
      const URI = "https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurants?token=b3de8bde6886e4695cbf5f23fcc363fa&secret=P7JlZXiRiIvSssQSSzqs&city=395&sEcho=1&iColumns=11&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength="+ cantMaxMerchant +"&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;
      try {
        const res = await this.$axios.get(URI);
        this.filterMerchantActivated(res.data.aaData);
        
      } catch (error) {
        console.log("GET MERCHANTS ERROR: " + error);
      }
    },
    filterMerchantActivated(arrayMerchant) {
      for (let index = 0; index < arrayMerchant.length; index++) {
        const status = arrayMerchant[index][6];
        if (status != 0) {
          this.listMerchant.push(arrayMerchant[index]);
        }
      }
      this.listFilterMerchant = this.listMerchant;
    },
    async getMenuMerchant(index) {
      this.loadMenu = true;
      const URI = "https://prod-fresh-api.jugnoo.in:4040/v2/restaurant_menu"
      this.restaurant_id = this.listFilterMerchant[index][0];
      const latitude = this.center[0];
      const longitude = this.center[1];
      const data = "access_token=" + this.access_token_client + "&app_version=435&client_id=" + this.client_id + "&customer_package_name=production.patioservice.customer&device_type=0&integrated=1&latitude=" +  JSON.stringify(latitude) + "&locale=es&login_type=0&longitude=" +  JSON.stringify(longitude) + "&operator_token=" + this.operator_token + "&restaurant_id=" + this.restaurant_id;

      try {
        const res = await this.$axios({
          url: URI,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: data
        });

        this.arrayTodoMenu = res.data.categories;
        this.optionsCategory = [];
        for (let index = 0; index < this.arrayTodoMenu.length; index++) {
          const element = this.arrayTodoMenu[index].category_name;
          this.optionsCategory.push(element);
        }
        this.category = this.optionsCategory[0];
        this.loadItemsFromCategory();
        this.loadMenu = false;
      } catch (error) {
        console.log("GET MENU MERCHANT ERROR: " + error)
      }
    },
    loadItemsFromCategory() {
      var pos = this.arrayTodoMenu.map((e) => {
        return e.category_name;
      }).indexOf(this.category);
      
      this.arrayItems = this.arrayTodoMenu[pos].items;
      this.arrayFilterItems = this.arrayItems;
    },
    loadDetailsItem(item) {
      this.itemSelected = item;
      this.customize_item = [];
      if (this.itemSelected.customize_item) {
        for (let index = 0; index < this.itemSelected.customize_item.length; index++) {
          this.customize_item.push({
            option:null,
            options: this.itemSelected.customize_item[index],
            suboptions: this.itemSelected.customize_item[index].customize_options
          }); 
        }
      }
      this.dialogItemDetails = true;
    },
    addItem() {
      this.listCustomisations = [];
      var guarniciones = "";
      var price_guarniciones = 0;
      this.customize_item.forEach(element => {
        if (element.option) {
          this.listCustomisations.push({
            id: element.options.customize_id,
            options: [{
              id: element.option.customize_option_id
            }]
          })
          guarniciones += element.option.customize_option_name + ", ";
          price_guarniciones += element.option.customize_price;
        }
      });
      const itemCart = {
        cant: this.cantItem,
        name: this.itemSelected.item_name,
        extra: guarniciones,
        price: (this.cantItem * this.itemSelected.price) + (this.cantItem * price_guarniciones)
      }
      this.priceOrder += itemCart.price;
      this.arrayCart.push(itemCart);
      
      if (this.listCustomisations.length > 0) {
        this.cart.push({
          item_id: this.itemSelected.restaurant_item_id,
          quantity: this.cantItem,
          customisations: this.listCustomisations
        });
      } else {
        this.cart.push({
          item_id: this.itemSelected.restaurant_item_id,
          quantity: this.cantItem
        });
      }

      this.cantItem = 1;
      this.listAdditional = []
    },
    addCantItem() {
      this.cantItem++;

    }, 
    removeCantItem() {
      if (this.cantItem > 1) {
        this.cantItem--;
      }
    },
    findMap() {
      var prim = "https://maps.google.com/maps?q=";
      if (this.urlWp.indexOf(prim) == 0) {
        var seg = "%2C";
        var ter= "&z=17&hl=es";
        var lat = this.urlWp.substring(prim.length, this.urlWp.indexOf(seg));
        var lng = this.urlWp.substring(this.urlWp.indexOf(seg) + seg.length, this.urlWp.indexOf(ter));
        this.center = [parseFloat(lat), parseFloat(lng)];
      } else {
        alert("URL del mapa es invalido");
      }
    },
    removeItemCart(index) {
      var discount = this.arrayCart[index].price;
      this.arrayCart.splice(index, 1);
      this.cart.splice(index, 1);
      this.priceOrder -= discount;
    },
    async sendOrder() {
      this.loadBtn = true;
      const URI = "https://prod-fresh-api.jugnoo.in:4040/place_order";

      const app_version = "436";
      const customer_package_name = "com.movapps.mav.patioservice"
      const delivery_address = "CLIENTE: " + this.nameClient + " CELULAR: " + this.celClient + " DIRECCION: " + this.dataClient + " NIT: " + this.nit + " - " + this.nameNit + " COMENTARIO: " + this.comment;
      const delivery_address_id = "1441945";
      const delivery_address_type = "Home";
      const device_type = "0";
      const integrated = "1";
      const locale = "es";
      const login_type = "0";
      const payment_mode = "1";

      const lat = JSON.stringify(this.center[0]);
      const lng = JSON.stringify(this.center[1]);

      const data = new URLSearchParams();
      data.append("access_token", this.access_token_client);
      data.append("app_version", app_version);
      data.append("cart", JSON.stringify(this.cart));
      data.append("client_id", this.client_id);
      data.append("customer_package_name", customer_package_name);
      data.append("delivery_address", delivery_address);
      data.append("delivery_address_id", delivery_address_id);
      data.append("delivery_address_type", delivery_address_type);
      data.append("delivery_latitude", lat);
      data.append("delivery_longitude", lng);
      data.append("delivery_notes", this.comment);
      data.append("device_type", device_type);
      data.append("integrated", integrated);
      data.append("latitude", lat);
      data.append("locale", locale);
      data.append("login_type", login_type);
      data.append("longitude", lng);
      data.append("menu_latitude", lat);
      data.append("menu_longitude", lng);
      data.append("operator_token", this.operator_token);
      data.append("payment_mode", payment_mode);
      data.append("restaurant_id", this.restaurant_id);

      try {
        const res = await this.$axios.post(URI, data);

        console.log(res);
        if (res.data.order_id) {
          this.cart = [];
          this.arrayCart = [];
          this.priceOrder = 0;
          this.priceDelivery = 0;
          this.nameClient = "";
          this.celClient = "";
          this.nit = "";
          this.nameNit = "";
          this.dataClient = "";
          this.urlWp = "";
          this.comment = "";

          this.sendOrderMsg.id = res.data.order_id;
          this.sendOrderMsg.msg = "Pedido generado con éxito";
          this.sendOrderMsg.color = "bg-green-5";
        } else {
          this.sendOrderMsg.id = "ERROR";
          this.sendOrderMsg.msg = res.data.message;
          this.sendOrderMsg.color = "bg-red-5";
        }
      } catch (error) {
        console.log("ERROR SEND ORDER: " + error);
        this.sendOrderMsg.id = "ERROR"
        this.sendOrderMsg.msg = "Ocurrio un error"
        this.sendOrderMsg.color = "bg-red-5"
      }
      this.loadBtn = false;
      this.sendOrderOk = true;
    },
    async calculateDelivery() {
      this.loadDeliveryBtn = true;
      const URI = "https://prod-fresh-api.jugnoo.in:4040/user_checkout_data";
      
      const app_version = "436"
      const customer_package_name = "com.movapps.mav.patioservice"
      const device_type = "0"
      const integrated = "1"
      const locale = "es"
      const login_type = "0"
      const restaurant_data = {"": ""};

      const lat = JSON.stringify(this.center[0]);
      const lng = JSON.stringify(this.center[1]);

      const data = new URLSearchParams();
      data.append("access_token", this.access_token_client);
      data.append("app_version", app_version);
      data.append("cart", JSON.stringify(this.cart));
      data.append("client_id", this.client_id);
      data.append("current_latitude", lat);
      data.append("current_longitude", lng);
      data.append("customer_package_name", customer_package_name);
      data.append("device_type", device_type);
      data.append("integrated", integrated);
      data.append("latitude", lat);
      data.append("locale", locale);
      data.append("login_type", login_type);
      data.append("longitude", lng);
      data.append("operator_token", this.operator_token);
      data.append("order_amount", this.priceOrder + "");
      data.append("restaurant_data", JSON.stringify(restaurant_data));
      data.append("restaurant_id", this.restaurant_id);

      try {
        const res = await this.$axios.post(URI, data);

        // console.log(res.data);
        if (res.data.charges) {
          this.priceDelivery = res.data.charges[2].value;
        } else {
          alert("No se puede calcular el costo de envio, quiza este fuera de cobertura");
        }
      } catch (error) {
        console.log("ERROR CALCULATE DELIVERY: " + error);
      }

      this.loadDeliveryBtn = false;
    }
  },
  computed: {
    filterMerchant: {
      get(){
        return this.textFilter;
      },
      set(value) {
        value = value.toLowerCase();
        this.listFilterMerchant = this.listMerchant.filter(rest => rest[1].toLowerCase().indexOf(value) != -1);
        this.textFilter = value;
      }
    },
    filterMenu: {
      get() {
        return this.textMenuFilter;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFilterItems = this.arrayItems.filter(item => item.item_name.toLowerCase().indexOf(value) != -1);
        this.textMenuFilter = value;
      }
    }
  },
};
</script>

<style>
  .card-items {
    width: 200px !important;
    max-width: 200px !important;
  };
</style>