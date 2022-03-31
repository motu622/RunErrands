import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import Loading from '@/assets/images/loading.gif'
import './plugins/swiper'
import './plugins/elements.js'


// 图片懒加载    把img中的src改为v-lazy就可实现
Vue.use(VueLazyload, {
  Loading
})

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,        //注册路由器  ==>  所有组件都可以直接访问2个对象： $router与$route
  store,         //注册vuex    ==>   所有组件都可以直接访问一个对象： $store
}).$mount('#app')