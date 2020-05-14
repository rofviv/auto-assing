<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h6">LIMITAR COBERTURA</div>
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
            <div class="text-h6">MANUALMENTE</div>
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col-4">
            {{ texto }}
          </div>
          <div class="col-3">
            <q-input type="number" :disable="disableBtn" outlined v-model="kilometros" label="Kilometro" />
          </div>
          <div class="col-3">
              <q-btn color="green" :disable="disableBtn" @click="updateMerchant">Aplicar</q-btn>
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
  data() {
    return {
      file: null,
      merchantList: [],
      texto: '',
      disableBtn: false,
      kilometros: 7,
      isOpening: false,

      isEnabled: false,
      active: false,
      arrayHistoryDelivery: [],
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
    async updateMerchant() {
      this.merchantList = list;
      if (this.merchantList.length > 0) {
        if (this.kilometros != '') {
          this.disableBtn = true;
          this.isOpening = true;
          this.arrayHistoryDelivery.push("Cambiando el radio de cobertura a "+ this.kilometros + " Km (" + moment().format('LTS') + ")");
          const start = async () => {
            await this.asyncForEach(this.merchantList, async element => {
              await this.updateHttpMerchant(element[0], 1);
            });
            this.arrayHistoryDelivery.push("Se cambio correctamente a " + this.kilometros + " Km... (" + moment().format('LTS') + ")");
          }
          start();
        } else {
          alert('ESPECIFICA LOS KILOMETROS');  
        }
      } else {
        alert('DEBES CARGAR UN DOCUMENTO');
      }
    },
    async updateHttpMerchant(id, value) {
      const URI = "https://prod-fresh-api.jugnoo.in:4040/update_restaurant_profile";
      try {
          let data = new URLSearchParams();
          data.append('restaurant_id', id);
          data.append('request_radius', this.kilometros);
          data.append('token', 'b3de8bde6886e4695cbf5f23fcc363fa');
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
      this.isOpening = false;
    },
  }
};
</script>
