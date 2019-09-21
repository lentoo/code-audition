import BaseModel from '../../BaseModel'
import User from '../../user-domain/entities/user'
import Sort from '../../sort-domain/entities/Sort'

export enum AuditStatusType {
  '待审核' = 1000,
  '正在审核' = 1001,
  '已驳回' = 3000,
  '已通过' = 2000
}

export default class Topic extends BaseModel {
  title: string

  descriptionOfhtml: string

  descriptionOfmarkdown: string

  answerOfhtml: string

  answerOfmarkdown: string
  /**
   * @description 浏览量
   * @type {number}
   * @memberof Question
   */

  browse: number
  /**
   * @description 审核状态
   * 1000 => 审核中
   * 1001 => 正在处理
   * 2000 => 已通过
   * 3000 => 已驳回
   * @type {string}
   * @memberof Question
   */

  auditStatus: AuditStatusType

  /**
   * @description 所属用户
   * @type {Ref<UserInfo>}
   * @memberof Question
   */
  userinfo: User
  /**
   * @description 题目所属分类
   * @type {Ref<Sort>[]}
   * @memberof Question
   */
  sort: Sort[]
  constructor(props: Topic) {
    super()
    this._id = props._id
    this.sort = props.sort
    this.userinfo = props.userinfo
    this.auditStatus = props.auditStatus
    this.browse = props.browse
    this.answerOfmarkdown = props.answerOfmarkdown
    this.answerOfhtml = props.answerOfhtml
    this.descriptionOfmarkdown = props.descriptionOfmarkdown
    this.descriptionOfhtml = props.descriptionOfhtml
    this.title = props.title
  }
}
