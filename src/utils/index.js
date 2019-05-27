import Taro from '@tarojs/taro'
import { get as getGlobalData, set as setGlobalData } from './global-data';

export function getUserInfo() {
  return Taro.getUserInfo()
}

export class Storage {
  static setItem(key, val) {
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

  // 防抖
  // 暴力版： 定时器期间，有新操作时，清空旧定时器，重设新定时器
  static debounce (fn, wait) {
    let timer, timeStamp = 0;
    let context, args;

    let run = () => {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
    let clean = () => {
      clearTimeout(timer);
    }

    return function () {
      context = this;
      args = arguments;
      let now = (new Date()).getTime();

      if (now - timeStamp < wait) {
        console.log('reset', now);
        clean();  // clear running timer
        run();    // reset new timer from current time
      } else {
        console.log('set', now);
        run();    // last timer alreay executed, set a new timer
      }
      timeStamp = now;
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
    } else if (result / day > 1 && result / day < 7) {
      return Math.floor(result / day) + '天前'
    } else if (this.switchTime(now, 'YYYY') === this.switchTime(timeStamp, 'YYYY')) {
      return this.switchTime(timeStamp, 'MM月DD日')
    } else {
      return this.switchTime(timeStamp, 'YYYY年MM月DD日')
    }
  }
}
