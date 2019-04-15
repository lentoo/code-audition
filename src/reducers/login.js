import { SCAN_CODE_LOGIN, CONFIRM_LOGIN, SAVE_USER_INFO } from '../constants/login';

const INITIAL_STATE = {
  scanLoginResult: {},
  doConfirmLogin: {},
  doSaveUserInfo: {}
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCAN_CODE_LOGIN:
      console.log('action', action)
      return {
        ...state,
        scanLoginResult: action.payload
      }
    case CONFIRM_LOGIN:
      return {
        ...state,
        doConfirmLogin: action.payload
      }
    case SAVE_USER_INFO:
       return {
         ...state,
         doSaveUserInfo: action.payload
       }
    default:
      return state
  }
}
