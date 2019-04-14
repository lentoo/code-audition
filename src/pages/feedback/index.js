import Taro from '@tarojs/taro';
import { View, Text, Textarea } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui'
import './index.scss'

export default class Feedback extends Taro.Component {

  config = {
   navigationBarTitleText: '反馈'
  };
  state = {
    value: '',
    feedbackTypes: [
      {
        name: '提意见',
        placeholder: '请在这里输入您的意见'
      },
      {
        name: '有bug',
        placeholder: '没有bug的程序不是好程序'
      },
      {
        name: '吐槽',
        placeholder: '有事没事吐槽一下'
      }
    ],
    activeFeedBack: '提意见'
  }
  changeFeedBack(type) {
    this.setState({
      activeFeedBack: type
    })
  }
  render() {
    return (
      <View className='feedback'>
        <View className='feedback-wrapper'>
          <View className='feedback-types'>
            {
              this.state.feedbackTypes.map(type => {
                return (
                <View className='feedback-type' key={type.name} onClick={this.changeFeedBack.bind(this, type.name)}>
                  <View className={['feedback-type_btn', this.state.activeFeedBack === type.name ? 'active' : '']}>
                    <Text className='feedback-type_btn_text'>
                      {type.name}
                    </Text>
                  </View>
                </View>)
              })
            }
          </View>
          <View className='feedback-input-wrapper'>
            <Textarea value={this.state.value} onInput={(e) => {
              this.setState({
                value: e.target.value
              })
            }} className='feedback-input' maxlength={300} autoHeight placeholder={this.state.feedbackTypes.find(type => type.name === this.state.activeFeedBack).placeholder}
            >

            </Textarea>
            <View className='feedback-input-count'>
              <Text>
                {this.state.value.length}  /300
              </Text>
            </View>
          </View>

          <View className='feedback-submit-wrapper'>
            <AtButton type='secondary'>提交</AtButton>
          </View>
        </View>
      </View>
    );
  }
}
