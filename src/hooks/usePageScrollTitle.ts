import Taro, { usePageScroll } from '@tarojs/taro'

export default (title: string, offsetTop: number = 100) => {
  usePageScroll(({ scrollTop }) => {
    if (scrollTop >= offsetTop) {
      Taro.setNavigationBarTitle({ title })
    } else {
      Taro.setNavigationBarTitle({ title: '' })
    }
  })
}
