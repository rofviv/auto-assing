<template>
  <q-page class="q-pa-md">
    <q-select
      v-model="citySelect"
      option-label="city"
      emit-value
      map-options
      option-value="id"
      @input="cambiarCiudad"
      :options="cityOptions"
      label="Ciudad"
    ></q-select>
    <q-separator class="q-my-md"></q-separator>
    <div class="row">
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <div class="text-h6">MENUS</div>
          </div>
          <div class="col-2 q-mb-sm">
            <q-input
              type="number"
              @input="validateNumber"
              outlined
              v-model="time_refresh"
              label="Tiempo (Seg.)"
            />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle
              v-model="active"
              @input="change_mode"
              label="Auto Asignar"
            />
          </div>
          <div class="col-6">
            <q-chip>
              <q-avatar color="blue" text-color="white">{{
                cantOrdersTotal
              }}</q-avatar
              >Pedidos
            </q-chip>
            <q-chip>
              <q-avatar color="green" text-color="white">{{
                cantOrderAssigned
              }}</q-avatar
              >Auto Asignados
            </q-chip>
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle
              v-model="activeAccept"
              @input="change_mode_accept"
              label="Aceptar"
            />
          </div>
          <div class="col-3">
            <q-chip>
              <q-avatar color="orange" text-color="white">{{
                cantOrderAccept
              }}</q-avatar
              >Aceptados
            </q-chip>
          </div>
          <!-- <div class="col-2">
             <q-input type="number" outlined v-model="time_refresh_accept" label="Aceptar (Min.)" />
          </div>-->
        </div>
        <div class="row">
          <div class="col-11">
            <q-card flat bordered class="my-card">
              <q-card-section>
                <div class="text-h6">Historial MENUS y ACCEPT</div>
              </q-card-section>

              <q-card-section>
                <q-scroll-area
                  ref="scrollAreaMenus"
                  style="height: 300px; max-width: 100%;"
                >
                  <div v-for="(n, index) in arrayHistory" :key="index">
                    $
                    <span class="text-weight-light">{{ n }}</span>
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
            <q-input
              type="number"
              @input="validateNumberDelivery"
              outlined
              v-model="time_refresh_delivery"
              label="Tiempo (Seg.)"
            />
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            <q-toggle
              v-model="activeDelivery"
              @input="change_mode_delivery"
              label="Auto Asignar"
            />
          </div>
          <div class="col-6">
            <q-chip>
              <q-avatar color="blue" text-color="white">{{
                cantOrdersTotalDelivery
              }}</q-avatar
              >Pedidos
            </q-chip>
            <q-chip>
              <q-avatar color="green" text-color="white">{{
                cantOrderAssignedDelivery
              }}</q-avatar
              >Auto Asignados
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
                <q-scroll-area
                  ref="scrollAreaDelivery"
                  style="height: 300px; max-width: 100%;"
                >
                  <div v-for="(n, index) in arrayHistoryDelivery" :key="index">
                    $
                    <span class="text-weight-light">{{ n }}</span>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <br />
    <q-input
        type="number"
        outlined
        v-model="diaAnterior"
        label="dia"
      />
    <q-btn @click="getListaMotos" label="Ejecutar" />
    <q-checkbox v-model="isMotoclick" label="Descuento Motoclick" />
    <div class="row">
      <div class="col-11">
        <q-card flat bordered class="my-card">
          {{ contadorCreditos }}
          <q-card-section>
            <div class="text-h6">Historial CREDITOS REPARTIDORES</div>
          </q-card-section>

          <q-card-section>
            <q-scroll-area
              ref="scrollAreaMenus"
              style="height: 300px; max-width: 100%;"
            >
              <div v-for="(n, index) in arrayHistoryCreditos" :key="index">
                $
                <span class="text-weight-light">{{ n }}</span>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment, { locale } from "moment";
import { LocalStorage } from "quasar";

var FileSaver = require("file-saver");

