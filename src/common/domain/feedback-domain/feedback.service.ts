import { FeedbackType } from './entities'
import { addFeedback } from '@/data-source/feedback/index.data'
import { ActionResponseModel } from '../BaseModel'

export default class FeedbackService {
  public static addFeedbackItem(
    content: string,
    type: FeedbackType,
    images?: string[]
  ): Promise<ActionResponseModel> {
    return addFeedback(content, type, images).then(
      ({ addFeedbackItem }) => addFeedbackItem
    )
  }
}
