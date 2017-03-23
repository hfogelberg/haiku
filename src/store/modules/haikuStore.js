const state = {
  haikus: [],
  haiku: {}
}

const getters = {
  haikus: state => {
    return state.haikus;
  },
  haiku: state => {
    return state.haiku
  }
}

const mutations = {
  haiku: (state, haiku) => {
    state.haiku = haiku
  }
}
