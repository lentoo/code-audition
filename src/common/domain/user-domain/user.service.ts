import { set as setData, get as getData } from '@/utils/global-data'
import User from './entities/user'
import {
  getUserInfo,
  fetchUserInfo,
  saveUserInfo,
  loginUser
} from '../../data-source/users/user.data'
import { ActionResponseModel } from '../BaseModel'

const CACHE_KEY = 'userInfo'
export default class UserService {
  static async getUserInfo() {
    let user = new User()
    if (getData(CACHE_KEY)) {
      user = getData(CACHE_KEY)
    } else {
      const userInfo = await getUserInfo()
      user = new User(userInfo.userInfo)
      setData(CACHE_KEY, user)
    }
    return user
  }

  static async fetchUserInfo() {
    let u = new User()
    try {
      const { user } = await fetchUserInfo()
      Object.assign(u, user)
    } catch (error) {
      console.log('error', error)
      return null
    }
    return u
  }
  static async addUserInfo(u: User): Promise<User> {
    return await saveUserInfo(u)
  }
  static login(u: User): Promise<ActionResponseModel> {
    return loginUser(u).then(({ wxLogin }) => wxLogin)
  }
}
