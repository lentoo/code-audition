export default class User {
  constructor(prop = {}) {
    this.avatarUrl = prop.avatarUrl
    this.city = prop.city
    this.country = prop.country
    this.gender = prop.gender
    this.language = prop.language
    this.nickName = prop.nickName
    this.province = prop.province
  }
}
