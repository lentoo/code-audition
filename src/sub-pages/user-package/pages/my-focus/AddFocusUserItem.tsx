import Taro, { Config, useState, useEffect, useReachBottom } from '@tarojs/taro'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './AddFocusUserItem.scss'
import FocusUserItem from './components/FocusUserItem'
import usePageScrollTitle from '@/hooks/usePageScrollTitle'
import { UserService, AttentionUserService } from '../services'
import { PaginationProp, PaginationModel } from '@/common/domain/BaseModel'
import User, {
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
  let page: PaginationProp = {
    page: 1,
    limit: 20
  }
  const onSearchBarValueChange = (value: string) => {
    setValue(value)
  }
  useEffect(() => {
    onActionClick()
  }, [])

  useReachBottom(async () => {
    if (paginated && paginated.hasMore) {
      page.page++
      await onLoadData()
    }
  })

  const onActionClick = async () => {
    setSkeletonLoading(true)
    await onLoadData(true)
    setSkeletonLoading(false)
    
  }
  const onLoadData = async (reset: boolean = false) => {
    const { items, page: pagination } = await UserService.findUserByNickName(
      page,
      value
    )
    setList(prev => reset ? items : prev.concat(items))
    setPaginated(pagination)
  }
  const onUserItemActionClick = async (user: AttentionUserInfo) => {
    if (user.isAttention) {
      await AttentionUserService.unsubscribe(user._id!)
    } else {
      await AttentionUserService.subscribe(user._id!)
    }
    setList(list => {
      return list.map(item => {
        if (item._id === user._id) {
          item.isAttention = !item.isAttention
        }
        return item
      })
    })
  }
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
        {/* <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem />
        <FocusUserItem /> */}
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

// class AddFocusUserItem extends Taro.Component {
//   config: Config = {
//     navigationBarTitleText: '',
//     enablePullDownRefresh: true,
//     navigationBarBackgroundColor: '#fff',
//     navigationBarTextStyle: 'black'
//   }
//   state = {
//     value: ''
//   }
//   onPageScroll(params: any) {
//     const scrollTop = params.scrollTop as number
//     if (scrollTop > 50) {
//       Taro.setNavigationBarTitle({
//         title: '添加关注'
//       })
//     } else {
//       Taro.setNavigationBarTitle({
//         title: ''
//       })
//     }
//   }

//   onSearchBarValueChange = (value: string) => {
//     this.setState({
//       value
//     })
//   }

//   render() {
//     const { value } = this.state
//     return (
//       <View className="add-focus">
//         <LayoutTitle title="添加关注">
//           <AtSearchBar value={value} onChange={this.onSearchBarValueChange} />
//         </LayoutTitle>
//         <View>
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//           <FocusUserItem />
//         </View>
//       </View>
//     )
//   }
// }
