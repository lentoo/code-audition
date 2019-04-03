import Taro from '@tarojs/taro'
import { Storage } from '../utils';

const BASE_URL = 'https://ccode.live/api'
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
      header: { 'content-type': contentType, 'header-key': Storage.getItemSync('oid') }, // 默认contentType ,预留token
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
