/**
 * @description 收藏集
 * @author lentoo
 * @date 2019-08-11
 * @export
 * @class Collection
 */
export default class Collection {
  constructor(props) {
    this.id = props.id
    this.name = props.name
    this.questionNum = props.questionNum
    this.attentionNum = props.attentionNum
    this.nickName = props.nickName
    this.select = props.select
  }
}
