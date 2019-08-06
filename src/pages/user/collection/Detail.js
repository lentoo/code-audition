import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default class CollectionDetail extends Taro.Component {
  config = {
    navigationStyle: 'custom',
  }
  render() {
    return (
      <View>
        <Text> CollectionDetail </Text>
      </View>
    );
  }
}
