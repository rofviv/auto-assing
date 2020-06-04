<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">CERRAR Y ABRIR RESTAURANTES</div>
    <div class="row">
      <div class="col-6">
        <q-input
          @input="val => { file = val[0] }"
          filled
          type="file"
          hint="Selecciona un excel"
        />
      </div>
      <div class="col-6">
        <q-btn color="green" @click="readXlsx">Cargar Archivo</q-btn>
      </div>
    </div>
    <q-separator class="q-my-md"></q-separator>
    <div class="row" :disabled="!isEnabled">
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <div class="text-h6">AUTOMATICO</div>
          </div>
          <div class="col-2 q-mb-sm">
             <q-input type="number" :disable="active" outlined v-model="time_refresh" label="Tiempo (min.)" />
          </div>
          <div class="col-2 q-mb-sm">
             <q-input type="number" :disable="active" outlined v-model="min_pedidos" label="Min. Pedidos" />
          </div>
          <div class="col-2 q-mb-sm">
             <q-input type="number" :disable="active" outlined v-model="max_pedidos" label="Max. Pedidos" />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle v-model="active" :disable="isClosing == true || isOpening == true" @input="change_mode" label="Activar" />
          </div>
          <div class="col-6">
            <q-chip>
              <q-avatar color="red" text-color="white">{{ cantOrdersTotal }}</q-avatar>Cerrado
            </q-chip>
            <q-chip>
              <q-avatar color="green" text-color="white">{{ cantOrderAssigned }}</q-avatar>Abierto
            </q-chip>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <template v-if="isClosing">
              <div>
                CERRANDO...
                <q-linear-progress color="red" indeterminate />
              </div>
            </template>
             <template v-if="isOpening">
               <div>
                ABRIENDO...
                <q-linear-progress color="green" indeterminate />
               </div>
             </template>
          </div>
        </div>
        <div class="row">
          <div class="col-11">

            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Historial AUTOMATICO</div>
              </q-card-section>

              <q-card-section>
                <q-scroll-area ref="scrollAreaMenus" style="height: 300px; max-width: 100%;">
                  <div v-for="(n, index) in arrayHistory" :key="index">
                    $ <span class="text-weight-light">{{ n }}</span>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <div class="text-h6">MANUALMENTE</div>
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            {{ texto }}
          </div>
          <div class="col-3">
              <q-btn color="green" :disable="disableBtn" @click="updateMerchant('open')">Abrir</q-btn>
          </div>
          <div class="col-3">
              <q-btn color="red" :disable="disableBtn" @click="updateMerchant('close')">Cerrar</q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-11">

            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Historial</div>
              </q-card-section>

              <q-card-section>
                <q-scroll-area ref="scrollAreaDelivery" style="height: 300px; max-width: 100%;">
                  <div v-for="(n, index) in arrayHistoryDelivery" :key="index">
                    $ <span class="text-weight-light">{{ n }}</span>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import XLSX from 'xlsx';
