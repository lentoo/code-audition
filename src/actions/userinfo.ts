import { SET_USER, SHOW_LOGIN_MODAL } from '@/constants/userinfo'

export const ACTION_SET_USERINFO = () => {
  return {
    type: SET_USER
  }
}

export const ACTION_SHOW_LOGIN_MODAL = () => {
  return {
    type: SHOW_LOGIN_MODAL
  }
}
