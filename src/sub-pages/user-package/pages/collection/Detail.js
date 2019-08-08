import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class CollectionDetail extends Taro.Component {
  config = {
    navigationStyle: 'custom'
  }
  constructor(...props) {
    super(...props)
    this.statusBarHeight = Taro.getSystemInfoSync().statusBarHeight
  }
  render() {
    return (
      <View>
        <View style={{ paddingTop: this.statusBarHeight + 'px' }} />
        <Text> CollectionDetail </Text>
      </View>
    )
  }
}
