import {
  getCollection,
  getCollectionTopic
} from '../../data-source/collection/collection.data'
import Collection from './entities/Collection'
import Topic from '../topic-domain/entities/Topic'
/**
 * @description CollectionService
 * @author lentoo
 * @date 2019-08-11
 * @export
 * @class CollectionService
 */
export default class CollectionService {
  static getCollection() {
    return getCollection().then(res => {
      res.data = res.data.map(item => new Collection(item))
      return res
    })
  }
  /**
   * @description 获取某个收藏夹下的题目
   * @author lentoo
   * @date 2019-08-12
   * @static
   * @param {*} id
   * @returns
   * @memberof CollectionService
   */
  static getCollectionTopic(payload) {
    return getCollectionTopic(payload).then(res => {
      res.data.questionList = res.data.questionList.map(item => new Topic(item))
      return res
    })
  }
}
