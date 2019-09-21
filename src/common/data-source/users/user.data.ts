import client from '@/utils/graphql-client'
import { OPEN_ID } from '@/constants/common'
import { get as getData } from '@/utils/global-data'
import User from '../../domain/user-domain/entities/user'
import { UserInfo } from '@/utils'

export function loginUser(u: UserInfo) {
  return client({
    qgl: `
    mutation ($user: AddUserProp!) {
      wxLogin(user: $user) {
        code
        data
        msg
      }
    }
    `,
    variables: {
      user: u
    }
  })
}

export function fetchUserInfo() {
  return client({
    qgl: `
    query queryUserInfo ($id: String!) {
      user (_id: $id) {
        openId
        nickName
        gender
        avatarUrl
        city
        province
        language
      }
    }
    `,
    variables: {
      id: getData(OPEN_ID)
    },
    showError: false
  })
}

export function saveUserInfo(u: User) {
  return client({
    qgl: `
    mutation ($user: AddUserProp!) {
      addUser(user: $user) {
        openId
        nickName
        avatarUrl
        gender
        province
        city
        country
      }
    }
    `,
    variables: {
      user: u
    }
  })
}
