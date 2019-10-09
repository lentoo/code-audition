import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import CdTabbar from '@/components/cd-tabbar'

import './index.scss'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../constants/common'
import User from '../../common/domain/user-domain/entities/user'
import { LoginServices, UserService } from './services'

const UserPage = () => {
  const userSubPackagePath = '/sub-pages/user-package/pages'
  const menus = [{
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
    url: `${userSubPackagePath}/sort/Index`
    // url: '/pages/category/index'
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
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight
  
  const [userinfo, setUserInfo] = useState<User | null>(null)
  useEffect(() => {
    UserService.findLoginUserInfo().then(user => {
      setUserInfo(user)
    })
  }, [])
  async function scan() {
    Taro.scanCode().then(async result => {
      const codeResult = JSON.parse(result.result)
      if (codeResult.type === 'login') {
        const { unicode, loginToken } = codeResult.payload
        const scanLoginResult = await LoginServices.scanLogin(
          unicode,
          loginToken
        )
        console.log('scanLoginResult', scanLoginResult)
        if (scanLoginResult.code !== 1) {
          Taro.showToast({
            icon: 'none',
            title: scanLoginResult.msg
          })
        } else {
          navigationToScanCodeLogin({
            ...codeResult.payload,
            token: scanLoginResult.data
          })
        }
      }
    })
  }
  function navigationToScanCodeLogin ({ unicode, token }) {
    Taro.navigateTo({
      url: `/pages/scan-code-login/index?unicode=${unicode}&token=${token}`
    })
  }
  /**
   * @description 渲染头部图标
   * @author lentoo
   * @date 2019-08-08
   * @returns
   * @memberof User
   */
  const renderHeaderIcons = () => {
    return (
      <View
        className="icons"
        style={
          `padding-top: ${statusBarHeight}px`
        }>
        <View onClick={scan} className="icon-wrapper">
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
  const renderUserInfo = () => {
    return userinfo && (
      <View className="user-info-wrapper">
        <View>
          <Text className="avatar-name">{userinfo.nickName}</Text>
        </View>
        <View className="avatar-img-box">
          <Image className="avatar" src={userinfo.avatarUrl!} />
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
  const renderStatistics = () => {
    return userinfo && (
      <View className="flex-row attention-wrapper">
        <View
          className="attention"
          onClick={() => {
            Taro.navigateTo({
              url: `${userSubPackagePath}/my-focus/Index`
            })
          }}>
          <View className="attention-num">
            <Text>{userinfo.attentionCount}</Text>
          </View>
          <View className="attention-title">
            <Text>关注</Text>
          </View>
        </View>
        <View
          className="attention"
          onClick={() => {
            Taro.navigateTo({
              url: `${userSubPackagePath}/fans/index`
            })
          }}>
          <View className="attention-num">
            <Text>{userinfo.fansCount}</Text>
          </View>
          <View className="attention-title">
            <Text>粉丝</Text>
          </View>
        </View>
        {/* <View className='attention'>
          <View className='attention-num'>
            <Text>112</Text>
          </View>
          <View className='attention-title'>
            <Text>我的投稿</Text>
          </View>
        </View> */}
      </View>
    )
  }
  const menuClick = (url: string) => {
    Taro.navigateTo({
      url
    })
  }
  /**
   * @description 渲染可操作的行为
   * @author lentoo
   * @date 2019-08-08
   * @memberof UserView
   */
  const renderOperationalActions = () => {
    return (
      <View className="user-actions">
        <View className="user-actions-wrapper">
          <View className="user-actions-list">
            {menus.map(menu => {
              return (
                <View
                  className="user-actions-item"
                  key={menu.title}
                  onClick={menuClick.bind(this, menu.url)}>
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

  const renderSlideItem = () => {
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
  return (
    <View className="user">
      <View className="user-info">
        {renderHeaderIcons()}
        {renderUserInfo()}
        {renderStatistics()}
      </View>
      {renderOperationalActions()}
      {renderSlideItem()}
      <CdTabbar title="我" />
    </View>
  )
}
UserPage.config = {
  navigationStyle: 'custom',
  backgroundTextStyle: 'light'
}

export default UserPage
