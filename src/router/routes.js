
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'autoassign', path: '', component: () => import('pages/AutoAssign.vue') },
      { name: 'callcenter', path: 'callcenter', component: () => import('pages/CallCenter.vue') },
    ]
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
