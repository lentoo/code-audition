import User from './entities/user'
import {
  fetchUserInfo,
  saveUserInfo,
  loginUser
} from '../../data-source/users/user.data'
import { ActionResponseModel } from '../BaseModel'

export default class UserService {
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
