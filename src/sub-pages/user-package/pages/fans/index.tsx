import Taro, {
  useEffect,
  useState,
  useReachBottom,
  usePullDownRefresh,
  useRouter,
  useCallback
} from '@tarojs/taro'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import { Text, View, Image } from '@tarojs/components'
import './index.scss'
import usePageScrollTitle from '@/hooks/usePageScrollTitle'
import CodeButton from '@/components/Button'
import Skeleton from 'taro-skeleton'
import { AttentionUserService } from '../services'
import AttentionUser from '@/common/domain/attention-user-domain/entities/AttentionUser'
import { ArrayLen } from '@/utils'
import { PaginationProp, PaginationModel } from '@/common/domain/BaseModel'
import { LoadingComponent } from '@/components/Loading/Loading'
import { AtIcon } from 'taro-ui'
import useUserInfo from '@/hooks/useUserInfo'

const FansPage = () => {
  const [title, setTitle] = useState('')
  const {
    params: {
      uid,
      nickName
    }
  } = useRouter()

  const [userinfo] = useUserInfo()

  useEffect(() => {
    setTitle(uid ? `${nickName}的粉丝` : '我的粉丝')
  }, [])

  usePageScrollTitle(title)

  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [fans, setFans] = useState<AttentionUser[]>(ArrayLen(10))
  const [page, setPage] = useState<PaginationProp>({ page: 1, limit: 20 })
  const [pagination, setPagination] = useState<PaginationModel | null>(null)

  async function loadData(refresh = true) {
    
    const { items, page: paginated } = await AttentionUserService.findFansList(
      uid ? uid : userinfo!._id!,
      page
    )
    console.log('items', items)

    setFans(prev => (refresh ? items : prev.concat(items)))
    setPagination(paginated)
    setSkeletonLoading(false)
  }

  useEffect(() => {
    loadData(true)
  }, [page])

  usePullDownRefresh(async () => {
    Taro.vibrateShort()
    await loadData()
    Taro.stopPullDownRefresh()
  })

  useReachBottom(() => {
    if (pagination && pagination.hasMore) {
      setPage(prev => {
        const page = prev.page + 1
        return {
          page,
          limit: prev.limit
        }
      })
    }
  })
  async function onClick(user: AttentionUser) {
    Taro.vibrateShort()
    if (user.user.isAttention) {
      await AttentionUserService.unsubscribe(user.user._id!)
    } else {
      await AttentionUserService.subscribe(user.user._id!)
    }
    setFans(list => {
      return list.map(item => {
        if (item.user._id === user.user._id) {
          item.user.isAttention = !item.user.isAttention
        }
        return item
      })
    })
  }
  const onAvatarClick = useCallback((id: string) => {
    Taro.navigateTo({
      url: `/pages/other-homepage/index?id=${id}`
    })
  }, [])
  return (
    <View className="fans">
      <LayoutTitle title={title} />
      <View className="fans-list">
        {fans.map(item => (
          <Skeleton
            key={item._id}
            loading={skeletonLoading}
            avatar
            row={1}
            rowWidth="40%"
            action>
            {item.user && (
              <View className="fans-item">
                <Image onClick={() => {
                  onAvatarClick(item.user._id!)
                }} className="fans-item-img" src={item.user.avatarUrl!} />
                <View className="fans-item-name">
                  <Text>{item.user.nickName}</Text>
                </View>
                <View className="fans-item-btn">
                  <CodeButton
                    onClick={() => {
                      onClick(item)
                    }}
                    type={item.user.isAttention ? 'info' : 'primary'}>
                    <View>
                      <AtIcon
                        size={10}
                        value={item.user.isAttention ? 'repeat-play' : 'add'}
                      />
                      <Text className="ml5">
                        {item.user.isAttention ? '互相关注' : '关注'}
                      </Text>
                    </View>
                  </CodeButton>
                </View>
              </View>
            )}
          </Skeleton>
        ))}
        {pagination && <LoadingComponent finished={!pagination.hasMore} />}
      </View>
    </View>
  )
}

FansPage.config = {
  navigationBarTitleText: '',
  enablePullDownRefresh: true,
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black'
}
export default FansPage
