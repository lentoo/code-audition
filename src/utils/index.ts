import Taro from '@tarojs/taro'
import { OPEN_ID, USER_INFO, APP_ID } from '@/constants/common'
import { get as getGlobalData, set as setGlobalData } from './global-data'

export class Storage {
  static setItem(key, val) {
    return Taro.setStorage({
      key,
      data: val
    })
  }
  /**
   * @description 本地存储，指定缓存时间
   * @author lentoo
   * @date 2019-09-04
   * @static
   * @param {string} key
   * @param {any} val
   * @param {number} [expire=0]
   * @returns
   * @memberof Storage
   */
  static setItemByExpire(key: string, val: any, expire = 0) {
    try {
      const data = {
        expireDate: expire === 0 ? null : Date.now() + expire,
        value: val
      }
      return Taro.setStorage({
        key,
        data: JSON.stringify(data)
      })
    } catch (error) {
      console.error('store set item', error)
    }
  }
  static getItemByExpire(key: string) {
    try {
      const data = JSON.parse(Taro.getStorageSync(key))
      if (data && data.expireDate) {
        const now = Date.now()
        // 已过期
        if (data.expireDate - now < 0) {
          console.log(`storage key: ${key} 有数据，但是已过期，删除之`)
          Taro.removeStorage({
            key
          })
          return null
        } else {
          // 未过期
          return data.value
        }
      }
      if (data && data.value) {
        return data.value
      } else {
        return data
      }
    } catch (error) {
      console.error('store get item', error)
    }
  }
  static setItemSync(key, val) {
    console.log({
      key,
      val
    })
    return Taro.setStorageSync(key, val)
  }
  static getItem(key) {
    return Taro.getStorage({
      key
    })
  }
  static getItemSync(key) {
    return Taro.getStorageSync(key)
  }
}

export class UpdateManager {
  /**
   * @description 检查是否有版本更新
   * @author lentoo
   * @date 2019-03-25
   * @static
   * @memberof UpdateManager
   */
  static CheckAppUpdate() {
    const updateManager = Taro.getUpdateManager()

    updateManager.onCheckForUpdate(res => {
      console.log('onCheckForUpdate====', res)
      if (res.hasUpdate) {
        console.log('res.hasUpdate====', res.hasUpdate)
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，重启应用即可体验新版本',
            success: result => {
              if (result.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  }
}

export class UserInfo {
  /**
   * @description 获取用户信息
   * @author lentoo
   * @date 2019-04-01
   * @static
   * @returns
   * @memberof UserInfo
   */
  static getUserInfo() {
    return Taro.getUserInfo()
  }
}
export const loadAppId = async () => {
  let appId = Storage.getItemSync(APP_ID)
  if (appId) {
    setGlobalData(APP_ID, appId)
    return appId
  } else {
    appId = {}
  }
  const res = await Taro.cloud.callFunction({
    name: 'GetAppId'
  })
  appId.openid = res.result.openid
  appId.appid = res.result.appid
  // appId.unionid = res.result.unionid

  console.log('AppId', appId)
  setGlobalData(APP_ID, appId)
  Storage.setItemSync(APP_ID, appId)
  return appId
}
export const clearToken = () => {
  setGlobalData('token', undefined)
  Taro.removeStorageSync('token')
  Taro.removeStorageSync(USER_INFO)
  return true
}
export const getToken = () => {
  let token = getGlobalData('token')
  if (!token) {
    token = Taro.getStorageSync('token')
  }
  return token
}
export class Utils {
  static systemInfoKey = 'system-info'
  static getSystemInfoSync() {
    let systemInfo = getGlobalData(this.systemInfoKey)
    if (!systemInfo) {
      systemInfo = Taro.getSystemInfoSync()
      setGlobalData(this.systemInfoKey, systemInfo)
    }
    return systemInfo
  }
  static getOpenId() {
    let openId = getGlobalData(OPEN_ID)
    if (!openId) {
      openId = Storage.getItemSync(OPEN_ID)
    }
    return openId || ''
  }

  /**
   * @description 将一位数组格式化为每行 line 个的二维数组
   * @author lentoo
   * @date 2019-04-18
   * @param {*} array
   * @param {number} [line=3]
   * @returns
   * @memberof Grid
   */
  static changeArray<T>(array: T[], line = 3): T[][] {
    let len = array.length
    let n = line
    let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
    let res: T[][] = []
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp: T[] = array.slice(i * n, i * n + n)
      res.push(temp)
    }
    return res
  }

  // 防抖
  // 暴力版： 定时器期间，有新操作时，清空旧定时器，重设新定时器
  static debounce(fn, wait) {
    let timer,
      timeStamp = 0
    let context, args

    let run = () => {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
    let clean = () => {
      clearTimeout(timer)
    }

    return function() {
      context = this
      args = arguments
      let now = new Date().getTime()

      if (now - timeStamp < wait) {
        console.log('reset', now)
        clean() // clear running timer
        run() // reset new timer from current time
      } else {
        console.log('set', now)
        run() // last timer alreay executed, set a new timer
      }
      timeStamp = now
    }
  }
  /**
   * @description 时间显示
   * @example 假设当前时间为 2019-05-20 00:00:00
   * 使用示例代码：
   * timeView(new Date()) // 刚刚发布
   * timeView('2019-05-19 23:01:00') // 59分钟前
   * timeView('2019-05-19 12:00:00') // 12小时前
   * timeView('2019-05-15 12:00:00') // 5天前
   * timeView('2019-04-15 12:00:00') // 04-15
   * timeView('2018-04-15 12:00:00') // 2018-04-15
   */
  static timeView(value) {
    const now = +new Date() // 当时时间
    const timeStamp = +new Date(value) // 需要处理的时间
    const result = now - timeStamp // 相差的时间戳
    const min = 60 * 1000 // 分钟的毫秒数
    const hour = 60 * 60 * 1000 // 小时的毫秒数
    const day = 60 * 60 * 1000 * 24 // 日的毫秒数
    if (result / min < 1) {
      return '刚刚发布'
    } else if (result / min < 60) {
      return Math.floor(result / min) + '分钟前'
    } else if (result / hour > 1 && result / hour < 24) {
      return Math.floor(result / hour) + '小时前'
    } else if (result / day > 1 && result / day < 30) {
      return Math.floor(result / day) + '天前'
    } else {
      const targetDate = new Date(value)
      const prevAddZero = num => {
        return num < 10 ? '0' + num : num
      }
      return `${targetDate.getFullYear()}-${prevAddZero(
        targetDate.getMonth()
      )}-${prevAddZero(targetDate.getDate())} ${prevAddZero(
        targetDate.getHours()
      )}:${prevAddZero(targetDate.getMinutes())}:${prevAddZero(
        targetDate.getSeconds()
      )}`
    }
  }
}

export class Validate {
  required(value) {
    if (!value) {
      throw new Error('key is required')
    }
    return this
  }
}

export function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
/**
 * @description 生成一个指定长度的有序数组   len = 2 => [0, 1]
 * @author lentoo
 * @date 2019-08-14
 * @export
 * @param {*} len
 * @returns
 */
export function ArrayLen(len = 0) {
  const arr = Array.apply(null, Array(len)).map((item, index) => ({
    id: index,
    _id: index
  }))
  return arr
}
