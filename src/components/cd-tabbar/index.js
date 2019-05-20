import Taro from '@tarojs/taro';

import { AtTabBar } from 'taro-ui';
import { ICON_PREFIX_CLASS } from '../../constants/common'

export default class CdTabbar extends Taro.Component {
  constructor (params) {
    super(params)
    const title = this.props.title
    const tabList = [
      { title: '首页', url: '/pages/home/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'shouye1' },
      // { title: '投稿', url: '/pages/publish/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'publish-copy' },
      { title: '消息', url: '/pages/user/message/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'xiaoxi3' },
      { title: '我', url: '/pages/user/index', iconPrefixClass: ICON_PREFIX_CLASS, iconType: 'wode' }
    ]

    const index = tabList.findIndex(item => item.title === title)
    this.state.current = index
    this.state.tabList = tabList
  }
  handleClick (value) {
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
        customStyle={
          {
            // borderTop: '1PX solid #e4e4e4',
            boxShadow: '0px 0 10px #DCDFE6'
          }
        }
      ></AtTabBar>
    );
  }
}
