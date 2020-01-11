<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
            <q-item-label>Auto Asignar SC</q-item-label>
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{'name': 'autoassign-lp'}">
          <q-item-section avatar>
            <q-icon name="autorenew" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto Asignar LP</q-item-label>
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
        <q-item exact clickable :to="{'name': 'customize'}">
          <q-item-section avatar>
            <q-icon name="call" />
          </q-item-section>
          <q-item-section>
            <q-item-label>A la carta</q-item-label>
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
