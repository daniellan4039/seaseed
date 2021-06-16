export default {
    state: {
        employee: null
    },
    mutations: {
        setEmployee (state, info) {
            state.employee = info
        }
    },
    actions: {
        setEmployee (context, info) {
            context.commit('setEmployee', info)
        }
    }
}
