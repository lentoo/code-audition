import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtFab, AtIcon, AtSwipeAction, AtModal  } from 'taro-ui';
import './index.scss'

export default class Collection extends Taro.Component {
  config = {
    navigationBarTitleText: '收藏集'
  };
  constructor (...props) {
    super(...props)
    this.tabList = [{ title: '我的' }, { title: '关注的' }]
    this.state = {
      current: 0,
      currentItem: null
    }
    this.handleTabClick = this.handleTabClick.bind(this)
    this.handleFabClick = this.handleFabClick.bind(this)
    this.handleSwipeActionClick = this.handleSwipeActionClick.bind(this)
  }
  /**
   * @description Tab 点击事件处理
   * @author lentoo
   * @date 2019-08-07
   * @param {*} value
   * @memberof Collection
   */
  handleTabClick(value) {
    console.log('value', value);
    this.setState({
      current: value
    })
  }
  handleSwipeActionClick (item) {
    this.setState({
      currentItem: item
    })

    Taro.showModal({
      title: '提示',
      content: '确认删除吗？删除后不可恢复',
      success: () => {
        this.handleConfirmDelete()
      }
    })
  }
  handleConfirmDelete () {
    Taro.showLoading({
      title: '正在删除中...',
      mask: true
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 1500)
    console.log('删除条目', this.state.currentItem)
  }
  handleItemClick (item) {
    Taro.navigateTo({
      url: './Detail'
    })
  }
  handleFabClick () {
    Taro.navigateTo({
      url: './add-collection'
    })
  }
  render() {
    const { current, showModal } = this.state
    const arr = new Array(10).fill('a')
    return (
      <View className='collection'>
        <AtTabs tabList={this.tabList} current={current} onClick={this.handleTabClick} swipeable={false}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className='panel'>
              <ScrollView scrollY className='scroll-view'>
                {
                  arr.map((item, index) => {
                    return (
                      <AtSwipeAction key={index} onClick={() => this.handleSwipeActionClick(item)} options={[
                        {
                          text: '刪除',
                          style: {
                            backgroundColor: '#FF4949'
                          }
                        }
                      ]}>
                        <View className='collection-item' onClick={this.handleItemClick.bind(this, item)}>
                          <View className='collection-item-left'>
                            <View className='collection-item-title'>
                              <Text>前端</Text>
                            </View>
                            <View className='collection-item-description'>
                              <Text>5题</Text>
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
              </ScrollView>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className='panel'>
              <ScrollView className='scroll-view'>
                123556
              </ScrollView>
            </View>
          </AtTabsPane>
        </AtTabs>

        <View className='fab-btn'>
          <AtFab onClick={this.handleFabClick}><Text className='at-fab__icon at-icon at-icon-add'></Text></AtFab>
        </View>
      </View>
    );
  }
}
