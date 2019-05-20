import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import './index.scss'

export default class Tag extends Taro.Component {
  static options = {
    addGlobalClass: true
  }
  render() {
    const rootClass = ['cd-tag', 'cd-tag__active', this.props.className]
    return (
      <View className={rootClass} onClick={this.props.onClick}>
        <Text>{this.props.children}</Text>
        <View className='tag-icon'>
          <AtIcon value='close' size='12' color='#fefefe'></AtIcon>
        </View>
      </View>
    );
  }
}
