import BaseModel from '../../BaseModel'

export default class User extends BaseModel {
  /**
   * @description 用户微信openid
   * @type {string}
   * @memberof UserInfo
   */
  openId?: string
  appid?: string
  unionid?: string
  /**
   * @description 用户昵称
   * @type {string}
   * @memberof UserInfo
   */
  nickName?: string
  /**
   * @description 用户头像地址
   * @type {string}
   * @memberof UserInfo
   */
  avatarUrl?: string
  /**
   * @description 用户性别 1 -> 男 2 -> 女
   * @type {string}
   * @memberof UserInfo
   */
  gender?: string
  /**
   * @description 用户所在省
   * @type {string}
   * @memberof UserInfo
   */
  province?: string
  /**
   * @description 用户所在国家
   * @type {string}
   * @memberof UserInfo
   */
  country?: string
  /**
   * @description 用户所在城市
   * @type {string}
   * @memberof UserInfo
   */
  city?: string

  language?: string

  /**
   * @description 用户角色
   * @type {string}
   * @memberof UserInfo
   */
  role?: string
  /**
   * @description 关注数
   * @type {number}
   * @memberof User
   */
  attentionCount: number

  /**
   * @description 粉丝数
   * @type {number}
   * @memberof User
   */
  fansCount: number
  /**
   * @description 是否已经关注
   * @type {boolean}
   * @memberof AttentionUserInfo
   */
  isAttention?: boolean
}

export interface AttentionUserInfo extends User {
  /**
   * @description 是否已经关注
   * @type {boolean}
   * @memberof AttentionUserInfo
   */
  isAttention?: boolean
}
