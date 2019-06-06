import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import classNames from 'classnames'
import './index.scss'

export default class Tag extends Taro.Component {
  static options = {
    addGlobalClass: true
  }
  render() {
    const rootClass = classNames(['cd-tag', 'cd-tag__active', this.props.className])
    return (
      <View className={rootClass} onClick={this.props.onClick}>
        <Text>{this.props.content}</Text>
        <View className='tag-icon'>
          <AtIcon value='close' size='12' color='#fefefe'></AtIcon>
        </View>
      </View>
    );
  }
}
