import { createStore } from 'vuex'
import api from '@/api'

const state = (() => ({
  isLoading: true,

  images: [],
  projects: [],
  sessions: [],

  isBlurred: false,
  isAdmin: false,
}))

const getters = {
  isLoading: state => state.isLoading,
  isAdmin: state => state.isAdmin,
  isBlurred: state => state.isBlurred
}

const actions = {
  load: async ({ commit }) => {
    try {
      const [images, projects, sessions] = await Promise.all([
        api.getJSON('images'),
        api.getJSON('projects'),
        api.getJSON('sessions')
      ])
      console.log(images, projects, sessions)
    }
    catch (error) {
      console.log('error', error)
    }
    commit('setIsLoading', false)
    // const projects = await fetch('/Art/jsons/projects.jsons')
    // const sessions = await fetch('/Art/jsons/sessions.jsons')

    // console.log(images, projects, sessions)
  },
  blur: ({ commit }) => {
    commit('setIsBlurred', true)
  },
  unblur: ({ commit }) => {
    commit('setIsBlurred', false)
  },
  grantsAdministrator: ({ commit }) => {
    commit('setIsAdmin', true)
  },
}

const mutations = {
  setIsLoading: (state, v) => {
    state.isLoading = v
  },
  setIsAdmin: (state, v) => {
    state.isAdmin = v
  },
  setIsBlurred: (state, v) => {
    state.isBlurred = v
  },
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {}
})
