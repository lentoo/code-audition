import Taro from '@tarojs/taro'
const userSubPackagePath = '/sub-pages/user-package/pages'
export function navigateToFeedback() {
  Taro.navigateTo({
    url: `${userSubPackagePath}/feedback/index`
  })
}

export function natigateToHome() {
  Taro.redirectTo({
    url: '/pages/home/index'
  })
}
