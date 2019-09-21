import {
  pushQuestion,
  fetchIdeaList,
  addIdea
} from '../../../common/data-source/question/index.data'
import Question from './entities/Question'
import { PaginatedResponseClass, ActionResponseModel } from '../BaseModel'
import Idea from './entities/Idea'

export default class QuestionService {
  public static pullQuestionItem(): Promise<Question> {
    return pushQuestion().then(({ pushQuestion }) => pushQuestion)
  }
  /**
   * @description 获取某个 题目下到 想法列表
   * @author lentoo
   * @date 2019-09-18
   * @static
   * @param {string} id
   * @returns {Promise<PaginatedResponseClass<Idea>>}
   * @memberof QuestionService
   */
  public static fetchIdea(params): Promise<PaginatedResponseClass<Idea>> {
    return fetchIdeaList(params).then(({ fetchIdea }) => fetchIdea)
  }

  public static addIdea(params: {
    qid: string
    content: string
    uid?: string
  }): Promise<ActionResponseModel> {
    return addIdea(params).then(({ addIdea }) => addIdea)
  }
}
