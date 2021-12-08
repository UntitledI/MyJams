import axios from 'axios'

// state
export const state = () => ({
  user: null
})

// getters
export const getters = {
  getUser (state) {
    return state.user
  }
}

// actions
export const actions = {
  async fetchUser ({ commit }) {
    return await axios.get(this.$config.apiURL + '/auth/user', { withCredentials: true }).then((res) => {
      commit('setUser', res.data)
      const user = {
        spotifyId: res.data.spotifyId,
        email: res.data.email,
        name: res.data.name,
        image: res.data.image,
        followers: res.data.followers
      }
      return user
    }).catch(() => {
      return null
    })
  }
}

// mutations
export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
