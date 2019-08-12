import { getSortList } from '../../data-source/sorts/sort.data'
import Sort from './entities/Sort'
export default class SortService {
  static getSortList(sortName = '', page = 1, limit = 10) {
    return getSortList({ sortName, page, limit }).then(response => {
      response.data.map(item => new Sort(item))
      return response
    })
  }
}
