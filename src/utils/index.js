import Taro from '@tarojs/taro'

export function getUserInfo () {
  return Taro.getUserInfo()
}

export class Storage {
  static setItem (key, val) {
    return Taro.setStorage(key, val)
  }
  static setItemSync(key, val) {
    console.log({
      key,
      val
    })
    return Taro.setStorageSync(key, val)
  }
  static getItem (key) {
    return Taro.getStorage(key)
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
