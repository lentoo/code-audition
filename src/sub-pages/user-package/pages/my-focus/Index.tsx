import Taro, {
  Config,
  useState,
  useReachBottom,
  useEffect,
  usePullDownRefresh
} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import './index.scss'
import { LoadingComponent } from '@/components/Loading/Loading'
import { delay, ArrayLen } from '@/utils'
import TaroSkeleton from 'taro-skeleton'
import FocusUserItem from './components/FocusUserItem'
import usePageScrollTitle from '@/hooks/usePageScrollTitle'
import { PaginationProp, PaginationModel } from '@/common/domain/BaseModel'
import User, { AttentionUserInfo } from '@/common/domain/user-domain/entities/user'
import { AttentionUserService } from '../services'

const AttentionUserPage = () => {
  const [list, setList] = useState<AttentionUserInfo[]>(ArrayLen(20))

  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationModel | null>(null)

  let page: PaginationProp = {
    page: 1,
    limit: 20
  }
  usePageScrollTitle('我的关注', 50)

  useReachBottom(() => {
    if (pagination && pagination.hasMore) {
      console.log('useReachBottom')
    }
  })
  useEffect(() => {
    onLoadData(true)
  }, [])
  usePullDownRefresh(async () => {
    Taro.vibrateShort()
    await onLoadData(true)
    Taro.stopPullDownRefresh()
  })
  async function onLoadData(clear = false) {
    setLoading(true)
    const {
      page: paginated,
      items
    } = await AttentionUserService.attentionUserList(page)

    const list: AttentionUserInfo[] = items.map((item) => {
      return {
        ...item.attentionUser,
        isAttention: true
      }
    })
    setPagination(paginated)

    setList(prev => (clear ? list : prev.concat(list)))

    console.log('items', items)
    setSkeletonLoading(false)
    setLoading(false)
  }
  const onActionClick = async (user: User) => {
    Taro.vibrateShort()
    if (user.isAttention) {
      await AttentionUserService.unsubscribe(user._id!)
    } else {
      await AttentionUserService.subscribe(user._id!)
    }
    setList(() => {
      return list.map(u => {
        if (u._id === user._id) {
          u.isAttention = !u.isAttention
        }
        return u
      })
    })
  }
  const renderFocusList = () => {
    return (
      list.length && (
        <View className="focus-list">
          {list.map(item => {
            return (
              <TaroSkeleton
                avatar
                title
                row={1}
                key={item._id}
                rowWidth="50%"
                action
                loading={skeletonLoading}>
                <FocusUserItem onActionClick={onActionClick} user={item} />
              </TaroSkeleton>
            )
          })}
          {pagination && !skeletonLoading && !pagination.hasMore && (
            <LoadingComponent finished={!pagination.hasMore} />
          )}

          {/* { pagination && !pagination.hasMore &&  <LoadingComponent finished={!pagination.hasMore} />} */}
        </View>
      )
    )
  }

  return (
    <View>
      <LayoutTitle title="我的关注">
        <View style={{ textAlign: 'right' }}>
          <AtButton
            circle
            size="small"
            type="primary"
            onClick={() => {
              Taro.navigateTo({
                url: './AddFocusUserItem'
              })
            }}>
            添加关注
          </AtButton>
        </View>
      </LayoutTitle>
      {renderFocusList()}
    </View>
  )
}
AttentionUserPage.config = {
  navigationBarTitleText: '',
  enablePullDownRefresh: true,
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black'
}
export default AttentionUserPage