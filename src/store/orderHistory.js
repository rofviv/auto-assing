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
        state.orderHistory.push(payload);
        if (state.orderHistory.length > 10) {
            state.orderHistory.shift();
        }
        LocalStorage.set('order-history', state.orderHistory);
      }
    }
  }