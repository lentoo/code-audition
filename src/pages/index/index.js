import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { FIRST } from '../../constants/common';
import './index.scss'
import { Storage } from '../../utils';

class Index extends Component {
  config = {
    navigationBarTitleText: '码上面试',
    enablePullDownRefresh: false,
    backgroundTextStyle: 'light',
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }
  componentDidMount () {
  }
  componentDidShow () {
    const first = Storage.getItemSync(FIRST) === false ? false : true
    console.log('first', first);
    if (first) {
      Taro.redirectTo({
        url: '/pages/category/index'
      })
    } else {
      Taro.redirectTo({
        url: '/pages/home/index'
      })
    }
  }

  componentDidHide () { }
  render () {
    return (
      <View className='index'>
      </View>
    )
  }
}

export default Index
