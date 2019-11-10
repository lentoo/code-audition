import Taro, {
  Config,
  useState,
  useReachBottom,
  useEffect,
  usePullDownRefresh,
  useRouter,
  useCallback,
  useDidShow
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
import useUserInfo from '@/hooks/useUserInfo'

const AttentionUserPage = () => {
  const [list, setList] = useState<AttentionUserInfo[]>(ArrayLen(20))

  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const [loading, setLoading] = useState(true)
  
  const [pagination, setPagination] = useState<PaginationModel | null>(null)

  const [userinfo] = useUserInfo()

  const {
    params: {
      uid,
      nickName
    }
  } = useRouter()

  let page: PaginationProp = {
    page: 1,
    limit: 20
  }
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(uid ? `${nickName}的关注` : '我的关注')
  }, [])

  usePageScrollTitle(title, 50)

  useReachBottom(() => {
    if (pagination && pagination.hasMore) {
      console.log('useReachBottom')
      page.page++
      onLoadData()
    }
  })
  
  useDidShow(() => {
    onLoadData(true)
  })

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
    } = await AttentionUserService.attentionUserList(page, uid || userinfo!._id!)

    const list: AttentionUserInfo[] = items.map((item) => {
      return {
        ...item,
        // isAttention: true
      }
    })
    console.log('paginated', paginated);
    setPagination(paginated)

    setList(prev => (clear ? list : prev.concat(list)))

    console.log('items', items)
    setSkeletonLoading(false)
    setLoading(false)
  }

  const onActionClick = useCallback(async (user: User) => {
    Taro.vibrateShort()
    if (user.isAttention) {
      await AttentionUserService.unsubscribe(user._id!)
      user.fansCount-=1
      user.isAttention = false
    } else {
      await AttentionUserService.subscribe(user._id!)
      user.fansCount+=1
      user.isAttention = true
    }
    setList((prevList) => {
      return prevList.map(u => {
        if (u._id === user._id) {
          return {
            ...user
          }
        }
        return u
      })
    })
  }, [])
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
        </View>
      )
    )
  }

  return (
    <View>
      <LayoutTitle title={title}>
        <View style={{ textAlign: 'right' }}>
          <View style={{
            display: 'inline-block'
          }}>
            {
              !uid && <AtButton
                circle
                size='small'
                type="primary"
                onClick={() => {
                  Taro.navigateTo({
                    url: './AddFocusUserItem'
                  })
                }}>
                添加关注
              </AtButton>
            }
            
          </View>
        </View>
      </LayoutTitle>
      {renderFocusList()}
      {
        pagination && (
          <LoadingComponent finished={!pagination.hasMore} />
        )
      }
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