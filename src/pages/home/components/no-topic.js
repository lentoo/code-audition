import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtIcon } from 'taro-ui'
import { ICON_PREFIX_CLASS, UN_SELECTED_CATEGORY, NO_TOPIC } from '@/constants/common'
import './no-topic.scss'

export default class NoTopic extends Taro.Component {
  static propTypes  = {
    type: PropTypes.oneOf([UN_SELECTED_CATEGORY, NO_TOPIC])
  }
  static defaultProps = {
    type: UN_SELECTED_CATEGORY
  }
  handleClick() {
    Taro.vibrateShort()
    Taro.showLoading({
      mask: true
    })
    if (this.props.type === UN_SELECTED_CATEGORY) {
      this.navigateToCategoryPage()
    } else {
      this.navigateToPublishPage()
    }
  }
  /**
   * @description 导航到分类选择页面
   * @author lentoo
   * @date 2019-05-25
   * @memberof NoTopic
   */
  navigateToCategoryPage () {
    Taro.navigateTo({
      url: '/pages/category/index'
    }).then(Taro.hideLoading)
  }
  /**
   * @description 导航到投稿页面
   * @author lentoo
   * @date 2019-05-25
   * @memberof NoTopic
   */
  navigateToPublishPage () {
    Taro.navigateTo({
      url: '/pages/user/publish/open-question/index'
    }).then(Taro.hideLoading)
  }
  render() {
    const { type } = this.props
    if (type === UN_SELECTED_CATEGORY) {
      return (
        <View className='no-topic'>
          
          <AtIcon prefixClass={ICON_PREFIX_CLASS} value='tubiao-' size='60' color='#999'></AtIcon>
          <Text className='no-topic-text'>你没有选择分类，怎么给你推送题目呢 ~</Text>
          <View>
            <Text className='primary-text' onClick={this.handleClick.bind(this)}>赶紧选择分类吧 ~</Text>
          </View>
        </View>
      )
    }
    return (
      <View className='no-topic'>          
          <AtIcon prefixClass={ICON_PREFIX_CLASS} value='zanwuneirong' size='60' color='#999'></AtIcon>
          <Text className='no-topic-text'>所选分类暂无题目呢 ~</Text>
          <View>
            <Text className='primary-text' onClick={this.handleClick.bind(this)}>赶紧来投稿吧 ~</Text>
          </View>
        </View>
    );
  }
}
