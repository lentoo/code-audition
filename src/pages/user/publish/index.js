import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { AtIcon } from 'taro-ui';

import CdTabbar from '@/components/cd-tabbar';
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../../constants/common';
import './index.scss'

export default class Publish extends Taro.Component {
  config = {
    navigationBarTitleText: '投稿',
    enablePullDownRefresh: false,
    backgroundTextStyle: 'light',
  }
  constructor (props) {
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
  }
  navigateTo (url) {
    Taro.navigateTo({
      url
    })
  }
  render() {
    return (
      <View className='publish'>
        <View className='publish-list'>
        	<View className='publish-item'>
            <View className='item' onClick={() => this.navigateTo('open-question/index')}>
              <AtIcon prefixClass={ICON_PREFIX_CLASS} color={ICON_PRIMARY_COLOR} size='30' value='weibiaoti--' />
              <View className='publish-item-text'>
                <Text>开放题</Text>
              </View>
            </View>
        	</View>
        	<View className='publish-item'>
            <View className='item' onClick={() => this.navigateTo('open-question/index')}>
              <AtIcon prefixClass={ICON_PREFIX_CLASS} color={ICON_PRIMARY_COLOR} size='30' value='gaoyizhizhitongche04' />
          	  <View className='publish-item-text'>
          	    <Text>选择题</Text>
          	  </View>
            </View>
        	</View>
        </View>
        <CdTabbar value={1}></CdTabbar>
      </View>
    );
  }
}
