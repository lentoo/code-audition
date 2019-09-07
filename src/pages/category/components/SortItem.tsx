import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Sort from '@/common/domain/sort-domain/entities/Sort'
import { ICON_PREFIX_CLASS } from '../../../constants/common'
import './SortItem.scss'

type PageProp = {
  item: Sort
  onChange: (item: Sort) => void
}
export default function (props: PageProp) {
  const { item, onChange } = this.props
  if (!item) return null
  
    return (
      <View className='cd-grid__item' onClick={() => onChange(item)}>
        <View className='cd-grid__item__icon'>
          <View className='cd-grid__item__icon-box'>
            <Image className='cd-grid__item__icon-img' src={item.icon} />
            <View
              className={['active-img', item.select ? 'ani-scale' : ''].join(
                ' '
              )}
            >
              <AtIcon
                prefixClass={ICON_PREFIX_CLASS}
                value='yes'
                size='16'
                color='#007fff'
              />
            </View>
          </View>
          <View className='cd-grid__item__icon-content'>
            <Text>{item.sortName}</Text>
          </View>
        </View>
      </View>
    )
  
}

// export default class GridItem extends Taro.Component {

//   handleClick() {

//     this.props.onChange(this.props.item)
//   }
//   render() {
//     const { item } = this.props
//     if (!item) return null
//     return (
//       <View className='cd-grid__item' onClick={this.handleClick.bind(this)}>
//         <View className='cd-grid__item__icon'>
//           <View className='cd-grid__item__icon-box'>
//             <Image className='cd-grid__item__icon-img' src={item.icon} />
//             <View
//               className={['active-img', item.select ? 'ani-scale' : ''].join(
//                 ' '
//               )}
//             >
//               <AtIcon
//                 prefixClass={ICON_PREFIX_CLASS}
//                 value='yes'
//                 size='16'
//                 color='#007fff'
//               />
//             </View>
//           </View>
//           <View className='cd-grid__item__icon-content'>
//             <Text>{item.sortName}</Text>
//           </View>
//         </View>
//       </View>
//     )
//   }
// }
