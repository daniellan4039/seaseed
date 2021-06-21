import { createStore } from 'vuex'
import userStore from "@/store/userStore"
import employeeStore from "@/store/employeeStore";

export default createStore({
  state: {
    currentPath: null
  },
  mutations: {
    setCurrentPath(state, info){
      state.currentPath = info
    }
  },
  actions: {
    setCurrentPath(context, info){
      context.commit('setCurrentPath', info)
    }
  },
  modules: {
    userStore,
    employeeStore
  }
})
