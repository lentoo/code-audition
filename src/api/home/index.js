
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
export function searchCategory(params) {
  return fetch({
    url: '/audition/sort/questionAudit',
    method: 'GET',
    payload: params
  })
}
