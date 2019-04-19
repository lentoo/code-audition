import { SCAN_CODE_LOGIN, CONFIRM_LOGIN, SAVE_USER_INFO, VALID_ONE, USER_SORT, SORT_LIST } from '../constants/login';

const INITIAL_STATE = {
  scanLoginResult: {},
  doConfirmLogin: {},
  doSaveUserInfo: {},
  validOne: false,
  userSort: {},
  sortList: {}
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCAN_CODE_LOGIN:
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
    case VALID_ONE:
      return {
        ...state,
        validOne: action.payload
      }
    case USER_SORT:
      return {
        ...state,
        userSort: action.payload
      }
    case SORT_LIST:
      return {
        ...state,
        sortList: action.payload
      }
    default:
      return state
  }
}
