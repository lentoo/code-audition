import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar, AtButton } from 'taro-ui'
import Grid from './components/grid'

import CdTitle from '../../components/cd-header'

import CdContainer from '../../components/cd-container'
import './index.scss'
import { UserInfo, Storage } from '../../utils';
import { connect } from '@tarojs/redux';
import { doSaveUserInfo } from '../../actions/login';
import { set as setGlobalData, get as getGlobalData } from '../../utils/global-data';
import { USER_INFO, OPEN_ID } from '../../constants/common';

@connect(({ login }) => {
  login
}, dispatch => ({
    doSaveUserInfo(conn, params) {
      dispatch(doSaveUserInfo(params))
    }
}))
class Category extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      value: '',
      current: 0,
      last: false
    }
  }
  config = {
    navigationBarTitleText: '码上面试1',
    enablePullDownRefresh: true,
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  onPullDownRefresh() {
    Taro.vibrateShort()
    Taro.stopPullDownRefresh()
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() { }

  componentDidShow() {
  }

  componentDidHide() { }
  onChange(value) {
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索');
  }
  toFeedbackPage() {
    console.log('去反馈中心')
  }
  handleChange(event) {
    const current = event.detail.current

    this.setState({
      current,
      last: current === 2
    })
  }
  handleGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.log(userInfo)
    setGlobalData(USER_INFO, userInfo)
    Storage.setItemSync('first', false)
    Taro.showLoading({
      title: '正在加载中...'
    })
    this.props.doSaveUserInfo.call(this, ({
      openId: getGlobalData(OPEN_ID),
      ...userInfo
    }))
    Taro.hideLoading()
    if (this.props.login.doSaveUserInfo.code === 1) {
      Taro.navigateTo({
        url: '/pages/home/index'
      })
    } else {
      Taro.showToast({
        title: this.props.login.doSaveUserInfo.msg
      })
    }
  }

  render() {
    const windowHeight = Taro.getSystemInfoSync().windowHeight
    const maxLength = windowHeight > 800 ? 12 : 9
    const itemHeight = 113
    const data = new Array(maxLength)
    const item = {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '领取中心'
    }
    data.fill(item)
    const actionView = this.state.last ? (
      <View className='not-category-tip'>
        <Text>如果没有你喜欢的分类的话，欢迎到</Text><Text className='link' onClick={this.toFeedbackPage.bind(this)}>反馈中心</Text><Text>给我们反馈哦</Text>
      </View>
    ) : (
        <Text>左右滑动查看更多</Text>
      )
    return (
      <View className='category'>
        <CdTitle></CdTitle>
        <CdContainer>

          <View>
            <View className='title'>
              <Text>请选择你喜欢的分类</Text>
            </View>
            <View className='search-bar'>
              <AtSearchBar
                className='cd-search-bar'
                actionName='搜一下'
                value={this.state.value}
                onActionClick={this.onActionClick.bind(this)}
                onChange={this.onChange.bind(this)}
              ></AtSearchBar>
            </View>
          </View>
          <View id='grid' className='grid'>
            <Swiper
              onChange={this.handleChange.bind(this)}
              current={this.state.current}
              style={{
                height: Taro.pxTransform(itemHeight * 2 * (maxLength / 3))
              }}
            >
              <SwiperItem>
                <View><Grid data={data}></Grid></View>
              </SwiperItem>
              <SwiperItem>
                <View ><Grid data={data}></Grid></View>
              </SwiperItem>
              <SwiperItem>
                <View>
                  <Grid data={data}></Grid>
                </View>
              </SwiperItem>
            </Swiper>
          </View>
          <View>
            <View className='tips'>
              {actionView}
            </View>

            <View className='next'>

              <AtButton type='secondary' openType='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)}>下一步</AtButton>
              {/* <Text onClick={this.handleNext.bind(this)}>下一步</Text> */}
            </View>
          </View>
        </CdContainer>
      </View>
    )
  }
}
export default Category
