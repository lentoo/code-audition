import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import './not-question.scss'

export default class NotQuestion extends Taro.Component {

  onSelectCategoryClick() {
    Taro.vibrateShort()
    Taro.showLoading({
      mask: true
    })
    Taro.navigateTo({
      url: '/pages/category/index'
    }).then(Taro.hideLoading)
  }
  render() {
    return (
      <View className='not-question'>
        <AtIcon prefixClass={ICON_PREFIX_CLASS} value='tubiao-' size='60' color='#999'></AtIcon>
        <Text className='not-question-text'>你没有选择分类，怎么给你推送题目呢~~</Text>
        <View>
          <Text className='select-question-text' onClick={this.onSelectCategoryClick.bind(this)}>赶紧选择分类吧~</Text>
        </View>
      </View>
    );
  }
}
