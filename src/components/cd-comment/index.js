import Taro from '@tarojs/taro';
import { View, Input, ScrollView, } from '@tarojs/components';
import CdCommentItem from './cd-comment-item'
import './index.scss'

export default class CdComment extends Taro.Component {
  state = {
    bottom: 0
  }
  componentDidMount () {
  }
  handleFocus (event) {
    var inputHeight = 0
    if (event.detail.height) {
      inputHeight = event.detail.height
      this.setState({
        bottom: inputHeight
      })
    }
  }
  handleBlur () {
    this.setState({
      bottom: 0
    })
  }
  render() {
    return (
      <View className='cd-comment'>
        <ScrollView
          className='comment-scroll-view'
          scrollY
        >
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
          <CdCommentItem></CdCommentItem>
        </ScrollView>
        <View className='comment-input-box' style={
          {
            bottom: `${this.state.bottom}px`,
            paddingBottom: this.state.bottom === 0 ? 'env(safe-area-inset-bottom)' : Taro.pxTransform(20)
          }}
        >
          <Input className='comment-input' confirmType='评论' onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)} placeholder='评论一下吧~' adjustPosition={false}></Input>
        </View>
      </View>
    );
  }
}
