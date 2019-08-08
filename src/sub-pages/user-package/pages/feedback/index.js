import Taro from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import { AtImagePicker, AtButton } from 'taro-ui'
import './index.scss'
import api from '../../../../api/api'

export default class Feedback extends Taro.Component {
  config = {
    navigationBarTitleText: '反馈'
  }
  state = {
    value: '',
    feedbackTypes: [
      {
        name: '提意见',
        value: 100,
        placeholder: '请在这里输入您的意见'
      },
      {
        name: '有bug',
        value: 200,
        placeholder: '没有bug的程序不是好程序'
      },
      {
        name: '吐槽',
        value: 300,
        placeholder: '有事没事吐槽一下'
      }
    ],
    activeFeedBack: 100,
    files: []
  }
  changeFeedBack(type) {
    this.setState({
      activeFeedBack: type
    })
  }
  onChange(files) {
    this.setState({
      files
    })

    console.log(files)
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    Taro.previewImage({
      urls: this.state.files.map(item => item.url),
      current: file.url
    })
    console.log(index, file)
  }
  async submitFeedback() {
    if (this.state.value.trim() === '') {
      Taro.showToast({
        title: '给点意见咯!',
        icon: 'none'
      })
      return
    }
    Taro.showLoading({
      mask: true,
      title: '正在提交中...'
    })
    const res = await api.post('/audition/feedback/submit', {
      images: this.state.files.map(item => item.url),
      type: this.state.activeFeedBack,
      content: this.state.value
    })
    if (res.code === 1) {
      Taro.showToast({
        title: '提交成功'
      })
      this.setState({
        value: '',
        files: []
      })
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
    Taro.hideLoading()
  }
  render() {
    return (
      <View className="feedback">
        <View className="feedback-wrapper">
          <View className="feedback-types">
            {this.state.feedbackTypes.map(type => {
              return (
                <View
                  className="feedback-type"
                  key={type.value}
                  onClick={this.changeFeedBack.bind(this, type.value)}>
                  <View
                    className={[
                      'feedback-type_btn',
                      this.state.activeFeedBack === type.value ? 'active' : ''
                    ]}>
                    <Text className="feedback-type_btn_text">{type.name}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <View className="feedback-images">
            <AtImagePicker
              multiple
              files={this.state.files}
              onChange={this.onChange.bind(this)}
              onFail={this.onFail.bind(this)}
              onImageClick={this.onImageClick.bind(this)}
            />
          </View>
          <View className="feedback-input-wrapper">
            <Textarea
              value={this.state.value}
              onInput={e => {
                this.setState({
                  value: e.target.value
                })
              }}
              className="feedback-input"
              maxlength={300}
              autoHeight
              placeholder={
                this.state.feedbackTypes.find(
                  type => type.value === this.state.activeFeedBack
                ).placeholder
              }
            />
            <View className="feedback-input-count">
              <Text>{this.state.value.length} /300</Text>
            </View>
          </View>

          <View className="feedback-submit-wrapper">
            <AtButton type="secondary" onClick={this.submitFeedback.bind(this)}>
              提交
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
