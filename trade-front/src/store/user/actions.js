import { api } from 'boot/axios'

export function getAllCandidates({ commit }) {
	return new Promise((resolve, reject) => {
		commit('CLEAR_CANDIDATES')
		api.get('/candidates')
			.then(response => {
				commit('GET_ALL_CANDIDATES', response.data)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function getCandidateInfos({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.get(`/user/details/${payload}`)
			.then(response => {
				commit('GET_CANDIDATE_INFOS', response.data)
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function activateUserAccount({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.post(`/candidate/${payload}/validate`)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function updateUserMainInfos({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.put(`/profile/${payload.id}`, payload.form)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function getUserBilanPdf({ commit }, payload) {
	return new Promise((resolve, reject) => {
		api.get(`/candidate/pdf/${payload}/generate`,
			{ responseType: 'blob' })
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}
export function getUserCVPdf({commit}, payload) {
  return new Promise((resolve, reject) => {
    api.get(`/user/${payload}/cv`,
      { responseType: 'blob' })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function connectAsB2C({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.get(`backOffice/connectAsB2c/${payload}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}


export function getNumbersB2CBetweenTwoDates({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.get(`/backOffice/${payload.from}/${payload.to}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

