import User from './entities/user'
import { getUserInfo } from '../../data-source/users/user.data'
import { set as setData, get as getData } from '@/utils/global-data'

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
}
