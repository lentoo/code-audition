
import fetch from '@/utils/request';
import { METHODS } from '../../constants/common';

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
    method: METHODS.GET
  })
}
/**
 * @description 
 * @author lentoo
 * @date 2019-06-03
 * @export
 * @param {*} params
 * @returns
 */
export function getAnswerList (params) {
  if (!params.id) {
    throw new Error('id is required')
  }
  return fetch({
    url: `/audition/question/comment/${params.id}`,
    payload: params
  })
}
/**
 * @description 添加答案
 * @author lentoo
 * @date 2019-06-03
 * @export
 * @param {*} params
 * @returns
 */
export function postAnswer (params) {
  if (!params.commentOfhtml) {
    throw new Error('commentOfhtml is required')
  }
  return fetch({
    url: `/audition/question/comment/${params.id}`,
    payload: params,
    method: METHODS.POST
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
    method: METHODS.GET,
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
    method: METHODS.GET,
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
    method: METHODS.GET,
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
    method: METHODS.POST,
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
    method: METHODS.PUT,
    payload: params
  })
}