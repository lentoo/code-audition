import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './not-message.scss'
import { ICON_PREFIX_CLASS } from '@/constants/common'

export default class Test extends Taro.Component {
  render() {
    return (
      <View className="not-message">
        <AtIcon
          prefixClass={ICON_PREFIX_CLASS}
          value="iconfontbiaoqingwunai2eps"
          size="60"
          color="#999"
        />
        <View className="not-message-text">
          <Text>暂时没有通知消息</Text>
        </View>
      </View>
    )
  }
}
