import {date} from "quasar";

export function GET_ALL_CANDIDATES(state, payload) {
  payload.forEach(item => {
    let timeStamp = new Date(item.createdAt)
    let formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY - HH:mm')
    item.createdAt = formattedString

    timeStamp = new Date(item.accessedAt)
    formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY - HH:mm')
    item.accessedAt = formattedString

  })

    state.candidates = [...payload]
}

export function GET_CANDIDATE_INFOS(state, payload) {
    state.candidate = payload
}

export function CLEAR_CANDIDATES(state) {
    state.candidates = []
}
