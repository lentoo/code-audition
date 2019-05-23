import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Swiper, SwiperItem, Image } from '@tarojs/components';
import { AtIcon, AtButton, AtFloatLayout, AtLoadMore, AtActionSheet, AtActionSheetItem, AtFab } from 'taro-ui';

//#region Components

import CdTabbar from '../../components/cd-tabbar'
import CdComment from '../../components/cd-comment'
import CdParseWxml from '../../components/cd-parse-wxml'
import QuestionTitle from './components/question-title'

//#endregion Components
import { ICON_PREFIX_CLASS } from '../../constants/common'

import './index.scss'
import { getQuestion } from '../../api/home'

export default class Home extends Taro.Component {
  constructor (params) {
    super(params)
    this.state = {
      like: false,
      $switch: true,
      isOpenComment: false,
      // clientHeight: Utils.getSystemInfoSync().windowHeight - Utils.getSystemInfoSync().statusBarHeight,
      question: {
        title: '面试官：自己搭建过 Vue 开发环境吗？',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/24666230?s=460&v=4',
        nickName: 'lentoo',
        answerOfhtml: '<div><p>这是一个p标签的内容</p><img src="https://avatars0.githubusercontent.com/u/24666230?s=460&v=4"/></div>',
        descriptionOfhtml: '这是web前端开发的高频面试题',
        sorts: [
          'Vue',
          'Vue1',
          'Vue2'
        ]
      },
      showActionSheet: false,
      current: null
    }
  }
  config = {
    navigationBarTitleText: '码上面试',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true,
    // navigationStyle: 'custom',
  }
  /**
   * @description 页面滚动回调
   * @author lentoo
   * @date 2019-05-16
   * @param {*} { scrollTop }
   * @memberof Home
   */
  onPageScroll({ scrollTop }) {
    if (scrollTop > 100) {
      Taro.setNavigationBarTitle({
        title: this.state.question.title
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '码上面试'
      })
    }
  }
  /**
   * @description 下拉刷新回调
   * @author lentoo
   * @date 2019-05-16
   * @memberof Home
   */
  onPullDownRefresh() {
    Taro.stopPullDownRefresh()
    Taro.vibrateShort()
  }
  /**
   * @description 加载数据
   * @memberof Home
   */
  loadData = () => {
    Taro.showLoading()
    getQuestion()
      .then(res => {
        Taro.hideLoading()
        this.setState({
          question: res
        })
        console.log('res', res);
      })
  }
  /**
   * @description 双击屏幕
   * @author lentoo
   * @date 2019-05-16
   * @param {*} e
   * @memberof Home
   */
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
        title: this.state.question.title
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
  /**
   * @description 当我们点击答案的头部时会触发，弹出 ActionSheet
   * @author lentoo
   * @date 2019-05-20
   * @param {*} event
   * @memberof Home
   */
  handleTapItem (item) {
    this.setState({
      showActionSheet: true,
      current: item
    })
    console.log('item', item)
  }
  /**
   * @description 点击回复
   *
   * @memberof Home
   */
  handleReplyClick () {
    const { current, question } = this.state
    Taro.showLoading()
    Taro.navigateTo({
      url: `write-review/index?nickName=${current.nickName}&id=${current.id}&title=${question.title}`,
    }).then(() => {
      Taro.hideLoading()
      this.setState({
        showActionSheet: false
      })
    })
  }

  openComment(id) {
    console.log(id)
    this.setState({
      isOpenComment: true
    })

  }
  onFabNextClick (event) {
    event.stopPropagation()
    Taro.startPullDownRefresh()
    Taro.showLoading({
      mask: true
    })
    Taro.vibrateShort()
    setTimeout(() => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    }, 1000)
  }
  
  render() {
    const { question } = this.state
    const arr = new Array(10).fill({
      id: 1,
      nickName: '陈大鱼头'
    })
    let showAnswer = this.state.$switch ? (
      <View className='answer-wrapper'>
        <ScrollView
          className='answer-list'
          scrollY
          style={
            {
              maxHeight: '100%'
            }
          }
        >
          {
            arr.map((item, index) => {
              return (
                <View className='answer-item'
                  key={item.id}
                >
                  <View className='user-box' onClick={this.handleTapItem.bind(this, item)}>
                    <View className='user-info'>
                      <View className='user-avatar-box'>
                        <Image className='user-avatar' src={question.avatarUrl}></Image>
                      </View>
                      <View className='user-name'>
                        <Text className='user-name-text'>
                          {
                            question.nickName
                          }
                        </Text>
                      </View>
                    </View>
                    <View className='icon-more'>
                      <AtIcon prefixClass={ICON_PREFIX_CLASS} value='more-fill' size={16} color='#999'></AtIcon>
                    </View>
                  </View>
                  <View className='answer-desc'>
                    <CdParseWxml template={question.answerOfhtml}></CdParseWxml>
                    
                  </View>
                </View>
              )
            })
          }


          <AtLoadMore
            status='noMore'
            noMoreText='-- No More Data --'
            noMoreTextStyle={
              {
                color: '#ccc',
                fontSize: '14px'
              }
            }
          ></AtLoadMore>
        </ScrollView>
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
        <View className='main'>
          <QuestionTitle question={question}></QuestionTitle>
          {showAnswer}
          <View className='fixed'>
            <AtFab onClick={this.onFabNextClick.bind(this)} size='small'><Text className='at-icon at-icon-chevron-down'></Text></AtFab>
          </View>
        </View>
      
        <AtActionSheet
          isOpened={this.state.showActionSheet}
          cancelText='取消'
        >
          <AtActionSheetItem onClick={this.handleReplyClick.bind(this)}>
            回复
          </AtActionSheetItem>
        </AtActionSheet>
        {/* <View className='tabbar'> */}
          <CdTabbar title='首页'></CdTabbar>
        {/* </View> */}
      </View>
    );
  }
}
