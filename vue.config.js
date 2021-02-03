const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/theme/theme.scss";`
      },
      scss: {
        prependData: `@import "./src/theme/theme.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    proxy: {
      "/admin": {
        target: "http://localhost:8085/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/admin": "/admin"
        }
      }
    }
  }
};
