import { getCollection } from '../../data-source/collection/collection.data'
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
      console.log('res', res)
      return res
    })
  }
}
