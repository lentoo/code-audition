import service from '../api'

/**
 * @description 扫码二维码
 * @author lentoo
 * @date 2019-04-13
 * @export
 * @param {*} unicode
 * @returns
 */
export function scanCodeLogin (unicode) {
  return service.get(`/audition/login/unicode/${unicode}`)
}
/**
 * @description 确认登录
 * @author lentoo
 * @date 2019-04-13
 * @export
 * @returns
 */
export function confirmLogin () {
  return service.get('/audition/login/confirmLogin')
}
/**
 * @description 保存用户信息
 * @author lentoo
 * @date 2019-04-13
 * @export
 * @param {*} params
 * @returns
 */
export function saveUserInfo (params) {
  return service.post('/audition/userInfo/save', params)
}
