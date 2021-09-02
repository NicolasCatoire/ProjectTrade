export function GET_COMPANIES(state, payload) {
    state.companies = [...payload]
}

export function UPDATE_COMPANY(state, payload) {
    if (state.companies.length > 0) {
        const item = state.companies.find(company => company.id === payload.id)
        Object.assign(item, payload.form)
    }
}

export function GET_COMPANY_INFOS(state, payload) {
    state.company = payload
}

export function DELETE_COMPANY_REFERENTIAL(state, payload) {
    const refIndex = state.company.refs.indexOf(payload)
    state.company.refs.splice(refIndex, 1)
}

export function UPDATE_COMPANY_CAREER_STATUS(state, payload) {
    state.company.company.career = payload
}