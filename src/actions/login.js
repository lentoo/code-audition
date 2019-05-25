import { scanCodeLogin, confirmLogin } from '../api/login'
import { SCAN_CODE_LOGIN, CONFIRM_LOGIN } from '../constants/login';
import { createApiAction } from './index'
import { createAction } from '../utils/redux';

export const scanLogin = createApiAction(SCAN_CODE_LOGIN, params => scanCodeLogin(params))
export function doConfirmLogin() {
  return async dispatch => {
    const res = await confirmLogin()
    dispatch({
      type: CONFIRM_LOGIN,
      payload: res
    })
  }
}
