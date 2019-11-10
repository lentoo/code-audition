import { combineReducers } from 'redux'
import counter from './counter'
import login from './login'
import publish from './publish'
import userinfo from './userinfo'
export default combineReducers({
  counter,
  publish,
  login,
  userinfo
})
