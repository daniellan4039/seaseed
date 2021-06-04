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
    }
}
