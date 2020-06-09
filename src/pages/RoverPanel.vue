<template>
  <q-page>
    <div class="row">
      <div class="col-4 shadow-3">
        <div class="" style="width: 100%">
          <q-tabs v-model="tab" inline-label class="bg-primary text-white shadow-2">
            <q-tab name="mails" icon="adb" label="Rover 01">
              <q-badge color="red" floating>2</q-badge>
            </q-tab>
            <q-tab name="alarms" icon="adb" label="Rover 02">
              <q-badge color="red" floating>10+</q-badge>
            </q-tab>
            <q-tab name="movies" icon="adb" label="Rover 03">
              <q-badge color="red" floating>0</q-badge>
            </q-tab>
          </q-tabs>
        </div>
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" src="../statics/rover.png" />
            </q-card-section>
            <q-card-section class="col-7 q-pt-xs">
              <div class="text-overline" style="color: green;">Online</div>
              <div class="text-h5 q-mt-sm q-mb-sm">Rover 01</div>
              <div class="text-grey">
                <!-- <p>Último pedido hace 25 minutos</p> -->
                <p>Con pedido ID 54343 hace 15 minutos</p>
                <div class="row justify-center items-center">
                  <div class="col-2">
                    <q-icon size="24px" name="battery_charging_full" />
                  </div>
                  <div class="col text-caption">57%</div>
                </div>
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="store" />
            <q-btn flat>Detalles</q-btn>
            <q-btn flat color="primary">Configuración</q-btn>
            <q-space />
            <q-btn flat color="grey" icon="refresh" />
          </q-card-actions>
        </q-card>
        <div style="height: 400px; width: auto" >
          <q-list bordered separator>
            <q-item v-for="(item, index) in orderList" :key="index">
              <q-item-section>
                <q-item-label>ID {{ item.order_id }}</q-item-label>
                <q-item-label caption>{{ item.merchant }}</q-item-label>
                <q-item-label caption>Registrado: {{ date.formatDate(item.created_at, 'D MMM hh:mm a') }}</q-item-label>
                <q-item-label :class="`order ${item.status}`">{{ item.status }}</q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="info" />
                  <q-btn size="12px" flat dense round icon="more_vert" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-8">
        <map-rover />
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import MapRover from "./MapRover.vue";

export default {
  components: { "map-rover" : MapRover },
  data() {
    return {
      date: date,
      tab: "mails",
      orderList: [
        { order_id: 54343, merchant: "Burger King Blacutt", created_at: new Date(), status: 'Confirmado' },
        { order_id: 54354, merchant: "Toby Blacutt", created_at: new Date(), status: 'Pendiente' }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.q-card .my-card {
  width: 100%;
  max-width: 300px;
}

.order.Pendiente {
  color: red;
}

.order.Confirmado {
  color: green;
}
</style>