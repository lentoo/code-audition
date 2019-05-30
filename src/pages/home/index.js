import Taro from '@tarojs/taro';
import { View, Text} from '@tarojs/components';
import { AtIcon, AtButton, AtActionSheet, AtActionSheetItem, AtFab } from 'taro-ui';

//#region Components

import CdTabbar from '../../components/cd-tabbar'
import TopicTitle from './components/topic-title'
import AnswerList from './components/answer-list'
import NoTopic from './components/no-topic'
//#endregion Components
import { ICON_PREFIX_CLASS, APP_NAME, UN_SELECTED_CATEGORY, NO_TOPIC } from '../../constants/common'

import './index.scss'
import { getQuestion } from '../../api/home'

const ERR_CODE = {
  OK: 0,
  1: UN_SELECTED_CATEGORY,
  2: NO_TOPIC
}
export default class Home extends Taro.Component {
  constructor(params) {
    super(params)
    this.state = {
      like: false,
      $switch: true,
      // clientHeight: Utils.getSystemInfoSync().windowHeight - Utils.getSystemInfoSync().statusBarHeight,
      topic: {},
      showNoTopic: false,
      noTopicType: UN_SELECTED_CATEGORY,
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
  componentDidMount() {
    this.loadData()
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
        title: this.state.topic.title
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
  async onPullDownRefresh() {
    await this.loadData()
    Taro.stopPullDownRefresh()
    Taro.vibrateShort()
  }
  /**
   * @description 加载数据
   * @memberof Home
   */
  loadData = () => {
    Taro.showLoading()
    return getQuestion()
      .then(res => {
        Taro.hideLoading()
        const showNoTopic = res.errCode !== ERR_CODE.OK
        this.setState({
          topic: res,
          showNoTopic,
          noTopicType: ERR_CODE[res.errCode]
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
      // 点击分享
      shartObj = {
        path: '/pages/index/index',
        title: APP_NAME
      }
    } else {
      // 点击分享
      shartObj = {
        path: '/pages/index/index',
        title: this.state.topic.title
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
  /**
   * @description 当我们点击答案的头部时会触发，弹出 ActionSheet
   * @author lentoo
   * @date 2019-05-20
   * @param {*} event
   * @memberof Home
   */
  handleTapItem(item) {
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
  handleReplyClick() {
    const { current, topic } = this.state
    Taro.showLoading()
    Taro.navigateTo({
      url: `write-review/index?nickName=${current.nickName}&id=${current.id}&title=${topic.title}`,
    }).then(() => {
      Taro.hideLoading()
      this.setState({
        showActionSheet: false
      })
    })
  }

  /**
   * @description 点击下一题
   * @author lentoo
   * @date 2019-05-24
   * @param {*} event
   * @memberof Home
   */
  async onFabNextClick(event) {
    event.stopPropagation()
    Taro.startPullDownRefresh()
    Taro.showLoading({
      mask: true
    })
    Taro.vibrateShort()
    await this.loadData()
    // setTimeout(() => {
    Taro.hideLoading()
    Taro.stopPullDownRefresh()
    // }, 1000)
  }
  renderTopic() {
    const { topic, showNoTopic } = this.state
    const answerList = []
    return showNoTopic
      ? (<View></View>)
      : (
        <View className='main'>
          <TopicTitle topic={topic}></TopicTitle>

          <AnswerList onItemClick={this.handleTapItem.bind(this)} data={answerList} topic={topic}></AnswerList>

          <View className='fixed-btns'>
            <View className='fab-btn'>
              <AtFab size='small'>
                <AtButton className='btn-share' openType='share'>
                  <AtIcon prefixClass={ICON_PREFIX_CLASS} value='share' color='#666' size='18'></AtIcon>
                </AtButton>
              </AtFab>

            </View>
            <View className='fab-btn'>
              <AtFab onClick={this.onFabNextClick.bind(this)} size='small'>
                <Text className='at-icon at-icon-chevron-down'></Text>
              </AtFab>
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

        </View>
      )
  }
  render() {
    const { showNoTopic, noTopicType } = this.state
    return (
      <View className='home'>
        {
          showNoTopic && (
            <NoTopic type={noTopicType}></NoTopic>
          )
        }
        {
          this.renderTopic()
        }



        {/* <View className='tabbar'> */}
        <CdTabbar title='首页'></CdTabbar>
        {/* </View> */}
      </View>
    );
  }
}
