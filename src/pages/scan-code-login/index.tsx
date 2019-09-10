import Taro, { Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { AtIcon, AtButton } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '../../constants/common';
import './index.scss'
import { LoginServices } from './services'

type PageState = {
  unicode: string
  token: string
}

class ScanCodeLogin extends Taro.Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '登录确认',
  }
  constructor ( ) {
    super()
    this.state = {
      unicode: '',
      token: ''
    }
  }
  componentWillMount () {
    this.setState({
      unicode: this.$router.params.unicode,
      token: this.$router.params.token
    })
  }
  async confirmLogin () {
    const {unicode, token} = this.state
    const doConfirmLoginResult = await LoginServices.confirmLogin(unicode, token)
    console.log('doConfirmLoginResult', doConfirmLoginResult);
    if (doConfirmLoginResult.code === 1) {
      Taro.showToast({
        title: '登录成功'
      })
      Taro.navigateBack()
    } else {
      Taro.showToast({
        title: doConfirmLoginResult.msg,
        icon: 'none'
      })
    }
  }
  async cancelLogin () {
    const res = await LoginServices.cancelLogin(this.state.unicode)
    // const res = await api.get(`/audition/login/cancelLogin/${this.state.unicode}`)
    res.code === 1 && Taro.navigateBack()
  }
  render() {
    return (
      <View className='scan-login'>
        <View className='scan-login-wrapper'>
          <View className='scan-login-item'>
            <View className='scan-login-icon'>
              <View className='scan-login-icon-item'>
                <AtIcon prefixClass={ICON_PREFIX_CLASS} value='shouji' color='#666' size='60'></AtIcon>
              </View>
              <View className='scan-login-icon-item'>
                <AtIcon prefixClass={ICON_PREFIX_CLASS} value='shengyin' color='#666' size='40'></AtIcon>
              </View>
              <View className='scan-login-icon-item'>
                <AtIcon prefixClass={ICON_PREFIX_CLASS} value='pc' color='#666' size='120'></AtIcon>
              </View>
            </View>
            <View className='scan-login-text'>
              <Text>码上面试电脑端登录确认</Text>
            </View>
          </View>
          <View className='scan-login-item'>
            <View className='scan-login-btn'>
              <AtButton circle type='primary' onClick={this.confirmLogin.bind(this)}>确认登录电脑端</AtButton>
            </View>
            <View className='scan-login-btn'>
              <AtButton className='cancelLoginBtn' circle onClick={this.cancelLogin.bind(this)}>取消登录</AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default ScanCodeLogin
