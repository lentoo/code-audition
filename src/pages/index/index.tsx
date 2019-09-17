import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { USER_INFO, OPEN_ID } from '../../constants/common';
import './index.scss'
import {
  set as setGlobalData,
  get as getGlobalData
} from '../../utils/global-data'
import { Storage, loadOpenId } from '../../utils';
import { UserService } from './services'
import { AtModal, AtModalContent, AtButton } from 'taro-ui';
import User from '../../common/domain/user-domain/entities/user';
type PageState = {
  isLoading: boolean
}
class Index extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '码上面试',
    enablePullDownRefresh: false,
    backgroundTextStyle: 'light',
  }
  constructor () {
    super()
    this.state = {
      isLoading: false
    }
  }
  initTokenData () {
    const token = Taro.getStorageSync('token')
    if (token) {
      setGlobalData('token', token)
    }
  }
  async componentDidShow () {
    Taro.showLoading()
    await loadOpenId()
    this.initTokenData()
    const isFirst = await this.validateFirst()
    Taro.hideLoading()
    if (isFirst) {
      this.setState({
        isLoading: true
      })
    } else {
      Taro.redirectTo({
        url: '/pages/home/index'
      })
    }
  }
  async validateFirst () {
    const first = Storage.getItemSync(USER_INFO) ? false : true

    if (first) {
      const res = await UserService.fetchUserInfo()
      Taro.setStorage({
        key: USER_INFO,
        data: res
      })
      return res === null
    }

    return first
  }

  onGetUserInfo = async (res) => {
    Taro.showLoading()
    const u = new User()
    const getUser = res.detail.userInfo
    Object.assign(u, getUser)
    try {
      u.openId = getGlobalData(OPEN_ID)
      const response = await UserService.login(u)
      console.log('response', response);
      Taro.hideLoading()
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
    setGlobalData(USER_INFO, getUser)
    Taro.setStorage({
      key: USER_INFO,
      data: getUser
    })
    Taro.redirectTo({
      url: '/pages/category/index'
    })
  }

  render () {
    const { isLoading } = this.state
    return (
      <View className='index'>
        {isLoading && this.renderLoginModal()}
      </View>
    )
  }

  renderLoginModal () {
    return (
      <AtModal isOpened>
        <AtModalContent>
          <View className="modal-content">
            <View className="modal-content-item">欢迎使用码上面试小程序，请先登陆</View>
            <View>
              <AtButton type='primary' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>微信登陆</AtButton>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    )
  }
}

export default Index
