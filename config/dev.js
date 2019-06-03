module.exports = {
  env: {
    NODE_ENV: '"development"',
    // BASE_URL: 'https://ccode.live'
    BASE_URL: 'http://localhost:3001'
  },
  defineConstants: {
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {}
}
