module.exports = {
    lintOnSave: false, // 关闭ESLint的规则检查

    // 代理服务器
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,


}