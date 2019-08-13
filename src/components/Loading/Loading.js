import { AtLoadMore } from 'taro-ui'
import Taro from '@tarojs/taro'

export function LoadingComponent({
  finished = false,
  noMoreText = '没有更多了'
}) {
  return (
    <AtLoadMore
      customStyle={{
        height: Taro.pxTransform(80)
      }}
      status={finished ? 'noMore' : 'loading'}
      loadingText="正在加载中"
      noMoreText={noMoreText}
      noMoreTextStyle={{
        padding: '20px 0'
      }}
    />
  )
}
