import Taro, { useState, useEffect, useReachBottom, useCallback, useRef } from '@tarojs/taro'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './AddFocusUserItem.scss'
import FocusUserItem from './components/FocusUserItem'
import usePageScrollTitle from '@/hooks/usePageScrollTitle'
import { UserService, AttentionUserService } from '../services'
import { PaginationProp, PaginationModel } from '@/common/domain/BaseModel'
import {
  AttentionUserInfo
} from '@/common/domain/user-domain/entities/user'
import Skeleton from 'taro-skeleton'
import { ArrayLen } from '@/utils'
import { LoadingComponent } from '@/components/Loading/Loading'

const AddFocusUserItemProp = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<AttentionUserInfo[]>(ArrayLen(10))
  const [paginated, setPaginated] = useState<PaginationModel | null>(null)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  usePageScrollTitle('添加关注', 50)

  let pageRef = useRef<PaginationProp>({
    page: 1,
    limit: 20
  })
  const onSearchBarValueChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  useReachBottom(async () => {
    if (paginated && paginated.hasMore) {
      pageRef.current.page++
      await onLoadData()
    }
  })
  
  const onLoadData =  useCallback(async (reset: boolean = false) => {
    const { items, page: pagination } = await UserService.findUserByNickName(
      pageRef.current,
      value
    )
    setList(prev => reset ? items : prev.concat(items))
    setPaginated(pagination)
  }, [value])

  const onActionClick = useCallback(async () => {
    setSkeletonLoading(true)
    await onLoadData(true)
    setSkeletonLoading(false)
  }, [onLoadData])

  useEffect(() => {
    if (value === '') {
      onActionClick()
    }
  }, [value, onActionClick])

  const onUserItemActionClick = useCallback(async (user: AttentionUserInfo) => {
    if (user.isAttention) {
      await AttentionUserService.unsubscribe(user._id!)
      user.fansCount-=1
      user.isAttention = false
    } else {
      await AttentionUserService.subscribe(user._id!)
      user.fansCount+=1
      user.isAttention = true
    }
    setList(list => {
      return list.map(item => {
        if (item._id === user._id) {
          return {
            ...user
          }
        }
        return item
      })
    })
  }, [])
  return (
    <View className="add-focus">
      <LayoutTitle title="添加关注">
        <AtSearchBar
          value={value}
          onChange={onSearchBarValueChange}
          onActionClick={onActionClick}
        />
      </LayoutTitle>
      <View>
        {list.map(item => (
          <Skeleton
            key={item._id}
            avatar
            animateName="elastic"
            row={2}
            rowProps={[
              { width: '80%', height: 24 },
              { width: '30%', height: 24 }
            ]}
            action
            rowWidth="80%"
            loading={skeletonLoading}>
            <FocusUserItem onActionClick={onUserItemActionClick} user={item} />
          </Skeleton>
        ))}
        {
          paginated && <LoadingComponent finished={!paginated.hasMore}></LoadingComponent>
        }
      </View>
    </View>
  )
}
AddFocusUserItemProp.config = {
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black'
}
export default AddFocusUserItemProp