export default class BaseModel {
  _id?: string
  id?: string

  createAtDate?: Date

  updateAtDate?: Date
}

export interface PaginationProp {
  /**
   * @description 页大小
   * @type {number}
   * @memberof PaginationModel
   */
  limit: number
  /**
   * @description 当前页
   * @type {number}
   * @memberof PaginationModel
   */
  page: number
}

export interface PaginationModel {
  /**
   * @description 页大小
   * @type {number}
   * @memberof PaginationModel
   */
  limit: number
  /**
   * @description 当前页
   * @type {number}
   * @memberof PaginationModel
   */
  page: number
  /**
   * @description 总页数
   * @type {number}
   * @memberof PaginationModel
   */
  pages: number
  /**
   * @description 是否还有更多数据
   * @type {boolean}
   * @memberof PaginationModel
   */
  hasMore: boolean
}

export interface PaginatedResponseClass<TItem> {
  page: PaginationModel
  items: TItem[]
}

export interface ActionResponseModel {
  code: Number
  msg: string
  data?: string
}
