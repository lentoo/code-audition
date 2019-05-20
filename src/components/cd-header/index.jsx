import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import PropType from 'prop-types'
import './index.scss'
import { AtIcon } from 'taro-ui';

class CdHeader extends Component {
  state = {
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
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
      <View className='cd-header' style={{
        paddingTop: this.state.statusBarHeight + 'px'
      }}>
        <View className='cd-header-content'>
        {
          this.props.back && (
            <View className='cd-header-left' onClick={this.props.onBack}>
              <AtIcon value='chevron-left' size={24}></AtIcon>
            </View>
          )
        }
          <Text className='cd-header-title'>{this.props.title || '码上面试'}</Text>
        </View>
      </View>
    )
  }
}
// CdHeader.propTypes = {
//   title: PropType.string
// }
// CdHeader.defaultProps = {
//   title: '码上面试'
// }
export default CdHeader
