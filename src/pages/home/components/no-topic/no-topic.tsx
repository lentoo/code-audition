import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import {
  ICON_PREFIX_CLASS,
  NO_TOPIC_TYPE
} from '@/constants/common'
import { navigateToSelectSort, navigateToFeedback } from '@/utils/Navigate'
import './no-topic.scss'

type PageProp = {
  type: NO_TOPIC_TYPE
}
const NoTopicPage = (prop: PageProp) => {
  function handleClick() {
    Taro.vibrateShort()
    if (this.props.type === 'UN_SELECTED_CATEGORY') {
      navigateToCategoryPage()
    } else {
      navigateToFeedback()
      // this.navigateToPublishPage()
    }
  }
  /**
   * @description 导航到分类选择页面
   * @author lentoo
   * @date 2019-05-25
   * @memberof NoTopic
   */
  function navigateToCategoryPage() {
    navigateToSelectSort()
  }

  /**
   * @description 导航到投稿页面
   * @author lentoo
   * @date 2019-05-25
   * @memberof NoTopic
   */
  function navigateToPublishPage() {
    Taro.navigateTo({
      url: '/pages/user/publish/open-question/index'
    }).then(Taro.hideLoading)
  }

  if (prop.type === 'UN_SELECTED_CATEGORY') {
    return (
      <View className="no-topic">
        <AtIcon
          prefixClass={ICON_PREFIX_CLASS}
          value="tubiao-"
          size="60"
          color="#999"
        />
        <Text className="no-topic-text">
          你没有选择分类，怎么给你推送题目呢 ~
        </Text>
        <View>
          <Text
            className="primary-text"
            onClick={handleClick}>
            赶紧选择分类吧 ~
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View className="no-topic">
      <AtIcon
        prefixClass={ICON_PREFIX_CLASS}
        value="zanwuneirong"
        size="60"
        color="#999"
      />
      <Text className="no-topic-text">所选分类暂无题目呢 ~</Text>
      <View>
        <Text className="primary-text" onClick={handleClick.bind(this)}>
          {/* 赶紧来投稿吧 ~ */}
          给我们反馈一下？
        </Text>
      </View>
    </View>
  )
}

export default NoTopicPage