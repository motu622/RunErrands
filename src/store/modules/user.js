import { reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getToken, setIsAdmin, getIsAdmin, removeIsAdmin, removeToken, setToken } from "@/utils/userabout"

const state = {
    token: getToken(),
    userInfo: '',
    isAdmin: getIsAdmin() === 'true'
}
const mutations = {
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RECEIVE_ISADMIN(state, isAdmin) {
        state.isAdmin = isAdmin
    },
    RESET_USERINFO(state) {
        state.userInfo = '';
        state.token = ''
    }
}
const actions = {
    async userRegister({ commit }, userInfo) {
        const result = await reqUserRegister(userInfo)
        if (result.code === 0) {
            return 'ok'
        } else if (result.code === 5) {
            return '学号已被占用'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async userLogin({ commit }, userInfo) {
        const result = await reqUserLogin(userInfo)
        if (result.code === 0) {
            commit('RECEIVE_TOKEN', result.data.token)
            commit('RECEIVE_ISADMIN', result.data.isAdmin)
            setIsAdmin(result.data.isAdmin)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async getUserInfo({ commit }) {
        const result = await reqUserInfo();
        if (result.code === 0) {
            commit('RECEIVE_USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async resetUserInfo({ commit }) {
        removeToken()  //清空localStorage当中的token信息
        removeIsAdmin()
        commit('RESET_USERINFO')
    },

}
const getters = {
}


export default {
    state,
    mutations,
    actions,
    getters
}