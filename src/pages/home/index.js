import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { AtIcon, AtButton } from 'taro-ui';
import CdTabbar from '../../components/cd-tabbar';

import CdTitle from '../../components/cd-header'

import CdContainer from '../../components/cd-container'
import { ICON_PREFIX_CLASS } from '../../constants/common'

import './index.scss'

export default class Home extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      arr: new Array(2).fill(1),
      title: '',
      like: false
    }
  }
  config = {
    navigationBarTitleText: '推荐',
    enablePullDownRefresh: false,
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  componentDidShow () {
    Taro.setNavigationBarTitle({
      title: '你會vue不？能説説几个最重要的功能吗？'
    })
    Taro.showLoading()
    setTimeout(() => {
      Taro.hideLoading()
    }, 1000)
  }
  onPageScroll ({ scrollTop }) {
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
  doubleTap (e) {
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
  onShareAppMessage (res) {
    console.log(res)
  }
  setLike (state) {
    this.setState({
      like: state
    })

  }
  render() {
    const arr = this.state.arr
    const content = 'Vue的文档和教程看的太多，小的demo做的多，也不如自己实际的进行一个完整项目的开发。只有做了才知道原来问题这么多，这里列举了一些你做demo教程可能不会遇见的坑'
    const likeComp = this.state.like ? (
      <AtIcon prefixClass={ICON_PREFIX_CLASS} onClick={this.setLike.bind(this, false)} value='xihuan' color='#007fff'></AtIcon>
    ) : (
        <AtIcon prefixClass={ICON_PREFIX_CLASS} onClick={this.setLike.bind(this, true)} value='xihuan'></AtIcon>
    )
    return (
      <View className='home'>
        <CdTitle title={this.state.title}></CdTitle>
        {/* <CdContainer> */}
          <View className='main' style={
            {
              paddingTop: Taro.pxTransform(Taro.getSystemInfoSync().statusBarHeight * 2 + 80),
              paddingBottom: Taro.pxTransform(Taro.getSystemInfoSync().statusBarHeight * 2 )
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
                    <AtIcon prefixClass={ICON_PREFIX_CLASS} size='26' value='xiaoxi2'></AtIcon>
                  </View>
                  <View className='action-item'>
                    <AtButton openType='share'><AtIcon value='share-2' openType='share'></AtIcon></AtButton>
                  </View>
                </View>
              </View>

              <View className='tap'>
                <AtIcon prefixClass={ICON_PREFIX_CLASS} value='tap' size='60' color='#cdcdcd'></AtIcon>
                <View>
                  <Text className='tap-text'>触摸显示答案</Text>
                </View>
              </View>
            </View>
          {/* </ScrollView> */}
          </View>
        {/* </CdContainer> */}
        <View className='tabbar'>
          <CdTabbar></CdTabbar>
        </View>
      </View>
    );
  }
}
