
const routes = [
  {
    path: '/admin/users-patio/sesion/central',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'autoassign', path: '/', component: () => import('pages/AutoAssign.vue') },
      { name: 'autoassign-lp', path: '/lp', component: () => import('pages/AutoAssignLP.vue') },
      { name: 'callcenter', path: '/callcenter', component: () => import('pages/CallCenter.vue') },
    ]
  },
  {
    path: '/callcenter/sesion/rokys',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'rokys-callcenter', path: '', component: () => import('pages/RokysCallCenter.vue') }
    ]
  },
  {
    path: '/callcenter/order/customize',
    component: () => import('layouts/LayoutAux.vue'),
    children: [
      { name: 'order-customize', path: '', component: () => import('pages/OrderCustomize.vue') }
    ]
  },
  {
    path: '/map/order/:order_id',
    component: () => import('pages/MapDriver.vue')
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
