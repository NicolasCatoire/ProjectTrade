import { api } from 'boot/axios'

export function getCompanies({ commit }) {
	return new Promise((resolve, reject) => {
		api.get('/clients')
			.then(response => {
				commit('GET_COMPANIES', response.data)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function getCompanyInfos({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.get(`/company/details/${payload}`)
			.then(response => {
				commit('GET_COMPANY_INFOS', response.data)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function addCompany({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.post('/b2b/company', {
			company: payload.company,
			director: payload.admin
		})
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function editCompany({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.put(`/admin/companies/${payload.id}`, payload.form)
			.then(response => {
				commit('UPDATE_COMPANY', payload)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function updateCareerStatus({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.put(`/companies/${payload.id}/set-career-status/`, { status: payload.status })
			.then(response => {
				commit('UPDATE_COMPANY_CAREER_STATUS', payload.status)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function deleteReferential({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.delete(`/backoffice/ref/${payload}`)
			.then(response => {
				commit('DELETE_COMPANY_REFERENTIAL', payload)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function deleteCollaborator({ commit }, payload) {
	// return new Promise((resolve, reject) => {
	// 	api.put(`/backoffice/collab/${payload}`)
	// 		.then(response => {
	// 			commit('UPDATE_COMPANY', payload)
	// 			resolve(response)
	// 		})
	// 		.catch(error => {
	// 			reject(error)
	// 		})
	// })
}

export function deleteContractPdf({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.put(`/company/${payload.id}/contract`, { fileName: payload.fileName })
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function deleteInvoicePdf({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.put(`/company/${payload.id}/invoice`, { fileName: payload.fileName })
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}