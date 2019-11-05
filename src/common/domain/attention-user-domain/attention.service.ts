import {
  PaginatedResponseClass,
  PaginationProp,
  ActionResponseModel
} from '../BaseModel'
import AttentionUser from './entities/AttentionUser'
import {
  attentionUserList,
  subscribe,
  unsubscribe,
  getFansList
} from '@/data-source/attention-user/index.data'
import User from '../user-domain/entities/user'

export default class AttentionUserService {
  public static attentionUserList(
    page: PaginationProp,
    uid: string
  ): Promise<PaginatedResponseClass<User>> {
    return attentionUserList(page, uid).then(
      ({ attentionUserList }) => attentionUserList
    )
  }
  public static findFansList(
    uid: string,
    page: PaginationProp = { page: 1, limit: 20 }
  ): Promise<PaginatedResponseClass<AttentionUser>> {
    return getFansList(uid, page).then(
      ({ attentionSelfUserList }) => attentionSelfUserList
    )
  }
  public static subscribe(id: string): Promise<ActionResponseModel> {
    return subscribe(id).then(({ attentionUser }) => attentionUser)
  }

  public static unsubscribe(id: string): Promise<ActionResponseModel> {
    return unsubscribe(id).then(({ unsubscribe }) => unsubscribe)
  }
}
