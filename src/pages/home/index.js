import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import {
  AtIcon,
  AtButton,
  AtActionSheet,
  AtActionSheetItem,
  AtFab
} from 'taro-ui'
import { get as getGlobalData, set as setGlobalData } from '@/utils/global-data'

//#region Components

import CdTabbar from '../../components/cd-tabbar'
import TopicTitle from './components/topic-title'
import AnswerList from './components/answer-list'
import NoTopic from './components/no-topic'
//#endregion Components
import {
  ICON_PREFIX_CLASS,
  APP_NAME,
  UN_SELECTED_CATEGORY,
  NO_TOPIC
} from '../../constants/common'

import './index.scss'
import { getQuestion, getAnswerList } from '../../api/home'

const ERR_CODE = {
  OK: 0,
  1: UN_SELECTED_CATEGORY,
  2: NO_TOPIC
}
export default class Home extends Taro.Component {
  constructor(params) {
    super(params)
    this.screenHeight = Taro.getSystemInfoSync().screenHeight
    this.pagination = {
      page: 1,
      limit: 2
    }
    this.state = {
      topic: {},
      showNoTopic: false,
      noTopicType: UN_SELECTED_CATEGORY,
      showActionSheet: false,
      current: null,
      answerList: [],
      answerPage: {}
    }
  }
  config = {
    navigationBarTitleText: '码上面试',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true
    // navigationStyle: 'custom',
  }
  componentDidMount() {
    this.loadData()
  }
  componentDidShow() {
    const writeReview = getGlobalData('write-review')
    if (writeReview) {
      this.pagination = 1
      this.getAnswerList(
        {
          id: this.state.topic.id,
          ...this.pagination
        },
        true
      )
      setGlobalData('write-review', false)
    }
    console.log('componentDidShow')
  }
  /**
   * @description 页面滚动回调
   * @author lentoo
   * @date 2019-05-16
   * @param {*} { scrollTop }
   * @memberof Home
   */
  onPageScroll(event) {
    const { scrollTop } = event
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
   * @description 页面滚动到底部
   * @author lentoo
   * @date 2019-06-03
   * @memberof Home
   */
  onReachBottom() {
    const { answerPage, topic } = this.state
    if (answerPage.current < answerPage.pages) {
      this.pagination.page++
      this.getAnswerList({
        id: topic.id,
        ...this.pagination
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
    Taro.showLoading({
      mask: true
    })
    await this.loadData()
    Taro.hideLoading()
    Taro.stopPullDownRefresh()
    Taro.vibrateShort()
  }
  /**
   * @description 加载数据
   * @memberof Home
   */
  loadData = () => {
    Taro.showLoading()
    return getQuestion().then(res => {
      Taro.hideLoading()
      const showNoTopic = res.errCode !== ERR_CODE.OK
      this.setState({
        topic: res,
        showNoTopic,
        noTopicType: ERR_CODE[res.errCode]
      })
      this.getAnswerList(res, true)
      console.log('res', res)
    })
  }
  /**
   * @description 获取答案列表
   * @author lentoo
   * @date 2019-06-05
   * @param {*} params
   * @param {boolean} [reset=false]
   * @memberof Home
   */
  async getAnswerList(params, reset = false) {
    const res = await getAnswerList({
      id: params.id,
      ...this.pagination
    })
    const { data, page } = res
    const { answerList, topic } = this.state
    const list = reset ? data : [...answerList, ...data]

    if (topic.answerOfhtml) {
      list.unshift({
        ...topic,
        commentOfhtml: topic.answerOfhtml
      })
    }
    this.setState({
      answerList: list,
      answerPage: page
    })
    if (reset) {
      this.pagination.page = 1
    }
  }
  /**
   * @description 分享页面
   * @author lentoo
   * @date 2019-06-03
   * @param {*} options
   * @returns
   * @memberof Home
   */
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
      url: `write-review/index?nickName=${current.nickName}&userId=${
        current.userInfoId
      }&title=${topic.title}&id=${topic.id}`
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
  }
  renderTopic() {
    const { topic, showNoTopic, answerList } = this.state
    return showNoTopic ? (
      <View />
    ) : (
      <View className="main">
        <TopicTitle topic={topic} />

        <AnswerList
          onItemClick={this.handleTapItem.bind(this)}
          data={answerList}
          topic={topic}
        />

        <View className="fixed-btns">
          <View className="fab-btn">
            <AtFab size="small">
              <AtButton className="btn-share" openType="share">
                <AtIcon
                  prefixClass={ICON_PREFIX_CLASS}
                  value="share"
                  color="#666"
                  size="18"
                />
              </AtButton>
            </AtFab>
          </View>
          <View className="fab-btn">
            <AtFab onClick={this.onFabNextClick.bind(this)} size="small">
              <Text className="at-icon at-icon-chevron-down" />
            </AtFab>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { showNoTopic, noTopicType } = this.state
    return (
      <View
        className="home"
        style={{
          height: '100vh'
        }}
        scrollY
        onScroll={this.onScroll.bind(this)}
        onScrollToLower={this.onScrollToLower.bind(this)}>
        {showNoTopic && <NoTopic type={noTopicType} />}
        {this.renderTopic()}

        <AtActionSheet
          cancelText="取消"
          isOpened={this.state.showActionSheet}
          onClose={() => {
            this.setState({
              showActionSheet: false
            })
          }}>
          <AtActionSheetItem onClick={this.handleReplyClick.bind(this)}>
            回复
          </AtActionSheetItem>
        </AtActionSheet>

        {/* <View className='tabbar'> */}
        <CdTabbar title="首页" />
        {/* </View> */}
      </View>
    )
  }
}
