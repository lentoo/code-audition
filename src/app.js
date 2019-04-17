import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

import './assets/fonts/iconfont.css'

import { UpdateManager, Storage} from './utils';

import { set as setGlobalData } from './utils/global-data'
import { OPEN_ID } from './constants/common';
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
      'pages/category/index',
      'pages/user/index',
      'pages/scan-code-login/index',
      'pages/user/feedback/index',
      'pages/user/message/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#007fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      backgroundTextStyle: 'dark',
      // navigationStyle: 'custom',
      backgroundColor: '#fff',
    }
  }

  componentDidMount () {
    UpdateManager.CheckAppUpdate()
    console.log('env_type', Taro.ENV_TYPE)
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      wx.cloud.init({
        env: 'code-interview-13481f',
        traceUser: true
      })
      this.loadOpenId()
    }
  }
  loadOpenId() {
    wx.cloud.callFunction({
      name: 'GetAppId'
    }).then(res => {
      const openid = res.result.openid
      setGlobalData(OPEN_ID, openid)
      Storage.setItemSync(OPEN_ID, openid)
    })
  }

  componentDidShow () {

  }

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
