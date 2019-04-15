import { bindActionCreators } from 'redux'
import store from '../store'
import { scanCodeLogin, confirmLogin, saveUserInfo } from '../api/login'
import { SCAN_CODE_LOGIN, CONFIRM_LOGIN, SAVE_USER_INFO } from '../constants/login';
import { createApiAction } from './index'

// export function scanLogin (params) {
//   return async dispatch => {
//     console.log('request')
//     const res = await scanCodeLogin(params)
//     dispatch({
//       type: SCAN_CODE_LOGIN,
//       payload: res
//     })
//     console.log('response')
//     return res
//   }
// }
export const scanLogin = createApiAction(SCAN_CODE_LOGIN, params => scanCodeLogin(params))
export function doConfirmLogin () {
  return async dispatch => {
    const res = await confirmLogin()
    dispatch({
      type: CONFIRM_LOGIN,
      payload: res
    })
  }
}

export function doSaveUserInfo (params) {

  return async dispatch => {
    const res = await saveUserInfo(params)
    dispatch({
      types: SAVE_USER_INFO,
      payload: res
    })
  }
}

export default bindActionCreators({
  scanLogin
}, store.dispatch)
