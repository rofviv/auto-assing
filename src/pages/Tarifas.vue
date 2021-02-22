<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">Tarifas estructura</div>
    <!-- <q-radio v-model="cerrarTodos" :val="true" label="Limitar Todos" />
    <q-radio v-model="cerrarTodos" :val="false" label="Limitar con Excel" /> -->
    <template v-if="!cerrarTodos">
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
    </template>
    <template v-else>
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
      <!-- <div class="row">
      
      <div class="col-6"> -->
      <div class="row">
        <div class="col-4">
          <div class="text-h6">Tarifas estructura</div>
          <div class="text-subtitle2">No incluye las tarifas Globales</div>
          <div class="text-subtitle2">
            Se cambiaran {{ cantTarifas }} tarifas
          </div>
        </div>
      </div>
    </template>
    <div class="col-3">
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
    </div>
    <br />
    <div class="row">
      <div class="col-3">
        <q-btn color="green" :disable="disableBtn" @click="updateFare"
          >Ejecutar Proceso</q-btn
        >
      </div>
      <div class="col-3">
        <q-btn color="red" :disable="disableBtn" @click="cambiarEstadoTarifa(0)"
          >Deshabilitar Todo</q-btn
        >
      </div>
      <div class="col-3">
        <q-btn
          color="blue"
          :disable="disableBtn"
          @click="cambiarEstadoTarifa(1)"
          >Habilitar Todo</q-btn
        >
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <template v-if="isOpening">
          <div>
            Actualizando cobertura...
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
import XLSX from "xlsx";
import moment from "moment";
var list = [];
export default {
  name: "AutoAssign",
  created() {
    this.getTarifas();
  },
  data() {
    return {
      cantTarifas: 0,

      tarifa1: 10,
      tarifa2: 12,
      tarifa3: 14,
      tarifa4: 16,
      tarifa5: 18,
      tarifa6: 20,
      tarifa7: 25,

      cerrarTodos: true,
      file: null,
      merchantList: [],
      texto: "",
      disableBtn: false,
      fee: 0,
      isOpening: false,

      isEnabled: true,
      active: false,
      arrayHistoryDelivery: [],

      // access_token: "5e26d40edd82f1035e8fe0d12e7304df",
      access_token: "bb6747c16dcb2a870caa1379f0c34049",
      displayLength: 10000,
      citySelect: 704,
      cityOptions: [
        { city: "Santa Cruz", id: 395 },
        { city: "Cochabamba", id: 704 },
        { city: "La Paz", id: 818 },
        { city: "El Alto", id: 3265 },
        { city: "Tarija", id: 859 },
        { city: "Villa Imperial de Potosí", id: 1796 },
        { city: "Sucre", id: 933 },
        { city: "Arequipa", id: 786 },
        { city: "Montevideo", id: 997 },
        { city: "San José de Mayo", id: 3190 },
        { city: "Juliaca", id: 3262 }
      ],

      listaTarifa: [],
      contadorError: 0
    };
  },
  methods: {
    async getTarifas() {
      this.listaTarifa = [];
      this.$q.loading.show();
      const URI =
        "https://prod-fatafat-new.jugnoo.in:4030/panel/fares_details?token=" +
        this.access_token;
      try {
        const res = await this.$axios.get(URI);

        res.data.fares_list.forEach(element => {
          if (
            element.city_id == this.citySelect &&
            element.customer_name != "GLOBAL"
          ) {
            this.listaTarifa.push(element);
          }
        });
        // console.log(res.data.fares_list.length)
        // console.log(this.listaTarifa.length)
        this.cantTarifas = this.listaTarifa.length;
      } catch (error) {}
      this.$q.loading.hide();
    },
    async getDetalleTarifa(detail_id) {
      this.arrayHistoryDelivery.push(
        "Obteniendo detalle tarifa " +
          detail_id +
          "  (" +
          moment().format("LTS") +
          ")"
      );
      const URI =
        "https://prod-fatafat-new.jugnoo.in:4030/panel/fare/details?token=" +
        this.access_token +
        "&detail_id=" +
        detail_id;
      try {
        const res = await this.$axios.get(URI);
        let fare_fee = -1;
        let fare_distance = [];

        if (res.data.fare_details[0].param_id == 1) {
          fare_fee = res.data.fare_details[0].fares[0].fares[0].fare_id;
        }
        if (fare_fee == -1) {
          fare_distance = res.data.fare_details[0].fares[0].fares;
        } else {
          fare_distance = res.data.fare_details[1].fares[0].fares;
        }

        let obj = {
          fare_fee: fare_fee,
          fare_1: fare_distance[0].fare_id,
          fare_2: fare_distance[1].fare_id,
          fare_3: fare_distance[2].fare_id,
          fare_4: fare_distance[3].fare_id,
          fare_5: fare_distance[4].fare_id,
          fare_6: fare_distance[5].fare_id,
          fare_7: fare_distance[6].fare_id
        };

        return obj;
      } catch (error) {
        console.log("Detalle tarifa", error);
        this.arrayHistoryDelivery.push(
          "ERROR CON EL detalle tarifa " +
            detail_id +
            "  (" +
            moment().format("LTS") +
            ")"
        );
        this.contadorError++;
        return null;
      }
    },
    async cambiarEstadoTarifa(isActive) {
      let msg = isActive == 1 ? "HABILITAR" : "DESACTIVAR";
      const pass = prompt("Ingresa la clave para realizar esta acción");
      if (pass == "sistemas") {
        this.contadorError = 0;
        this.disableBtn = true;
        this.isOpening = true;
        this.arrayHistoryDelivery.push(
          "Preparando para " +
            msg +
            " las tarifas (" +
            moment().format("LTS") +
            ")"
        );
        const start = async () => {
          await this.asyncForEach(this.listaTarifa, async element => {
            await this.actualizarEstadoHttpFare(
              element.detail_id,
              isActive,
              msg
            );
          });
        };
        await start();

        this.arrayHistoryDelivery.push(
          msg + ": Correctamente  (" + moment().format("LTS") + ")"
        );

        this.disableBtn = false;
        this.isOpening = false;
      } else {
        alert("Clave incorrecta");
      }
    },
    async actualizarEstadoHttpFare(detail_id, isActive, msg) {
      this.arrayHistoryDelivery.push(
        msg + " ID: " + detail_id + " (" + moment().format("LTS") + ")"
      );
      const URI = "https://prod-fatafat-new.jugnoo.in:4030/panel/fare/update";
      const data = new URLSearchParams();
      data.append("detail_id", detail_id);
      data.append("is_active", isActive);
      data.append("locale", "en");
      data.append("token", this.access_token);

      try {
        const res = await this.$axios.post(URI, data);
        console.log(res.data);
        if (res.data.message == "Response has been sent successfully") {
          this.arrayHistoryDelivery.push(
            "Actualizado correctamente ID: " +
              detail_id +
              " (" +
              moment().format("LTS") +
              ")"
          );
        } else {
          this.arrayHistoryDelivery.push(
            "No se actualizo ID: " +
              detail_id +
              " " +
              res.data.message +
              " (" +
              moment().format("LTS") +
              ")"
          );
        }
      } catch (error) {
        console.log("ERROR UPDATE TARIFA", error);
        this.arrayHistoryDelivery.push(
          "OCURRIO UN ERROR CON EL ID: " +
            detail_id +
            " (" +
            moment().format("LTS") +
            ")"
        );
      }
    },
    readXlsx() {
      if (this.file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var fileData = e.target.result;
          var workbook = XLSX.read(fileData, { type: "binary" });
          var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
          var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
          list = data;
          alert("Se cargaron " + list.length + " valores.");
        };
        reader.onerror = function(ex) {
          console.log(ex);
        };
        reader.readAsBinaryString(this.file);
        this.isEnabled = true;
      } else {
        alert("SELECCIONA UN ARCHIVO");
      }
    },
    async getListMerchants() {
      this.arrayHistoryDelivery.push(
        "Obteniendo lista Jugno Merchant... (" + moment().format("LTS") + ")"
      );
      const time = Date.now();
      const URI =
        "https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurants?token=" +
        this.access_token +
        "&secret=P7JlZXiRiIvSssQSSzqs&city=" +
        this.citySelect +
        "&sEcho=1&iColumns=10&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=" +
        this.displayLength +
        "&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=" +
        time;
      try {
        const res = await this.$axios.get(URI);
        // console.log(res);
        if (res.data.aaData) {
          this.arrayHistoryDelivery.push(
            "lista Obtenida Jugno Merchant..." +
              res.data.aaData.length +
              " (" +
              moment().format("LTS") +
              ")"
          );
          return res.data.aaData;
        } else {
          return [];
        }
      } catch (error) {
        console.log("Jugno o Actual Merchants", error);
      }
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
        this.texto = index + 1 + " de " + array.length;
      }
    },
    async updateFare() {
      const pass = prompt("Ingresa la clave para realizar esta acción");
      if (pass == "sistemas") {
        this.contadorError = 0;
        this.disableBtn = true;
        this.isOpening = true;
        this.arrayHistoryDelivery.push(
          "Preparando para actualizar las tarifas (" +
            moment().format("LTS") +
            ")"
        );
        const start = async () => {
          await this.asyncForEach(this.listaTarifa, async element => {
            await this.updateHttpFare(element);
          });
        };
        await start();

        this.arrayHistoryDelivery.push(
          "Se actualizaron las tarifas  (" + moment().format("LTS") + ")"
        );

        this.disableBtn = false;
        this.isOpening = false;
      } else {
        alert("Clave incorrecta");
      }
    },
    async updateHttpFare(tarifa) {
      const detalleTarifa = await this.getDetalleTarifa(tarifa.detail_id);
      if (detalleTarifa != null) {
        const URI =
          "https://prod-fatafat-new.jugnoo.in:4030/panel/fare_params/update";
        const data = new URLSearchParams();
        data.append("token", this.access_token);
        data.append("detail_id", tarifa.detail_id);
        data.append("city_id", tarifa.city_id);
        data.append("vehicle_type", tarifa.vehicle_type);
        data.append("user_type", tarifa.user_type);
        data.append("customer_id", tarifa.customer_id);
        data.append("locale", "en");
        data.append("fare_details[0][param_id]", 1);
        data.append("fare_details[0][fares][0][start_time]", "00:00:00");
        data.append("fare_details[0][fares][0][end_time]", "23:59:59");
        data.append(
          "fare_details[0][fares][0][fares][0][fare_id]",
          detalleTarifa.fare_fee
        );
        data.append(
          "fare_details[0][fares][0][fares][0][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[0][fares][0][fares][0][fixed_fare]",
          this.fee
        );
        data.append("fare_details[0][fares][0][fares][0][lower_limit]", 0);
        data.append("fare_details[0][fares][0][fares][0][upper_limit]", -1);

        data.append("fare_details[1][param_id]", 2);
        data.append("fare_details[1][fares][0][start_time]", "00:00:00");
        data.append("fare_details[1][fares][0][end_time]", "23:59:59");
        data.append(
          "fare_details[1][fares][0][fares][0][fare_id]",
          detalleTarifa.fare_1
        );
        data.append(
          "fare_details[1][fares][0][fares][0][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][0][fixed_fare]",
          this.tarifa1
        );
        data.append("fare_details[1][fares][0][fares][0][lower_limit]", 0);
        data.append("fare_details[1][fares][0][fares][0][upper_limit]", 3);
        data.append(
          "fare_details[1][fares][0][fares][1][fare_id]",
          detalleTarifa.fare_2
        );
        data.append(
          "fare_details[1][fares][0][fares][1][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][1][fixed_fare]",
          this.tarifa2
        );
        data.append("fare_details[1][fares][0][fares][1][lower_limit]", 3);
        data.append("fare_details[1][fares][0][fares][1][upper_limit]", 4);
        data.append(
          "fare_details[1][fares][0][fares][2][fare_id]",
          detalleTarifa.fare_3
        );
        data.append(
          "fare_details[1][fares][0][fares][2][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][2][fixed_fare]",
          this.tarifa3
        );
        data.append("fare_details[1][fares][0][fares][2][lower_limit]", 4);
        data.append("fare_details[1][fares][0][fares][2][upper_limit]", 5);
        data.append(
          "fare_details[1][fares][0][fares][3][fare_id]",
          detalleTarifa.fare_4
        );
        data.append(
          "fare_details[1][fares][0][fares][3][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][3][fixed_fare]",
          this.tarifa4
        );
        data.append("fare_details[1][fares][0][fares][3][lower_limit]", 5);
        data.append("fare_details[1][fares][0][fares][3][upper_limit]", 6);
        data.append(
          "fare_details[1][fares][0][fares][4][fare_id]",
          detalleTarifa.fare_5
        );
        data.append(
          "fare_details[1][fares][0][fares][4][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][4][fixed_fare]",
          this.tarifa5
        );
        data.append("fare_details[1][fares][0][fares][4][lower_limit]", 6);
        data.append("fare_details[1][fares][0][fares][4][upper_limit]", 7);
        data.append(
          "fare_details[1][fares][0][fares][5][fare_id]",
          detalleTarifa.fare_6
        );
        data.append(
          "fare_details[1][fares][0][fares][5][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][5][fixed_fare]",
          this.tarifa6
        );
        data.append("fare_details[1][fares][0][fares][5][lower_limit]", 7);
        data.append("fare_details[1][fares][0][fares][5][upper_limit]", 8);
        data.append(
          "fare_details[1][fares][0][fares][6][fare_id]",
          detalleTarifa.fare_7
        );
        data.append(
          "fare_details[1][fares][0][fares][6][fare_per_unit_value]",
          0
        );
        data.append(
          "fare_details[1][fares][0][fares][6][fixed_fare]",
          this.tarifa7
        );
        data.append("fare_details[1][fares][0][fares][6][lower_limit]", 8);
        data.append("fare_details[1][fares][0][fares][6][upper_limit]", -1);

        try {
          this.arrayHistoryDelivery.push(
            "Cambiando la tarifa " +
              tarifa.detail_id +
              "  (" +
              moment().format("LTS") +
              ")"
          );
          const res = await this.$axios.post(URI, data);
          // console.log(res.data);
          if (res.data.message == "Response has been sent successfully") {
            this.arrayHistoryDelivery.push(
              "Actualizado correctamente la tarifa " +
                tarifa.detail_id +
                "  (" +
                moment().format("LTS") +
                ")"
            );
          } else {
            this.arrayHistoryDelivery.push(
              "NO SE ACTUALIZO " +
                res.data.message +
                " " +
                tarifa.detail_id +
                "  (" +
                moment().format("LTS") +
                ")"
            );
            this.contadorError++;
          }
        } catch (error) {
          console.log("ERROR al actualizar ID " + tarifa.detail_id, error);
          this.arrayHistoryDelivery.push(
            "ERROR AL CAMBIAR la tarifa " +
              detalleTarifa.detail_id +
              "  (" +
              moment().format("LTS") +
              ")"
          );
          this.contadorError++;
        }
      } else {
        this.arrayHistoryDelivery.push(
          "Continuando con el siguiente... (" + moment().format("LTS") + ")"
        );
      }
    },
    async updateHttpMerchant(id) {
      const URI =
        "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
      try {
        let data = new URLSearchParams();
        data.append("restaurant_id", id);
        data.append("request_radius", this.fee);
        data.append("token", this.access_token);
        const res = await this.$axios({
          url: URI,
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          data: data
        });
        this.arrayHistoryDelivery.push(
          "ID " +
            id +
            ": " +
            res.data.message +
            " (" +
            moment().format("LTS") +
            ")"
        );
      } catch (error) {
        console.log("Update Merchant ", error);
      }
      this.disableBtn = false;
      this.isOpening = false;
    }
  }
};
</script>
