import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { UserService } from '../services'
import User from '@/domain/user-domain/entities/user'
import './detail.scss'
import Tag from '@/components/Tag/Tag'
import { AtIcon, AtButton } from 'taro-ui'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '@/constants/common'

export default class CollectionDetail extends Taro.Component {
  config = {
    navigationBarTitleText: '收藏集标题',
    enablePullDownRefresh: true
  }
  constructor(...props) {
    super(...props)
    this.state = {
      user: new User(),
      topicList: new Array(10)
    }
    this.onEditTitle = this.onEditTitle.bind(this)
  }
  async componentDidMount() {
    const user = await UserService.getUserInfo()
    this.setState({ user })
  }
  onPullDownRefresh() {
    setTimeout(() => {
      Taro.vibrateLong()
      Taro.stopPullDownRefresh()
    }, 500)
  }
  onEditTitle() {
    Taro.showNavigationBarLoading()
    Taro.navigateTo({
      url: './add-collection?edit=1'
    }).finally(Taro.hideNavigationBarLoading())
  }
  render() {
    return (
      <View className="collection-detail">
        {this.renderCollectionTitle()}
        {this.renderCollectionList()}
      </View>
    )
  }
  renderCollectionTitle() {
    const { user } = this.state
    return (
      <View className="collection-detail">
        <View className="collection-title">
          <View className="collection-title-info">
            <View className="collection-title-info-name">
              收藏集标题
              <AtIcon
                onClick={this.onEditTitle}
                prefixClass={ICON_PREFIX_CLASS}
                size="16"
                value="xie"
              />
            </View>
            <View className="collection-title-info-desc">
              <Text>数量：5</Text>
              <AtButton
                className="collection-title-info-btn"
                circle
                size="small"
                type="primary">
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
    const { topicList } = this.state
    return (
      <View className="collection-list">
        {topicList.map((item, index) => {
          return (
            <View className="collection-item">
              <View className="collection-item-title">
                <Text>题目标题 {index}</Text>
                <View className="collection-item-tags">
                  <Tag>vue</Tag>
                </View>
              </View>
              <View className="collection-item-info">
                <View className="collection-item-desc">
                  <Text className="collection-item-desc-name">lentoo</Text>
                  <Text className="collection-item-desc-text">622 评论</Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
