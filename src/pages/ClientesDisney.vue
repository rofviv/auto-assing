<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">Clientes Disney</div>
    <!-- <q-radio v-model="cerrarTodos" :val="true" label="Limitar Todos" />
    <q-radio v-model="cerrarTodos" :val="false" label="Limitar con Excel" /> -->
    <!-- <template v-if="!cerrarTodos">
      <div class="row">
        <div class="col-6">
          <q-input
            @input="
              val => {
                file = val[0];
              }
            "
            filled
            type="file"
            hint="Selecciona un excel"
          />
        </div>
        <div class="col-6">
          <q-btn color="green" @click="readXlsx">Cargar Archivo</q-btn>
        </div>
      </div>
    </template> -->
    <!-- <template v-else>
      <q-select
        v-model="citySelect"
        option-label="city"
        emit-value
        map-options
        option-value="id"
        :options="cityOptions"
        label="Ciudad"
        disable
      ></q-select>
      <q-separator class="q-my-md"></q-separator>

      <div class="row">
        <div class="col-4">
          <div class="text-h6">Tarifas estructura</div>
          <div class="text-subtitle2">No incluye las tarifas Globales</div>
          <div class="text-subtitle2">
            Se cambiaran {{ cantTarifas }} tarifas
          </div>
        </div>
      </div>
    </template> -->
    <!-- <div class="col-3">
      <q-input
        type="number"
        :disable="disableBtn"
        outlined
        v-model="fee"
        label="Fee"
      />
    </div>
    <br />
    <div class="row">
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa1"
          label="Tarifa 1"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa2"
          label="Tarifa 2"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa3"
          label="Tarifa 3"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa4"
          label="Tarifa 4"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa5"
          label="Tarifa 5"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa6"
          label="Tarifa 6"
        />
      </div>
      <div class="col-3">
        <q-input
          type="number"
          :disable="disableBtn"
          outlined
          v-model="tarifa7"
          label="Tarifa 7"
        />
      </div>
    </div> -->
    <q-input
        outlined
        v-model="ciudad"
        label="Ciudad"
      />
    <q-input outlined v-model="fechaActual" label="Fecha Actual" />
    <br />
    <div class="row">
      <div class="col-3">
        <q-btn color="green" :disable="disableBtn" @click="consultarDatos"
          >Ejecutar acción</q-btn
        >
      </div>
      <div class="col-3">
        <q-btn
          color="blue"
          :loading="loadBtn"
          :disable="datosNoCargados"
          @click="guardarClientesDisney"
          >Guardar y enviar push</q-btn
        >
      </div>
      <!-- <div class="col-3">
        <q-btn
          color="blue"
          :disable="disableBtn"
          @click="cambiarEstadoTarifa(1)"
          >Habilitar Todo</q-btn
        >
      </div> -->
    </div>
    <div class="row">
      <div class="col-6">
        <template v-if="loadBtn">
          <div>
            Ejecutando segunda opcion...
            <q-linear-progress color="green" indeterminate />
          </div>
        </template>
      </div>
    </div>
    <div class="row q-pb-md">
      <div class="col-4">
        {{ texto }}
      </div>
    </div>
    <div class="row">
      <div class="col-11">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Historial</div>
            <div class="text-subtitle2">Errores: {{ contadorError }}</div>
          </q-card-section>

          <q-card-section>
            <q-scroll-area
              ref="scrollAreaDelivery"
              style="height: 300px; max-width: 100%;"
            >
              <div v-for="(n, index) in arrayHistoryDelivery" :key="index">
                $ <span class="text-weight-light">{{ n }}</span>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- </div>
    </div> -->
  </q-page>
</template>

