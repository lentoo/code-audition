import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'

import CdTabbar from '../../components/cd-tabbar';
import './index.scss'
import { ICON_PREFIX_CLASS, ICON_PRIMARY_COLOR } from '../../constants/common';

export default class User extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  state = {
    menus: []
  }
  componentDidMount() {
    this.setState({
      menus: [
        {
          icon: 'pengyouquan',
          title: '分享'
        },
        {
          icon: 'weibiaoti--',
          title: '刷过的题'
        },
        {
          icon: 'xihuan',
          title: '喜欢'
        },
        {
          icon: 'xiaoxi',
          title: '消息'
        },
        {
          icon: 'classify_icon',
          title: '分类'
        },
        {
          icon: 'fankuitianxie',
          title: '反馈'
        }
      ]
    })
  }
  render() {
    return (
      <View className='user'>
        <View className='user-info'>
          <Image className='avatar' src='https://axhub.im/pro/914cebb9882c916b/images/%E6%88%91%E7%9A%84/u529.svg'></Image>
          <View>
            <Text className='avatar-name'>小茹</Text>
          </View>
          <View className='flex-row attention-wrapper'>
            <View className='attention'>
              <View className='attention-num'>
                <Text>111</Text>
              </View>
              <View className='attention-title'>
                <Text>关注</Text>
              </View>
            </View>
            <View className='attention'>
              <View className='attention-num'>
                <Text>110</Text>
              </View>
              <View className='attention-title'>
                <Text>粉丝</Text>
              </View>
            </View>
            <View className='attention'>
              <View className='attention-num'>
                <Text>112</Text>
              </View>
              <View className='attention-title'>
                <Text>关注</Text>
              </View>
            </View>
          </View>

        </View>
        <View className='user-menus-wrapper'>
          <View className='user-menus'>
            {
              this.state.menus.map(menu => {
                return (
                  <View className='user-menu' key={menu.title}>
                    <View>
                      <AtIcon prefixClass={ICON_PREFIX_CLASS} value={menu.icon} color={ICON_PRIMARY_COLOR} size='24'></AtIcon>
                    </View>
                    <View className='user-menu_text'>
                      <Text>
                        {menu.title}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <CdTabbar value={2}></CdTabbar>
      </View>
    );
  }
}
