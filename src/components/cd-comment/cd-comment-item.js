import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import './index.scss'
import { ICON_PREFIX_CLASS } from '../../constants/common';

export default class CdCommentItem extends Taro.Component {
  render() {
    return (
      <View className='comment-item flex-r'>
        <View>
          <Image className='comment-item__avatar' src='https://avatars2.githubusercontent.com/u/24666230?s=40&v=4'>
          </Image>
        </View>
        <View className='comment-item__info'>
          <View className='comment-item__title'>
            <Text>sdfdf</Text>
          </View>
          <View className='comment-item__content'>
            <Text>你们的思想太前进了</Text>
          </View>
        </View>
        <View>
          <View>
            <AtIcon prefixClass={ICON_PREFIX_CLASS} value='dianzan' size='18'></AtIcon>
          </View>
          <View>
            <Text className='stat-num'>10</Text>
          </View>
        </View>
      </View>
    );
  }
}
