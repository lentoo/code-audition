import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtButton, AtSwipeAction, AtLoadMore } from 'taro-ui'
import User from '@/domain/user-domain/entities/user'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import Tag from '@/components/Tag/Tag'
import NoData from '@/components/NoData'
import { UserService, CollectionService } from '../services'
import './detail.scss'
import Skeleton from '@/components/Skeleton'
import { ArrayLen } from '@/utils'

export default class CollectionDetail extends Taro.Component {
  config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  constructor(...props) {
    super(...props)
    this.state = {
      user: new User(),
      topicList: ArrayLen(8),
      response: {},
      name: '',
      loading: false,
      skeletonLoading: true
    }
    this.page = 0
  }

  componentDidShow() {
    this.page = 0
    this.onLoadData(true)
  }
  async componentDidMount() {
    const user = await UserService.getUserInfo()
    this.setState({ user, name: this.$router.params.name })
  }
  async onLoadData(clear = false) {
    this.setState({
      loading: true
    })
    this.page = clear ? 1 : this.page + 1

    const response = await CollectionService.getCollectionTopic({
      id: this.$router.params.id,
      page: this.page
    })
    this.setState(prevState => {
      const topicList = clear
        ? response.data.questionList
        : [...prevState.topicList, ...response.data.questionList]

      return {
        response,
        loading: false,
        skeletonLoading: false,
        topicList
      }
    })
  }
  async onPullDownRefresh() {
    Taro.vibrateShort()
    await this.onLoadData(true)
    Taro.stopPullDownRefresh()
  }
  onReachBottom() {
    this.onLoadData()
  }
  onPageScroll({ scrollTop }) {
    if (scrollTop > 50) {
      Taro.setNavigationBarTitle({
        title: this.$router.params.name
      })
    } else {
      Taro.setNavigationBarTitle({
        title: ''
      })
    }
  }
  /**
   * @description 跳转首页进入刷题
   * @memberof CollectionDetail
   */
  onStartBrushing = () => {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }
  onEditTitle = () => {
    Taro.navigateTo({
      url: `./add-collection?edit=1&id=${this.$router.params.id}&name=${
        this.state.name
      }`
    })
  }

  render() {
    return (
      <View className="collection-detail">
        {this.renderCollectionTitle()}
        {this.renderCollectionList()}
        {this.renderNotData()}
      </View>
    )
  }
  renderCollectionTitle() {
    const { user, name, response } = this.state
    return (
      <View className="collection-detail">
        <View className="collection-title">
          <View className="collection-title-info">
            <View
              className="collection-title-info-name"
              onClick={this.onEditTitle}>
              {response.data.collectionName}
              <AtIcon prefixClass={ICON_PREFIX_CLASS} size="16" value="xie" />
            </View>
            <View className="collection-title-info-desc">
              <Text>数量：{response.data.count}</Text>
              <AtButton
                className="collection-title-info-btn"
                circle
                size="small"
                type="primary"
                onClick={this.onStartBrushing}>
                开始刷题
              </AtButton>
            </View>
          </View>
          <View className="collection-title-img-box">
            <Image className="collection-title-img" src={user.avatarUrl} />
          </View>
        </View>
      </View>
    )
  }
  renderCollectionList() {
    const { topicList, loading, skeletonLoading } = this.state
    return (
      <View className="collection-list">
        {topicList.map((item, index) => {
          return (
            <View key={item.id} className="collection-item-wrapper">
              <Skeleton title row={1} loading={skeletonLoading}>
                <AtSwipeAction>
                  <View className="collection-item" id={'item' + index}>
                    <View className="collection-item-title">
                      <Text>{item.title}</Text>
                    </View>
                    <View className="collection-item-info">
                      <View className="collection-item-desc">
                        <Text className="collection-item-desc-name">
                          {item.userName}
                        </Text>
                        <Text className="collection-item-desc-text">
                          {item.comment} 评论
                        </Text>
                      </View>
                      <View className="collection-item-tags">
                        {item.sorts &&
                          item.sorts.map(tag => <Tag key={tag}>{tag}</Tag>)}
                      </View>
                    </View>
                  </View>
                </AtSwipeAction>
              </Skeleton>
            </View>
          )
        })}
        {loading && <AtLoadMore loadingText="正在加载中..." status="loading" />}
      </View>
    )
  }

  renderNotData() {
    const { response } = this.state
    if (!response.data) return null
    return response.data.count === 0 ? (
      <NoData
        tips="暂无题目"
        onClick={this.onStartBrushing}
        actionTips="赶紧去刷题收藏吧 ~"
      />
    ) : null
  }
}
