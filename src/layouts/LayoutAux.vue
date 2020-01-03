<template>
  <q-layout view="hhh lpR fFf">
      <q-toolbar class="text-grey">

        <q-toolbar-title>
          Call Center
        </q-toolbar-title>

      </q-toolbar>

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
