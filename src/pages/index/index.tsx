import Taro, { Component, Config, useState, useEffect, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { USER_INFO, OPEN_ID } from '../../constants/common';
import './index.scss'
import {
  set as setGlobalData,
  get as getGlobalData
} from '../../utils/global-data'
import { loadOpenId, getToken } from '../../utils';
import { UserService } from './services'
import { AtModal, AtModalContent, AtButton } from 'taro-ui';
import User from '../../common/domain/user-domain/entities/user';
type PageState = {
  isLoading: boolean
}
const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  function initTokenData () {
    const token = getToken()
    if (token) {
      setGlobalData('token', token)
    }
    return token
  }
  function navinatorHomePage () {
    Taro.redirectTo({
      url: '/pages/home/index'
    })
  }
  async function onLogin (u: User) {
    try {
      u.openId = getGlobalData(OPEN_ID)
      const response = await UserService.login(u)

      Taro.setStorage({
        key: 'token',
        data: response.data
      })

      setGlobalData('token', response.data)
      
    } catch (error) {
      Taro.showToast({
        title: '登陆异常',
        icon: 'none'
      })
    }
 
  }
  async function onGetUserInfo (res) {
    Taro.showLoading()

    const u = new User()
    const getUser = res.detail.userInfo
    const openId = getGlobalData(OPEN_ID)
    Object.assign(u, getUser)
    u.openId = openId

    await UserService.addUserInfo(u)
    await onLogin(u)

    setGlobalData(USER_INFO, getUser)
    if (Taro.getStorageSync(USER_INFO)) {
      Taro.hideLoading()
      navinatorHomePage()
    } else {
      Taro.setStorage({
        key: USER_INFO,
        data: getUser
      })
      Taro.hideLoading()  
      Taro.redirectTo({
        url: '/pages/category/index'
      })
    }


  }
  useDidShow(async () => {
    await loadOpenId()
    if (!initTokenData()) {
      setIsLoading(true)
    } else {
      navinatorHomePage()
    }
  })
  const renderLoginModal = () => {
    return (
      <AtModal isOpened>
        <AtModalContent>
          <View className="modal-content">
            <View className="modal-content-item">欢迎使用码上面试小程序，请先登陆</View>
            <View>
              <AtButton type='primary' openType='getUserInfo' onGetUserInfo={onGetUserInfo}>微信登陆</AtButton>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    )
  }


  return (
    <View className='index'>
      {isLoading && renderLoginModal()}
    </View>
  )

  
}
IndexPage.config = {
  navigationBarTitleText: '加载中...',
  enablePullDownRefresh: false,
  backgroundTextStyle: 'light',
}

export default IndexPage
