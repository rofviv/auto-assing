import Vue from 'vue'
import Vuex from 'vuex'
import { orderHistory } from './orderHistory';
import { address } from './address';

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      orderHistory,
      address
    },
    strict: false
  })

  return Store
}
