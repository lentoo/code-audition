import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import './index.scss'
import { View, Text } from '@tarojs/components'
export default function NoData(props) {
  const tips = props.tips
  const actionTips = props.actionTips
  return (
    <View className="no-data-box">
      <AtIcon
        prefixClass={ICON_PREFIX_CLASS}
        value="zanwu"
        size="100"
        color="#bfbfbf"
      />
      {tips && <Text className="no-data-text">{tips}</Text>}
      {actionTips && (
        <View onClick={props.onClick}>
          <Text className="no-data-primary-text">{actionTips}</Text>
        </View>
      )}
    </View>
  )
}
