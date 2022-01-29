import { createStore } from 'vuex'
import api from '@/api'

const state = (() => ({
  isLoading: true,
  isBlurred: false,
  loadingError: null,
  data: null,
  availableDates: null,
  date: null,
  index: null
}))

const getters = {
  isLoading: state => state.isLoading,
  isBlurred: state => state.isBlurred,
  loadingError: state => state.loadingError,
  availableDates: state => state.availableDates,
  date: state => state.date,
  prevDate: state => state.index < state.data.length - 1 ? '/' + state.availableDates[state.index + 1] : null,
  nextDate: state => {
    if (state.index === 0)
      return null
    if (state.index === 1)
      return '/'
    return '/' + state.availableDates[state.index - 1]
  },
  fullData: state => state.data,
  data: state => state.index !== null ? state.data[state.index] : null

}

const actions = {
  load: async ({ commit }) => {
    commit("loadStart")
    try {
      const data = await api.getJSON('data')
      commit('loadSuccess', data)
    }
    catch (error) {
      commit('loadFailure', error)
    }
  },
  blur: ({ commit }) => {
    commit('setIsBlurred', true)
  },
  unblur: ({ commit }) => {
    commit('setIsBlurred', false)
  },

  setDate: ({ commit }, date) => {
    commit('setDate', date)
  }
}

const mutations = {
  loadStart: state => {
    state.isLoading = true
  },
  loadSuccess: (state, data) => {
    const availableDates = data.map(d => d.date)
    state.data = data
    state.availableDates = availableDates
    state.isLoading = false
  },
  loadFailure: (state, error) => {
    state.loadingError = error
    state.isLoading = false
  },
  setIsBlurred: (state, v) => {
    state.isBlurred = v
  },
  setDate: (state, date) => {
    state.date = date
    state.index = state.data.findIndex(d => d.date === date)
  },
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})
