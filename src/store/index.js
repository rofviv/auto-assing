import Vue from 'vue'
import Vuex from 'vuex'
import { orderHistory } from './orderHistory';

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      orderHistory,
    },
    strict: false
  })

  return Store
}
