import client from '@/utils/graphql-client'
import { PaginationProp } from '@/common/domain/BaseModel'

export function attentionUserList(page: PaginationProp) {
  return client({
    qgl: `
    query attentionUserList ($page: PaginationProp!)  {
      attentionUserList (page: $page) {
        page{
          page
          pages
          hasMore
          limit
        }
        items {
          _id
          attentionUser {
            avatarUrl
            nickName
            _id
            attentionCount
          }
        }
      }
    }
    `,
    variables: {
      page
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
