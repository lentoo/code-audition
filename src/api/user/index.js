import fetch from '@/utils/request'
import { METHODS } from '../../constants/common'

export function addCollection (params) {
  return fetch({
    url: '/audition/userInfo/collection',
    method: METHODS.POST,
    payload: params
  })
}

export function getCollections (params = {}) {
  return fetch({
    url: '/audition/userInfo/collection',
    payload: params
  })
}

export function saveTopicInCollection (params) {
  return fetch({
    url: `/audition/userInfo/collection/${params.id}`,
    method: METHODS.PUT,
    payload: params
  })
}