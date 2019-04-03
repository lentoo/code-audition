import Taro from '@tarojs/taro';

import { AtTabBar } from 'taro-ui';
import { ICON_PREFIX_CLASS } from '../../constants/common'

export default class CdTabbar extends Taro.Component {
  state = {
    current: 0
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render() {
    const iconPrefixClass = ICON_PREFIX_CLASS
    return (
      <AtTabBar
        fixed
        iconSize={20}
        fontSize={12}
        selectedColor='#007fff'
        tabList={[
          { title: '首页', iconPrefixClass, iconType: 'shouye1' },
          { title: '投稿', iconPrefixClass, iconType: 'mianshiti' },
          { title: '我', iconPrefixClass, iconType: 'wode' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      ></AtTabBar>
    );
  }
}
