import { combineReducers } from 'redux'
import counter from './counter'
import login from './login'

export default combineReducers({
  counter,
  login
})
