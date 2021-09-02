const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/statistics', component: () => import('pages/statistics.vue') },
      { path: '/clients', component: () => import('pages/clients.vue') },
      { path: '/client/:id', component: () => import('pages/company.vue') },
      { path: '/candidates', component: () => import('pages/candidates.vue') },
      { path: '/candidate/:id', component: () => import('pages/candidate.vue') },
      {
        path: '/admin/:id',
        component: () => import('pages/Settings/updateAdmin.vue'),
        meta: {
          requiresRoles: ['SuperAdmin']
        }
      },
      { name: "updateProfile", path: '/profil', component: () => import('pages/Settings/updateProfile.vue') },
      { path: '', component: () => import('pages/Index.vue') },

      {
        path: '/settings',
        component: () => import('src/pages/Settings/Settings.vue')
      },
      {
        name: "constants",
        path: 'settings/addconstants',
        component: () => import('src/pages/Settings/AddConstants.vue'),
        meta: {
          requiresRoles: ['SuperAdmin']
        }
      },

      {
        name: "addAdmin",
        path: 'settings/add-admin',
        component: () => import('src/pages/Settings/AddAdmin.vue'),
        meta: {
          requiresRoles: ['SuperAdmin']
        }
      },

    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      {
        path: '/login', component: () => import('pages/login.vue'),
        meta: {
          disableIfLoggedIn: true
        }
      }
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
