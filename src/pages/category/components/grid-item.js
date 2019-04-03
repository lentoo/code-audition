import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '../../../constants/common'
import './grid-item.scss'

export default class GridItem extends Taro.Component {
  state = {
    isActive: false
  }
  handleClick () {
    this.setState({
      isActive: !this.state.isActive
    })
  }
  render() {
    const item = this.props.item
    return (
      <View className='cd-grid__item' onClick={this.handleClick.bind(this)}>
        <View className='cd-grid__item__icon'>
          <View className='cd-grid__item__icon-box'>
            <Image className='cd-grid__item__icon-img' src={item.image}></Image>
            <View className={['active-img', this.state.isActive ? 'ani-scale' : '']}>
              <AtIcon
                prefixClass={ICON_PREFIX_CLASS}
                value='yes'
                size='16'
                color='#007fff'
              >
              </AtIcon>

            </View>
          </View>
          <View className='cd-grid__item__icon-content'>
            <Text>{item.value}</Text>
          </View>
        </View>
      </View>
    );
  }
}
