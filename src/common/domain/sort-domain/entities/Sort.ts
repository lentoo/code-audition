import BaseModel from '../../BaseModel'
import {
  followSort,
  cancelFollowSort
} from '../../../data-source/sorts/sort.data'

export default class Sort extends BaseModel {
  constructor(props) {
    super()
    this.id = props.id
    this._id = props._id
    this.sortName = props.sortName
    this.icon = props.icon
    this.select = props.select
    this.attentionNum = props.attentionNum
    this.questionNum = props.questionNum
  }

  /**
   * @description 分类名称
   * @type {string}
   * @memberof ISort
   */
  sortName?: string
  /**
   * @description 图标地址
   * @type {string}
   * @memberof ISort
   */
  icon?: string
  /**
   * @description 关注人数
   * @type {number}
   * @memberof ISort
   */
  attentionNum?: number
  /**
   * @description 题目数
   * @type {number}
   * @memberof ISort
   */
  questionNum?: number

  /**
   * @description 用于表示 用户是否关注该分类  0 表示没有 1 表示已关注
   * @type {number}
   * @memberof Sort
   */
  select?: 0 | 1
  /**
   * @description 关注分类
   * @author lentoo
   * @date 2019-09-05
   * @returns
   * @memberof Sort
   */
  onFollow() {
    return followSort(this._id!)
  }
  /**
   * @description 取关分类
   * @author lentoo
   * @date 2019-09-05
   * @returns
   * @memberof Sort
   */
  onCancelFollow() {
    return cancelFollowSort(this._id!)
  }
}
