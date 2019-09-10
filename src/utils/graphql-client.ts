import Taro from '@tarojs/taro'
import nanographql from 'nanographql'
import { Utils } from '.'
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
  const token = Utils.getOpenId()
  showLoading &&
    Taro.showLoading({
      title: loadingText
    })
  let query = nanographql(qgl)
  console.log('token', token)
  return Taro.request({
    url: graphQLUrl,
    method: 'POST',
    data: query(variables),
    header: { 'header-key': token }
  }).then(response => {
    showLoading && Taro.hideLoading()
    const { data } = response
    const errors = data.errors as Array<Error>
    if (errors && errors.length > 0) {
      showError &&
        Taro.showToast({
          title: errors[0].message,
          icon: 'none',
          duration: 5000
        })
      Promise.reject(errors[0])
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
