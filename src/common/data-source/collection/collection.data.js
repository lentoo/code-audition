import request from '@/utils/request'
export function getCollection() {
  return request({
    url: '/audition/userInfo/collection',
    method: 'GET'
  })
}
/**
 * @description 获取收藏夹下的所有题目
 * @author lentoo
 * @date 2019-08-12
 * @export
 * @param {*} {id, page, limit = 10 } 收藏夹id， 页数，页大小
 * @returns Promise
 */
export function getCollectionTopic({ id, page, limit = 10 }) {
  return request({
    url: `/audition/userInfo/collection/${id}`,
    method: 'GET',
    payload: {
      page,
      limit
    }
  })
}
