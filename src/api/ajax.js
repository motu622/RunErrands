import axios from "axios";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'


import store from "@/store";


const service = axios.create({
    baseURL: 'https://maixiaotai.top:8081',   //基础路径
    timeout: 20000,  //超时时间
    header: {
        'content-type': "application/json"
    },

})


// 添加请求拦截器
service.interceptors.request.use(config => {
    //    显示进度条
    NProgress.start();


    // 携带登录后的标识token
    let token = store.state.user.token
    if (token) {
        config.headers.Authorization = token
    }


    return config
})
// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // 隐藏进度条
        NProgress.done();
        // return response
        return response.data
    },
    error => {
        // 隐藏进度条
        NProgress.done();

        // 统一处理错误
        this.$message({
            type: "success",
            message: error.message || "未知的错误",
        });

        // throw error
        return Promise.reject(error)
    }
)





// 向外暴露service
export default service

