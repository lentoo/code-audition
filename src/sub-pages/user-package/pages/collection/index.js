import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab, AtSwipeAction } from 'taro-ui'
import { CollectionService } from '../services'
import './index.scss'

export default class CollectionView extends Taro.Component {
  config = {
    navigationBarTitleText: '收藏集',
    enablePullDownRefresh: true
  }
  constructor(...props) {
    super(...props)
    this.tabList = [{ title: '我的' }, { title: '关注的' }]
    this.state = {
      current: 0,
      currentItem: null,
      tips: true,
      collections: []
    }
  }
  componentDidShow() {
    this.onLoadData()
  }
  /**
   * @description Tab 点击事件处理
   * @author lentoo
   * @date 2019-08-07
   * @param {*} value
   * @memberof Collection
   */
  handleTabClick = value => {
    this.setState({
      current: value
    })
  }
  onLoadData = async () => {
    const response = await CollectionService.getCollection()
    this.setState({
      collections: response.data
    })
  }
  handleSwipeActionClick = item => {
    this.setState({
      currentItem: item
    })
    if (this.state.tips) {
      Taro.showModal({
        title: '提示',
        content: '确认删除吗？',
        success: res => {
          if (res.confirm) {
            this.handleConfirmDelete()
          }
        }
      })
    } else {
      this.handleConfirmDelete()
    }
  }
  handleConfirmDelete() {
    Taro.showLoading({
      title: '正在删除中...',
      mask: true
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 1500)
    this.setState({
      tips: false
    })
    console.log('删除条目', this.state.currentItem)
  }
  handleItemClick(item) {
    Taro.navigateTo({
      url: './Detail?id=' + item.id + '&name=' + item.name
    })
  }
  handleFabClick = () => {
    Taro.navigateTo({
      url: './add-collection'
    })
  }
  render() {
    const { current } = this.state
    return (
      <View className="collection">
        <AtTabs
          tabList={this.tabList}
          current={current}
          onClick={this.handleTabClick}
          swipeable={false}>
          <AtTabsPane current={this.state.current} index={0}>
            <View className="panel">
              <ScrollView scrollY className="scroll-view">
                {this.renderCollectionList()}
              </ScrollView>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className="panel">
              <ScrollView className="scroll-view">123556</ScrollView>
            </View>
          </AtTabsPane>
        </AtTabs>

        <View className="fab-btn">
          <AtFab onClick={this.handleFabClick}>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
      </View>
    )
  }

  renderCollectionList() {
    const { collections } = this.state
    return collections.map((item, index) => {
      return (
        <AtSwipeAction
          key={item.id}
          onClick={() => this.handleSwipeActionClick(item)}
          options={[
            {
              text: '刪除',
              style: {
                backgroundColor: '#FF4949'
              }
            }
          ]}>
          <View
            className="collection-item"
            onClick={this.handleItemClick.bind(this, item)}>
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
        </AtSwipeAction>
      )
    })
  }
}
