
export function token(state) {
    return state.token
}

export function userInfos(state) {
    return state.user
}

export function userRole(state) {
    return state.user.role
}

export function isLogged(state) {
    return state.user ? true : false
}
