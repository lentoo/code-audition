import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import { AtLoadMore, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as publishActions from '@/actions/publish'
import { SAFE_AREA_INSET_BOTTOM } from '@/constants/common'
import QuestionItem from './question-item'
import { Utils } from '../../../../../utils'
import './index.scss'

@connect(
  state => ({ publish: state.publish }),
  {
    ...publishActions
  }
)
class OpenQuestion extends Taro.Component {
  config = {
    navigationBarTitleText: '开放题',
    enablePullDownRefresh: false,
    backgroundTextStyle: 'light'
  }
  state = {
    // 标题
    questionTitle: '',
    // 答案
    answer: '',
    // 描述
    description: '',
    // 显示搜索盒子
    showSearchBox: false,
    autoDescFocus: false,
    autoAnswerFocus: false,
    bottom: 0,
    questionItems: [],
    showLoading: false,
    nextBottom: 0
  }
  constructor(prop) {
    super(prop)
    this.handleQuestionChange = Utils.debounce(
      this.handleQuestionChange.bind(this),
      500
    )
    this.autoPosition = this.autoPosition.bind(this)
    this.next = this.next.bind(this)
  }
  next() {
    this.props.dispatchPublishItem({
      title: this.state.questionTitle,
      type: 10,
      descriptionOfhtml: this.state.description,
      answerOfhtml: this.state.answer
    })
    Taro.navigateTo({
      url: 'choose-category'
    })
  }
  handleQuestionChange(e) {
    // this.setState({
    //   showSearchBox: true,
    //   loadingStatus: 'loading',
    //   questionItems: []
    // })
    searchTitle({
      title: e.target.value
    }).then(res => {
      // Taro.hideLoading()
      this.setState({
        questionTitle: e.target.value,
        questionItems: res,
        showSearchBox: res.length > 0,
        loadingStatus: 'none'
      })
      console.log('res', res)
    })
  }
  autoPosition(event) {
    let inputHeight = 0
    console.log('event', event)
    if (event.detail.height) {
      inputHeight = event.detail.height
    } else {
      inputHeight = 0
    }
    this.setState({
      bottom: inputHeight
    })
  }
  renderSearchBox() {
    const { showSearchBox, loadingStatus, questionItems, bottom } = this.state
    if (showSearchBox) {
      return (
        <View className="search-wrapper">
          <View className="search-scroll">
            <ScrollView scrollY>
              {questionItems.map(item => (
                <QuestionItem item={item} key={item.id} />
              ))}
              {loadingStatus !== 'none' ? (
                <AtLoadMore status={loadingStatus} />
              ) : (
                ''
              )}
            </ScrollView>
          </View>
          <View
            className="search-item"
            style={{
              bottom: bottom === 0 ? SAFE_AREA_INSET_BOTTOM : `${bottom}px`
            }}>
            <View
              className="search-left"
              onClick={() => {
                this.setState({
                  showSearchBox: false,
                  autoDescFocus: true
                })
              }}>
              <Text className="search-text">添加问题描述</Text>
            </View>
            <View
              className="search-right"
              onClick={() => {
                this.setState({
                  showSearchBox: false,
                  autoAnswerFocus: true
                })
              }}>
              <Text className="search-text">写答案</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  render() {
    return (
      <View className="open-question">
        <View className="question-info">
          <Input
            className="question-input"
            focus
            placeholder="请输入标题"
            value={this.state.questionTitle}
            onInput={this.handleQuestionChange}
            onFocus={this.autoPosition}
            onBlur={this.autoPosition}
          />
          <View className="wrapper">
            <View className="answer-wrapper">
              <AtTextarea
                value={this.state.description}
                onChange={e => {
                  this.setState({
                    description: e.target.value
                  })
                }}
                focus={this.state.autoDescFocus}
                showConfirmBar
                count={false}
                height={200}
                placeholder="问题描述（选填）"
              />
              <AtTextarea
                value={this.state.answer}
                onChange={e => {
                  this.setState({
                    answer: e.target.value
                  })
                }}
                focus={this.state.autoAnswerFocus}
                showConfirmBar
                count={false}
                height={300}
                placeholder="请输入答案"
              />
              <View
                className="fixed-b"
                style={{
                  bottom: `${this.state.nextBottom}px`
                }}>
                <View className="fixed-wrapper">
                  <Text onClick={this.next}>下一步</Text>
                </View>
              </View>
            </View>
            {this.renderSearchBox()}
          </View>
        </View>
      </View>
    )
  }
}
export default OpenQuestion
