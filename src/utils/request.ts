import Taro from '@tarojs/taro'

import { get as getGlobalData } from './global-data'
import { OPEN_ID } from '../constants/common'
import { Storage } from '.'

const SUCCESS = 1
const EXPIRED = 0

const BASE_URL = process.env.BASE_URL
const env = process.env.NODE_ENV
console.log('BASE_URL', BASE_URL, 'env', env)

export type requestOptions = {
  url: string
  method?: string
  payload?: object
  autoLogin?: boolean
  contentType?: string
  showToast?: boolean
}
export default async function fetch(options: requestOptions) {
  const {
    url,
    payload,
    method = 'GET',
    showToast = true,
    autoLogin = true,
    contentType = 'application/x-www-form-urlencoded'
  } = options
  let token = getGlobalData(OPEN_ID)
  console.log('token', token)
  if (!token) {
    token = Storage.getItemSync(OPEN_ID)
    console.log(token)
  }
  const option: any = {
    url: (BASE_URL + url).trim(),
    method: method.toUpperCase(),
    data: payload,
    header: { 'content-type': contentType, 'header-key': token } // 默认
  }
  return Taro.request(option)
    .then(res => {
      if (!res.data) {
        return res
      }
      const { code, data } = res.data

      if (code !== SUCCESS) {
        return Promise.reject(res)
      }

      return data === null ? {} : data
    })
    .catch(err => {
      const defaultMsg = err.code === EXPIRED ? '登录失效' : '请求异常'
      // 跳转错误页
      if (env === 'production') {
        if (
          err.errMsg.includes('request:fail') ||
          err.errMsg === 'request:ok'
        ) {
          const page = Taro.getCurrentPages().shift()
          Taro.redirectTo({
            url: '/pages/offline/index?redirect=/' + page.route
          })
        }
      }
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || defaultMsg,
          icon: 'none'
        })
      }

      return Promise.reject({ message: defaultMsg, ...err })
    })
}
/**
 * @description 文件上传
 * @author lentoo
 * @date 2019-06-05
 * @export
 * @param {*} tempPath
 * @returns
 */
export function uploadFile(tempPath, cb) {
  console.log('tempPath', tempPath)
  return Taro.uploadFile({
    url: process.env.UPLOAD_URL + '/api/upload',
    filePath: tempPath,
    name: 'file',
    success: res => {
      if (cb && typeof cb === 'function') {
        cb.call(this, res)
      }
    }
  })
}
