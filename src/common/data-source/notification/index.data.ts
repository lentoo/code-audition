import client from "@/utils/graphql-client";

export function getUserNotify(uid: string) {
  return client({
    qgl: `
    query GET_USER_NOTIFY ($uid: String!) {
      getUserNotify(uid: $uid) {
        _id
        isRead
        createAtDate
        user {
          nickName
          _id
          avatarUrl
        }
        sourceNotify {
          content
          _id
          notificationType
          actionType
          target
          sendUser {
            _id
            avatarUrl
            nickName
          }
          targetIdea {
            _id
            content
            question {
              _id
              title
            }
          }
          targetQuestion {
            _id
            title
          }
          targetUser {
            nickName
            _id
            avatarUrl
            isAttention
          }
        }
      }
    }
    `,
    variables: {
      uid
    }
  });
}
