import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './question-item.scss'

export default class QuestionItem extends Taro.Component {
  render() {
    return (
      <View className='question-item'>
        <View className='question-item-wrapper'>
          <View className='question-item-title'>
            <Text>{this.props.item.title}</Text>
          </View>
          <View className='question-item-info'>
            <Text className='question-item-info-text'>{this.props.item.collection}人关注</Text>
            <Text className='question-item-info-text'>{this.props.item.comment}个人回答</Text>
          </View>
        </View>
      </View>
    );
  }
}
