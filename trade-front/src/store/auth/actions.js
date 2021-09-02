import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

export function login({ commit, dispatch, state }, payload) {
  return new Promise((resolve, reject) => {
    api.post('/admins/sign-in', payload)
      .then(response => {
        dispatch('setUser', { token: response.data.access_token, user: response.data.user })
        LocalStorage.set('token', state.token)
        LocalStorage.set('user', state.user)
        this.$router.push('/')
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function logout() {
  window.localStorage.clear()
  this.$router.push('/login')
}

export function setUser({ commit }, payload) {
  commit('setToken', payload.token)
  commit('setUser', payload.user)
}

export function updateSelfAdmin({ commit }, payload) {
  return new Promise((resolve, reject) => {
    api.put(`/back-office/update-profil/`, payload)
      .then(response => {
        if (payload.hasOwnProperty('password')) {
          delete payload.password
        }
        commit('setUser', payload)
        LocalStorage.set('user', payload)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}