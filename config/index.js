// eslint-disable-next-line import/no-commonjs
const path = require('path')

const config = {
  projectName: 'code-audition',
  date: '2019-3-25',
  designWidth: 750,
  typescript: true,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    sass: {
      resource: [
        path.resolve(__dirname, '../src/assets/styles/var.scss'),
        path.resolve(__dirname, '../src/assets/styles/mixins.scss')
      ],
      projectDirectory: path.resolve(__dirname, '..')
    }
  },
  reslove: {
    extensions: ['ts', 'tsx']
  },
  defineConstants: {},
  alias: {
    '@/': path.resolve(__dirname, '../src'),
    '@/hooks': path.resolve(__dirname, '../src/hooks'),
    '@/components': path.resolve(__dirname, '../src/components'),
    '@/utils': path.resolve(__dirname, '../src/utils'),
    '@/actions': path.resolve(__dirname, '../src/actions'),
    '@/assets': path.resolve(__dirname, '../src/assets'),
    '@/constants': path.resolve(__dirname, '../src/constants'),
    '@/domain': path.resolve(__dirname, '../src/common/domain'),
    '@/data-source': path.resolve(__dirname, '../src/common/data-source')
  },
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
