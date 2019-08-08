import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { Utils } from '@/utils'
import CdTabbar from '@/components/cd-tabbar'
import './index.scss'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../constants/common'
import { scanLogin } from '../../actions/login'
import api from '../../api/api'
import User from '../../common/domain/user-domain/user'
@connect(
  ({ login }) => ({
    login
  }),
  dispatch => {
    return {
      onScanLogin: params => dispatch(scanLogin(params))
    }
  }
)
class UserView extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light'
  }
  state = {
    menus: [],
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
    userInfo: new User({})
  }
  componentDidMount() {
    Taro.getUserInfo().then(res => {
      this.setState({
        userInfo: res.userInfo
      })
    })
    const userSubPackagePath = '/sub-pages/user-package/pages'
    this.setState({
      menus: [
        {
          icon: 'shoucang',
          title: '收藏集',
          url: `${userSubPackagePath}/collection/index`,
          color: '#fcbd1f'
        },
        {
          icon: 'tougaodashang-copy',
          title: '投稿',
          url: `${userSubPackagePath}/publish/open-question/index`
        },
        {
          icon: 'classify_icon',
          title: '分类',
          url: '/pages/category/index'
        },
        {
          icon: 'fankuitianxie',
          title: '反馈',
          url: `${userSubPackagePath}/feedback/index`
        }
        // {
        //   icon: 'weibiaoti--',
        //   title: '刷过的题'
        // },
        // {
        //   icon: 'xihuan',
        //   title: '喜欢'
        // },
      ]
    })
  }
  menuClick(url) {
    Taro.navigateTo({
      url
    })
  }
  async scanLogin({ unicode, loginToken }) {
    const res = await api.get(
      `/audition/login/unicode/${unicode}?loginToken=${loginToken}`
    )
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
  /**
   * @description 渲染头部图标
   * @author lentoo
   * @date 2019-08-08
   * @returns
   * @memberof User
   */
  renderHeaderIcons() {
    const { statusBarHeight } = this.state
    return (
      <View
        className="icons"
        style={{
          paddingTop: `${statusBarHeight + 5}px`
        }}>
        <View onClick={this.scan.bind(this)} className="icon-wrapper">
          <AtIcon
            prefixClass={ICON_PREFIX_CLASS}
            value="saoyisao"
            size="16"
            color="#fff"
          />
        </View>
      </View>
    )
  }
  /**
   * @description 渲染用户信息
   * @author lentoo
   * @date 2019-08-08
   * @returns
   * @memberof UserView
   */
  renderUserInfo() {
    const { userInfo } = this.state
    return (
      <View className="user-info-wrapper">
        <View>
          <Text className="avatar-name">{userInfo.nickName}</Text>
        </View>
        <View className="avatar-img-box">
          <Image className="avatar" src={userInfo.avatarUrl} />
        </View>
      </View>
    )
  }
  /**
   * @description 渲染统计数
   * @author lentoo
   * @date 2019-08-08
   * @returns
   * @memberof UserView
   */
  renderStatistics() {
    return (
      <View className="flex-row attention-wrapper">
        <View className="attention">
          <View className="attention-num">
            <Text>111</Text>
          </View>
          <View className="attention-title">
            <Text>关注</Text>
          </View>
        </View>
        <View className="attention">
          <View className="attention-num">
            <Text>110</Text>
          </View>
          <View className="attention-title">
            <Text>粉丝</Text>
          </View>
        </View>
        <View className="attention">
          <View className="attention-num">
            <Text>112</Text>
          </View>
          <View className="attention-title">
            <Text>作品</Text>
          </View>
        </View>
      </View>
    )
  }

  /**
   * @description 渲染可操作的行为
   * @author lentoo
   * @date 2019-08-08
   * @memberof UserView
   */
  renderOperationalActions() {
    const { menus } = this.state
    return (
      <View className="user-actions">
        <View className="user-actions-wrapper">
          <View className="user-actions-list">
            {menus.map(menu => {
              return (
                <View
                  className="user-actions-item"
                  key={menu.title}
                  onClick={this.menuClick.bind(this, menu.url)}>
                  <View>
                    <AtIcon
                      prefixClass={ICON_PREFIX_CLASS}
                      value={menu.icon}
                      color={menu.color ? menu.color : ICON_PRIMARY_COLOR}
                      size="24"
                    />
                  </View>
                  <View className="user-actions-item-text">
                    <Text>{menu.title}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  renderSlideItem() {
    return (
      <View className="user-slides">
        <View className="user-slides-list">
          <View className="user-slides-item">
            <View className="user-slides-item-left">
              <AtIcon
                value="wentiguanli"
                prefixClass={ICON_PREFIX_CLASS}
                size="16"
                color="#bfbfbf"
              />
              <Text className="user-slides-item-text">问题反馈</Text>
            </View>
            <View className="user-slides-item-right" />
          </View>

          <View className="user-slides-item">
            <View className="user-slides-item-left">
              <AtIcon
                value="shezhi"
                prefixClass={ICON_PREFIX_CLASS}
                size="16"
                color="#bfbfbf"
              />
              <Text className="user-slides-item-text">设置</Text>
            </View>
            <View className="user-slides-item-right" />
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View className="user">
        <View className="user-info">
          {this.renderHeaderIcons()}
          {this.renderUserInfo()}
          {this.renderStatistics()}
        </View>
        {this.renderOperationalActions()}
        {this.renderSlideItem()}
        <CdTabbar title="我" />
      </View>
    )
  }
}
export default UserView
