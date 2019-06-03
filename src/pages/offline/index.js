import Taro from '@tarojs/taro';
import { View, Image,Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import offlineImg from '../../assets/images/offline.png'
import './index.scss'

export default class Offline extends Taro.Component {
  
  config = {
    navigationBarTitleText: '码上面试'
  }
  handleClick() {
    Taro.showLoading()
    Taro.redirectTo({
      url: this.$router.params.redirect
    }).then(() => {
      Taro.hideLoading()
    }).catch(() => {
      Taro.hideLoading()
    })
  }
  render() {
    return (
      <View className='offline'>
        <View className='container'>
          <View>
            <Image className='offline-img' src={offlineImg}></Image>
          </View>
          <View className='offline-desc'>
            <Text>网络连接出错了</Text>
          </View>
          <View>
            <AtButton type='primary' size='small' onClick={this.handleClick.bind(this)}>刷新试试</AtButton>
          </View>
          {/* <AtIcon prefixClass={ICON_PREFIX_CLASS} value='wuwangluo2' size='60' color={ICON_PRIMARY_COLOR}></AtIcon> */}
        </View>
      </View>
    );
  }
}
