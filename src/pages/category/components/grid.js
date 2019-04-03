import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'

import GridItem from './grid-item';
import './grid.scss';

export default class Grid extends Taro.Component {
  changeArray (array, line = 3) {
    let len = array.length;
    let n = line;
    let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = array.slice(i * n, i * n + n);
      res.push(temp);
    }
    return res
  }
  render() {
    const data = this.props.data || []

    const arr = this.changeArray(data)
    return (
      <View className='cd-grid'>
        {
          arr.map((item, index) => {
            return (
              <View key={index} className='cd-grid__flex'>
              {
                item.map((obj, i) => {
                  return (
                    <View key={i} className='cd-grid__flex-item'>
                      <GridItem item={obj}></GridItem>
                    </View>
                  )
                })
              }
              </View>
            )
          })
        }
      </View>
      // <AtGrid
      //   hasBorder={false}
      //   data={this.props.data}
      // />
    );
  }
}
