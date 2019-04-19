import Taro from '@tarojs/taro'
import { get as getGlobalData } from '../utils/global-data';
import { OPEN_ID } from '../constants/common';

const BASE_URL = process.env.BASE_URL

class Service {
  baseOptions(params, method = 'GET') {
    let {url, data} = params
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
      isShowLoading: false,
      url: BASE_URL + url,
      data: data,
      method: method.toUpperCase(),
      header: { 'content-type': contentType, 'header-key': getGlobalData(OPEN_ID) }, // 默认contentType ,预留token
    }
    return Taro.request(option)
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  get (url, data = '') {
    const options = {url, data}
    return this.baseOptions(options)
  }
  post (url, data, contentType) {
    const options = {url ,data, contentType}
    return this.baseOptions(options, 'post')
  }
}

export default new Service()
