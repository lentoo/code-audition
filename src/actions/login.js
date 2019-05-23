import { scanCodeLogin, confirmLogin, saveUserInfo, API_SAVE_USER_INFO, API_VALID_ONE, API_USER_SORT, API_SORT } from '../api/login'
import { SCAN_CODE_LOGIN, CONFIRM_LOGIN, SAVE_USER_INFO, VALID_ONE, USER_SORT, SORT_LIST } from '../constants/login';
import { createApiAction } from './index'
import { createAction } from '../utils/redux';

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
export function doConfirmLogin() {
  return async dispatch => {
    const res = await confirmLogin()
    dispatch({
      type: CONFIRM_LOGIN,
      payload: res
    })
  }
}

// export const doSaveUserInfo = params => {
//   console.log('params', params);
//   return dispatch => {

//     return saveUserInfo(params).then(res => {
//       console.log('res', res);
//       dispatch({
//         types: SAVE_USER_INFO,
//         payload: res
//       })
//     })
//   }
// }

/**
 * 保存用户信息
 * @param {*} payload
 */
export const doSaveUserInfo = payload => createAction({
  url: API_SAVE_USER_INFO,
  method: 'POST',
  type: SAVE_USER_INFO,
  payload
})

export const doValidOne = payload => createAction({
  url: API_VALID_ONE,
  type: VALID_ONE,
  payload
})

export const dispatchUserSort = payload => createAction({
  url: API_USER_SORT,
  type: USER_SORT,
  payload,
  method: 'PUT'
  // fetchOptions: {
  //   contentType: 'application/json'
  // }
})

export const dispatchSortList = payload => createAction({
  url: API_SORT,
  type: SORT_LIST,
  payload
})
// export default bindActionCreators({
//   scanLogin
// }, store.dispatch)
