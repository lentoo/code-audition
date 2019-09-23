import Taro, {
  useState,
  useDidShow,
  useEffect,
  usePullDownRefresh,
  useShareAppMessage,
  usePageScroll,
  useReachBottom,
} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
  AtIcon,
  AtButton,
  AtActionSheet,
  AtActionSheetItem,
  AtFab
} from 'taro-ui'
import { get as getGlobalData, set as setGlobalData } from '@/utils/global-data'

//#region Components

import CdTabbar from '../../components/cd-tabbar'
import TopicTitle from './components/topic-title'
import AnswerList from './components/answer-list/answer-list'
import NoTopic from './components/no-topic/no-topic'
import { QuestionService } from './services'
//#endregion Components
import { ICON_PREFIX_CLASS, APP_NAME, NO_TOPIC_TYPE } from '@/constants/common'

import './index.scss'
import Question from '@/common/domain/question-domain/entities/Question'
import Idea from '@/common/domain/question-domain/entities/Idea'
import { PaginationModel } from '@/common/domain/BaseModel'

// interface PageState {
//   noTopicType: NO_TOPIC_TYPE
//   topic: Question | null
//   showNoTopic: boolean
//   showActionSheet: boolean
//   current: Idea | null
//   ideaList: Idea[]
//   answerPage: any
// }

const Home = () => {
  useShareAppMessage(options => {
    console.log(options)
    let shartObj = {}
    if (options.from === 'menu') {
      // 通过右上角的按钮分享
      // 点击分享
      shartObj = {
        path: '/pages/index/index',
        title: APP_NAME
      }
    } else {
      // 点击分享
      shartObj = {
        path: '/pages/index/index',
        title: topic!.title
      }
    }
    return shartObj
  })
  const pagination = {
    page: 1,
    limit: 5
  }
  const [topic, setTopic] = useState<Question | null>(null)
  const [showNoTopic, setShowNoTopic] = useState(false)
  const [noTopicType, setNoTopicType] = useState<NO_TOPIC_TYPE>(
    'UN_SELECTED_CATEGORY'
  )
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [ideaList, setIdeaList] = useState<Idea[]>([])
  const [page, setPage] = useState<PaginationModel | null>(null)

  usePullDownRefresh(async () => {
    Taro.showLoading({
      title: '',
      mask: true
    })
    Taro.vibrateShort()
    Taro.hideLoading()
    await loadData()
    Taro.stopPullDownRefresh()
  })

  usePageScroll(event => {
    if (event.scrollTop > 100) {
      Taro.setNavigationBarTitle({
        title: topic!.title
      })
    } else {
      Taro.setNavigationBarTitle({
        title: ''
      })
    }
  })
  useDidShow(() => {
    const writeReview = getGlobalData('write-review')
    if (writeReview) {
      pagination.page = 1
      fetchIdeaList(true)
      setGlobalData('write-review', false)
    }
    console.log('componentDidShow')
  })

  useReachBottom(() => {
    console.log('useReachBottom');
    if (page && page.hasMore) {
      pagination.page++
      fetchIdeaList()
    }
  })

  useEffect(() => {
    topic && fetchIdeaList(true)
  }, [topic])

  /**
   * @description 加载数据
   * @memberof Home
   */
  const loadData = async () => {
    Taro.showLoading()

    try {
      const questionItem = await QuestionService.pullQuestionItem()

      setTopic(questionItem)

    } catch (error) {
      console.log('error', error)

      switch (error.message) {
        case '已经把所有题都刷完了，你真优秀，欢迎投稿题目':
          setShowNoTopic(true)
          setNoTopicType('NO_TOPIC')
          break
        case '你还没有关注分类，先去关注一些你喜欢的分类吧':
          setShowNoTopic(true)
          setNoTopicType('UN_SELECTED_CATEGORY')
          break
        default:
          break
      }
    } finally {
      Taro.hideLoading()
    }
  }

  /**
   * @description 获取想法列表
   * @author lentoo
   * @date 2019-06-05
   * @param {*} params
   * @param {boolean} [reset=false]
   * @memberof Home
   */
  const fetchIdeaList = async (reset = false) => {
    const res = await QuestionService.fetchIdea({
      id: topic && topic._id,
      ...pagination
    })
    const { items, page } = res
    console.log('items', items)
    const list = reset ? items : [...ideaList, ...items]
    if (reset && topic && topic.answerOfhtml) {
      list.unshift({
        _id: topic._id,
        userinfo: topic.userinfo,
        content: topic.answerOfhtml
      })
    }
    console.log('list', list);
    setIdeaList(list)
    setPage(page)
  }
  useEffect(() => {
    loadData()
  }, [])
  
  const [current, setCurrent] = useState<Idea | null>(null)

  const handleTapItem = (item: Idea) => {
    setShowActionSheet(true)
    setCurrent(item)
  }
  /**
   * @description 点击下一题
   * @author lentoo
   * @date 2019-05-24
   * @param {*} event
   * @memberof Home
   */
  const onFabNextClick = (event?) => {
    console.log('onFabNextClick')
    event.stopPropagation()
    Taro.startPullDownRefresh()
  }
  /**
   * @description 点击回复
   *
   * @memberof Home
   */
  const handleReplyClick = () => {
    if (current) {
      Taro.showLoading()
      Taro.navigateTo({
        url: `write-review/index?nickName=${current.userinfo.nickName}&tid=${current._id}&title=${topic!.title}&id=${topic!._id}`
      }).then(() => {
        Taro.hideLoading()
        setShowActionSheet(false)
      })
    }
  }
  const renderTopic = () => {
    return showNoTopic ? (
      <View />
    ) : (
      <View className="main">
        <TopicTitle question={topic!} />

        <AnswerList
          onItemClick={handleTapItem.bind(this)}
          data={ideaList!}
          question={topic!}
        />

        <View className="fixed-btns">
          <View className="fab-btn">
            <AtFab size="small">
              <AtButton className="btn-share" openType="share">
                <AtIcon
                  prefixClass={ICON_PREFIX_CLASS}
                  value="share"
                  color="#666"
                  size="18"
                />
              </AtButton>
            </AtFab>
          </View>
          <View className="fab-btn">
            <AtFab onClick={onFabNextClick} size="small">
              <Text className="at-icon at-icon-chevron-down" />
            </AtFab>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View
      className="home"
      style={{
        height: '100vh'
      }}>
      {showNoTopic && <NoTopic type={noTopicType} />}
      {renderTopic()}

      <AtActionSheet
        cancelText="取消"
        isOpened={showActionSheet}
        onClose={() => {
          setShowActionSheet(false)
        }}>
        <AtActionSheetItem onClick={handleReplyClick.bind(this)}>
          回复
        </AtActionSheetItem>
      </AtActionSheet>

      {/* <View className='tabbar'> */}
      <CdTabbar title="首页" />
      {/* </View> */}
    </View>
  )
}
Home.config = {
  // navigationBarTitleText: '码上面试',
  backgroundTextStyle: 'dark',
  enablePullDownRefresh: true
}
export default Home