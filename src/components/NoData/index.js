import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import './index.scss'
export default function NoData(props) {
  const tips = props.tips
  const actionTips = props.actionTips
  return (
    <View className="no-data-box">
      <AtIcon
        prefixClass={ICON_PREFIX_CLASS}
        value="zanwuneirong"
        size="60"
        color="#999"
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
