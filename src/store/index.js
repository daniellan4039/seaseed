import {createStore} from 'vuex'
import userStore from "@/store/userStore"
import employeeStore from "@/store/employeeStore";
import {convertArrayToTree} from "@/funcLib/arrayFunc";
import {generateMenuFromRawRoute} from "@/funcLib/menuParse";

export default createStore({
  state: {
    currentPath: null,
    route: null,
    routeMap: null,
    baseLog: null
  },
  mutations: {
    setCurrentPath(state, info){
      state.currentPath = info
    },
    setRoute(state, info) {
      state.route = info
    },
    setRouteMap(state, info) {
      state.routeMap = info
    },
    setBaseLog(state, info) {
      state.baseLog = info
    }
  },
  actions: {
    setCurrentPath(context, info){
      context.commit('setCurrentPath', info)
    },
    setRoute(context, info){
      context.commit('setRoute', info)
    },
    setRouteMap(context, info) {
      localStorage.setItem('HRMS_ROUTE_MAP', JSON.stringify(info))
      context.commit('setRouteMap', info)
    },
    setBaseLog(context, info) {
      context.commit('setBaseLog', info)
    }
  },
  getters: {
    parsedMenu(state) {
      if (state.route) {
        const tree = convertArrayToTree(state.route)
        return generateMenuFromRawRoute(tree)
      } else {
        return null
      }
    },
    routeMap(state) {
      if (state.routeMap) {
        return state.routeMap
      } else {
        const localStoredRouteMapStr = localStorage.getItem('HRMS_ROUTE_MAP')
        if (localStoredRouteMapStr) {
          const routeMap = JSON.parse(localStoredRouteMapStr)
          state.routeMap = routeMap
          return routeMap
        } else {
          return null
        }
      }
    }
  },
  modules: {
    userStore,
    employeeStore
  }
})
