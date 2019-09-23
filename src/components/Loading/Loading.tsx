import { AtLoadMore } from 'taro-ui'
import Taro from '@tarojs/taro'
export interface LoadingComponentProp {
  finished?: boolean
  noMoreText?: string
}
export function LoadingComponent({
  finished = false,
  noMoreText = '-- No More Data --'
}: LoadingComponentProp) {
  return (
    <AtLoadMore
      // customStyle={{
      //   height: Taro.pxTransform(80)
      // }}
      status={finished ? 'noMore' : 'loading'}
      loadingText="正在加载中"
      noMoreText={noMoreText}
      noMoreTextStyle={{
        padding: '20px 0',
        color: '#ccc',
        fontSize: '14px'
      }}
    />
  )
}
export const placeholder = 'placeholder'
