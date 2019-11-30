import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import CdTabbar from '@/components/cd-tabbar'

import './index.scss'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../constants/common'
import { LoginServices, UserService } from './services'
import { USER_INFO } from '@/constants/common';
import LoginAvatar from '@/assets/images/login-avatar.png'
import useUserinfo from '@/hooks/useUserInfo'
import { navigateToLogin } from '@/utils/Navigate'
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

  
  const [userinfo, setUserInfo] = useUserinfo()

  useEffect(() => {
    const getUser = async () => {
      if (userinfo) {
        try {
          const user = await UserService.findLoginUserInfo()
          console.log('user', user);
          setUserInfo(user)
          Taro.setStorageSync(USER_INFO, user)
        } catch (error) {
          console.log('error', error);
        }
      }
    }
    getUser()
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

  const navigationToScanCodeLogin =  useCallback(({ unicode, token }) => {
    
    Taro.navigateTo({
      url: `/pages/scan-code-login/index?unicode=${unicode}&token=${token}`
    })
  }, [])

  const navigationToPage = useCallback((type: 'fans' | 'focus') => {
    if (!userinfo) {
      navigateToLogin()
      return
    }
    switch (type) {
      case 'fans': 
        Taro.navigateTo({
          url: `${userSubPackagePath}/fans/index`
        })
        break;
      case 'focus':
        Taro.navigateTo({
          url: `${userSubPackagePath}/my-focus/Index`
        })
        break;
    }
  }, [navigateToLogin])


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
    return (
      <View className="user-info-wrapper">
        <View>
          {
            userinfo ? <Text className="avatar-name">{userinfo.nickName}</Text>
            :
            <Text className="avatar-name" onClick={navigateToLogin}>点击登陆</Text>
          }
          {/* <Text className="avatar-name">{userinfo ? userinfo.nickName : '点击登陆'}</Text> */}
        </View>
        <View className="avatar-img-box">
            {
              userinfo ? <Image  className="avatar" src={userinfo.avatarUrl!} />
                : <Image onClick={navigateToLogin} className="avatar" src={LoginAvatar} />
            }
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
    console.log('render renderStatistics', userinfo);
    return (
      <View className="flex-row attention-wrapper">
        <View
          className="attention"
          onClick={() => {
            navigationToPage('focus')
          }}>
          <View className="attention-num">
            <Text>{userinfo ? userinfo.attentionCount.toString() : 0}</Text>
          </View>
          <View className="attention-title">
            <Text>关注</Text>
          </View>
        </View>
        <View
          className="attention"
          onClick={() => {
            navigationToPage('fans')
          }}>
          <View className="attention-num">
            <Text>{userinfo ? userinfo.fansCount.toString() : 0}</Text>
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
    if (userinfo) {
      Taro.navigateTo({
        url
      })
    } else {
      navigateToLogin()
    }
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
                  onClick={() => {
                    menuClick(menu.url)
                  }}>
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


