import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtIcon, AtButton, AtTabs, AtTabsPane, AtLoadMore } from 'taro-ui'
import { Utils } from '@/utils'
import classNames from 'classnames'
import './index.scss'
import Tag from '../home/components/tag/tag'
import { ICON_PREFIX_CLASS } from '../../constants/common'

class OtherHomePage extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light'
  }
  state = {
    statusBarHeight: Utils.getSystemInfoSync().statusBarHeight,
    userInfo: {},
    current: 0,
    btnText: '+ 关注'
  }
  componentDidMount() {
    Taro.getUserInfo().then(res => {
      console.log('res', res.userInfo)
      this.setState({
        userInfo: res.userInfo
      })
    })
  }
  handleBack() {
    Taro.navigateBack()
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  /**
   * @description 渲染性别图标
   * @author lentoo
   * @date 2019-05-31
   * @returns
   * @memberof OtherHomePage
   */
  renderGenderIcon() {
    const { userInfo } = this.state
    const iconType = userInfo.gender === 1 ? 'nan' : 'female'
    const tagClass = userInfo.gender === 1 ? 'man' : ''
    return (
      <View className={classNames('avatar-tag', tagClass)}>
        <AtIcon
          prefixClass={ICON_PREFIX_CLASS}
          value={iconType}
          size="12"
          color="#fff"
        />
      </View>
    )
  }
  renderTabs() {
    const { userInfo, current } = this.state
    const tabList = [{ title: '动态' }, { title: '投稿' }]
    return (
      <View className="user-tabs">
        <AtTabs
          animated={false}
          current={current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={current} index={0}>
            <View style="background-color: #f5f5f5;">
              <ScrollView className="share-scroll-view">
                <View className="share-item">
                  <View className="share-item-title-wrapper">
                    <View className="share-item-title">
                      <View className="share-item-title-avatar-wrapper">
                        <Image
                          className="share-item-title-avatar"
                          src={userInfo.avatarUrl}
                        />
                      </View>
                      <View className="share-item-title-nickname-wrapper">
                        <Text>{userInfo.nickName}</Text>
                      </View>
                      <View className="share-item-title-date-wrapper">
                        <Text>1 分钟前</Text>
                      </View>
                    </View>
                    <View className="share-item-tags">
                      <Tag>Vue1</Tag>
                      <Tag>Vue2</Tag>
                    </View>
                  </View>
                  <View className="shart-item-content-wrapper">
                    <View className="shart-item-content-text">
                      <Text />
                    </View>
                  </View>
                  <View className="shart-item-pv-wrapper" />
                </View>
              </ScrollView>
              <View className="no-share">
                <View>
                  <AtIcon
                    prefixClass={ICON_PREFIX_CLASS}
                    color="#999"
                    value="zanwushuju"
                    size="60"
                  />
                </View>
                <View>
                  <Text>暂无分享数据 ~</Text>
                </View>
              </View>
              <AtLoadMore status="loading" />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View style="background-color: #f5f5f5;">
              <View className="no-share">
                <View>
                  <AtIcon
                    prefixClass={ICON_PREFIX_CLASS}
                    color="#999"
                    value="zanwutu"
                    size="60"
                  />
                </View>
                <View>
                  <Text>暂无数据呢 ~</Text>
                </View>
              </View>
              <AtLoadMore status="loading" />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
  render() {
    const { userInfo, btnText } = this.state
    return (
      <View className="user">
        <View
          className="icons"
          style={{
            paddingTop: `${this.state.statusBarHeight + 5}px`
          }}>
          <View onClick={this.handleBack} className="icon-wrapper">
            <AtIcon value="chevron-left" size="18" color="#fefefe" />
          </View>
        </View>
        <View className="user-info">
          <View className="user-info-wrapper" />
          <View className="user-main">
            <View className="user-avatar">
              <View>
                <Image className="avatar" src={userInfo.avatarUrl} />
                <View className="flex-row attention-wrapper">
                  <View className="attention">
                    <View className="attention-num">
                      <Text>111</Text>
                    </View>
                    <View className="attention-title">
                      <Text>关注</Text>
                    </View>
                  </View>
                  <View className="attention">
                    <View className="attention-num">
                      <Text>110</Text>
                    </View>
                    <View className="attention-title">
                      <Text>粉丝</Text>
                    </View>
                  </View>
                  <View className="attention">
                    <View className="attention-num">
                      <Text>112</Text>
                    </View>
                    <View className="attention-title">
                      <Text>已投稿</Text>
                    </View>
                  </View>
                </View>
                <View className="user-name">
                  <View className="user-nickname-wrapper">
                    <View>
                      <Text className="user-nickname">{userInfo.nickName}</Text>
                    </View>

                    {this.renderGenderIcon()}
                  </View>
                  <View>
                    <AtButton
                      onClick={() => {
                        Taro.vibrateShort()
                        this.setState({
                          btnText: btnText === '已关注' ? '+ 关注' : '已关注'
                        })
                      }}
                      className={classNames('follow-btn', {
                        'btn-info': btnText === '已关注'
                      })}
                      size="small"
                      type="primary"
                      circle>
                      {btnText}
                    </AtButton>
                  </View>
                </View>

                {this.renderTabs()}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default OtherHomePage
