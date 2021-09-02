import { LocalStorage, Notify } from 'quasar'

export default ({ router }) => {
	router.beforeEach((to, from, next) => {
		const { requiresRoles } = to.meta
		const user = LocalStorage.getItem('user')
		if (!user && to.path !== '/login' || user && (user.role !== 'SuperAdmin' && user.role !== 'Admin' && user.role !== 'Commercial' && user.role !== 'Recruiter') && to.path !== '/login') {
			if (from.path === '/login') {
				// people should not go here
			}
			next('/login')
		} else {
			next()
		}
		if (to.matched.some(route => route.meta.disableIfLoggedIn)) {
			if (!user || user && (user.role !== 'SuperAdmin' && user.role !== 'Admin' && user.role !== 'Commercial' && user.role !== 'Recruiter')) {
				next()
			} else {
				next({ path: '/' })
			}
		}
		if (to.matched.some(route => route.meta.requiresRoles)) {
			if (!requiresRoles.includes(user.role)) {
				next({ path: '/' })
			} else {
				next()
			}
		}
	})
}
