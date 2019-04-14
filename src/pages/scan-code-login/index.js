import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { AtIcon, AtButton, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { ICON_PREFIX_CLASS } from '../../constants/common';
import { scanLogin, doConfirmLogin } from '../../actions/login';

import './index.scss'

@connect(({ login }) => ({
  login
}), (dispatch) => ({
  scanLogin(conn, unicode) {
    dispatch(scanLogin(unicode))
  },
  doConfirmLogin() {
    dispatch(doConfirmLogin())
  }
}))
class ScanCodeLogin extends Taro.Component {
  config = {
    navigationBarTitleText: '登录确认',
  }
  componentWillMount () {
    const unicode = this.$router.params.unicode || 123
    this.props.scanLogin.call(this, unicode)
  }
  confirmLogin () {
    this.props.doConfirmLogin.call(this)
    console.log('zheline ? ', this.props.login.doConfirmLogin);
    const doConfirmLoginResult = this.props.login.doConfirmLogin
    if (doConfirmLoginResult.code === 1) {
      Taro.showToast({
        title: '登录成功'
      })
      Taro.navigateBack()
    } else {
      Taro.showToast({
        title: doConfirmLoginResult.msg
      })
    }
  }
  cancelLogin () {
    Taro.navigateBack()
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
              <AtButton circle onClick={this.cancelLogin.bind(this)}>取消登录</AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default ScanCodeLogin
