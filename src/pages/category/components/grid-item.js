import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '../../../constants/common'
import './grid-item.scss'

export default class GridItem extends Taro.Component {
  componentWillMount () {
    this.setState({
      item: Object.assign({}, this.props.item, { select: Boolean(this.props.item.select)})
    })
  }
  handleClick () {
    const item = Object.assign({}, this.state.item, { select: !this.state.item.select})
    this.setState({
      item: item
    }, () => {
      this.props.onChange(this.props.item)
    })
  }
  render() {
    const item = this.state.item
    return (
      <View className='cd-grid__item' onClick={this.handleClick.bind(this)}>
        <View className='cd-grid__item__icon'>
          <View className='cd-grid__item__icon-box'>
            <Image className='cd-grid__item__icon-img' src={item.icon}></Image>
            <View className={['active-img', item.select ? 'ani-scale' : '']}>
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
            <Text>{item.sortName}</Text>
          </View>
        </View>
      </View>
    );
  }
}
