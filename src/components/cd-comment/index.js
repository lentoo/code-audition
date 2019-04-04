import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtInput } from 'taro-ui'

export default class CdComment extends Taro.Component {
  render() {
    return (
      <View>
        <Text> CdComment </Text>
        <AtInput></AtInput>
      </View>
    );
  }
}
