import User from './entities/user'
import {
  fetchUserInfo,
  saveUserInfo,
  loginUser,
  findUserByNickName,
<<<<<<< HEAD
  findUserById
=======
  findUserById,
  findLoginUserInfo
>>>>>>> lentoo/small-bug
} from '../../data-source/users/user.data'
import {
  ActionResponseModel,
  PaginationProp,
  PaginatedResponseClass
} from '../BaseModel'

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

  public static async findUserByNickName(
    page: PaginationProp,
    nickName: string
  ): Promise<PaginatedResponseClass<User>> {
    return findUserByNickName(page, nickName).then(
      ({ findUserByNickName }) => findUserByNickName
    )
  }

  public static async findUserById(id: string): Promise<User> {
    return findUserById(id).then(({ findUserById }) => findUserById)
  }
<<<<<<< HEAD
=======

  public static async findLoginUserInfo(): Promise<User> {
    return findLoginUserInfo().then(
      ({ findLoginUserInfo }) => findLoginUserInfo
    )
  }
>>>>>>> lentoo/small-bug
}
