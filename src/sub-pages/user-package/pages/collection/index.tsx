import Taro, {
  useState,
  useEffect,
  usePullDownRefresh,
  useDidShow
} from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab, AtSwipeAction } from 'taro-ui'
import { CollectionService } from '../services'
import './index.scss'
import TaroSkeleton from 'taro-skeleton'
import { ArrayLen } from '@/utils'
import Collection from '@/domain/collection-domain/entities/Collection'
import { PaginationProp, PaginationModel } from '@/common/domain/BaseModel'

const Colleciton = () => {
  // const tabList = [{ title: '我的' }, { title: '关注的' }]
  const [tips, setTips] = useState(true)
  const [paginated, setPaginated] = useState<PaginationModel>()
  const page: PaginationProp = {
    page: 1,
    limit: 10
  }
  const handleItemClick = item => {
    Taro.navigateTo({
      url: './Detail?id=' + item._id + '&name=' + item.name
    })
  }

  const onLoadData = async () => {
    const { items, page: pagination } = await CollectionService.getCollection(
      page
    )
    setPaginated(pagination)
    setCollections(items)
    setSkeletonLoading(false)
  }

  useDidShow(() => {
    onLoadData()
  })

  usePullDownRefresh(async () => {
    Taro.vibrateShort()
    await onLoadData()
    Taro.stopPullDownRefresh()
  })
  const handleSwipeActionClick = (item: Collection) => {
    if (tips) {
      Taro.showModal({
        title: '提示',
        content: '确认删除吗 (不可恢复) ？',
        success: res => {
          if (res.confirm) {
            handleConfirmDelete(item)
          }
        }
      })
    } else {
      handleConfirmDelete(item)
    }
  }
  const handleConfirmDelete = async (item: Collection) => {
    Taro.showLoading({
      title: '正在删除中...',
      mask: true
    })
    if (item) {
      await CollectionService.delCollectionitem(item._id)
      setCollections(collections.filter(colleciton => colleciton._id !== item._id))
    }
    setTips(false)
    Taro.hideLoading()
    console.log('删除条目', item)
  }
  const handleFabClick = () => {
    Taro.navigateTo({
      url: './add-collection'
    })
  }
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [collections, setCollections] = useState<Collection[]>(ArrayLen(6))

  const renderList = () => {
    return (
      <View>
        {collections.map((item) => {
          return (
            <AtSwipeAction
              key={item._id}
              onClick={() => handleSwipeActionClick(item)}
              options={[
                {
                  text: '刪除',
                  style: {
                    backgroundColor: '#FF4949'
                  }
                }
              ]}>
              <TaroSkeleton title row={1} loading={skeletonLoading}>
                <View
                  className="collection-item"
                  onClick={handleItemClick.bind(this, item)}>
                  <View className="collection-item-left">
                    <View className="collection-item-title">
                      <Text>{item.name}</Text>
                    </View>
                    <View className="collection-item-description">
                      <Text>{item.questionNum}题</Text>
                    </View>
                  </View>
                  {/* <View className='collection-item-right'>
                        <AtIcon value='chevron-right' size={20}></AtIcon>
                      </View> */}
                </View>
              </TaroSkeleton>
            </AtSwipeAction>
          )
        })}
      </View>
    )
  }

  return (
    <View className="collection">
      {/* <AtTabs
        tabList={this.tabList}
        current={current}
        onClick={this.handleTabClick}
        swipeable={false}>
        <AtTabsPane current={this.state.current} index={0}> */}
      <View className="panel">
        <ScrollView scrollY className="scroll-view">
          {renderList()}
        </ScrollView>
      </View>
      {/* </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View className="panel">
            <ScrollView className="scroll-view">123556</ScrollView>
          </View>
        </AtTabsPane>
      </AtTabs> */}

      <View className="fab-btn">
        <AtFab onClick={handleFabClick}>
          <Text className="at-fab__icon at-icon at-icon-add" />
        </AtFab>
      </View>
    </View>
  )
}
Colleciton.config = {
  navigationBarTitleText: '收藏集',
  enablePullDownRefresh: true
}

export default Colleciton
