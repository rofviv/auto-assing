<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">LIMITAR COBERTURA</div>
    <q-radio v-model="cerrarTodos" :val="true" label="Limitar Todos" />
    <q-radio v-model="cerrarTodos" :val="false" label="Limitar con Excel" />
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
      ></q-select>
      <q-separator class="q-my-md"></q-separator>
      <!-- <div class="row">
      
      <div class="col-6"> -->
      <div class="row">
        <div class="col-4">
          <div class="text-h6">Limitar Todos</div>
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-4">
          {{ texto }}
        </div>
        
      </div>
    </template>
    <div class="col-3">
          <q-input
            type="number"
            :disable="disableBtn"
            outlined
            v-model="kilometros"
            label="Kilometro"
          />
        </div>
        <div class="col-3">
          <q-btn color="green" :disable="disableBtn" @click="updateMerchant"
            >Aplicar</q-btn
          >
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
    <div class="row">
      <div class="col-11">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Historial</div>
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
  data() {
    return {
      cerrarTodos: true,
      file: null,
      merchantList: [],
      texto: "",
      disableBtn: false,
      kilometros: 7,
      isOpening: false,

      isEnabled: true,
      active: false,
      arrayHistoryDelivery: [],

      // access_token: "5e26d40edd82f1035e8fe0d12e7304df",
      access_token: "bb6747c16dcb2a870caa1379f0c34049",
      displayLength: 10000,
      citySelect: 395,
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
      ]
    };
  },
  methods: {
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
    async updateMerchant() {
      const texto = prompt("Ingresa la clave para realizar esta acción");
      if (texto == "sistemas") {
        if (this.cerrarTodos) {
          this.arrayHistoryDelivery.push(
            "Limitar TODOS (" + moment().format("LTS") + ")"
          );
          this.merchantList = await this.getListMerchants();
        } else {
          if (list.length > 0) {
            this.arrayHistoryDelivery.push(
              "Limitar con EXCEL (" + moment().format("LTS") + ")"
            );
            this.merchantList = list;
          } else {
            alert("Debes cargar un excel con los ID")
          }
        }
        console.log("Locales cargados", this.merchantList);
        if (this.merchantList.length > 0) {
          if (this.kilometros != "") {
            this.disableBtn = true;
            this.isOpening = true;
            this.arrayHistoryDelivery.push(
              "Cambiando el radio de cobertura a " +
                this.kilometros +
                " Km (" +
                moment().format("LTS") +
                ")"
            );
            const start = async () => {
              await this.asyncForEach(this.merchantList, async element => {
                await this.updateHttpMerchant(element[0]);
              });
              this.arrayHistoryDelivery.push(
                "Se cambio correctamente a " +
                  this.kilometros +
                  " Km... (" +
                  moment().format("LTS") +
                  ")"
              );
            };
            await start();
          } else {
            alert("ESPECIFICA LOS KILOMETROS");
          }
        } else {
          alert("No se obtuvi ningun restaurante");
        }
      } else {
        alert("Clave incorrecta");
      }
    },
    async updateHttpMerchant(id) {
      const URI =
        "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
      try {
        let data = new URLSearchParams();
        data.append("restaurant_id", id);
        data.append("request_radius", this.kilometros);
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
