import Taro from '@tarojs/taro'

import { get as getGlobalData } from './global-data';
import { OPEN_ID } from '../constants/common';
import { Storage } from '.';

const SUCCESS = 1
const EXPIRED = 0

const BASE_URL = process.env.BASE_URL
console.log('BASE_URL', BASE_URL);


export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true, contentType = 'application/x-www-form-urlencoded' } = options
  let token = getGlobalData(OPEN_ID)
  console.log('token', token);
  if (!token) {
    token = Storage.getItemSync(OPEN_ID)
    console.log(token);
  }
  const option = {
    url: (BASE_URL + url).trim(),
    method: method.toUpperCase(),
    data: payload,
    header: { 'content-type': contentType, 'header-key': token }, // 默认
  }
  return Taro.request(option).then(res => {
    if (!res.data) {
      return res
    }
    const { code, data } = res.data

    if (code !== SUCCESS) {
      return Promise.reject(res)
    }

    return data === null ? {} : data
  }).catch((err) => {
    const defaultMsg = err.code === EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
