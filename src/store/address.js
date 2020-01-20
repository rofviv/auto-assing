import { LocalStorage } from 'quasar'

export const address = {
    namespaced: true,
    state: {
      list: LocalStorage.getItem('address-list') || []
    },
    getters: {
      getList: state => {
          return state.list.reverse();
      },
      getItem: state => index => {
        return state.list[index];
    },
    },
    mutations: {
      updateList(state, payload) {
        state.list.push(payload);
        LocalStorage.set('address-list', state.list);
      }
    }
  }