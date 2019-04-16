import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';

import CdTabbar from '../../components/cd-tabbar';
import './index.scss'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../constants/common';
import { Utils } from '../../utils';
import { scanLogin } from '../../actions/login';
import api from '../../api/api'

@connect(({ login }) => ({
  login
}), dispatch => {
  return {
    onScanLogin: params => dispatch(scanLogin(params))
  }
})
class User extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  state = {
    menus: [],
    statusBarHeight: Utils.getSystemInfoSync().statusBarHeight
  }
  componentDidMount() {
    this.setState({
      menus: [
        {
          icon: 'pengyouquan',
          title: '分享'
        },
        {
          icon: 'weibiaoti--',
          title: '刷过的题'
        },
        {
          icon: 'xihuan',
          title: '喜欢'
        },
        {
          icon: 'xiaoxi',
          title: '消息'
        },
        {
          icon: 'classify_icon',
          title: '分类'
        },
        {
          icon: 'fankuitianxie',
          title: '反馈',
          url: '/pages/user/feedback/index'
        }
      ]
    })

  }
  menuClick(url) {
    Taro.navigateTo({
      url
    })
  }
  async scanLogin({unicode, loginToken}) {
    const res = await api.get(`/audition/login/unicode/${unicode}?loginToken=${loginToken}`)
    return res
  }
  scan() {
    Taro.scanCode().then(async result => {
      const codeResult = JSON.parse(result.result)
      if (codeResult.type === 'login') {
        const { unicode, loginToken } = codeResult.payload
        const scanLoginResult = await this.scanLogin({
          unicode,
          loginToken
        })
        console.log('scanLoginResult', scanLoginResult)
        if (scanLoginResult.code !== 1) {
          Taro.showToast({
            title: scanLoginResult.msg
          })
        } else {
          this.navigationToScanCodeLogin(codeResult.payload)
        }
      }
    })
  }
  navigationToScanCodeLogin({ unicode, loginToken }) {
    Taro.navigateTo({
      url: `/pages/scan-code-login/index?unicode=${unicode}&token=${loginToken}`
    })
  }
  render() {
    return (
      <View className='user'>
        <View className='icons' style={
          {
            paddingTop: `${this.state.statusBarHeight + 5}px`
          }
        }
        >
          <View onClick={this.scan.bind(this)} className='icon-wrapper'>
            <AtIcon prefixClass={ICON_PREFIX_CLASS} value='saoyisao' size='16' color='#fff'></AtIcon>
            <Text className='icon-text'>扫啊扫</Text>
          </View>
        </View>
        {/* <Image className='bg-img'></Image> */}
        <View className='user-info'>
          <View className='user-info-wrapper'>
            <Image className='avatar' src='https://axhub.im/pro/914cebb9882c916b/images/%E6%88%91%E7%9A%84/u529.svg'></Image>
            <View>
              <Text className='avatar-name'>小茹</Text>
            </View>
          </View>
          <View className='flex-row attention-wrapper'>
            <View className='attention'>
              <View className='attention-num'>
                <Text>111</Text>
              </View>
              <View className='attention-title'>
                <Text>关注</Text>
              </View>
            </View>
            <View className='attention'>
              <View className='attention-num'>
                <Text>110</Text>
              </View>
              <View className='attention-title'>
                <Text>粉丝</Text>
              </View>
            </View>
            <View className='attention'>
              <View className='attention-num'>
                <Text>112</Text>
              </View>
              <View className='attention-title'>
                <Text>关注</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='user-menus-wrapper'>
          <View className='user-menus'>
            {
              this.state.menus.map(menu => {
                return (
                  <View className='user-menu' key={menu.title} onClick={this.menuClick.bind(this, menu.url)}>
                    <View>
                      <AtIcon prefixClass={ICON_PREFIX_CLASS} value={menu.icon} color={ICON_PRIMARY_COLOR} size='24'></AtIcon>
                    </View>
                    <View className='user-menu_text'>
                      <Text>
                        {menu.title}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        {/* <View>
            <Button onClick={this.scan.bind(this)}>扫一扫1</Button>
        </View> */}
        <CdTabbar value={2}></CdTabbar>
      </View>
    );
  }
}
export default User
