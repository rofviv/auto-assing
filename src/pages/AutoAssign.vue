<template>
  <q-page class="q-pa-md">
    <q-select v-model="citySelect" option-label="city" emit-value
        map-options option-value="id" @input="cambiarCiudad" :options="cityOptions" label="Ciudad" ></q-select>
    <q-separator class="q-my-md"></q-separator>
    <div class="row">
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <div class="text-h6">MENUS</div>
          </div>
          <div class="col-2 q-mb-sm">
             <q-input type="number" @input="validateNumber" outlined v-model="time_refresh" label="Tiempo (Seg.)" />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle v-model="active" @input="change_mode" label="Auto Asignar" />
          </div>
          <div class="col-6">
            <q-chip>
              <q-avatar color="blue" text-color="white">{{ cantOrdersTotal }}</q-avatar>Pedidos
            </q-chip>
            <q-chip>
              <q-avatar color="green" text-color="white">{{ cantOrderAssigned }}</q-avatar>Auto Asignados
            </q-chip>
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle v-model="activeAccept" @input="change_mode_accept" label="Aceptar" />
          </div>
          <div class="col-3">
            <q-chip>
              <q-avatar color="orange" text-color="white">{{ cantOrderAccept }}</q-avatar>Aceptados
            </q-chip>
          </div>
          <!-- <div class="col-2">
             <q-input type="number" outlined v-model="time_refresh_accept" label="Aceptar (Min.)" />
          </div> -->
        </div>
        <div class="row">
          <div class="col-11">

            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Historial MENUS y ACCEPT</div>
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
            <div class="text-h6">DELIVERY</div>
          </div>
          <div class="col-2 q-mb-sm">
            <q-input type="number" @input="validateNumberDelivery" outlined v-model="time_refresh_delivery" label="Tiempo (Seg.)" />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle v-model="activeDelivery" @input="change_mode_delivery" label="Auto Asignar" />
          </div>
          <div class="col-6">
            <q-chip>
              <q-avatar color="blue" text-color="white">{{ cantOrdersTotalDelivery }}</q-avatar>Pedidos
            </q-chip>
            <q-chip>
              <q-avatar color="green" text-color="white">{{ cantOrderAssignedDelivery }}</q-avatar>Auto Asignados
            </q-chip>
          </div>
        </div>
        <div class="row">
          <div class="col-11">

            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Historial DELIVERY</div>
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
import moment from "moment";
import { LocalStorage } from 'quasar'

