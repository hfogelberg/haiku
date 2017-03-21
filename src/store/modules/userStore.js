const state = {
  userId: '',
  userName: '',
  token: ''
}

const getters = {
  userId: state => {
    return state.userId;
  },
  userName: state => {
    return state.userName;
  },
  token: state => {
    return state.token;
  }
}

const mutations = {
  userId: (state, userId) => {
    state.userId = userId;
  },
  userName: (state, userName) => {
    state.userName   = userName;
  },
  token: (state, token) => {
    state.token = token;
  }
}

const actions = {
  setUser:({commit}, payload) => {
    commit('userName', payload.userName);
    commit('userId', payload.userId);
    commit('token', payload.token);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
