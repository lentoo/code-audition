import BaseModel from '../../BaseModel'
import Question from './Question'
import User from '../../user-domain/entities/user'

export default class Idea extends BaseModel {
  question?: Question
  content: string
  userinfo: User
  targetUser?: User
  constructor(prop: Idea) {
    super()
    this.question = prop.question
    this.content = prop.content
    this.userinfo = prop.userinfo
  }
}