export default {
  name: "AutoAssign",
  mounted() {
    this.cargarCiudad();
    this.change_mode();
    this.change_mode_accept();
    this.change_mode_delivery();
  },
  data() {
    return {
      arrayHistory: [],
      active: false,
      cantOrdersTotal: 0,
      cantOrderAssigned: 0,
      refresh_handler: null,
      time_refresh: 30,

      arrayHistoryDelivery: [],
      activeDelivery: false,
      cantOrdersTotalDelivery: 0,
      cantOrderAssignedDelivery: 0,
      refresh_handler_delivery: null,
      time_refresh_delivery: 30,

      time_refresh_accept: 1,
      activeAccept: false,
      cantOrderAccept: 0,
      refresh_handler_accept: false,

      access_token: '5e26d40edd82f1035e8fe0d12e7304df',

      citySelect: 395,
      cityOptions: [
        { city: "Santa Cruz", id: 395 },
        { city: "Cochabamba", id: 704 },
        { city: "La Paz", id: 818 },
        { city: "Tarija", id: 859 }
      ],
    };
  },
  methods: {
    cargarCiudad() {
      this.citySelect = LocalStorage.getItem('ciudad') || 395;
    },
    cambiarCiudad() {
      switch (this.citySelect) {
        case 395:
          LocalStorage.set('ciudad', this.citySelect);
          LocalStorage.set('center', [-17.783384, -63.18203]);
          break;
        case 704:
          LocalStorage.set('ciudad', this.citySelect);
          LocalStorage.set('center', [-17.393868, -66.157481]);
          break;
        case 818:
          LocalStorage.set('ciudad', this.citySelect);
          LocalStorage.set('center', [-16.505147, -68.129631]);
          break;
        case 859:
          LocalStorage.set('ciudad', this.citySelect);
          LocalStorage.set('center', [-21.533739, -64.733768]);
          break;
      }
      location.reload();
    },
    validateNumber() {
      if (this.time_refresh < 1 || this.time_refresh == '' || this.time_refresh == null) {
        this.time_refresh = 15
      }
    },
    validateNumberDelivery() {
      if (this.time_refresh_delivery < 1 || this.time_refresh_delivery == '' || this.time_refresh_delivery == null) {
        this.time_refresh_delivery = 15
      }
    },
    change_mode() {
      if (this.active) {
        this.getOrders();
        this.arrayHistory.push("El sistema MENUS esta ACTIVADO (" + moment().format('LTS') + ")");
      } else {
        clearTimeout(this.refresh_handler);
        this.arrayHistory.push("El Sistema MENUS esta DETENIDO (" + moment().format('LTS') + ")");
      }
    },
    change_mode_accept() {
      if (this.activeAccept) {
        this.getOrdersAccept();
        this.arrayHistory.push("El sistema ACEPTAR esta ACTIVADO (" + moment().format('LTS') + ")");
      } else {
        clearTimeout(this.refresh_handler_accept);
        this.arrayHistory.push("El Sistema ACEPTAR esta DETENIDO (" + moment().format('LTS') + ")");
      }
    },
    change_mode_delivery() {
      if (this.activeDelivery) {
        this.getOrdersDelivery();
        this.arrayHistoryDelivery.push("El sistema DELIVERY esta ACTIVADO (" + moment().format('LTS') + ")");
      } else {
        clearTimeout(this.refresh_handler_delivery);
        this.arrayHistoryDelivery.push("El Sistema DELIVERY esta DETENIDO (" + moment().format('LTS') + ")");
      }
    },
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
          this.getOrders();
          console.log('Refresh MENUS...');
      }, this.time_refresh * 1000);
    },
    reset_timer_accept() {
      clearTimeout(this.refresh_handler_accept);
      this.refresh_handler_accept = setTimeout(() => {
          this.getOrdersAccept();
          console.log('Refresh ACCEPT...');
      }, this.time_refresh_accept * 60000);
    },
    reset_timer_delivery() {
      clearTimeout(this.refresh_handler_delivery);
      this.refresh_handler_delivery = setTimeout(() => {
          this.getOrdersDelivery();
          console.log('Refresh DELIVERY...');
      }, this.time_refresh_delivery * 1000);
    },
    async getOrdersDelivery() {
      // GET ORDERS DELIVERY
      if (this.activeDelivery) {
        console.log('FINDING ORDERS DELIVERY...');
        this.arrayHistoryDelivery.push("Obteniendo lista de ordenes DELIVERY... (" + moment().format('LTS') + ")");
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=" + this.access_token + "&secret=P7JlZXiRiIvSssQSSzqs&city_id=" + this.citySelect + "&start_date=" + date + "&end_date=" + date + "&fetch_active_orders=1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" + time;

        try {
          const res = await this.$axios.get(URI);
          // console.log(res.data.aaData);
          this.filterOrderDelivery(res.data.aaData);
        } catch (error) {
          console.log("GET ORDERS DELIVERY PENDING ERROR: " + error);
        }
      }
      this.reset_timer_delivery();
    },
    async getOrdersAccept() {
      if (this.activeAccept) {
        console.log('FINDING ORDERS ACCEPT...');
        this.arrayHistory.push("Obteniendo lista de ordenes para ACEPTAR... (" + moment().format('LTS') + ")");
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI ="https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=" + this.access_token + "&secret=P7JlZXiRiIvSssQSSzqs&city=" + this.citySelect + "&start_date=" + date + "&end_date=" + date + "&fetch_pending_orders=1&statusCopy=[object%20Object]&status=0,1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= " + time;
        try {
          const res = await this.$axios.get(URI);
          // console.log(res.data.aaData);
          this.filterOrderAccept(res.data.aaData);
        } catch (error) {
          console.log("GET ORDERS ACCEPT ERROR: ", error);
        }
      }
      this.reset_timer_accept();
    },
    async getOrders() {
      if (this.active) {
        console.log('FINDING ORDERS MENUS...');
        this.arrayHistory.push("Obteniendo lista de ordenes MENUS... (" + moment().format('LTS') + ")");
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI ="https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=" + this.access_token + "&secret=P7JlZXiRiIvSssQSSzqs&city=" + this.citySelect + "&start_date=" + date + "&end_date=" + date + "&fetch_pending_orders=1&statusCopy=[object%20Object]&status=8&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=500&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= " + time;

        try {
          const res = await this.$axios.get(URI);
          this.filterOrderUnasigned(res.data.aaData);
        } catch (error) {
          console.log("GET ORDERS MENUS PENDING ERROR: ", error);
        }
      }
      this.reset_timer();
    },
    filterOrderDelivery(arrayOrder) {
      this.cantOrdersTotalDelivery = arrayOrder.length;

      for (let index = 0; index < arrayOrder.length; index++) {
        const status = arrayOrder[index].status;
        const order_id = arrayOrder[index].dodo_delivery_id;
        const id = arrayOrder[index].order_id;

        if (status == 0) {
          this.getDeliveryStatus(order_id, id);
        }
      }
    },
    filterOrderAccept(arrayOrder) {
      for (let index = 0; index < arrayOrder.length; index++) {
        const status = arrayOrder[index][13].status;

        if (status == 0) {
          const restaurant_id = arrayOrder[index][13].restaurant_id;
          const order_id = arrayOrder[index][13].order_id;
          const user_id = arrayOrder[index][13].user_id;

          const strTimeCreate = arrayOrder[index][7].split('<br/>')[0];
          const strDateCreate = arrayOrder[index][7].split('<br/>')[1];
          const month = strDateCreate.split('-')[1];
          const auxDate = strDateCreate.split('-')[0];
          const date = strDateCreate.split('-')[0].substring(0, auxDate.length - 2);

          const year = strDateCreate.split('-')[2];
          const hour = strTimeCreate.split(':')[1].split(' ')[1] == "PM" && strTimeCreate.split(':')[0] != "12" ? (strTimeCreate.split(':')[0] * 1) + 12 : strTimeCreate.split(':')[0];
          const min = strTimeCreate.split(':')[1].split(' ')[0];
          const str = month + " " +  date + ", " + year + " " + hour + ":" + min + ":00";
          const milliDateCreated = new Date(str).getTime();

          const dateNow = Date.now();
          const minDifer = moment(dateNow - milliDateCreated).format('mm');

          if (minDifer >= 5) {
            this.acceptOrder(order_id, restaurant_id, user_id);
          }
        }
      }
    },
    async acceptOrder(order_id, restaurant_id, user_id) {
      const URI = "https://prod-fresh-api.jugnoo.in:4040/web/accept_order";
      const data = "token=" + this.access_token + "&order_id=" + order_id + "&restaurant_id=" + restaurant_id 
      + "&user_id=" + user_id + "&force_token=1&refund_customer=0&reason=";

      try {
        const res = await this.$axios({
          url: URI,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: data
        });

        this.arrayHistory.push("ORDER_ID: " + order_id + " ACEPTADO correctamente! (" + moment().format('LTS') + ")");
        this.cantOrderAccept++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: ", error);
        this.arrayHistory.push("ORDER_ID: " + order_id + " NO SE PUDO ACEPTAR (" + moment().format('LTS') + ")");
      }
    },
    filterOrderUnasigned(arrayOrder) {
      // GET ORDERS UNASSIGNED MENUS
      this.cantOrdersTotal = arrayOrder.length;

      for (let index = 0; index < arrayOrder.length; index++) {
        const status = arrayOrder[index][13].status;
        const restaurant_id = arrayOrder[index][13].restaurant_id;
        const order_id = arrayOrder[index][13].order_id;

        var text = arrayOrder[index][10];
        // const value = text.substring(text.length - 10, text.length);
        const value = arrayOrder[index][9];

        if (status != 0) {
          // if (value == "UNASSIGNED") {
          //   this.getDeliveryID(order_id, restaurant_id);
          // }
          
          if (value == "-") {
            this.getDeliveryID(order_id, restaurant_id);
          }
        }
      }
    },
    async getDeliveryStatus(order_id, id) {
      this.arrayHistoryDelivery.push("Verificando para Auto Asignar Orden ID " + id + " DELIVERY ID " + order_id + " (" + moment().format('LTS') + ")");
      const URI = "https://dodo.jugnoo.in:8024/get_complete_task_details";
      const data = "access_token=" + this.access_token + "&order_id=" + order_id;
      
      try {
        const res = await this.$axios({
          url: URI,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: data
        });
        if (res.data.data.status == 6) {
          this.arrayHistoryDelivery.push("Auto Asignando Orden ID " + id + " DELIVERY ID " + order_id + " (" + moment().format('LTS') + ")");
          this.autoAssignDelivery(order_id);
        } else {
          this.arrayHistoryDelivery.push("No necesita Auto Asignar Orden ID " + id + " DELIVERY ID " + order_id + " (" + moment().format('LTS') + ")");
        }
      } catch (error) {
        
      }
    },
    async getDeliveryID(order_id, restaurant_id) {
      // GET REFERENCE  O DELIVERY ID
      const URI = "https://prod-fresh-api.jugnoo.in:4040/order_details";
      const data = "token=" + this.access_token + "&order_id=" + order_id + "&restaurant_id=" + restaurant_id;
      try {
        const res = await this.$axios({
          url: URI,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: data
        });

        // console.log(res);
        const delivery_id = res.data.order_info[0].delivery_id;
        this.arrayHistory.push("Auto Asignando ORDER_ID: " + order_id + " RESTAURANT_ID: " + restaurant_id + " DELIVERY_ID: " + delivery_id + "... (" + moment().format('LTS') + ")");
        this.autoAssignMenus(delivery_id);
      } catch (error) {
        console.log("GET DELIVERY ID ERROR: " + error)
      }
    },
    async autoAssignDelivery(order_id) {
      const URI = "https://dodo.jugnoo.in:8024/assign_driver";

      try {
        const res = await this.$axios.post(URI, {
          "access_token": this.access_token,
          "order_id": order_id,
          "user_id": null
        });

        // console.log(res);
        this.arrayHistoryDelivery.push("DELIVERY_ID: " + order_id + " Auto Asignado con exito! (" + moment().format('LTS') + ")");
        this.cantOrderAssignedDelivery++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: " + error);
        this.arrayHistoryDelivery.push("DELIVERY_ID: " + order_id + " NO SE PUDO AUTO ASIGNAR (" + moment().format('LTS') + ")");
      }
    },
    async autoAssignMenus(order_id) {
      // AUTO ASIGNAR
      const URI = "https://dodo.jugnoo.in:8024/assign_driver";

      try {
        const res = await this.$axios.post(URI, {
          "access_token": this.access_token,
          "order_id": order_id,
          "user_id": null
        });

        // console.log(res);
        this.arrayHistory.push("DELIVERY_ID: " + order_id + " Auto Asignado con exito! (" + moment().format('LTS') + ")");
        this.cantOrderAssigned++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: " + error);
        this.arrayHistory.push("DELIVERY_ID: " + order_id + " NO SE PUDO AUTO ASIGNAR (" + moment().format('LTS') + ")");
      }
    }
  }
};
</script>
