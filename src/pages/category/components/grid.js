import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { Utils } from '@/utils';

import GridItem from './grid-item';
import './grid.scss';

export default class Grid extends Taro.Component {
  handleChange (item) {
    this.props.onChange(item)
  }
  render() {
    const data = this.props.data || []

    const arr = Utils.changeArray(data)
    return (
      <View className='cd-grid'>
        {
          arr.map((item, index) => {
            return (
              <View key={index} className='cd-grid__flex'>
              {
                item.map((obj, i) => {
                  return (
                    <View key={obj.id} className='cd-grid__flex-item'>
                      <GridItem onChange={this.handleChange.bind(this)} item={obj}></GridItem>
                    </View>
                  )
                })
              }
              </View>
            )
          })
        }
      </View>
    );
  }
}
