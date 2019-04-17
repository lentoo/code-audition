import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './message-item.scss'

export default class MessageItem extends Taro.Component {
  render() {
    return (
      <View className='message-item'>
        <View className='message-avatar'>
          <Image className='message-avatar-img' src='https://axhub.im/pro/914cebb9882c916b/images/消息（用户）/u33.svg'></Image>
        </View>
        <View className='message-content'>
          <View className='message-content-title'>
            <Text className='title-user-name'>一条鱼评论了你的</Text>


            <Text className='title-message'>VUE主要通过什么来发布（题目展示）

            VUE主要通过什么来发布（题目展示）</Text>
          </View>
          <View className='message-content-desc'>
            <Text>
              为什么VUE会这么难，作者发布这个题目有什么意义，评论官会看么？（评论内容往下撑大）
            </Text>
          </View>
          <View className='date'>
            <Text>2019-03-21</Text>
          </View>
        </View>
      </View>
    );
  }
}
