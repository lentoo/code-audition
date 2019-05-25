
import fetch from '@/utils/request';

/**
 * @description 题目推送
 * @author lentoo
 * @date 2019-05-15
 * @export
 * @returns
 */
export function getQuestion() {
  return fetch({
    url: '/audition/question',
    method: 'GET'
  })
}
/**
 * @description 分类搜索
 * @author lentoo
 * @date 2019-05-25
 * @export
 * @param {*} params
 * @returns
 */
export function searchCategory(params) {
  return fetch({
    url: '/audition/sort/questionAudit',
    method: 'GET',
    payload: params
  })
}

/**
 * @description 分类列表查看
 * @author lentoo
 * @date 2019-05-25
 * @export
 * @param {*} params
 * @returns
 */
export function getCategories (params) {
  return fetch({
    url: '/audition/sort',
    method: 'GET',
    payload: params
  })
}
/**
 * @description 查询在平台中是否是第一次登陆
 * @author lentoo
 * @date 2019-05-25
 * @export
 * @param {*} params
 */
export function vaildOne (params) {
  return fetch({
    url: '/audition/userInfo/vaildOne',
    method: 'GET',
    payload: params
  })
}
/**
 * @description 保存用户信息
 * @author lentoo
 * @date 2019-05-25
 * @export
 * @param {*} params
 * @returns
 */
export function saveUserInfo (params) {
  return fetch({
    url: '/audition/userInfo/save',
    method: 'POST',
    payload: params
  })
}
/**
 * @description 修改用户关注分类
 * @author lentoo
 * @date 2019-05-25
 * @export
 * @param {*} params
 * @returns
 */
export function putUserCategories (params) {
  return fetch({
    url: '/audition/sort/put',
    method: 'PUT',
    payload: params
  })
}