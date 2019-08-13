import request from '@/utils/request'
export function getSortList(payload) {
  return request({
    url: '/audition/sort',
    method: 'GET',
    payload
  })
}
