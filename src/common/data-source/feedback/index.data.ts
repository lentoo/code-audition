import client from '@/utils/graphql-client'
import { FeedbackType } from '@/domain/feedback-domain/entities'

export function addFeedback(
  content: string,
  type: FeedbackType,
  images?: string[]
) {
  return client({
    qgl: `
      mutation addFeedback ($content: String!, $type: FeedbackType!, $images: [String!]) {
        addFeedbackItem(content: $content, type: $type, images: $images) {
          data
          msg
          code
        }
      }
    `,
    variables: {
      content,
      type,
      images
    }
  })
}
