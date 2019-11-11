import BaseModel from '../../BaseModel'
import User from '../../user-domain/entities/user'

export default class AttentionUser extends BaseModel {
  user: User
  /**
   * @description 关注的用户
   * @memberof AttentionUser
   */

  attentionUserList: User[]
}
