import { createStore } from 'vuex'
import userStore from "@/store/userStore"
import employeeStore from "@/store/employeeStore";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    employeeStore
  }
})