import moment from "moment";
var list = [];
export default {
  name: "AutoAssign",
  mounted() {
    this.change_mode();
  },
  data() {
    return {
      file: null,
      merchantList: [],
      texto: '',
      disableBtn: false,
      min_pedidos: 40,
      max_pedidos: 70,
      isClosed: false,
      isClosing: false,
      isOpening: false,
      isEnabled: false,


      arrayHistory: [],
      active: false,
      cantOrdersTotal: 0,
      cantOrderAssigned: 0,
      refresh_handler: null,
      time_refresh: 5,

      arrayHistoryDelivery: [],

      access_token: '5e26d40edd82f1035e8fe0d12e7304df'
    };
  },
  methods: {
    readXlsx() {
      if (this.file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var fileData = e.target.result;
        var workbook = XLSX.read(fileData, {type: 'binary'});
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
        list = data;
        alert("Se cargaron " + list.length + " valores.");
      }
      reader.onerror = function(ex) {
        console.log(ex);
      };
      reader.readAsBinaryString(this.file);
      this.isEnabled = true;
      } else {
        alert("SELECCIONA UN ARCHIVO");
      }
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
        this.texto = (index + 1) + " de " + array.length;
      }
    },
    async updateMerchant(type) {
      this.merchantList = list;
      if (this.merchantList.length > 0) {
        this.disableBtn = true;
        if (type == 'open') {
          this.arrayHistoryDelivery.push("Opcion ABRIR Restaurantes (" + moment().format('LTS') + ")");
          const start = async () => {
            await this.asyncForEach(this.merchantList, async element => {
              await this.updateHttpMerchant(element[0], 1);
            });
            this.arrayHistoryDelivery.push("Se abrio correctamente... (" + moment().format('LTS') + ")");
          }
          start();
        } else {
          this.arrayHistoryDelivery.push("Opcion CERRAR Restaurantes (" + moment().format('LTS') + ")");
          const start = async () => {
            await this.asyncForEach(this.merchantList, async element => {
              await this.updateHttpMerchant(element[0], 2);
            });
            this.arrayHistoryDelivery.push("Se cerro correctamente... (" + moment().format('LTS') + ")");
          }
          start();
        }
      } else {
        alert('DEBES CARGAR UN DOCUMENTO');
      }
    },
    async updateHttpMerchant(id, value) {
      const URI = "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
      try {
          let data = new URLSearchParams();
          data.append('remarks', 'Activate');
          data.append('restaurant_id', id);
          data.append('activation_status', value);
          data.append('user_email', 'patioservicedelivery@gmail.com');
          data.append('token', this.access_token);
          const res = await this.$axios({
            url: URI,
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: data
          });
          this.arrayHistoryDelivery.push("ID " + id + ": " + res.data.message + " (" + moment().format('LTS') + ")");
      } catch (error) {
        console.log("Update Merchant ", error);
      }
      this.disableBtn = false;
    },
    change_mode() {
      if (this.active) {
        this.getOrders();
        this.arrayHistory.push("Sistema Iniciado (" + moment().format('LTS') + ")");
      } else {
        clearTimeout(this.refresh_handler);
        this.arrayHistory.push("El Sistema esta DETENIDO (" + moment().format('LTS') + ")");
      }
    },
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
          this.getOrders();
          console.log('Refresh MENUS...');
      }, this.time_refresh * 60000);
    },
    async getOrders() {
      if (this.active) {
        console.log('FINDING ORDERS MENUS...');
        this.arrayHistory.push("Obteniendo lista de ordenes MENUS... (" + moment().format('LTS') + ")");
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI ="https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=" + this.access_token + "&secret=P7JlZXiRiIvSssQSSzqs&city=395&start_date=" + date + "&end_date=" + date + "&fetch_pending_orders=1&statusCopy=[object%20Object]&status=8&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=500&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= " + time;

        try {
          const res = await this.$axios.get(URI);
          this.cantOrdersTotal = await this.filterOrderUnasigned(res.data.aaData);
          this.calcularCantidad();
        } catch (error) {
          console.log("GET ORDERS MENUS PENDING ERROR: ", error);
        }
      }
      this.reset_timer();
    },
    filterOrderUnasigned(arrayOrder) {
      let cont = 0;

      for (let index = 0; index < arrayOrder.length; index++) {
        const status = arrayOrder[index][13].status;
        const restaurant_id = arrayOrder[index][13].restaurant_id;
        const order_id = arrayOrder[index][13].order_id;

        var text = arrayOrder[index][10];
        const value = arrayOrder[9];

        if (status != 0) {
          if (value == "-") {
            cont++;
          }
        }
      }
      return cont;
    },
    calcularCantidad() {
      if(this.cantOrdersTotal > this.max_pedidos && this.isClosed == false) {
        this.isClosed = true;
        this.updateMerchant('close');
        this.isclosing = true;
        this.active = false;
      } else if (this.cantOrdersTotal < this.min_pedidos && this.isClosed == true) {
        this.isClosed = false;
        this.updateMerchant('open');
        this.isOpening = true;
        this.active = false;
      }
    }
  }
};
</script>
