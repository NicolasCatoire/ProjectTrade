
export function setToken(state, token) {
    state.token = token
}

export function setUser(state, user) {
    state.user = Object.assign({}, state.user, user)
}


