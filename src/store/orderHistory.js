import { LocalStorage } from 'quasar'

export const orderHistory = {
    namespaced: true,
    state: {
      orderHistory: LocalStorage.getItem('order-history') || []
    },
    getters: {
      getHistory: state => {
          return state.orderHistory.reverse();
      }
    },
    mutations: {
      updateHistory(state, payload) {
        if (state.orderHistory.length > 20) {
          state.orderHistory.shift();
        }
        state.orderHistory.push(payload);
        LocalStorage.set('order-history', state.orderHistory);
      }
    }
  }