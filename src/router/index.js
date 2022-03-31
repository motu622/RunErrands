/**
 * 
 * 路由器对象模块
 */

import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import store from '@/store'


// 安装Vue插件
Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 向外暴露路由器对象
const router = new VueRouter({
    //模式
    mode: 'history',  //不带#
    //应用中的所有路由
    routes,
    linkActiveClass: 'active',

    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { x: 0, y: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    //      // 全局前置导守卫
    //      // to 代表准备去的路由对象
    //      // from 从哪个地方来的路由对象
    //      // next是一个函数   
    //      /*
    //          next()  代表无条件放行
    //          next(false)  代表不放心，停在原地
    //          next('/')  next({path:'/})代表最终让它去哪
    //       */
    let token = store.state.user.token
    if (token) {
        if (to.path.includes('/LoginAndRegister')) {
            next('/Home')
        } else {
            let hasUserInfo = store.state.user.userInfo
            if (hasUserInfo) {
                // 已经登录无条件放行

                next()

            } else {
                // 此时代表登录了   要根据token发请求获取用户的真正信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('resetUserInfo')
                    next('/LoginAndRegister/Login?redirect=' + to.path)
                }
            }
        }


    } else if (to.path.includes('/LoginAndRegister')) {
        next()
    } else {
        next('/LoginAndRegister/Login')

    }
})




export default router