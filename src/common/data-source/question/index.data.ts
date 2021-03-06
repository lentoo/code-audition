import client from '@/utils/graphql-client'

export const pushQuestion = () =>
  client({
    qgl: `
  query pushQuestion {
    pushQuestion {
      _id
      title
      descriptionOfhtml
      descriptionOfmarkdown
      createAtDate
      updateAtDate
      answerOfhtml
      answerOfmarkdown
      browse
      isCollection
      sort {
        sortName
        _id
        attentionNum
        questionNum
      }
      userinfo {
        _id
        nickName
        avatarUrl
      }
    }
  }
  `,
    showError: false
  })

export const fetchIdeaList = ({ id, page = 1, limit = 20 }) =>
  client({
    qgl: `
  query idea ($id: String!, $page: PaginationProp) {
    fetchIdea(id: $id, page: $page ) {
      page {
        page
        pages
        hasMore
        total
        limit
      }
      items {
        _id
        createAtDate
        updateAtDate
        userinfo {
          _id
          nickName
          avatarUrl
        }
        content
        targetUser {
          _id
          nickName
          avatarUrl
        }
      }
    }
  }
  `,
    variables: {
      id,
      page: {
        page,
        limit
      }
    }
  })

export const addIdea = params =>
  client({
    qgl: `
  mutation addIdea ($qid: String!, $content: String!, $tid: String)  {
    addIdea (questionId: $qid, content: $content, tid: $tid) {
      code
      msg
      data
    }
  }
  `,
    variables: {
      ...params
    }
  })
