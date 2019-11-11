import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import styles from './index.module.scss'
import MessageItem from './message-item'
import NotMessage from './not-message'
import CdTabbar from '@/components/cd-tabbar'

export default class Message extends Taro.Component {
  config = {
    navigationBarTitleText: '消息',
    enablePullDownRefresh: true
  }
  state = {
    current: 0
  }
  onPullDownRefresh() {
    setTimeout(() => {
      Taro.vibrateShort()
      Taro.stopPullDownRefresh()
    }, 1000)
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  render() {
    const tabList = [{ title: '用户' }, { title: '系统' }]
    return (
      <View className={styles.message}>
        <View className={styles.badges}>
          {/* <View className={styles.badge}>
            
            <Text>10</Text>
          </View> */}
          {/* <View className={[styles.badge, styles.badgeRight]}>
            
            <Text>99+</Text>
          </View> */}
        </View>
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View className={styles.pane}>
              <View className={styles.not}>
                <NotMessage />
              </View>
              {/* <ScrollView scrollY className={styles.scrollview}>
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
              </ScrollView> */}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className={styles.pane}>
              <View className={styles.not}>
                <NotMessage />
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
        <CdTabbar title="消息" />
      </View>
    )
  }
}
