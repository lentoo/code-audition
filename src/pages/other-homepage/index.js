import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtButton, AtTabs, AtTabsPane, AtLoadMore } from 'taro-ui'
import { Utils } from '@/utils';
import './index.scss'
import { ICON_PREFIX_CLASS } from '../../constants/common';
import classNames from 'classnames'

class OtherHomePage extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  state = {
    statusBarHeight: Utils.getSystemInfoSync().statusBarHeight,
    userInfo: {},
    current: 0
  }
  componentDidMount() {
    Taro.getUserInfo().then(res => {
      console.log('res', res.userInfo);
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
        <AtIcon prefixClass={ICON_PREFIX_CLASS} value={iconType} size='12' color='#fff'></AtIcon>
      </View>
    )
  }
  render() {
    const { userInfo } = this.state
    const tabList = [{ title: '分享' }, { title: '收藏' }]
    return (
      <View className='user'>
        <View className='icons' style={
          {
            paddingTop: `${this.state.statusBarHeight + 5}px`
          }
        }
        >
          <View onClick={this.handleBack} className='icon-wrapper'>
            <AtIcon value='chevron-left' size='18' color='#fefefe'></AtIcon>
          </View>
        </View>
        {/* <Image className='bg-img'></Image> */}
        <View className='user-info'>
          <View className='user-info-wrapper'>

          </View>
          <View className='user-main'>

            <View className='user-avatar'>
              <View>
                <Image className='avatar' src={userInfo.avatarUrl}></Image>
                {/* <Text className='avatar-name'>{userInfo.nickName}</Text> */}

                {/* <View className='avatar-tag'>
                  <AtIcon prefixClass={ICON_PREFIX_CLASS} value='female' size='12' color='#fff'></AtIcon>
                </View> */}
                <View className='flex-row attention-wrapper'>
                  <View className='attention'>
                    <View className='attention-num'>
                      <Text>111</Text>
                    </View>
                    <View className='attention-title'>
                      <Text>关注</Text>
                    </View>
                  </View>
                  <View className='attention'>
                    <View className='attention-num'>
                      <Text>110</Text>
                    </View>
                    <View className='attention-title'>
                      <Text>粉丝</Text>
                    </View>
                  </View>
                  <View className='attention'>
                    <View className='attention-num'>
                      <Text>112</Text>
                    </View>
                    <View className='attention-title'>
                      <Text>关注</Text>
                    </View>
                  </View>

                </View>
                <View className='user-name'>
                  <View className='user-nickname-wrapper'>
                    <View>
                      <Text className='user-nickname'>{userInfo.nickName}</Text>
                    </View>

                    {this.renderGenderIcon()}

                  </View>
                  <View>
                    <AtButton size='small' type='primary' circle>
                      {/* <AtIcon value='add' size='18' color='#fff'></AtIcon> */}
                      {/* <Text className='at-icon at-icon-add'></Text> */}
                      + 关注
                    </AtButton>
                  </View>
                </View>

                <View className='user-tabs'>
                  <AtTabs
                    animated={false}
                    current={this.state.current}
                    tabList={tabList}
                    onClick={this.handleClick.bind(this)}
                  >
                    <AtTabsPane current={this.state.current} index={0} >
                      <View style='background-color: #f5f5f5;'>
                        <View className='no-share'>
                          <View>
                            <AtIcon prefixClass={ICON_PREFIX_CLASS} color='#999' value='zanwushuju' size='60'></AtIcon>
                          </View>
                          <View>
                            <Text>暂无分享数据 ~</Text>
                          </View>
                        </View>
                        {/* <AtLoadMore status='loading'></AtLoadMore> */}
                      </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                      <View style='background-color: #f5f5f5;'>
                        <View className='no-share'>
                          <View>
                            <AtIcon prefixClass={ICON_PREFIX_CLASS} color='#999' value='zanwutu' size='60'></AtIcon>
                          </View>
                          <View>
                            <Text>暂无数据呢 ~</Text>
                          </View>
                        </View>
                        {/* <AtLoadMore status='loading'></AtLoadMore> */}
                      </View>
                    </AtTabsPane>
                  </AtTabs>
                </View>

              </View>
            </View>

          </View>

          {/* <View className='user-menus-wrapper'>
            <View className='user-menus'>
              <View className='user-menu'>
                <View>
                  <AtIcon prefixClass={ICON_PREFIX_CLASS} value='jingyan' color={ICON_PRIMARY_COLOR} size='26'></AtIcon>
                </View>
                <View className='user-menu_text'>
                  <Text>
                    分享
                    </Text>
                </View>
                <View>
                  <AtIcon value='chevron-right' color='#999' size='24'></AtIcon>
                </View>
              </View>
              <View className='user-menu'>
                <View>
                  <AtIcon prefixClass={ICON_PREFIX_CLASS} value='xihuan' color={ICON_PRIMARY_COLOR} size='24'></AtIcon>
                </View>
                <View className='user-menu_text'>
                  <Text>
                    喜欢
                    </Text>
                </View>
                <View>
                  <AtIcon value='chevron-right' color='#999' size='24'></AtIcon>
                </View>
              </View>
            </View>
          </View> */}
        </View>

      </View>
    );
  }
}
export default OtherHomePage
