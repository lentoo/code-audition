import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

import './assets/fonts/iconfont.css'

import { UpdateManager, Storage } from './utils'

import { set as setGlobalData } from './utils/global-data'
import { OPEN_ID } from './constants/common'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/home/index',
      'pages/home/write-review/index',
      'pages/demo/index',
      'pages/category/index',
      'pages/other-homepage/index',
      'pages/scan-code-login/index',
      'pages/user/index',
      // 'pages/user/publish/open-question/index',
      // 'pages/user/publish/open-question/choose-category',
      // 'pages/user/publish/open-question/submit-success',
      // 'pages/user/feedback/index',
      // 'pages/user/message/index',
      // 'pages/user/collection/index',
      // 'pages/user/collection/add-collection',
      // 'pages/user/collection/Detail',
      'pages/offline/index'
    ],
    subpackages: [
      {
        root: 'sub-pages/user-package',
        pages: [
          // 'pages/index',
          'pages/message/index',
          'pages/collection/index',
          'pages/collection/add-collection',
          'pages/collection/Detail',
          'pages/feedback/index',
          'pages/publish/open-question/index',
          'pages/publish/open-question/choose-category',
          'pages/publish/open-question/submit-success'
        ]
      }
    ],
    window: {
      navigationBarBackgroundColor: '#007fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      backgroundTextStyle: 'dark',
      // navigationStyle: 'custom',
      backgroundColor: '#f5f5f5'
    }
  }

  componentDidMount() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      UpdateManager.CheckAppUpdate()
      Taro.cloud.init({
        env: 'code-interview-13481f',
        traceUser: true
      })
      this.loadOpenId()
    }
  }
  loadOpenId() {
    Taro.cloud
      .callFunction({
        name: 'GetAppId'
      })
      .then(res => {
        const openid = res.result.openid
        setGlobalData(OPEN_ID, openid)
        Storage.setItemSync(OPEN_ID, openid)
      })
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
