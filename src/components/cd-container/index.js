import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import PropType from 'prop-types'
import './index.scss'

class CdContainer extends Component {
  state = {
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight * 2
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='cd-container' style={
          {
            paddingTop: Taro.pxTransform(this.state.statusBarHeight + 80)
          }
        }
      >
        <View className='' style={{height: '100%', width: '100%'}}>
          {this.props.children}
        </View>
      </View>
    )
  }
}
export default CdContainer
