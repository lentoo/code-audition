import client from '@/utils/graphql-client'
import { PaginationProp } from '@/common/domain/BaseModel'

export function attentionUserList(page: PaginationProp, uid: string) {
  return client({
    qgl: `
    query attentionUserList ($uid: String!, $page: PaginationProp!)  {
      attentionUserList (uid: $uid, page: $page) {
        page {
          page
          pages
          hasMore
          total
          limit
        }
        items {
          _id
          nickName
          fansCount
          attentionCount
          isAttention
        }
      }
    }
    `,
    variables: {
      page,
      uid
    }
  })
}

export function getFansList(
  uid: string,
  page: PaginationProp = { page: 1, limit: 20 }
) {
  return client({
    qgl: `
        query getFansList ($uid: String!, $page: PaginationProp!){
          attentionSelfUserList (uid: $uid, page: $page) {
            page{
              page
              pages
              hasMore
              limit
            }
            items {
              user {
                _id
                avatarUrl
                nickName
                isAttention
              }
            }
          }
        }
      `,
    variables: {
      page,
      uid
    }
  })
}

export function subscribe(id: string) {
  return client({
    qgl: `
    mutation subscribe ($id: String!) {
      attentionUser (id: $id) {
        code
        msg
      }
    }
    `,
    variables: {
      id
    }
  })
}

export function unsubscribe(id: string) {
  return client({
    qgl: `
    mutation subscribe ($id: String!) {
      unsubscribe (id: $id) {
        code
        msg
      }
    }
    `,
    variables: {
      id
    }
  })
}
