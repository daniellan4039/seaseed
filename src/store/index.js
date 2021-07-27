import { createStore } from 'vuex'
import userStore from "@/store/userStore"
import employeeStore from "@/store/employeeStore";

export default createStore({
  state: {
    currentPath: null,
    route: null
  },
  mutations: {
    setCurrentPath(state, info){
      state.currentPath = info
    },
    setRoute(state, info) {
      state.route = info
    }
  },
  actions: {
    setCurrentPath(context, info){
      context.commit('setCurrentPath', info)
    },
    setRoute(context, info){
      context.commit('setRoute', info)
    }
  },
  modules: {
    userStore,
    employeeStore
  }
})
