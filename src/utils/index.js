import Taro from '@tarojs/taro'
import { get as getGlobalData, set as setGlobalData } from './global-data';

export function getUserInfo () {
  return Taro.getUserInfo()
}

export class Storage {
  static setItem (key, val) {
    return Taro.setStorage({
      key,
      data: val
    })
  }
  static setItemSync(key, val) {
    console.log({
      key,
      val
    })
    return Taro.setStorageSync(key, val)
  }
  static getItem (key) {
    return Taro.getStorage({
      key
    })
  }
  static getItemSync (key) {
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
  static CheckAppUpdate () {
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
  static getUserInfo () {
    return Taro.getUserInfo()
  }
}

export class Utils {
  static systemInfoKey = 'system-info'
  static getSystemInfoSync () {
    let systemInfo = getGlobalData(this.systemInfoKey)
    if (!systemInfo) {
      systemInfo = Taro.getSystemInfoSync()
      setGlobalData(this.systemInfoKey, systemInfo)
    }
    return systemInfo
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
  static changeArray(array, line = 3) {
    let len = array.length;
    let n = line;
    let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = array.slice(i * n, i * n + n);
      res.push(temp);
    }
    return res
  }
}
