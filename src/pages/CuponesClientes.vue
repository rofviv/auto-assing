<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">Clientes Cupones</div>
    <q-input outlined v-model="fechaActual" label="Fecha Actual" />
    <br />
    <div class="row">
      <div class="col-3">
        <q-btn color="green" :disable="disableBtn" @click="getReporteDescargar"
          >Ejecutar acción</q-btn
        >
      </div>
      <div class="col-3">
        <q-btn
          color="blue"
          :loading="loadBtn"
          :disable="datosNoCargados"
          @click="ejecutarProceso"
          >Guardar y enviar push</q-btn
        >
      </div>
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
  </q-page>
</template>

<script>
import moment from "moment";
moment.locale("es");

var FileSaver = require("file-saver");
var XLSX = require("xlsx");

var list = [
    {
      celular_cliente: "59177640687",
      ciudad: "Santa Cruz",
      email_cliente: "royvillarroel94@gmail.com", 
      id_cliente: "9438842",
      nombre_cliente: "Roy",
      registrado_en: "2021-04-08 23:28:08"
    },
    {
      celular_cliente: "59177813327",
      ciudad: "Santa Cruz",
      email_cliente: "jaibanez-es@udabol.edu.bo", 
      id_cliente: "9734347",
      nombre_cliente: "Alejandro",
      registrado_en: "2021-04-08 23:28:08"
    }
];

export default {
  name: "AutoAssign",
  created() {
    this.fechaActual = moment().subtract(1, 'days').format("YYYY-MM-DD");
  },
  data() {
    return {
      texto: "",
      disableBtn: false,
      loadBtn: false,
      arrayHistoryDelivery: [],
      contadorError: 0,

      datosNoCargados: true,

      fechaActual: "",
      listaClientesInactivos: list,
      mensajePromo: "Te regalamos un cupón de 10Bs en tu primer pedido en Patio válido por 5 días",
      order_offer_id: 5807,
      token: "83c61c67c064fab7a8be68ead432c51a",
    };
  },
  methods: {
    async getReporteDescargar() {
      let r = prompt("Introduce la contraseña");
      if (r == "sistemas") {
        this.$q.loading.show();
        this.arrayHistoryDelivery.push(
          "Obteniendo clientes INACTIVOS fecha " +
            this.fechaActual +
            " (" +
            moment().format("LTS") +
            ")"
        );
        const URI =
          "https://patioserviceonline.com/api/v1/controllers/erpController.php?type=get_reportes_detalle";
        const params = new URLSearchParams();
        params.append("fecha_inicio", this.fechaActual);
        params.append("fecha_fin", this.fechaActual);
        params.append("ciudad", "");
        params.append("tipo", 'clientes_registrados_inactivos_cupones');

        try {
          const res = await this.$axios.post(URI, params);
          this.exportToExcel(res.data, "ClientesInactivos_" + this.fechaActual);
          this.listaClientesInactivos = res.data;
          this.arrayHistoryDelivery.push(
            "Archivo descargado, Total de " + this.listaClientesInactivos.length + " clientes INACTIVOS  (" +
              moment().format("LTS") +
              ")"
          );
          this.datosNoCargados = false;
          this.arrayHistoryDelivery.push(
            "Primera tarea finalizada  (" +
              moment().format("LTS") +
              ")"
          );
        } catch (error) {
          console.log("ERROR AL DESCARGAR", error)
          this.contadorError++;
          this.arrayHistoryDelivery.push(
            "ERROR! al obtener los clientes " + error + " (" +
              moment().format("LTS") +
              ")"
          );
        }
        this.$q.loading.hide();
      } else {
        alert("Incorrecto");
      }
    },
    async ejecutarProceso() {
      await this.enviarCupon();
      await this.enviarPush();
      // await this.enviarMailMasivo();
      await this.enviarSMSMasivo();
    },
    async enviarCupon() {
      let fechaExpiracion = moment().add(5, "days").format("YYYY-MM-DD HH:mm:ss");
      this.arrayHistoryDelivery.push(
          "Enviando cupones con fecha de expiracion " +
            fechaExpiracion +
            " (" +
            moment().format("LTS") +
            ")"
        );
      const URI = "https://prod-fresh-api.jugnoo.in:4040/panel/coupon/add_users";
      const params = new URLSearchParams();
      params.append("order_offer_id", this.order_offer_id)
      params.append("expiry_date", fechaExpiracion)
      params.append("reason", "Cliente registrado")
      this.listaClientesInactivos.forEach((cli) => {
        params.append("user_ids[]", cli.id_cliente);
      });
      params.append("locale", "en")
      params.append("token", this.token)
      try {
        const res = await this.$axios.post(URI, params);
        console.log("Cupones", res.data);
        this.arrayHistoryDelivery.push(
          "Cupones enviados " + res.data.message + " (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("Enviar Cupones", error);
        this.contadorError++;
        this.arrayHistoryDelivery.push(
          "ERROR! al enviar cupon " + error + " (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async enviarPush() {
      this.arrayHistoryDelivery.push(
          "Enviando Push a los clientes (" +
            moment().format("LTS") +
            ")"
        );
      const URI = "https://api-panels.jugnoo.in:8020/contact_customers";
      const params = new URLSearchParams();
      params.append("type", "2")
      params.append("message", this.mensajePromo)
      params.append("sent_from", "super-admin-panel")

      for (let index = 0; index < this.listaClientesInactivos.length; index++) {
        const element = this.listaClientesInactivos[index];
        params.append("user_ids["+ index +"][user_id]", element.id_cliente)
      }

      params.append("token", this.token)

      try {
        const res = await this.$axios.post(URI, params);
        console.log("push", res.data);
        this.arrayHistoryDelivery.push(
          "Push enviados " + res.data.message + " (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("Enviar push", error);
        this.contadorError++;
        this.arrayHistoryDelivery.push(
          "ERROR! al enviar push " + error + " (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    async enviarMailMasivo() {
      // enviar SMS
    },
    async enviarSMSMasivo() {
      this.arrayHistoryDelivery.push(
          "Preparando para enviar SMS (" +
            moment().format("LTS") +
            ")"
        );
      const start = async () => {
        await this.asyncForEach(this.listaClientesInactivos, async element => {
          await this.enviarSMS(element.celular_cliente);
        });
      };
      await start();
      this.arrayHistoryDelivery.push(
          "SMS Tarea finalizada (" +
            moment().format("LTS") +
            ")"
        );
    },
    async enviarSMS(telefono) {
      this.arrayHistoryDelivery.push(
          "Enviando SMS " + telefono + " (" +
            moment().format("LTS") +
            ")"
        );
      // const URI = "https://patioserviceonline.com/sms/api2304";
      const data = JSON.stringify({"phone_number":telefono,"sms_message":this.mensajePromo});
      let config = {
          method: 'post',
          url: 'https://patioserviceonline.com/sms/api2304/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
      try {
        // const res = await this.$axios.post(URI, params);
        const res = await this.$axios(config);
        console.log(res.data);
        this.arrayHistoryDelivery.push(
          "SMS enviado " + telefono + " " + res.data.message +" (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("Enviar SMS " + telefono, error);
        this.contadorError++;
        this.arrayHistoryDelivery.push(
          "ERROR! al enviar SMS  " + telefono + " -> " + error + " (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    exportToExcel(json, excelFileName) {
      const worksheet = XLSX.utils.json_to_sheet(json);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcel(excelBuffer, excelFileName);
    },
    saveAsExcel(buffer, fileName) {
      const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
      const data = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + ".xlsx");
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>