export default {
  name: "AutoAssign",
  mounted() {
    this.cargarCiudad();
    this.change_mode();
    this.change_mode_accept();
    this.change_mode_delivery();

    // this.comprobarHora();
  },
  data() {
    return {
      isMotoclick: false,
      arrayHistory: [],
      active: false,
      cantOrdersTotal: 0,
      cantOrderAssigned: 0,
      refresh_handler: null,
      time_refresh: 60, // segundos

      arrayHistoryDelivery: [],
      activeDelivery: false,
      cantOrdersTotalDelivery: 0,
      cantOrderAssignedDelivery: 0,
      refresh_handler_delivery: null,
      time_refresh_delivery: 60, // segundos

      time_refresh_accept: 1, // minutos
      activeAccept: false,
      cantOrderAccept: 0,
      refresh_handler_accept: null,

      access_token: "bb6747c16dcb2a870caa1379f0c34049",
      access_token_aux: "bb6747c16dcb2a870caa1379f0c34049",
      // access_token: "5e26d40edd82f1035e8fe0d12e7304df",
      // access_token_aux: "845c88964029c3c89451c8925a5bf093",

      citySelect: 395,
      cityOptions: [
        { city: "Santa Cruz", id: 395 },
        { city: "Cochabamba", id: 704 },
        { city: "La Paz", id: 818 },
        { city: "El Alto", id: 3265 },
        { city: "Tarija", id: 859 },
        { city: "Potosi", id: 1796 },
        { city: "Sucre", id: 933 },
        { city: "Arequipa", id: 786 },
        { city: "Montevideo", id: 997 },
        { city: "San Jose de Mayo", id: 3190 },
        { city: "Juliaca", id: 3262 },
      ],

      time_refresh_creditos: 45, // minutos
      comprobandoCreditos: false,
      refresh_handler_creditos: null,
      arrayHistoryCreditos: [],
      horaScript: "00",
      arrayListaMotos: [],
      contadorCreditos: "",
      arrayMotosCSV: [],
      diaAnterior: 1,
      ciudadNombre: '',
    };
  },
  methods: {
    comprobarHora() {
      if (this.citySelect == 395 || this.citySelect == 818) {
        let hoy = new Date();
        let hora = hoy.getHours();
        if (hora == this.horaScript) {
          if (!this.comprobandoCreditos) {
            this.arrayHistoryCreditos.push(
              "Ejecutando el script (" + moment().format("LTS") + ")"
            );
            this.comprobandoCreditos = true;
            this.getListaMotos();
          } else {
            this.arrayHistoryCreditos.push(
              "Script en ejecución" + moment().format("LTS") + ")"
            );
          }
        } else {
          this.comprobandoCreditos = false;
          this.contadorCreditos = "";
          this.arrayHistoryCreditos = [];
          this.arrayHistoryCreditos.push(
            "Esperando la hora " +
              this.horaScript +
              "  para ejecutar el script (" +
              moment().format("LTS") +
              ")"
          );
        }
        this.reset_timer_creditos();
      } else {
        this.arrayHistoryCreditos.push(
          "El Script no se ejcutara en esta ciudad (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    // async getListaMotos() {
    //   this.arrayMotosCSV.push("ID,NOMBRE,CARRERAS,SALDO CREDITO,BLOQUEADO,FECHA\n");
    //   this.arrayHistoryCreditos.push(
    //     "Obteniendo lista de repartidores (" + moment().format("LTS") + ")"
    //   );
    //   let limit = 3000;
    //   const URI =
    //     "https://api-panels.jugnoo.in:8020/get_driver_details_panel?city=" +
    //     this.citySelect +
    //     "&email_id=null&vehicle_type=15&category=2&skip=0&limit=" +
    //     limit +
    //     "&token=" +
    //     this.access_token_aux;
    //   try {
    //     let res = await this.$axios.get(URI);
    //     // console.log(res.data.data);
    //     this.arrayListaMotos = res.data.data;
    //     this.arrayHistoryCreditos.push(
    //       "Cantidad de repartidores obtenidos: " +
    //         this.arrayListaMotos.length +
    //         " (" +
    //         moment().format("LTS") +
    //         ")"
    //     );

    //     const start = async () => {
    //       await this.asyncForEach(this.arrayListaMotos, async driver => {
    //         await this.getCantidadCarreraRepartidor(driver);
    //       });

    //       var blob = new Blob(this.arrayMotosCSV, {
    //         type: "text/csv;charset=utf-8",
    //       });
    //       FileSaver.saveAs(blob, "ReporteDeCreditos.csv");
    //       this.arrayMotosCSV = [];
    //     };
    //     await start();
    //   } catch (error) {
    //     console.log("GET MOTOS ERROR", error);
    //   }
    // },
    // async getCantidadCarreraRepartidor(driver) {
    //   const date = moment()
    //     .subtract(8, "days")
    //     .format("YYYY-MM-DD");
    //   this.arrayHistoryCreditos.push(
    //     "Obteniendo cantidad de carreras del Driver ID: " +
    //       driver.driver_id +
    //       " de la fecha " +
    //       date +
    //       " (" +
    //       moment().format("LTS") +
    //       ")"
    //   );
    //   // const URI =
    //   //   "https://api-panels.jugnoo.in:8020/getDriverRideDetails?driverId=" +
    //   //   driver.driver_id +
    //   //   "&rideDate=" +
    //   //   date +
    //   //   "&token=" +
    //   //   this.access_token_aux +
    //   //   "&cityId=" +
    //   //   this.citySelect;
    //   const URI = "https://patioserviceonline.com/api/v1/controllers/erpController.php?type=cant_pedidos_driver_fecha_id&fecha=" +  date + "&id_driver=" + driver.driver_id;
    //   try {
    //     let res = await this.$axios.get(URI);
    //     // if (res.data.data.rides.length > 0) {
    //     if (res.data.length > 0 && res.data[0].driver_id != null) {
    //       // console.log(res.data.data.rides[0]);
    //       // console.log(res.data[0]);
    //       this.debitarCreditoMoto(
    //         driver,
    //         // res.data.data.rides[0].completed,
    //         res.data[0].total_pedidos,
    //         date
    //       );
    //     } else {
    //       this.arrayHistoryCreditos.push(
    //         "Driver ID: " +
    //           driver.driver_id +
    //           " No tiene carreras la fecha " +
    //           date +
    //           " (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //     }
    //     // this.arrayHistoryCreditos.push(
    //     //   "Cantidad de repartidores obtenidos: " + this.arrayListaMotos.length + " (" + moment().format("LTS") + ")"
    //     // );
    //   } catch (error) {
    //     console.log("GET CARRERAS MOTO ERROR", error);
    //   }
    // },
    async getListaMotos() {
      const texto = prompt("Ingresa la clave para realizar esta acción");
      if (texto == 'sistemas') {
        const date = moment()
        .subtract(this.diaAnterior, "days")
        .format("YYYY-MM-DD");
        this.arrayMotosCSV.push(
          "ID,NOMBRE,CARRERAS,SALDO CREDITO,BLOQUEADO,FECHA\n"
        );
        this.arrayHistoryCreditos.push(
          "Obteniendo lista de repartidores (" + moment().format("LTS") + ")"
        );
        this.ciudadNombre = this.cityOptions.find(
            element => element.id == this.citySelect
          );
          console.log(this.ciudadNombre)
        let motoclickAux = this.isMotoclick ? 1 : 0;
        let precioCarrera = this.isMotoclick ? 3 : 1;
        const URI =
          "https://patioserviceonline.com/api/v1/controllers/erpController.php?type=cant_pedidos_driver_fecha&fecha=" +
          date + "&ciudad=" + this.ciudadNombre.city + "&motoclick=" + motoclickAux;
        try {
          let res = await this.$axios.get(URI);
          // console.log(res.data.data);
          this.arrayListaMotos = res.data;
          this.arrayHistoryCreditos.push(
            "Cantidad de repartidores obtenidos: " +
              this.arrayListaMotos.length +
              " (" +
              moment().format("LTS") +
              ")"
          );

          const start = async () => {
            await this.asyncForEach(this.arrayListaMotos, async driver => {
              await this.debitarCreditoMoto(driver, driver.total_pedidos * precioCarrera, date);
            });

            var blob = new Blob(this.arrayMotosCSV, {
              type: "text/csv;charset=utf-8"
            });
            FileSaver.saveAs(blob, "ReporteDeCreditos.csv");
            this.arrayMotosCSV = [];
          };
          await start();
        } catch (error) {
          console.log("GET MOTOS ERROR", error);
        }
      } else {
        alert("Clave incorrecta")
      }
    },
    async debitarCreditoMoto(driver, cant, fecha) {
      if (parseInt(cant) > 0) {
        this.arrayHistoryCreditos.push(
          "Debitando " +
            cant +
            " creditos al driver id " +
            driver.driver_id +
            " de la fecha " +
            fecha +
            " (" +
            moment().format("LTS") +
            ")"
        );
        const URI = "https://api-panels.jugnoo.in:8020/give_user_credits";
        let data = new URLSearchParams();
        data.append("type", "2");
        data.append("amount", cant);
        data.append("reason", cant + " pedidos de la fecha " + fecha);
        data.append("user_id", driver.driver_id);
        data.append("user_type", "1");
        data.append("token", this.access_token_aux);
        try {
          let res = await this.$axios.post(URI, data);
          if (res.data.message == "Success") {
            await this.verificarCreditos(driver, cant, fecha);
            // console.log("No se esta revisando los creditos por no se bloqueara al driver ID: " + driver.driver_id)
          } else {
            this.arrayHistoryCreditos.push(
              "Hubo un problema al debitar los creditos del driver ID: " +
                driver.driver_id +
                " (" +
                moment().format("LTS") +
                ")"
            );
          }
        } catch (error) {
          console.log(
            "No se pudo debitar creditos del id " + driver.driver_id,
            error
          );
        }
      } else {
        this.arrayHistoryCreditos.push(
          "No hay carreras para debitar al driver id " +
            driver.driver_id +
            " de la fecha " +
            fecha +
            " (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async verificarCreditos(driver, cant, fecha) {
      let estado = 0;
      let driverJugno = await this.getDriverJugno(driver.driver_id);
      // let saldo = parseInt(driver.money_in_wallet) - parseInt(cant);
      if (driverJugno != null) {
        if (driverJugno["Vehicle Type"] != 8) {
          let saldo = driverJugno.wallet_balance;
          this.arrayHistoryCreditos.push(
            "Verificando sus creditos para bloquear al driver id " +
              driver.driver_id +
              " (" +
              moment().format("LTS") +
              ")"
          );

          // if (driver.driver_suspended == 0) {
          if (driverJugno.Suspended == 0) {
            if (parseInt(saldo) < 0) {
              this.arrayHistoryCreditos.push(
                "Bloqueando al Driver ID: " +
                  driver.driver_id +
                  " (" +
                  moment().format("LTS") +
                  ")"
              );
              // Actualizar sus creditos y cambiar estado a bloqueado
              estado = 1;
              this.bloquearDriver(driver);
              this.arrayMotosCSV.push(
                driver.driver_id +
                  "," +
                  "-" +
                  "," +
                  parseInt(cant) +
                  "," +
                  parseInt(saldo) +
                  "," +
                  "SI" +
                  "," +
                  fecha +
                  "\n"
              );
            } else {
              // Actualizar sus creditos
              estado = 0;
              this.arrayHistoryCreditos.push(
                "Tiene " +
                  saldo +
                  " creditos, no se bloqueara al driver id " +
                  driver.driver_id +
                  " (" +
                  moment().format("LTS") +
                  ")"
              );
              this.arrayMotosCSV.push(
                driver.driver_id +
                  "," +
                  "-" +
                  "," +
                  parseInt(cant) +
                  "," +
                  parseInt(saldo) +
                  "," +
                  "NO" +
                  "," +
                  fecha +
                  "\n"
              );
            }
          } else {
            // Actualizar sus creditos
            estado = 0;

            this.arrayHistoryCreditos.push(
              "El driver id " +
                driver.driver_id +
                " Ya esta bloqueado (" +
                moment().format("LTS") +
                ")"
            );
          }
          await this.actualizarCreditosEstadoDriver(saldo, estado, driver);
        } else {
          this.arrayHistoryCreditos.push(
            "Driver id " +
              driver.driver_id +
                " Es TAXI, no se bloqueara (" +
                moment().format("LTS") +
                ")"
            );
        }

      } else {
        // alert("No se pudo obtener el DRIVER ID " + driver.driver_id);
        this.arrayHistoryCreditos.push(
            "Driver id " +
              driver.driver_id +
              " No se pudo obtener los creditos actuales (" +
              moment().format("LTS") +
              ")"
          );
        console.log("No se pudo obtener el DRIVER ID " + driver.driver_id);
      }
    },
    async getDriverJugno(id) {
      const URI =
        "https://api-panels.jugnoo.in:7013/schedule-ride-auth/driver_info?";
      let data = new URLSearchParams();
      data.append("driver_id", id);
      data.append("token", this.access_token_aux);
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
        // Vehicle Type = 8 taxi 15 = es moto
        if (res.data.wallet_balance) {
          return res.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log("GET DRIVER JUGNO", error);
      }
    },
    async bloquearDriver(driver) {
      const URI = "https://api-panels.jugnoo.in:8020/suspend_driver?";
      let data = new URLSearchParams();
      data.append("suspension_reason_id", 2745);
      data.append("suspension_reason_text", "Otros");
      data.append("driver_id[]", driver.driver_id);
      data.append(
        "suspend_comments",
        "Creditos en contra, debe recargar para activarse"
      );
      data.append("admin_email", "");
      data.append("token", this.access_token_aux);
      data.append("email_id", "abhishek.kaushik+patio@jungleworks.com");
      data.append("city", this.citySelect);
      data.append("suspension_type", 2);

      try {
        let res = await this.$axios.post(URI, data);
        // console.log("BLOQUEO " + driver.driver_id, res.data);
        this.arrayHistoryCreditos.push(
          driver.driver_id +
            " Bloqueado hasta su proxima recarga  (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("No se pudo bloquear el id " + driver.driver_id, error);
      }
    },
    async actualizarCreditosEstadoDriver(creditos, estado, driver) {
      this.arrayHistoryCreditos.push(
          driver.driver_id +
            " Actualizando Creditos y estado (" +
            moment().format("LTS") +
            ")"
        );
      const URI = "https://patioserviceonline.com/api/v1/?route=driver&type=creditos_estado_driver_id";
      let data = new URLSearchParams();
      data.append("creditos", creditos);
      data.append("estado", estado);
      data.append("id_jugno", driver.driver_id);
      try {
        let res = await this.$axios.post(URI, data);
        console.log("Creditos y estado driver ID " + driver.driver_id , res.data);
        this.arrayHistoryCreditos.push(
          driver.driver_id +
            " Creditos y estado actualizados  (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("Actualizando estado ERROR", error);
        this.arrayHistoryCreditos.push(
          driver.driver_id +
            " No se actualizaron los Creditos y el estado (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
        this.contadorCreditos = index + 1 + " de " + array.length;
      }
    },
    reset_timer_creditos() {
      clearTimeout(this.refresh_handler_creditos);
      this.refresh_handler_creditos = setTimeout(() => {
        this.comprobarHora();
        console.log("Refresh CREDITOS...");
      }, this.time_refresh_creditos * 60000);
    },
    cargarCiudad() {
      this.citySelect = LocalStorage.getItem("ciudad") || 395;
      // this.cambiarCiudad();
    },
    cambiarCiudad() {
      switch (this.citySelect) {
        case 395:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-17.783384, -63.18203]);
          break;
        case 704:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-17.393868, -66.157481]);
          break;
        case 818:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-16.505147, -68.129631]);
          break;
        case 1796:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-19.573203, -65.757626]);
          break;
        case 859:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-21.533739, -64.733768]);
          break;
        case 933:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-19.043361, -65.260071]);
          break;
        case 786:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-16.398879, -71.536884]);
          break;
        case 997:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-34.885591, -56.165964]);
          break;
        case 3190:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-34.339696, -56.713450]);
          break;
        case 3265:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-16.492421, -68.183100]);
          break;
        case 3262:
          LocalStorage.set("ciudad", this.citySelect);
          LocalStorage.set("center", [-15.494996, -70.127177]);
          break;
          
      }
      location.reload();
    },
    validateNumber() {
      if (
        this.time_refresh < 1 ||
        this.time_refresh == "" ||
        this.time_refresh == null
      ) {
        this.time_refresh = 60;
      }
    },
    validateNumberDelivery() {
      if (
        this.time_refresh_delivery < 1 ||
        this.time_refresh_delivery == "" ||
        this.time_refresh_delivery == null
      ) {
        this.time_refresh_delivery = 60;
      }
    },
    change_mode() {
      if (this.active) {
        this.getOrders();
        this.arrayHistory.push(
          "El sistema MENUS esta ACTIVADO (" + moment().format("LTS") + ")"
        );
      } else {
        clearTimeout(this.refresh_handler);
        this.arrayHistory.push(
          "El Sistema MENUS esta DETENIDO (" + moment().format("LTS") + ")"
        );
      }
    },
    change_mode_accept() {
      if (this.activeAccept) {
        this.getOrdersAccept();
        this.arrayHistory.push(
          "El sistema ACEPTAR esta ACTIVADO (" + moment().format("LTS") + ")"
        );
      } else {
        clearTimeout(this.refresh_handler_accept);
        this.arrayHistory.push(
          "El Sistema ACEPTAR esta DETENIDO (" + moment().format("LTS") + ")"
        );
      }
    },
    change_mode_delivery() {
      if (this.activeDelivery) {
        this.getOrdersDelivery();
        this.arrayHistoryDelivery.push(
          "El sistema DELIVERY esta ACTIVADO (" + moment().format("LTS") + ")"
        );
      } else {
        clearTimeout(this.refresh_handler_delivery);
        this.arrayHistoryDelivery.push(
          "El Sistema DELIVERY esta DETENIDO (" + moment().format("LTS") + ")"
        );
      }
    },
    reset_timer() {
      clearTimeout(this.refresh_handler);
      this.refresh_handler = setTimeout(() => {
        this.getOrders();
        console.log("Refresh MENUS...");
      }, this.time_refresh * 1000);
    },
    reset_timer_accept() {
      clearTimeout(this.refresh_handler_accept);
      this.refresh_handler_accept = setTimeout(() => {
        this.getOrdersAccept();
        console.log("Refresh ACCEPT...");
      }, this.time_refresh_accept * 60000);
    },
    reset_timer_delivery() {
      clearTimeout(this.refresh_handler_delivery);
      this.refresh_handler_delivery = setTimeout(() => {
        this.getOrdersDelivery();
        console.log("Refresh DELIVERY...");
      }, this.time_refresh_delivery * 1000);
    },
    async getOrdersDelivery() {
      // GET ORDERS DELIVERY
      if (this.activeDelivery) {
        console.log("FINDING ORDERS DELIVERY...");
        this.arrayHistoryDelivery.push(
          "Obteniendo lista de ordenes DELIVERY... (" +
            moment().format("LTS") +
            ")"
        );
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI =
          "https://prod-fatafat-new.jugnoo.in:4030/panel/view_orders?token=" +
          this.access_token +
          "&secret=P7JlZXiRiIvSssQSSzqs&city_id=" +
          this.citySelect +
          "&start_date=" +
          date +
          "&end_date=" +
          date +
          "&fetch_active_orders=1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" +
          time;

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
        console.log("FINDING ORDERS ACCEPT...");
        this.arrayHistory.push(
          "Obteniendo lista de ordenes para ACEPTAR... (" +
            moment().format("LTS") +
            ")"
        );
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI =
          "https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=" +
          this.access_token +
          "&secret=P7JlZXiRiIvSssQSSzqs&city=" +
          this.citySelect +
          "&start_date=" +
          date +
          "&end_date=" +
          date +
          "&fetch_pending_orders=1&statusCopy=[object%20Object]&status=0,1&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= " +
          time;
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
        console.log("FINDING ORDERS MENUS...");
        this.arrayHistory.push(
          "Obteniendo lista de ordenes MENUS... (" +
            moment().format("LTS") +
            ")"
        );
        const time = Date.now();
        const date = moment().format("YYYY-MM-DD");
        const URI =
          "https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=" +
          this.access_token +
          "&secret=P7JlZXiRiIvSssQSSzqs&city=" +
          this.citySelect +
          "&start_date=" +
          date +
          "&end_date=" +
          date +
          "&fetch_pending_orders=1&statusCopy=[object%20Object]&status=8&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=500&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_= " +
          time;

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
          // const localesNoAceptar = [38190, 38191, 39464, 39417, 37376, 38354, 36065, 36626, 36624, 36429, 36708, 38970, 38970, 39247, 39415, 36672, 39606, 39853, 39402, 37102, 37101, 38158, 38159, 36756, 35981, 39887, 35964, 39733, 38192, 36711, 40055, 39121, 39465, 39378, 36149, 39559, 39090, 40407, 40061, 40683, 40682, 38089, 39470, 32059, 39233, 39081, 39080, 39013, 40130, 36431, 38957, 39341, 39526, 39525, 39523, 36508, 40285, 37202, 39846];
          const localesNoAceptar = [36626, 40376, 41817, 41816, 41815, 41813];

          const found = localesNoAceptar.find(
            element => element == arrayOrder[index][13].restaurant_id
          );
          if (!found) {
            const restaurant_id = arrayOrder[index][13].restaurant_id;
            const order_id = arrayOrder[index][13].order_id;
            const user_id = arrayOrder[index][13].user_id;

            const strTimeCreate = arrayOrder[index][7].split("<br/>")[0];
            const strDateCreate = arrayOrder[index][7].split("<br/>")[1];
            const month = strDateCreate.split("-")[1];
            const auxDate = strDateCreate.split("-")[0];
            const date = strDateCreate
              .split("-")[0]
              .substring(0, auxDate.length - 2);

            const year = strDateCreate.split("-")[2];
            const hour =
              strTimeCreate.split(":")[1].split(" ")[1] == "PM" &&
              strTimeCreate.split(":")[0] != "12"
                ? strTimeCreate.split(":")[0] * 1 + 12
                : strTimeCreate.split(":")[0];
            const min = strTimeCreate.split(":")[1].split(" ")[0];
            const str =
              month + " " + date + ", " + year + " " + hour + ":" + min + ":00";
            const milliDateCreated = new Date(str).getTime();

            const dateNow = Date.now();
            const minDifer = moment(dateNow - milliDateCreated).format("mm");

            if (minDifer >= 3) {
              this.acceptOrder(order_id, restaurant_id, user_id);
            }
          }
        }
      }
    },
    async acceptOrder(order_id, restaurant_id, user_id) {
      const URI = "https://prod-fresh-api.jugnoo.in:4040/web/accept_order";
      const data =
        "token=" +
        this.access_token +
        "&order_id=" +
        order_id +
        "&restaurant_id=" +
        restaurant_id +
        "&user_id=" +
        user_id +
        "&force_token=1&refund_customer=0&reason=";

      try {
        const res = await this.$axios({
          url: URI,
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          data: data
        });

        this.arrayHistory.push(
          "ORDER_ID: " +
            order_id +
            " ACEPTADO correctamente! (" +
            moment().format("LTS") +
            ")"
        );
        this.cantOrderAccept++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: ", error);
        this.arrayHistory.push(
          "ORDER_ID: " +
            order_id +
            " NO SE PUDO ACEPTAR (" +
            moment().format("LTS") +
            ")"
        );
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
      this.arrayHistoryDelivery.push(
        "Verificando para Auto Asignar Orden ID " +
          id +
          " DELIVERY ID " +
          order_id +
          " (" +
          moment().format("LTS") +
          ")"
      );
      const URI = "https://dodo.jugnoo.in:8024/get_complete_task_details";
      const data =
        "access_token=" + this.access_token + "&order_id=" + order_id;

      try {
        const res = await this.$axios({
          url: URI,
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          data: data
        });
        if (res.data.data.status == 6) {
          this.arrayHistoryDelivery.push(
            "Auto Asignando Orden ID " +
              id +
              " DELIVERY ID " +
              order_id +
              " (" +
              moment().format("LTS") +
              ")"
          );
          this.autoAssignDelivery(order_id);
        } else {
          this.arrayHistoryDelivery.push(
            "No necesita Auto Asignar Orden ID " +
              id +
              " DELIVERY ID " +
              order_id +
              " (" +
              moment().format("LTS") +
              ")"
          );
        }
      } catch (error) {}
    },
    async getDeliveryID(order_id, restaurant_id) {
      // GET REFERENCE  O DELIVERY ID
      const URI = "https://prod-fresh-api.jugnoo.in:4040/order_details";
      const data =
        "token=" +
        this.access_token +
        "&order_id=" +
        order_id +
        "&restaurant_id=" +
        restaurant_id;
      try {
        const res = await this.$axios({
          url: URI,
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          data: data
        });

        // console.log(res);
        const delivery_id = res.data.order_info[0].delivery_id;
        this.arrayHistory.push(
          "Auto Asignando ORDER_ID: " +
            order_id +
            " RESTAURANT_ID: " +
            restaurant_id +
            " DELIVERY_ID: " +
            delivery_id +
            "... (" +
            moment().format("LTS") +
            ")"
        );
        this.autoAssignMenus(delivery_id);
      } catch (error) {
        console.log("GET DELIVERY ID ERROR: " + error);
      }
    },
    async autoAssignDelivery(order_id) {
      const URI = "https://dodo.jugnoo.in:8024/assign_driver";

      try {
        const res = await this.$axios.post(URI, {
          access_token: this.access_token,
          order_id: order_id,
          user_id: null
        });

        // console.log(res);
        this.arrayHistoryDelivery.push(
          "DELIVERY_ID: " +
            order_id +
            " Auto Asignado con exito! (" +
            moment().format("LTS") +
            ")"
        );
        this.cantOrderAssignedDelivery++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: " + error);
        this.arrayHistoryDelivery.push(
          "DELIVERY_ID: " +
            order_id +
            " NO SE PUDO AUTO ASIGNAR (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async autoAssignMenus(order_id) {
      // AUTO ASIGNAR
      const URI = "https://dodo.jugnoo.in:8024/assign_driver";

      try {
        const res = await this.$axios.post(URI, {
          access_token: this.access_token,
          order_id: order_id,
          user_id: null
        });

        // console.log(res);
        this.arrayHistory.push(
          "DELIVERY_ID: " +
            order_id +
            " Auto Asignado con exito! (" +
            moment().format("LTS") +
            ")"
        );
        this.cantOrderAssigned++;
      } catch (error) {
        console.log("AUTO ASIGNAR ERROR: " + error);
        this.arrayHistory.push(
          "DELIVERY_ID: " +
            order_id +
            " NO SE PUDO AUTO ASIGNAR (" +
            moment().format("LTS") +
            ")"
        );
      }
    }
  }
};
</script>
