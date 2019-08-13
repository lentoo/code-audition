import request from '@/utils/request'
export function getCollection() {
  return request({
    url: '/audition/userInfo/collection',
    method: 'GET'
  })
}
