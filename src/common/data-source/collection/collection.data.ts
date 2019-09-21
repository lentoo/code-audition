import request from '@/utils/request'
import client from '@/utils/graphql-client'
import { PaginationProp } from '@/common/domain/BaseModel'

export const fetchCollections = (page: PaginationProp, qid?: string) =>
  client({
    qgl: `
  query fetchCollection ($page: PaginationProp!, $qid: String ) {
    fetchCollection (page: $page, questionId: $qid) {
      page {
        total
        page
        pages
        hasMore
        limit
      }
      items {
        _id
        name
        attentionNum
        questionNum
        selected
        userinfo {
          _id
          nickName
          avatarUrl
        }
        questions {
          _id
          title
        }
      }
    }
  }
  `,
    variables: {
      page,
      qid
    }
  })

export const fetchCollectionItem = (id: string) =>
  client({
    qgl: `
  query fetchCollectionItem ($id: String!) {
    fetchCollectionItem (id: $id) {
        name
      _id
      questions {
        _id
        title
        sort {
          sortName
          _id
        }
      }
      userinfo {
        nickName
        _id
        avatarUrl
      }
    }
  }
  `,
    variables: {
      id
    }
  })
export const addCollectionItem = (name: string) =>
  client({
    qgl: `
  mutation addCollection ($name: String!) {
    addCollection(name: $name) {
      code
      msg
      data
    }
  }
  `,
    variables: {
      name
    }
  })

export const updateCollectionItem = (id: string, name: string) =>
  client({
    qgl: `
  mutation removeCollection ($id: String!, $name: String!) {
    updateCollection(id: $id, name: $name) {
      code
      msg
      data
    }
  }
  `,
    variables: {
      id,
      name
    }
  })

export const removeCollectionItem = (id: string) =>
  client({
    qgl: `
      mutation removeCollection ($id: String!) {
        removeCollection(id: $id) {
          code
          msg
          data
        }
      }
`,
    variables: {
      id
    }
  })

export const collectionQuestionitem = (qid: string, cids: string) =>
  client({
    qgl: `
  mutation collectionQuestion ($qid: String!, $cid: String!) {
    collectionQuestion(qid: $qid, cid: $cid) {
      code
      msg
      data
    }
  }`,
    variables: {
      qid,
      cid: cids
    }
  })

export const removeQuestionByCollection = (params: {
  qid: string
  cid: string
}) =>
  client({
    qgl: `
    mutation removeItem ($cid: String!, $qid: String!) {
      removeQuestionByCollection(cid: $cid, qid: $qid) {
        code
        msg
        data
      }
    }`,
    variables: {
      ...params
    }
  })
