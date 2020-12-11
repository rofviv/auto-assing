<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          PatioService
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menú de Navegación</q-item-label>
        <q-item exact clickable :to="{'name': 'autoassign'}">
          <q-item-section avatar>
            <q-icon name="autorenew" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto Asignar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'promo-carrera'}">
          <q-item-section avatar>
            <q-icon name="monetization_on" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Recarga carrera promoción</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'automatic'}">
          <q-item-section avatar>
            <q-icon name="lock_open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Abrir y Cerrar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'limitar'}">
          <q-item-section avatar>
            <q-icon name="zoom_out_map" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Limitar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'callcenter'}">
          <q-item-section avatar>
            <q-icon name="call" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Call Center</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'path': '/callcenter/sesion/kiky'}">
          <q-item-section avatar>
            <q-icon name="store" />
          </q-item-section>
          <q-item-section>
            <q-item-label>KIKY Call Center</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'customize'}">
          <q-item-section avatar>
            <q-icon name="add_ic_call" />
          </q-item-section>
          <q-item-section>
            <q-item-label>A la carta</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'rover'}">
          <q-item-section avatar>
            <q-icon name="adb" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rover Panel</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
