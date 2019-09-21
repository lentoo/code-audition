import BaseModel from '../../BaseModel'
import Question from '../../question-domain/entities/Question'
import User from '../../user-domain/entities/user'

/**
 * @description 收藏集
 * @author lentoo
 * @date 2019-08-11
 * @export
 * @class Collection
 */
export default interface Collection extends BaseModel {
  questions: Question[]
  name: string
  userinfo: User
  questionNum?: number
  attentionNum?: number
  /**
   * @description 用于 某个题目是否已经收藏到收藏夹里了
   * @type {boolean}
   * @memberof CollectionWithSelected
   */
  selected: boolean
}
