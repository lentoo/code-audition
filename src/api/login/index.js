import service from '../api'

/**
 * @description 扫码二维码
 * @author lentoo
 * @date 2019-04-13
 * @export
 * @param {*} unicode
 * @returns
 */
export function scanCodeLogin ({unicode, loginToken}) {
  return service.get(`/audition/login/unicode/${unicode}?loginToken=${loginToken}`)
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
