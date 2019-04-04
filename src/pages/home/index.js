import Taro from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { AtIcon, AtButton, AtFloatLayout } from 'taro-ui';
import CdTabbar from '../../components/cd-tabbar';

import CdTitle from '../../components/cd-header'
import CdComment from '../../components/cd-comment'
import { ICON_PREFIX_CLASS } from '../../constants/common'

import './index.scss'

export default class Home extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      title: '',
      like: false,
      $switch: false,
      isOpenComment: false
    }
  }
  config = {
    navigationBarTitleText: '推荐',
    enablePullDownRefresh: false,
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  componentDidShow() {
    Taro.showLoading()
    setTimeout(() => {
      Taro.hideLoading()
    }, 1000)
  }
  onPageScroll({ scrollTop }) {
    console.log(scrollTop);
    if (scrollTop > 100) {
      this.setState({
        title: '你會vue不？能説説几个最重要的功能吗？'
      })
    } else {
      this.setState({
        title: ''
      })
    }
  }
  doubleTap(e) {
    console.log(e)
    if (e.timeStamp - this.touchStartTime < 300) {
      Taro.showToast({
        icon: 'none',
        title: '已喜欢'
      })
      this.setLike(true)
    }
    this.touchStartTime = e.timeStamp;
  }
  onShareAppMessage(options) {
    console.log(options)
    let shartObj = {}
    if (options.from === 'menu') {
      // 通过右上角的按钮分享
    } else {
      // 点击分享
      shartObj = {
        title: '你會vue不？能説説几个最重要的功能吗？'
      }
    }
    return shartObj
  }
  setLike(state) {
    this.setState({
      like: state
    })
    console.log(this.state);
  }
  setSwitch(state) {
    console.log('setSwitch', state);
    this.setState({
      $switch: state
    })
  }
  openComment(id) {
    console.log(id)
    this.setState({
      isOpenComment: true
    })
  }
  render() {
    const content = 'Vue的文档和教程看的太多，小的demo做的多，也不如自己实际的进行一个完整项目的开发。只有做了才知道原来问题这么多，这里列举了一些你做demo教程可能不会遇见的坑'
    const likeComp = this.state.like ? (
      <AtIcon prefixClass={ICON_PREFIX_CLASS} onClick={this.setLike.bind(this, false)} value='xihuan' color='#007fff'></AtIcon>
    ) : (
        <AtIcon prefixClass={ICON_PREFIX_CLASS} onClick={this.setLike.bind(this, true)} value='xihuan'></AtIcon>
      )
    let showAnswer = this.state.$switch ? (
      <View className='card content' onClick={this.doubleTap.bind(this)}>
        <View className='answer-wrapper'>
          <View className='avatar'>
            <AtIcon prefixClass={ICON_PREFIX_CLASS} value='biaoqing' size='30'></AtIcon>
            <Text className='avatar-name'>小茹</Text>
          </View>
          <View className='answer-content-wrapper'>
            <Text className='answer-content'>
              {content}
            </Text>
          </View>
        </View>
        <View className='actions'>
          <View className='action-item'>
            {likeComp}
          </View>
          <View className='action-item'>
            <AtIcon onClick={this.openComment.bind(this, '1')} prefixClass={ICON_PREFIX_CLASS} size='26' value='xiaoxi2'></AtIcon>
          </View>
          <View className='action-item'>
            <AtButton openType='share'><AtIcon value='share-2'></AtIcon></AtButton>
          </View>
        </View>
      </View>
    ) :
      (
        <View className='tap'>
          <View style={
            {
              padding: Taro.pxTransform(20)
            }
          }
            onClick={this.setSwitch.bind(this, true)}
          >
            <AtIcon prefixClass={ICON_PREFIX_CLASS} value='tap' size='60' color='#cdcdcd'></AtIcon>
            <View>
              <Text className='tap-text'>触摸显示答案</Text>
            </View>
          </View>
        </View>
      )

    return (
      <View className='home'>
        <CdTitle title={this.state.title}></CdTitle>
        <View className='main' style={
          {
            paddingTop: Taro.pxTransform(Taro.getSystemInfoSync().statusBarHeight * 2 + 80)
          }
        }
        >
          <View className='flex-col item'>
            <View className='card title'>
              <Text className='title-text'>你會vue不？能説説几个最重要的功能吗？</Text>
              <View className='answer'>
                <AtIcon prefixClass={ICON_PREFIX_CLASS} value='xiezuo' size='16' color='#007fff'></AtIcon>
                <Text class='answer-text'>写答案</Text>
              </View>
            </View>
            {showAnswer}
          </View>
          {/* </ScrollView> */}
        </View>
        <View className='comment-box'>
          <AtFloatLayout
            isOpened={this.state.isOpenComment}
            onClose={() => this.setState({
              isOpenComment: false
            })}
            scrollY
          >
            {"随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写".repeat(30)}
            <CdComment></CdComment>
          </AtFloatLayout>
        </View>
        <View className='tabbar'>
          <CdTabbar></CdTabbar>
        </View>
      </View>
    );
  }
}
