import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types'
import { AtIcon } from 'taro-ui';
import { ICON_PREFIX_CLASS } from '@/constants/common';
import CdParseWxml from '../../../components/cd-parse-wxml'
import './question-title.scss';

export default class QuestionTitle extends Taro.Component {
  static propTypes = {
    question: PropTypes.object
  }
  static defaultProps = {
    question: {}
  }
  constructor (prop) {
    super(prop)
    this.toWriteReview = this.toWriteReview.bind(this)
  }
  /**
   * @description 跳转写评论页面
   * @author lentoo
   * @date 2019-05-21
   * @memberof Home
   */
  toWriteReview() {
    Taro.showLoading()
    Taro.navigateTo({
      url: 'write-review/index?title=' + this.props.question.title
    }).then(() => {
      Taro.hideLoading()
    })
  }
  render() {
    const { question } = this.props
    return (
      <View className='title'>

        <View className='title-info'>
          <View className='title-label'>
            <View className='title-tags'>
              <Text className='title-tag'>
                Vue1
                        </Text>
              <Text className='title-tag'>
                Vue2
                        </Text>
              <Text className='title-tag'>
                Vue3
                        </Text>
            </View>
            <View className='title-avatar'>
              <Image className='title-avatar-img' src={question.avatarUrl}></Image>
              <View className='title-avatar-name'>
                <Text>{question.nickName}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text className='title-text'>{question.title}</Text>
          </View>
          <View className='title-desc'>
            <CdParseWxml template={question.descriptionOfhtml}></CdParseWxml>
            {/* <Text>{question.descriptionOfhtml}</Text> */}
          </View>
          <View className='title-data'>
            <View className='title-pv'>
              <View>
                <AtIcon className='mr5' prefixClass={ICON_PREFIX_CLASS} value='page-view' size='12' color='#999'></AtIcon>
                <Text>2200</Text>
              </View>
            </View>
            {/* <View className='title-tags'>
              <Text className='title-tag'>
                Vue1
                      </Text>
              <Text className='title-tag'>
                Vue2
                      </Text>
              <Text className='title-tag'>
                Vue3
                      </Text>
            </View> */}
          </View>
        </View>

        <View className='title-actions'>
          <View className='title-actions-item'>
            <AtIcon className='mr5' prefixClass={ICON_PREFIX_CLASS} value='slidebar_biaoqing' size='16' color='#007fff'></AtIcon>
            <Text>
              关注
                    </Text>
          </View>
          <View className='title-actions-item' onClick={this.toWriteReview}>
            <AtIcon className='mr5' prefixClass={ICON_PREFIX_CLASS} value='xie' size='16' color='#007fff'></AtIcon>
            <Text>
              写答案
                    </Text>
          </View>
        </View>
      </View>
    );
  }
}
