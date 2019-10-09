import client from '@/utils/graphql-client'
import { OPEN_ID } from '@/constants/common'
import { get as getData } from '@/utils/global-data'
import User from '../../domain/user-domain/entities/user'
import { UserInfo } from '@/utils'
import { PaginationProp } from '@/common/domain/BaseModel'

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

export function findUserByNickName(page: PaginationProp, nickName: string) {
  return client({
    qgl: `
    query findUserByNickName ($page: PaginationProp!, $nickName: String!) {
      findUserByNickName(page: $page, nickName: $nickName) {
        page {
          page
          pages
          limit
          hasMore
        }
        items {
          _id
          nickName
          gender
          avatarUrl
          isAttention
        }
      }
    }
    `,
    variables: {
      page,
      nickName
    }
  })
}

export function findUserById(id: string) {
  return client({
    qgl: `
    query findUserById ($id: String!) {
      findUserById(id: $id) {
        _id
        nickName
        gender
        avatarUrl
        isAttention
        fansCount
        attentionCount
      }
    }
    `,
    variables: {
      id
    }
  })
}

export function findLoginUserInfo() {
  return client({
    qgl: `
      query findLoginUser {
        findLoginUserInfo {
          _id
          nickName
          gender
          avatarUrl
          attentionCount
          fansCount
        }
      }
    `
  })
}
