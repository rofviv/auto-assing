import Vue from 'vue'
import Vuex from 'vuex'
import { orderHistory } from './orderHistory';
import { address } from './address';
import { geolocalizacion } from './geolocalizacion';

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      orderHistory,
      address,
      geolocalizacion
    },
    strict: false
  })

  return Store
}
