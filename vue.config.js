const themes = {
    // 'layout-sider-background': '#888'
}

module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: themes,
                    javascriptEnabled: true,
                }
            }
        }
    },
    devServer: {
        proxy: process.env.VUE_APP_PROXY_HOST
    }
}
