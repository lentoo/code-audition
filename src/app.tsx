import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Provider } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss'

import Index from './pages/index/index'

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
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/home/index',
      'pages/home/write-review/index',
      'pages/demo/index',
      'pages/category/index',
      'pages/other-homepage/index',
      'pages/scan-code-login/index',
      'pages/user/index',
      'pages/offline/index'
    ],    
    subPackages: [
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
          'pages/publish/open-question/submit-success',
          'pages/sort/Index',
          'pages/my-focus/Index',
          'pages/my-focus/AddFocusUserItem'
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
    let openid = Storage.getItemSync(OPEN_ID)
    if (openid) {
      setGlobalData(OPEN_ID, openid)
      return
    }
    Taro.cloud
      .callFunction({
        name: 'GetAppId'
      })
      .then(res => {
        openid = res.result.openid
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
