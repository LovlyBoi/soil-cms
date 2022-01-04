import { cache as localCache } from '../../utils/cache'
import router from '../../router'
import {
  accountLoginRequest,
  requestUserMenusByRoleId
} from '../../network/login'
import message from '../../utils/message'
import mapMenusToRoutes from '../../utils/map-menus' 

const login = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    saveUserMenus(state, userMenus) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      // 添加进router中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLogin({ commit }, payload) {
      // 登录
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code !== 200) {
        // 登录失败
        message('error', loginResult.msg)
        console.log('登录失败', loginResult)
        return
      }
      const { token, username: name, roles: role } = loginResult.data
      commit('saveToken', token)
      localCache.setCache('token', token)

      // 存储用户信息
      const userInfo = {
        name,
        role
      }
      commit('saveUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 请求用户菜单树
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      if(userMenusResult.code !== 200) {
        // 菜单请求失败
        message('error', '菜单请求失败')
        console.log('菜单请求失败: ', userMenusResult)
        return
      }
      const userMenus = userMenusResult.data
      commit('saveUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      message('success', '登录成功！')
      // 跳转
      router.push('/main')
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('saveToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('saveUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('saveUserMenus', userMenus)
      }
    }
  }
}

export default login