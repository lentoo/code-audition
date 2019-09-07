import { getSortList } from '../../data-source/sorts/sort.data'
import Sort from './entities/Sort'
import { PaginatedResponseClass } from '../BaseModel'

export default class SortService {
  static getSortList(
    sortName = '',
    current = 1,
    limit = 10
  ): Promise<PaginatedResponseClass<Sort>> {
    return getSortList(sortName, current, limit).then(
      ({ fetchSortListByUserSelect }) => {
        fetchSortListByUserSelect.items = fetchSortListByUserSelect.items.map(
          item => new Sort(item)
        )
        return fetchSortListByUserSelect
      }
    )
  }
}
