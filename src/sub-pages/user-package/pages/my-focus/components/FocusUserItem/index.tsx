import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
export type FocusUserItemOption = {
  avatarUrl?: string
  name?: string
  isFocus?: boolean
  followNum?: number
  releaseNum?: number
}
export default function FocusUserItem (props: FocusUserItemOption) {
  return (
    <View className="focus-item">
      <View className="focus-item-img-box">
        <Image
          className="avatar circle"
          src="https://axhub.im/pro/d3021230d106035e/images/%E5%85%B3%E6%B3%A8/u17.svg"
        />
      </View>
      <View className="focus-item-info">
        <View>
          <View className="focus-item-info-title">
            <Text>老阿姨</Text>
          </View>
          <View className="focus-item-info-desc">
            发布了588道题，4565人关注
          </View>
        </View>
        <View>
          {!props.isFocus ? (
            <AtButton size="small" type="primary">
              + 关注
            </AtButton>
          ) : (
            <AtButton size="small">已关注</AtButton>
          )}
        </View>
      </View>
    </View>
  )
}