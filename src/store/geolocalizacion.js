export const geolocalizacion = {
    namespaced: true,
    state: {
      center_mapa: [-17.783320, -63.182127],
      center_parqueo: [0, 0],
      center_user: [0, 0],
      center_origen: [0, 1],
      center_destino: [0, 2],

      ruta: [],
    },
    getters: {
      getRuta: state => {
        return state.ruta;
      },
      getCenterMapa: state => {
        return state.center_mapa;
      },
      getCenterParqueo: state => {
        return state.center_parqueo;
      },
      getCenterUser: state => {
          return state.center_user;
      },
      getCenterOrigen: state => {
        return state.center_origen;
      },
      getCenterDestino: state => {
        return state.center_destino;
      },
    },
    mutations: {
      ruta(state, payload) {
        state.ruta = payload;
      },
      centerMapa(state, payload) {
        state.center_mapa = payload;
      },
      centerParqueo(state, payload) {
        state.center_parqueo = payload;
      },
      centerUser(state, payload) {
        state.center_user = payload;
      },
      centerOrigen(state, payload) {
        state.center_origen = payload;
      },
      centerDestino(state, payload) {
        state.center_destino = payload;
      }
    }
  }