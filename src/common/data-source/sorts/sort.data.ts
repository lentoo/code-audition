import client from '@/utils/graphql-client'

// export function fetchAllSortList ({
//   sortName: string,
//   page: number = 1,
//   limit: number = 10
// }) {

// }

export function getSortList(
  sortName: string,
  page: number = 1,
  limit: number = 10
) {
  console.log('sortName', sortName, page, limit)
  return client({
    qgl: `
    query ($name: String, $page: Float, $limit: Float) {
      fetchSortListByUserSelect (name: $name, page: $page, limit: $limit) {
        page {
          ...pagination
        }
        items {
          sortName
          icon
          _id
          select
          attentionNum
          questionNum
        }
      }
    }
    fragment pagination on PaginationModel {
      page
      pages
      limit
      hasMore
    }
    `,
    variables: {
      name: sortName,
      page: page,
      limit
    }
  })
}

export function followSort(sortId: string) {
  return client({
    qgl: `
    mutation ($sortId: String!) {
      likeSort (sortId: $sortId) {
        openId
      }
    }
    `,
    variables: {
      sortId
    }
  })
}

export function cancelFollowSort(sortId: string) {
  return client({
    qgl: `
    mutation ($sortId: String!) {
      unLikeSort (sortId: $sortId) {
        openId
      }
    }
    `,
    variables: {
      sortId
    }
  })
}
