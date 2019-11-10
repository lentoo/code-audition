import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { AttentionUserInfo } from '@/common/domain/user-domain/entities/user'
import CodeButton from '@/components/Button'
import Taro, { useCallback } from '@tarojs/taro'
export type FocusUserItemOption = {
  user: AttentionUserInfo
  onActionClick?: (item: AttentionUserInfo) => void
}
export default function FocusUserItem (props: FocusUserItemOption) {
  const { user, onActionClick } = props

  const onAvatarClick = useCallback(() => {
    if (user) {
      Taro.navigateTo({
        url: `/pages/other-homepage/index?id=${user._id}`
      })
    }
  }, [user])

  if (!user) {
    return null
  }
  return (
    <View className="focus-item">
      <View className="focus-item-img-box">
        <Image
          className="avatar circle"
          src={user.avatarUrl!}
          onClick={onAvatarClick}
        />
      </View>
      <View className="focus-item-info">
        <View>
          <View className="focus-item-info-title">
            <Text>{user.nickName}</Text>
          </View>
          <View className="focus-item-info-desc">
            {/* 发布了0道题， */}
            {user && user.fansCount && user.fansCount.toString()}人关注
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