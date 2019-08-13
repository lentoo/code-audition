import Taro, { Config } from '@tarojs/taro'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import { View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import './AddFocusUserItem.scss'
import FocusUserItem from './components/FocusUserItem';
export default class AddFocusUserItem extends Taro.Component{
  config: Config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  state = {
    value: ''
  }
  onPageScroll(params: any) {
    const scrollTop = params.scrollTop as number
    if (scrollTop > 50) {
      Taro.setNavigationBarTitle({
        title: '添加关注'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: ''
      })
    }
  }

  onSearchBarValueChange = (value: string) => {
    this.setState({
      value
    })
  }
  
  render () {
    const { value } = this.state
    return (
      <View className='add-focus'>
        <LayoutTitle title='添加关注'>
          <AtSearchBar value={value} onChange={this.onSearchBarValueChange}/>
        </LayoutTitle>
        <View>
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
          <FocusUserItem />
        </View>
      </View>
    )
  }
}