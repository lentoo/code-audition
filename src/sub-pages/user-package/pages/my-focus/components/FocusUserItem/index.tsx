import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import { AttentionUserInfo } from '@/common/domain/user-domain/entities/user'
import CodeButton from '@/components/Button'
export type FocusUserItemOption = {
  user: AttentionUserInfo
  onActionClick?: (item: AttentionUserInfo) => void
}
export default function FocusUserItem (props: FocusUserItemOption) {
  const { user, onActionClick } = props
  
  if (!user) {
    return null
  }
  return (
    <View className="focus-item">
      <View className="focus-item-img-box">
        <Image
          className="avatar circle"
          src={user.avatarUrl!}
        />
      </View>
      <View className="focus-item-info">
        <View>
          <View className="focus-item-info-title">
            <Text>{user.nickName}</Text>
          </View>
          <View className="focus-item-info-desc">
            发布了0道题，{user.attentionCount}人关注
          </View>
        </View>
        <View>
          <CodeButton onClick={() => {
            onActionClick && onActionClick(user)
          }} type={user.isAttention ? 'info' : 'primary'}><Text>{user.isAttention ? '已关注' : '+ 关注'}</Text></CodeButton>
        </View>
      </View>
    </View>
  )
}