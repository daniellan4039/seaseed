export default {
    state: {
        token: null
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        }
    },
    actions: {
        setToken (context, token) {
            context.commit('setToken', token)
        }
    }
}
