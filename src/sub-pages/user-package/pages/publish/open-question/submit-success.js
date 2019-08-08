import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import CdHeader from '@/components/cd-header'
import CdContainer from '@/components/cd-container'
import { AtButton } from 'taro-ui';
import { ICON_PRIMARY_COLOR } from '@/constants/common';
import SubmitSuccessImg from '@/assets/images/submit-success.png'
import './submit-success.scss'

export default class SubmitSuccess extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  }
  render() {
    return (
      <View className='submit-success'>
        <CdHeader back onBack={this.onBack} title='提交成功'></CdHeader>
        <CdContainer>
          <View className='submit-success-content'>
            <View>
              <Image className='submit-success-img' src={SubmitSuccessImg}></Image>
            </View>
            <View className='submit-success-desc'>
              <View style={
                {
                  fontSize: '16px',
                  color: ICON_PRIMARY_COLOR,
                  marginTop: '10px',
                  marginBottom: '5px'
                }
              }
              >
                <Text> 投稿成功 </Text>
              </View>
              <View>
                <Text style={
                  {
                    color: '#999',
                    fontSize: '12px',
                  }
                }
                >审核将在 1~3 个工作日内完成</Text>
              </View>
            </View>
            <View style={
              {
                marginTop: '20px'
              }
            }
            >
              <AtButton onClick={this.onBack} circle type='primary'>返回</AtButton>
            </View>
          </View>
        </CdContainer>
      </View>
    );
  }
  onBack = () => {
    Taro.navigateBack({
      delta: 3
    })
  }
}
