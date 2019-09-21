import {
  fetchCollections,
  removeCollectionItem,
  updateCollectionItem,
  addCollectionItem,
  fetchCollectionItem,
  collectionQuestionitem,
  removeQuestionByCollection
} from '../../data-source/collection/collection.data'
import Collection from './entities/Collection'
import {
  PaginatedResponseClass,
  PaginationProp,
  ActionResponseModel
} from '../BaseModel'
/**
 * @description CollectionService
 * @author lentoo
 * @date 2019-08-11
 * @export
 * @class CollectionService
 */
export default class CollectionService {
  static getCollection(
    page: PaginationProp,
    qid?: string
  ): Promise<PaginatedResponseClass<Collection>> {
    return fetchCollections(page, qid).then(
      ({ fetchCollection }) => fetchCollection
    )
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
  static getCollectionTopic(id: string): Promise<Collection> {
    return fetchCollectionItem(id).then(
      ({ fetchCollectionItem }) => fetchCollectionItem
    )
  }
  static delCollectionitem(id): Promise<ActionResponseModel> {
    return removeCollectionItem(id).then(
      ({ removeCollection }) => removeCollection
    )
  }
  static editTitle(id, name): Promise<ActionResponseModel> {
    return updateCollectionItem(id, name).then(
      ({ updateCollection }) => updateCollection
    )
  }
  static addCollection(name): Promise<ActionResponseModel> {
    return addCollectionItem(name).then(({ addCollection }) => addCollection)
  }

  static collectionQuestion(questionId: string, ids: string) {
    return collectionQuestionitem(questionId, ids).then(
      ({ collectionQuestion }) => collectionQuestion
    )
  }
  public static removeQuestionByCollection(params: {
    qid: string
    cid: string
  }): Promise<ActionResponseModel> {
    return removeQuestionByCollection(params).then(
      ({ removeQuestionByCollection }) => removeQuestionByCollection
    )
  }
}
