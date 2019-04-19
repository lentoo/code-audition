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
/**
 * @description 保存用户信息
 * @author lentoo
 * @date 2019-04-13
 * @export
 */
export const API_SAVE_USER_INFO = '/audition/userInfo/save'
/**
 * @description 校验是否第一接口
 * @author lentoo
 * @date 2019-04-17
 */
export const API_VALID_ONE = '/audition/userInfo/vaildOne'

/**
 * @description 用户关注分类
 */
export const API_USER_SORT = '/audition/sort/put'
/**
 * @deprecated 分类列表
 */
export const API_SORT = '/audition/sort'
