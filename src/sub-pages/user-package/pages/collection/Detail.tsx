import Taro, {
  useDidShow,
  useRouter,
  useState,
  usePullDownRefresh,
} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtButton, AtSwipeAction, AtLoadMore } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import Tag from '@/components/Tag/Tag'
import NoData from '@/components/NoData'
import TaroSkeleton from 'taro-skeleton'
import { ArrayLen } from '@/utils'
import Collection from '@/domain/collection-domain/entities/Collection'
import Question from '@/common/domain/question-domain/entities/Question'
import usePageScrollTitle from '@/hooks/usePageScrollTitle'
import { CollectionService } from '../services'
import './detail.scss'

const CollectionItemDetail = () => {
  useDidShow(() => {
    onLoadData()
  })
  const {
    params: { id }
  } = useRouter()

  const [collection, setCollection] = useState<Collection>(ArrayLen(8))
  const [loading, setLoading] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(true)

  usePullDownRefresh(async () => {
    Taro.vibrateShort()
    await onLoadData()
    Taro.stopPullDownRefresh()
  })

  usePageScrollTitle(collection.name, 50)


  const onLoadData = async () => {
    setLoading(true)
    const response = await CollectionService.getCollectionTopic(id)
    setLoading(false)
    setCollection(response)
    setSkeletonLoading(false)
  }

  /**
   * @description 跳转首页进入刷题
   * @memberof CollectionDetail
   */
  const onStartBrushing = () => {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }
  const handleItemRemoveClick = async (item: Question, option) => {
    if (option.text === '移出收藏') {
      Taro.showLoading({
        title: '删除中'
      })
      await CollectionService.removeQuestionByCollection({
        qid: item._id!,
        cid: id
      })
      collection.questions = collection.questions.filter(
        q => q._id !== item._id
      )
      setCollection(collection)
      Taro.hideLoading()
    }
  }
  const onEditTitle = () => {
    Taro.navigateTo({
      url: `./add-collection?edit=1&id=${id}&name=${collection.name}`
    })
  }
  const renderCollectionTitle = () => {
    return (
      <View className="collection-detail">
        <View className="collection-title">
          <View className="collection-title-info">
            <View className="collection-title-info-name" onClick={onEditTitle}>
              {collection.name}
              <AtIcon prefixClass={ICON_PREFIX_CLASS} size="16" value="xie" />
            </View>
            <View className="collection-title-info-desc">
              <Text>数量：{collection.questions.length}</Text>
              <AtButton
                className="collection-title-info-btn"
                circle
                size="small"
                type="primary"
                onClick={onStartBrushing}>
                开始刷题
              </AtButton>
            </View>
          </View>
          <View className="collection-title-img-box">
            <Image
              className="collection-title-img"
              src={collection.userinfo.avatarUrl!}
            />
          </View>
        </View>
      </View>
    )
  }
  const renderCollectionList = () => {
    return (
      <View className="collection-list">
        {collection.questions &&
          collection.questions.map((item, index) => {
            return (
              <View key={item._id} className="collection-item-wrapper">
                <AtSwipeAction
                  onClick={handleItemRemoveClick.bind(this, item)}
                  options={[
                    {
                      text: '移出收藏',
                      style: {
                        backgroundColor: '#f56c6c'
                      }
                    }
                  ]}>
                  <TaroSkeleton title row={1} loading={skeletonLoading}>
                    <View className="collection-item" id={'item' + index}>
                      <View className="collection-item-title">
                        <Text>{item.title}</Text>
                      </View>
                      <View className="collection-item-info">
                        <View className="collection-item-desc">
                          {/* <Text className="collection-item-desc-name">
                            {collection.userinfo.nickName}
                          </Text> */}
                          <AtIcon
                            className="mr10"
                            prefixClass={ICON_PREFIX_CLASS}
                            value="page-view"
                            size="12"
                            color="#999"
                          />
                          <Text className="collection-item-desc-text">
                            {item.browse}
                            收藏 · {0} 想法
                          </Text>
                        </View>
                        <View className="collection-item-tags">
                          {item.sort &&
                            item.sort.map(tag => (
                              <Tag key={tag._id}>{tag.sortName}</Tag>
                            ))}
                        </View>
                      </View>
                    </View>
                  </TaroSkeleton>
                </AtSwipeAction>
              </View>
            )
          })}
        {loading && <AtLoadMore loadingText="正在加载中..." status="loading" />}
      </View>
    )
  }

  const renderNotData = () => {
    return collection.questions && collection.questions.length === 0 ? (
      <NoData
        tips="暂无题目"
        onClick={onStartBrushing}
        actionTips="赶紧去刷题收藏吧 ~"
      />
    ) : null
  }
  return (
    <View className="collection-detail">
      {renderCollectionTitle()}
      {renderCollectionList()}
      {renderNotData()}
    </View>
  )
}
CollectionItemDetail.config = {
  navigationBarTitleText: '',
  enablePullDownRefresh: true,
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black'
}
export default CollectionItemDetail
