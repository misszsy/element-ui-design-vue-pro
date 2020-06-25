module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/theme/theme.scss";`
            },
            scss: {
                prependData: `@import "./src/theme/theme.scss";`
            },
        }
    }
}