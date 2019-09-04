import Taro from '@tarojs/taro'
import nanographql from 'nanographql'
import { Utils } from '.'
const graphQLUrl = <string>process.env.GRAPHQL_URL

export interface graphqlRequestOptions {
  qgl: string
  variables?: any
  showLoading?: boolean
  loadingText?: string
}
async function fetch({
  qgl,
  variables,
  showLoading = false,
  loadingText = ''
}: graphqlRequestOptions) {
  const token = Utils.getOpenId()
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
  })
    .then(response => {
      const { data } = response
      const errors = data.errors as Array<Error>
      if (errors && errors.length > 0) {
        Taro.showToast({
          title: errors[0].message,
          icon: 'none',
          duration: 5000
        })
      } else {
        return data.data
      }
    })
    .finally(() => {
      showLoading && Taro.hideLoading()
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
