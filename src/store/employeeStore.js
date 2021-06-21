export default {
    state: {
        employee: null,
        certification: null
    },
    mutations: {
        setEmployee (state, info) {
            state.employee = info
        },
        setCertification(state, info) {
            state.certification = info
        }
    },
    actions: {
        setEmployee (context, info) {
            context.commit('setEmployee', info)
        },
        setCertification(context, info) {
            context.commit('setCertification', info)
        }
    }
}
