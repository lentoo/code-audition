import { combineReducers } from 'redux'
import counter from './counter'
import login from './login'
import publish from './publish'

export default combineReducers({
  counter,
  publish,
  login
})
