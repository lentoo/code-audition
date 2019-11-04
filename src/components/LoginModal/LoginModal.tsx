import { AtModal, AtModalContent, AtButton } from "taro-ui"
import { View, Text } from "@tarojs/components"
import Taro, { useCallback, memo } from '@tarojs/taro'
import User from "@/domain/user-domain/entities/user"
import UserService from '@/domain/user-domain/user.service'
import {
  set as setGlobalData,
  get as getGlobalData
} from '@/utils/global-data'
import { USER_INFO, OPEN_ID } from '@/constants/common';

import './index.scss'
import useUserInfo from "@/hooks/useUserInfo"
type PageState = {
  open: boolean
  cancelClick: () => void
  successClick?: (u: User) => void
}



const LoginModal = (props: PageState) => {
  console.log('render LoginModal');
  const [ , setUserinfo ] = useUserInfo()
  const onGetUserInfo = useCallback(async (res) =>  {

    const onLogin = async (u: User) => {
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

    Taro.showLoading()

    const u = new User()
    const getUser = res.detail.userInfo
    const openId = getGlobalData(OPEN_ID)
    Object.assign(u, getUser)
    u.openId = openId

    await UserService.addUserInfo(u)
    await onLogin(u)

    setUserinfo(u)

    if (Taro.getStorageSync(USER_INFO)) {
      Taro.hideLoading()
    } else {
      Taro.setStorage({
        key: USER_INFO,
        data: getUser
      })
      Taro.hideLoading()
    }
    props.successClick && props.successClick(u)
  }, [])

  return (
    <AtModal isOpened={props.open}>
        <AtModalContent>
          <View className="modal-content">
            <View className="modal-content-item">欢迎使用码上面试小程序</View>
          </View>
          <View className='modal-footer'>
            <View className='modal-footer-item'>
              <Text onClick={props.cancelClick}>暂不登陆</Text>
            </View>
            <View className='modal-footer-item'>
              
              <AtButton className="login-btn" type='secondary' openType='getUserInfo' onGetUserInfo={onGetUserInfo}>微信登陆</AtButton>
            </View>

          </View>
        </AtModalContent>
      </AtModal>
  )
}
export default LoginModal