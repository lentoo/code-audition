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
/**
 * @description 删除收藏夹
 * @author lentoo
 * @date 2019-08-14
 * @export
 * @param {number} id 收藏夹id
 * @returns
 */
export function delCollectionItem(id: number) {
  return request({
    url: `/audition/userInfo/collection/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description 修改收藏夹标题
 * @author lentoo
 * @date 2019-08-14
 * @export
 * @param {number} id 收藏夹id
 * @param {string} name 新名称
 * @returns
 */
export function editCollectionTitle(id: number, name: string) {
  return request({
    url: `/audition/userInfo/collection/name/${id}`,
    method: 'PUT',
    payload: {
      name
    }
  })
}
/**
 * @description 添加收藏夹
 * @author lentoo
 * @date 2019-08-14
 * @export
 * @param {string} name 收藏夹名称
 * @returns
 */
export function addCollection(name: string) {
  return request({
    url: '/audition/userInfo/collection',
    method: 'POST',
    payload: {
      name
    }
  })
}
