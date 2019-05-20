
import fetch from '@/utils/request';

export function searchTitle (params) {
  return fetch({
    url: '/audition/questionAudit/search/title',
    method: 'POST',
    payload: {
      title: params.title
    }
  })
}
export function searchCategory(params) {
  return fetch({
    url: '/audition/sort/questionAudit',
    method: 'GET',
    payload: params
  })
}
/**
 * @description 投稿
 * @author lentoo
 * @date 2019-05-14
 * @export
 * @param {*} params
 * @returns
 */
export function submitQuestion(params) {
  return fetch({
    url: '/audition/questionAudit/submit',
    method: 'POST',
    payload: params
  })
}
