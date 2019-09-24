import {
  PaginatedResponseClass,
  PaginationProp,
  ActionResponseModel
} from '../BaseModel'
import AttentionUser from './entities/AttentionUser'
import {
  attentionUserList,
  subscribe,
  unsubscribe
} from '@/data-source/attention-user/index.data'

export default class AttentionUserService {
  public static attentionUserList(
    page: PaginationProp
  ): Promise<PaginatedResponseClass<AttentionUser>> {
    return attentionUserList(page).then(
      ({ attentionUserList }) => attentionUserList
    )
  }

  public static subscribe(id: string): Promise<ActionResponseModel> {
    return subscribe(id).then(({ attentionUser }) => attentionUser)
  }

  public static unsubscribe(id: string): Promise<ActionResponseModel> {
    return unsubscribe(id).then(({ unsubscribe }) => unsubscribe)
  }
}
