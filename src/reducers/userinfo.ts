import Taro from '@tarojs/taro'
import { ACTION_SHOW_LOGIN_MODAL } from '@/actions/userinfo'
import { SET_USER } from '@/constants/userinfo'
import { USER_INFO } from '@/constants/common'

const user = Taro.getStorageSync(USER_INFO)

const INIT_STATE = {
  userinfo: user || null,
  showLoginModal: false
}
export default function userinfo(state = INIT_STATE, actions) {
  switch (actions.type) {
    case SET_USER:
      return {
        ...state,
        userinfo: actions.payload
      }
    case ACTION_SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: actions.payload
      }
    default:
      return state
  }
}
