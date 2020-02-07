
const routes = [
  {
    path: '/admin/users-patio/sesion/central',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'autoassign', path: '/', component: () => import('pages/AutoAssign.vue') },
      { name: 'autoassign-lp', path: '/admin/users-patio/sesion/central/lp', component: () => import('pages/AutoAssignLP.vue') },
      { name: 'callcenter', path: '/admin/users-patio/sesion/central/callcenter', component: () => import('pages/CallCenter.vue') },
      { name: 'customize', path: '/admin/users-patio/sesion/central/customize', component: () => import('pages/OrderCustomize.vue') },
    ]
  },
  // {
  //   path: '/callcenter/sesion/rokys',
  //   component: () => import('layouts/LayoutAux.vue'),
  //   children: [
  //     { name: 'rokys-callcenter', path: '', component: () => import('pages/RokysCallCenter.vue') }
  //   ]
  // },
  {
    path: '/callcenter/sesion/:merchant',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'callcenter-merchant', path: '', component: () => import('pages/CallCenterMerchants.vue') }
    ]
  },
  {
    path: '/callcenter/order/customize',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'order-customize', path: '', component: () => import('pages/OrderCustomizeChavez.vue') }
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
