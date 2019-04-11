import Taro from '@tarojs/taro';

import { AtTabBar } from 'taro-ui';
import { ICON_PREFIX_CLASS } from '../../constants/common'

export default class CdTabbar extends Taro.Component {
  state = {
    current: this.props.value || 0,
    tabList: [
      { title: '首页',url: '/pages/home/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'shouye1' },
      { title: '投稿', url: '/pages/category/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'mianshiti' },
      { title: '我',url: '/pages/user/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'wode' }
    ]
  }
  componentDidMount () {
    this.setState({
      current: this.props.value
    })
  }
  handleClick (value) {
    console.log('value', value);
    Taro.redirectTo({
      url: this.state.tabList[value].url
    })
    this.setState({
      current: value
    })
  }
  render() {
    return (
      <AtTabBar
        iconSize={20}
        fontSize={12}
        selectedColor='#007fff'
        fixed
        tabList={this.state.tabList}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      ></AtTabBar>
    );
  }
}
