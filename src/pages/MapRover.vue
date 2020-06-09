<template>
  <q-page>
    <div style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;">
      <l-map
        ref="myMap"
        style="z-index:0"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: false}"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <!-- <l-marker :lat-lng="center_origen" :icon="icon_origen"></l-marker>
        <l-marker :lat-lng="center_destino" :icon="icon_destino"></l-marker> -->
        <l-marker :lat-lng="center" :icon="icon_driver"></l-marker>
      </l-map>
    </div>
  </q-page>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker
  },
  data() {
    return {
      zoom: 13,
      url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [-17.783384, -63.18203],

      icon_driver: L.icon({
        iconUrl: 'http://patioserviceonline.com/sc' + '/statics/marker-driver.png',
        // iconUrl: '/statics/marker-driver.png',
        // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [64, 64],
        // shadowSize:   [50, 64], 
        iconAnchor:   [30, 64],
        // shadowAnchor: [4, 62], 
        // popupAnchor:  [-3, -76] 
      }),
    };
  }
};
</script>