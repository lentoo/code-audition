import Taro from '@tarojs/taro'
import nanographql from 'nanographql'
import { clearToken, getToken } from '.'
import { get as getGlobalData, set as setGlobalData } from './global-data'
import { RadioGroup } from '@tarojs/components'
const graphQLUrl = <string>process.env.GRAPHQL_URL

export interface graphqlRequestOptions {
  qgl: string
  variables?: { [key: string]: any }
  showLoading?: boolean
  loadingText?: string
  showError?: boolean
}
async function fetch({
  qgl,
  variables,
  showLoading = false,
  loadingText = '',
  showError = true
}: graphqlRequestOptions) {
  const token = getToken()
  showLoading &&
    Taro.showLoading({
      title: loadingText
    })
  let query = nanographql(qgl)

  return Taro.request({
    url: graphQLUrl,
    method: 'POST',
    data: query(variables),
    header: { 'header-key': token }
  }).then(response => {
    showLoading && Taro.hideLoading()
    const { data, header } = response

    //  if header has x-refresh-authorization
    if (header['x-refresh-authorization']) {
      Taro.setStorage({
        key: 'token',
        data: header['x-refresh-authorization']
      })
      setGlobalData('token', header['x-refresh-authorization'])
    }
    const errors = data.errors as Array<Error>
    if (errors && errors.length > 0) {
      const error = errors[0]
      // 无权限，回到登陆页
      if (
        error.message ===
        'Access denied! You need to be authorized to perform this action!'
      ) {
        clearToken()
        // Taro.redirectTo({
        //   url: '/pages/index/index'
        // })
      }
      showError &&
        Taro.showToast({
          title: errors[0].message,
          icon: 'none',
          duration: 5000
        })
      return Promise.reject(errors[0])
    } else {
      return data.data
    }
  })
}
/**
 *
fetch({
  qgl: `mutation ($user: AddUserProp! ) {
    addUser(user: $user) { 
      nickName 
      openId
    }
  }`,
  variables: {
    user: {
      nickName: 'xcx2-variables-nickname',
      avatarUrl: 'xcx2-variables-avatarUrl',
      gender: 'xcx2-variables-gender',
      province: 'xcx2-variables-province',
      country: 'xcx2-variables-country',
      city: 'xcx2-variables-city'
    }
  },
  showLoading: true,
  loadingText: '正在加载中...'
})

*/
export default fetch
