import { api } from 'boot/axios'

export function getConstants({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.get('/constants/', payload)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function addConstant({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.post('/backoffice/constants', payload)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}