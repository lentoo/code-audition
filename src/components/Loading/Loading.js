import { AtLoadMore } from 'taro-ui'
import Taro from '@tarojs/taro'
export function LoadingComponent({ finished = false }) {
  return (
    <AtLoadMore
      customStyle={{
        height: Taro.pxTransform(80)
      }}
      status={finished ? 'noMore' : 'loading'}
      loadingText="正在加载中"
    />
  )
}