<script>
// import XLSX from "xlsx";
import moment from "moment";
// var list = [];
export default {
  name: "AutoAssign",
  created() {
    this.fechaActual = moment().format("YYYY-MM-DD");
    // this.listaClientesHoyErp = [{cant_pedidos: 4, ciudad: "Santa Cruz", nombre_cliente: "Juan Pablo Salinas Salek", email_cliente: "JuanPablo@patio.com.bo", id_cliente: "9296528", telefono_cliente: "+59171091404"}];
  },
  data() {
    return {
      // cantTarifas: 0,

      // tarifa1: 10,
      // tarifa2: 12,
      // tarifa3: 14,
      // tarifa4: 16,
      // tarifa5: 18,
      // tarifa6: 20,
      // tarifa7: 25,

      // cerrarTodos: true,
      // file: null,
      // merchantList: [],
      texto: "",
      disableBtn: false,
      loadBtn: false,
      // fee: 0,
      // isOpening: false,

      // isEnabled: true,
      // active: false,
      arrayHistoryDelivery: [],

      // access_token: "5e26d40edd82f1035e8fe0d12e7304df",
      // access_token: "bb6747c16dcb2a870caa1379f0c34049",

      // displayLength: 10000,
      // citySelect: 704,
      // cityOptions: [
      //   { city: "Santa Cruz", id: 395 },
      //   { city: "Cochabamba", id: 704 },
      //   { city: "La Paz", id: 818 },
      //   { city: "El Alto", id: 3265 },
      //   { city: "Tarija", id: 859 },
      //   { city: "Villa Imperial de Potosí", id: 1796 },
      //   { city: "Sucre", id: 933 },
      //   { city: "Arequipa", id: 786 },
      //   { city: "Montevideo", id: 997 },
      //   { city: "San José de Mayo", id: 3190 },
      //   { city: "Juliaca", id: 3262 }
      // ],

      // listaTarifa: [],

      ciudad: "Cochabamba",

      access_token: "845c88964029c3c89451c8925a5bf093",
      contadorError: 0,

      datosNoCargados: true,

      rutaBase: "https://patioserviceonline.com/api/v1/",
      fechaActual: "",
      listaClientesHoyErp: [],
      listaCliente90Erp: [],
      listaClientesDisney: [],

      listaClienteNuevos: [],
      listaClientesAntiguos: [],
      listaClientesAntiguosFiltrada: [],

      listaClientesNuevoDisney: [],
      listaClientesAntiguoDisney: []
    };
  },
  methods: {
    async consultarDatos() {
      let r = prompt("Introduce la contraseña");
      if (r == "sistemas") {
        this.$q.loading.show({
          message: "Esto puede tardar unos minutos, espera por favor..."
        });

        this.arrayHistoryDelivery.push(
          "Obteniendo Lista de clientes ERP " +
            this.fechaActual +
            " (" +
            moment().format("LTS") +
            ")"
        );
        await this.getClientesHoyErp();
        this.arrayHistoryDelivery.push(
          "Total clientes ERP " +
            this.fechaActual +
            " : " +
            this.listaClientesHoyErp.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Obteniendo Lista de clientes ERP HACE 90 Dias (" +
            moment().format("LTS") +
            ")"
        );
        await this.getClientes90Erp();
        this.arrayHistoryDelivery.push(
          "Total clientes ERP HACE 90 Dias " +
            this.listaCliente90Erp.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Obteniendo Lista de clientes Disney " +
            this.fechaActual +
            " (" +
            moment().format("LTS") +
            ")"
        );
        await this.getClientesDisney();
        this.arrayHistoryDelivery.push(
          "Total clientes Disney " +
            this.listaClientesDisney.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Filtrando lista (Nuevos y Frecuentes) (" +
            moment().format("LTS") +
            ")"
        );
        await this.filtrarCliente_Nuevo_Antiguo();
        this.arrayHistoryDelivery.push(
          "Total Nuevos: " +
            this.listaClienteNuevos.length +
            "    Total Frecuentes: " +
            this.listaClientesAntiguos.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Filtrando clientes Frecuentes con 4 pedidos o mas (" +
            moment().format("LTS") +
            ")"
        );
        await this.filtrarClientesAntiguosConPedidos();
        this.arrayHistoryDelivery.push(
          "Total clientes Frecuentes con mas de 4 pedidos: " +
            this.listaClientesAntiguosFiltrada.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Filtrando clientes que no han recibido la cuenta disney (" +
            moment().format("LTS") +
            ")"
        );
        await this.filtrarClientesConCuentas();
        this.arrayHistoryDelivery.push(
          "Clientes nuevos que recibiran: " +
            this.listaClientesNuevoDisney.length +
            " (" +
            moment().format("LTS") +
            ")"
        );
        this.arrayHistoryDelivery.push(
          "Clientes frecuentes que recibiran: " +
            this.listaClientesAntiguoDisney.length +
            " (" +
            moment().format("LTS") +
            ")"
        );

        this.arrayHistoryDelivery.push(
          "Primera tarea finalizada. (" + moment().format("LTS") + ")"
        );

        console.log("FIN DE LA SENTENCIA");
        // Preguntar si estos se encuentran en lista clientes disney
        // en caso de que si, no hacer nada, en caso de que no guardarlos y enviar un email

        this.datosNoCargados = false;
        this.$q.loading.hide();
      } else {
        alert("Incorrecto");
      }
    },
    async getClientesHoyErp() {
      this.listaClientesHoyErp = [];
      const URI =
        this.rutaBase +
        "controllers/erpController.php?type=cant_pedidos_cliente_mes_ciudad&mes=" +
        parseInt(this.fechaActual.split("-")[1]) +
        "&anio=" +
        this.fechaActual.split("-")[0];

      const data = new URLSearchParams();
      data.append("ciudad",this.ciudad);
      try {
        const res = await this.$axios.post(URI, data);
        this.listaClientesHoyErp = res.data;
        console.log(this.listaClientesHoyErp);
      } catch (error) {
        console.log("ERRO al obtener clientes de Hoy", error);
      }
    },
    async getClientes90Erp() {
      this.listaCliente90Erp = [];
      let fechaAnterior = moment(this.fechaActual)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      let intervalo = 90;
      const URI =
        this.rutaBase +
        "controllers/erpController.php?type=cant_clientes_intervalo_ciudad&fecha=" +
        fechaAnterior +
        "&intervalo=" +
        intervalo;
      const data = new URLSearchParams();
      data.append("ciudad",this.ciudad);
      try {
        const res = await this.$axios.post(URI, data);
        console.log(res.data);
        this.listaCliente90Erp = res.data;
        // console.log(this.listaClientesHoyErp)
      } catch (error) {
        console.log("ERRO al obtener clientes de Hoy", error);
      }
    },
    async getClientesDisney() {
      this.listaClientesDisney = [];
      const URI =
        this.rutaBase +
        "?route=usuario&type=consultar_clientes_mes&mes=" +
        parseInt(this.fechaActual.split("-")[1]) +
        "&gestion=" +
        this.fechaActual.split("-")[0];
      try {
        const res = await this.$axios.get(URI);
        console.log(res.data);
        this.listaClientesDisney = res.data;
      } catch (error) {
        console.log("ERRO al obtener clientes de Hoy", error);
      }
    },
    async filtrarCliente_Nuevo_Antiguo() {
      this.listaClienteNuevos = [];
      this.listaClientesAntiguos = [];

      const start = async () => {
        await this.asyncForEach(this.listaClientesHoyErp, async element => {
          let buscar = await this.listaCliente90Erp.find(
            cliente => cliente.id_cliente == element.id_cliente
          );

          if (buscar == undefined) {
            // El cliente es nuevo
            this.listaClienteNuevos.push(element);
          } else {
            // El cliente es antiguo o frecuente
            this.listaClientesAntiguos.push(element);
          }
        });
      };
      await start();

      console.log("Nuevos", this.listaClienteNuevos);
      console.log("Antiguos", this.listaClientesAntiguos);
    },
    async filtrarClientesAntiguosConPedidos() {
      this.listaClientesAntiguosFiltrada = [];
      let cantMinimaPedidos = 4;

      this.listaClientesAntiguos.forEach(element => {
        if (element.cant_pedidos >= cantMinimaPedidos) {
          this.listaClientesAntiguosFiltrada.push(element);
        }
      });

      console.log("Filtrada", this.listaClientesAntiguosFiltrada);
    },
    async filtrarClientesConCuentas() {
      this.listaClientesNuevoDisney = [];
      this.listaClientesAntiguoDisney = [];

      const start = async () => {
        await this.asyncForEach(this.listaClienteNuevos, async element => {
          let buscar = await this.listaClientesDisney.find(
            cliente => cliente.id_cliente_jugno == element.id_cliente
          );

          if (buscar == undefined) {
            // Dar una cuenta Disney, y enviar un push del primer pedido
            this.listaClientesNuevoDisney.push(element);
          }
        });
      };
      await start();

      const start2 = async () => {
        await this.asyncForEach(
          this.listaClientesAntiguosFiltrada,
          async element => {
            let buscar = await this.listaClientesDisney.find(
              cliente => cliente.id_cliente_jugno == element.id_cliente
            );

            if (buscar == undefined) {
              // Dar una cuenta Disney, y enviar un push del primer pedido
              this.listaClientesAntiguoDisney.push(element);
            }
          }
        );
      };
      await start2();

      console.log("DISNEY NUEVOS", this.listaClientesNuevoDisney);
      console.log("DISNEY ANTIGUO", this.listaClientesAntiguoDisney);
    },
    async guardarClientesDisney() {
      this.disableBtn = true;
      this.loadBtn = true;

      if (this.listaClientesNuevoDisney.length > 0) {
        this.arrayHistoryDelivery.push(
          "Se guardaran " +
            this.listaClientesNuevoDisney.length +
            " clientes nuevos (" +
            moment().format("LTS") +
            ")"
        );
        const start = async () => {
          await this.asyncForEach(
            this.listaClientesNuevoDisney,
            async element => {
              // Dar una cuenta Disney, y enviar un push del primer pedido
              await this.guardarClientesBD(element, "Nuevo");
              await this.sleep(2000);
            }
          );
          await this.enviarPushClientesNuevos();
        };
        await start();
      } else {
        this.arrayHistoryDelivery.push(
          "No hay clientes nuevos para guardar (" + moment().format("LTS") + ")"
        );
      }

      if (this.listaClientesAntiguoDisney.length > 0) {
        this.arrayHistoryDelivery.push(
          "Se guardaran " +
            this.listaClientesNuevoDisney.length +
            " clientes frecuentes (" +
            moment().format("LTS") +
            ")"
        );
        const start2 = async () => {
          await this.asyncForEach(
            this.listaClientesAntiguoDisney,
            async element => {
              // Dar una cuenta Disney, y enviar un push de 4 pedido
              await this.guardarClientesBD(element, "Frecuente");
              await this.sleep(2000);
            }
          );
          await this.enviarPushClientesAntiguos();
        };
        await start2();

        this.arrayHistoryDelivery.push(
          "Se termino la segunda tarea correctamente (" +
            moment().format("LTS") +
            ")"
        );
      } else {
        this.arrayHistoryDelivery.push(
          "No hay clientes frecuentes para guardar (" +
            moment().format("LTS") +
            ")"
        );
      }

      await this.enviarCorreo();

      this.disableBtn = false;
      this.loadBtn = false;
    },
    async enviarPushClientesNuevos() {
      this.arrayHistoryDelivery.push(
        "Enviando push a " +
          this.listaClientesNuevoDisney.length +
          " clientes nuevos (" +
          moment().format("LTS") +
          ")"
      );
      await this.enviarPushJugno(
        this.listaClientesNuevoDisney,
        "Gracias por pedir en Patio te ganaste una suscripción de Disney plus! Te escribirán por WhatsApp o mail para darte tu usuario en las próximas 12-24 horas!"
      );
      // this.listaClientesNuevoDisney
    },
    async enviarPushClientesAntiguos() {
      this.arrayHistoryDelivery.push(
        "Enviando push a " +
          this.listaClientesAntiguoDisney.length +
          " clientes frecuentes (" +
          moment().format("LTS") +
          ")"
      );
      await this.enviarPushJugno(
        this.listaClientesAntiguoDisney,
        "Es tu 4to pedido del mes y ganaste una suscripción de Disney te escribiremos en 12-24 horas para darte el Usuario"
      );
      // this.listaClientesAntiguoDisney
    },
    async enviarCorreo() {
      this.arrayHistoryDelivery.push(
        "Enviando Email (" + moment().format("LTS") + ")"
      );
      let arrayCorreo = [];

      if (this.listaClientesNuevoDisney.length > 0) {
        this.listaClientesNuevoDisney.forEach(element => {
          arrayCorreo.push(element);
        });
      }

      if (this.listaClientesAntiguoDisney.length > 0) {
        this.listaClientesAntiguoDisney.forEach(element => {
          arrayCorreo.push(element);
        });
      }

      if (arrayCorreo.length > 0) {
        const URI = this.rutaBase + "email/index.php";
        const data = new URLSearchParams();
        data.append("lista_clientes", JSON.stringify(arrayCorreo));
        data.append("fecha", this.fechaActual);

        try {
          const res = await this.$axios.post(URI, data);
          console.log(res.data);
          if (res.data.message == "Email Enviado.") {
            this.arrayHistoryDelivery.push(
              "Email enviado correctamente con " +
                arrayCorreo.length +
                " cliente (" +
                moment().format("LTS") +
                ")"
            );
          } else {
            this.arrayHistoryDelivery.push(
              "No se envio el email: " +
                res.data.message +
                " (" +
                moment().format("LTS") +
                ")"
            );
          }
        } catch (error) {
          console.log("No se envio el correo", error);
          this.contadorError++;
          this.arrayHistoryDelivery.push(
            "ERROR al enviar el Email: " +
              error +
              " (" +
              moment().format("LTS") +
              ")"
          );
        }
      } else {
        this.arrayHistoryDelivery.push(
          "No se esta enviando Email porque no hay clientes (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async guardarClientesBD(cliente, tipo) {
      this.arrayHistoryDelivery.push(
        "Guardando cliente " +
          cliente.id_cliente +
          " tipo: " +
          tipo +
          " (" +
          moment().format("LTS") +
          ")"
      );

      const URI = this.rutaBase + "?route=usuario&type=guardar_cliente_disney";
      const data = new URLSearchParams();
      data.append("id_cliente_jugno", cliente.id_cliente);
      data.append("nombre_cliente", cliente.cliente);
      data.append("telefono_cliente", cliente.telefono_cliente);
      data.append("email_cliente", cliente.email_cliente);
      data.append("mes", parseInt(this.fechaActual.split("-")[1]));
      data.append("gestion", this.fechaActual.split("-")[0]);
      data.append("tipo", tipo);

      try {
        const res = await this.$axios.post(URI, data);
        console.log(cliente.id_cliente, res.data);
        if (res.data.message == "OK") {
          this.arrayHistoryDelivery.push(
            "Guardando correctamente " +
              cliente.id_cliente +
              " tipo: " +
              tipo +
              " (" +
              moment().format("LTS") +
              ")"
          );
        } else {
          this.arrayHistoryDelivery.push(
            "No se guardo " +
              cliente.id_cliente +
              " tipo: " +
              tipo +
              " (" +
              moment().format("LTS") +
              ")"
          );
          this.contadorError++;
        }
      } catch (error) {
        console.log("ERROR GUARDAR BD", error);
        this.arrayHistoryDelivery.push(
          "Error al guardar " +
            cliente.id_cliente +
            " tipo: " +
            tipo +
            " ERROR " +
            error +
            " (" +
            moment().format("LTS") +
            ")"
        );
        this.contadorError++;
      }
    },
    async enviarPushJugno(array, message) {
      const URI = "https://api-panels.jugnoo.in:8020/contact_customers";
      const data = new URLSearchParams();
      data.append("type", 2);
      data.append("message", message);
      data.append("sent_from", "super-admin-panel");
      data.append("token", this.access_token);

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        data.append("user_ids[" + index + "][user_id]", element.id_cliente);
      }

      try {
        const res = await this.$axios.post(URI, data);
        if (res.data.message == "Action Completed Successfully.") {
          this.arrayHistoryDelivery.push(
            "Se envio el PUSH '" +
              message +
              "' correctamente. (" +
              moment().format("LTS") +
              ")"
          );
        } else {
          this.arrayHistoryDelivery.push(
            "No se envio el PUSH " +
              res.data.message +
              " (" +
              moment().format("LTS") +
              ")"
          );
          this.contadorError++;
        }
      } catch (error) {
        console.log("ERROR EN EL PUSH" + error);
        this.arrayHistoryDelivery.push(
          "Error al enviar PUSH " +
            message +
            " ERROR " +
            error +
            " (" +
            moment().format("LTS") +
            ")"
        );
        this.contadorError++;
      }
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
        // this.texto = index + 1 + " de " + array.length;
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // async getTarifas() {
    //   this.listaTarifa = [];
    //   this.$q.loading.show();
    //   const URI =
    //     "https://prod-fatafat-new.jugnoo.in:4030/panel/fares_details?token=" +
    //     this.access_token;
    //   try {
    //     const res = await this.$axios.get(URI);

    //     res.data.fares_list.forEach(element => {
    //       if (
    //         element.city_id == this.citySelect &&
    //         element.customer_name != "GLOBAL"
    //       ) {
    //         this.listaTarifa.push(element);
    //       }
    //     });
    //     // console.log(res.data.fares_list.length)
    //     // console.log(this.listaTarifa.length)
    //     this.cantTarifas = this.listaTarifa.length;
    //   } catch (error) {}
    //   this.$q.loading.hide();
    // },
    // async getDetalleTarifa(detail_id) {
    //   this.arrayHistoryDelivery.push(
    //     "Obteniendo detalle tarifa " +
    //       detail_id +
    //       "  (" +
    //       moment().format("LTS") +
    //       ")"
    //   );
    //   const URI =
    //     "https://prod-fatafat-new.jugnoo.in:4030/panel/fare/details?token=" +
    //     this.access_token +
    //     "&detail_id=" +
    //     detail_id;
    //   try {
    //     const res = await this.$axios.get(URI);
    //     let fare_fee = -1;
    //     let fare_distance = [];

    //     if (res.data.fare_details[0].param_id == 1) {
    //       fare_fee = res.data.fare_details[0].fares[0].fares[0].fare_id;
    //     }
    //     if (fare_fee == -1) {
    //       fare_distance = res.data.fare_details[0].fares[0].fares;
    //     } else {
    //       fare_distance = res.data.fare_details[1].fares[0].fares;
    //     }

    //     let obj = {
    //       fare_fee: fare_fee,
    //       fare_1: fare_distance[0].fare_id,
    //       fare_2: fare_distance[1].fare_id,
    //       fare_3: fare_distance[2].fare_id,
    //       fare_4: fare_distance[3].fare_id,
    //       fare_5: fare_distance[4].fare_id,
    //       fare_6: fare_distance[5].fare_id,
    //       fare_7: fare_distance[6].fare_id
    //     };

    //     return obj;
    //   } catch (error) {
    //     console.log("Detalle tarifa", error);
    //     this.arrayHistoryDelivery.push(
    //       "ERROR CON EL detalle tarifa " +
    //         detail_id +
    //         "  (" +
    //         moment().format("LTS") +
    //         ")"
    //     );
    //     this.contadorError++;
    //     return null;
    //   }
    // },
    // async cambiarEstadoTarifa(isActive) {
    //   let msg = isActive == 1 ? "HABILITAR" : "DESACTIVAR";
    //   const pass = prompt("Ingresa la clave para realizar esta acción");
    //   if (pass == "sistemas") {
    //     this.contadorError = 0;
    //     this.disableBtn = true;
    //     this.isOpening = true;
    //     this.arrayHistoryDelivery.push(
    //       "Preparando para " +
    //         msg +
    //         " las tarifas (" +
    //         moment().format("LTS") +
    //         ")"
    //     );
    //     const start = async () => {
    //       await this.asyncForEach(this.listaTarifa, async element => {
    //         await this.actualizarEstadoHttpFare(
    //           element.detail_id,
    //           isActive,
    //           msg
    //         );
    //       });
    //     };
    //     await start();

    //     this.arrayHistoryDelivery.push(
    //       msg + ": Correctamente  (" + moment().format("LTS") + ")"
    //     );

    //     this.disableBtn = false;
    //     this.isOpening = false;
    //   } else {
    //     alert("Clave incorrecta");
    //   }
    // },
    // async actualizarEstadoHttpFare(detail_id, isActive, msg) {
    //   this.arrayHistoryDelivery.push(
    //     msg + " ID: " + detail_id + " (" + moment().format("LTS") + ")"
    //   );
    //   const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/fare/update";
    //   const data = new URLSearchParams();
    //   data.append("detail_id", detail_id);
    //   data.append("is_active", isActive);
    //   data.append("locale", "en");
    //   data.append("token", this.access_token);

    //   try {
    //     const res = await this.$axios.post(URI, data);
    //     console.log(res.data);
    //     if (res.data.message == "Response has been sent successfully") {
    //       this.arrayHistoryDelivery.push(
    //         "Actualizado correctamente ID: " +
    //           detail_id +
    //           " (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //     } else {
    //       this.arrayHistoryDelivery.push(
    //         "No se actualizo ID: " +
    //           detail_id +
    //           " " +
    //           res.data.message +
    //           " (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //     }
    //   } catch (error) {
    //     console.log("ERROR UPDATE TARIFA", error);
    //     this.arrayHistoryDelivery.push(
    //       "OCURRIO UN ERROR CON EL ID: " +
    //         detail_id +
    //         " (" +
    //         moment().format("LTS") +
    //         ")"
    //     );
    //   }
    // },
    // readXlsx() {
    //   if (this.file) {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //       var fileData = e.target.result;
    //       var workbook = XLSX.read(fileData, { type: "binary" });
    //       var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //       var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    //       list = data;
    //       alert("Se cargaron " + list.length + " valores.");
    //     };
    //     reader.onerror = function(ex) {
    //       console.log(ex);
    //     };
    //     reader.readAsBinaryString(this.file);
    //     this.isEnabled = true;
    //   } else {
    //     alert("SELECCIONA UN ARCHIVO");
    //   }
    // },
    // async getListMerchants() {
    //   this.arrayHistoryDelivery.push(
    //     "Obteniendo lista Jugno Merchant... (" + moment().format("LTS") + ")"
    //   );
    //   const time = Date.now();
    //   const URI =
    //     "https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurants?token=" +
    //     this.access_token +
    //     "&secret=P7JlZXiRiIvSssQSSzqs&city=" +
    //     this.citySelect +
    //     "&sEcho=1&iColumns=10&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=" +
    //     this.displayLength +
    //     "&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" +
    //     time;
    //   try {
    //     const res = await this.$axios.get(URI);
    //     // console.log(res);
    //     if (res.data.aaData) {
    //       this.arrayHistoryDelivery.push(
    //         "lista Obtenida Jugno Merchant..." +
    //           res.data.aaData.length +
    //           " (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //       return res.data.aaData;
    //     } else {
    //       return [];
    //     }
    //   } catch (error) {
    //     console.log("Jugno o Actual Merchants", error);
    //   }
    // },

    // async updateFare() {
    //   const pass = prompt("Ingresa la clave para realizar esta acción");
    //   if (pass == "sistemas") {
    //     this.contadorError = 0;
    //     this.disableBtn = true;
    //     this.isOpening = true;
    //     this.arrayHistoryDelivery.push(
    //       "Preparando para actualizar las tarifas (" +
    //         moment().format("LTS") +
    //         ")"
    //     );
    //     const start = async () => {
    //       await this.asyncForEach(this.listaTarifa, async element => {
    //         await this.updateHttpFare(element);
    //       });
    //     };
    //     await start();

    //     this.arrayHistoryDelivery.push(
    //       "Se actualizaron las tarifas  (" + moment().format("LTS") + ")"
    //     );

    //     this.disableBtn = false;
    //     this.isOpening = false;
    //   } else {
    //     alert("Clave incorrecta");
    //   }
    // },
    // async updateHttpFare(tarifa) {
    //   const detalleTarifa = await this.getDetalleTarifa(tarifa.detail_id);
    //   if (detalleTarifa != null) {
    //     const URI =
    //       "https://prod-fatafat-new.jugnoo.in:4030/panel/fare_params/update";
    //     const data = new URLSearchParams();
    //     data.append("token", this.access_token);
    //     data.append("detail_id", tarifa.detail_id);
    //     data.append("city_id", tarifa.city_id);
    //     data.append("vehicle_type", tarifa.vehicle_type);
    //     data.append("user_type", tarifa.user_type);
    //     data.append("customer_id", tarifa.customer_id);
    //     data.append("locale", "en");
    //     data.append("fare_details[0][param_id]", 1);
    //     data.append("fare_details[0][fares][0][start_time]", "00:00:00");
    //     data.append("fare_details[0][fares][0][end_time]", "23:59:59");
    //     data.append(
    //       "fare_details[0][fares][0][fares][0][fare_id]",
    //       detalleTarifa.fare_fee
    //     );
    //     data.append(
    //       "fare_details[0][fares][0][fares][0][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[0][fares][0][fares][0][fixed_fare]",
    //       this.fee
    //     );
    //     data.append("fare_details[0][fares][0][fares][0][lower_limit]", 0);
    //     data.append("fare_details[0][fares][0][fares][0][upper_limit]", -1);

    //     data.append("fare_details[1][param_id]", 2);
    //     data.append("fare_details[1][fares][0][start_time]", "00:00:00");
    //     data.append("fare_details[1][fares][0][end_time]", "23:59:59");
    //     data.append(
    //       "fare_details[1][fares][0][fares][0][fare_id]",
    //       detalleTarifa.fare_1
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][0][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][0][fixed_fare]",
    //       this.tarifa1
    //     );
    //     data.append("fare_details[1][fares][0][fares][0][lower_limit]", 0);
    //     data.append("fare_details[1][fares][0][fares][0][upper_limit]", 3);
    //     data.append(
    //       "fare_details[1][fares][0][fares][1][fare_id]",
    //       detalleTarifa.fare_2
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][1][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][1][fixed_fare]",
    //       this.tarifa2
    //     );
    //     data.append("fare_details[1][fares][0][fares][1][lower_limit]", 3);
    //     data.append("fare_details[1][fares][0][fares][1][upper_limit]", 4);
    //     data.append(
    //       "fare_details[1][fares][0][fares][2][fare_id]",
    //       detalleTarifa.fare_3
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][2][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][2][fixed_fare]",
    //       this.tarifa3
    //     );
    //     data.append("fare_details[1][fares][0][fares][2][lower_limit]", 4);
    //     data.append("fare_details[1][fares][0][fares][2][upper_limit]", 5);
    //     data.append(
    //       "fare_details[1][fares][0][fares][3][fare_id]",
    //       detalleTarifa.fare_4
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][3][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][3][fixed_fare]",
    //       this.tarifa4
    //     );
    //     data.append("fare_details[1][fares][0][fares][3][lower_limit]", 5);
    //     data.append("fare_details[1][fares][0][fares][3][upper_limit]", 6);
    //     data.append(
    //       "fare_details[1][fares][0][fares][4][fare_id]",
    //       detalleTarifa.fare_5
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][4][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][4][fixed_fare]",
    //       this.tarifa5
    //     );
    //     data.append("fare_details[1][fares][0][fares][4][lower_limit]", 6);
    //     data.append("fare_details[1][fares][0][fares][4][upper_limit]", 7);
    //     data.append(
    //       "fare_details[1][fares][0][fares][5][fare_id]",
    //       detalleTarifa.fare_6
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][5][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][5][fixed_fare]",
    //       this.tarifa6
    //     );
    //     data.append("fare_details[1][fares][0][fares][5][lower_limit]", 7);
    //     data.append("fare_details[1][fares][0][fares][5][upper_limit]", 8);
    //     data.append(
    //       "fare_details[1][fares][0][fares][6][fare_id]",
    //       detalleTarifa.fare_7
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][6][fare_per_unit_value]",
    //       0
    //     );
    //     data.append(
    //       "fare_details[1][fares][0][fares][6][fixed_fare]",
    //       this.tarifa7
    //     );
    //     data.append("fare_details[1][fares][0][fares][6][lower_limit]", 8);
    //     data.append("fare_details[1][fares][0][fares][6][upper_limit]", -1);

    //     try {
    //       this.arrayHistoryDelivery.push(
    //         "Cambiando la tarifa " +
    //           tarifa.detail_id +
    //           "  (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //       const res = await this.$axios.post(URI, data);
    //       // console.log(res.data);
    //       if (res.data.message == "Response has been sent successfully") {
    //         this.arrayHistoryDelivery.push(
    //           "Actualizado correctamente la tarifa " +
    //             tarifa.detail_id +
    //             "  (" +
    //             moment().format("LTS") +
    //             ")"
    //         );
    //       } else {
    //         this.arrayHistoryDelivery.push(
    //           "NO SE ACTUALIZO " +
    //             res.data.message +
    //             " " +
    //             tarifa.detail_id +
    //             "  (" +
    //             moment().format("LTS") +
    //             ")"
    //         );
    //         this.contadorError++;
    //       }
    //     } catch (error) {
    //       console.log("ERROR al actualizar ID " + tarifa.detail_id, error);
    //       this.arrayHistoryDelivery.push(
    //         "ERROR AL CAMBIAR la tarifa " +
    //           detalleTarifa.detail_id +
    //           "  (" +
    //           moment().format("LTS") +
    //           ")"
    //       );
    //       this.contadorError++;
    //     }
    //   } else {
    //     this.arrayHistoryDelivery.push(
    //       "Continuando con el siguiente... (" + moment().format("LTS") + ")"
    //     );
    //   }
    // },
    // async updateHttpMerchant(id) {
    //   const URI =
    //     "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
    //   try {
    //     let data = new URLSearchParams();
    //     data.append("restaurant_id", id);
    //     data.append("request_radius", this.fee);
    //     data.append("token", this.access_token);
    //     const res = await this.$axios({
    //       url: URI,
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    //       },
    //       data: data
    //     });
    //     this.arrayHistoryDelivery.push(
    //       "ID " +
    //         id +
    //         ": " +
    //         res.data.message +
    //         " (" +
    //         moment().format("LTS") +
    //         ")"
    //     );
    //   } catch (error) {
    //     console.log("Update Merchant ", error);
    //   }
    //   this.disableBtn = false;
    //   this.isOpening = false;
    // }
  }
};
</script>
