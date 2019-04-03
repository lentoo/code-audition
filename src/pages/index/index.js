import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import './index.scss'
import { Storage } from '../../utils';


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '码上面试',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'light',
  }
  onPullDownRefresh () {
    Taro.vibrateShort()
    Taro.stopPullDownRefresh()
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }
  componentDidMount () {
  }
  componentDidShow () {
    const first = Storage.getItemSync('first') || true
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
  onPageScroll({ scrollTop }) {
    console.log('parent-scrollTop', scrollTop)
  }
  render () {
    return (
      <View className='index'>
        {/* <CdTitle></CdTitle> */}
        {/* <CdContainer> */}
          {/* {component} */}
        {/* </CdContainer> */}
        {/* <CdHeader></CdHeader>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <Button className='dec_btn' onClick={this.toPage.bind(this)}>to Category Page</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View> */}
      </View>
    )
  }
}

export default Index
