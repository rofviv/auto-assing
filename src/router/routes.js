
const routes = [
  {
    path: '/admin/users-patio/sesion/central',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'autoassign', path: '/', component: () => import('pages/AutoAssign.vue') },
      { name: 'promo-carrera', path: '/admin/users-patio/sesion/central/promo-carrera', component: () => import('pages/PromoCarrera.vue') },
      { name: 'automatic', path: '/admin/users-patio/sesion/central/automatic', component: () => import('pages/CloseOpen.vue') },
      { name: 'callcenter', path: '/admin/users-patio/sesion/central/callcenter', component: () => import('pages/CallCenter.vue') },
      { name: 'customize', path: '/admin/users-patio/sesion/central/customize', component: () => import('pages/OrderCustomize.vue') },
      { name: 'limitar', path: '/admin/users-patio/sesion/central/limitar', component: () => import('pages/Limitar.vue') },
      { name: 'tarifas', path: '/admin/users-patio/sesion/central/tarifas', component: () => import('pages/Tarifas.vue') },
      { name: 'clientes-disney', path: '/admin/users-patio/sesion/central/clientes-disney', component: () => import('pages/ClientesDisney.vue') },
      // { name: 'rover', path: '/admin/users-patio/sesion/central/rover-panel', component: () => import('pages/RoverPanelJugno.vue') },
      { name: 'cupones', path: '/admin/users-patio/sesion/central/rcupones', component: () => import('pages/CuponesClientes.vue') },
    ]
  },
  {
    path: '/callcenter/sesion/:merchant',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'callcenter-merchant', path: '', component: () => import('pages/CallCenterMerchants.vue') }
    ]
  },
  {
    path: '/callcenter/order/sesion/:client',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'order-customize', path: '', component: () => import('pages/OrderCustomizeClient.vue') }
    ]
  },
  {
    path: '/map/order/:order_id',
    component: () => import('pages/MapDriver.vue')
  },
  {
    path: '/map/order/menus/:order_id',
    component: () => import('pages/MapDriverMenus.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
