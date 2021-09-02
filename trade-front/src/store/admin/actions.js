import { api } from "boot/axios";

export function addAdminBackOffice({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.post(`/back-office/auth/sign-up`, payload)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateAdmin({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.put(`/back-office/update-profil/${payload.id}`, payload)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getAdmin({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.get(`/back-office/admin/${payload}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })

}
export function getAdmins({ commit }) {
  return new Promise((resolve, reject) => {
    api.get(`/back-office/get-admins`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteAdminBO({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.delete(`/delete-admin/${payload}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

