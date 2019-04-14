import { scanCodeLogin, confirmLogin, saveUserInfo } from '../api/login'
import { SCAN_CODE_LOGIN, CONFIRM_LOGIN, SAVE_USER_INFO } from '../constants/login';

export function scanLogin (unicode) {
  return async (dispatch, getState) => {
    console.log('state,', getState())
    const res = await scanCodeLogin(unicode)
    dispatch({
      type: SCAN_CODE_LOGIN,
      payload: res
    })
  }
}
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
