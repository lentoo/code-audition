import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtIcon, AtFloatLayout, AtRadio, AtButton, AtLoadMore } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import CdParseWxml from '../../../components/cd-parse-wxml'
import Tag from './tag'
import './topic-title.scss'
import { addAttentionUser } from '../../../api/home'
import { getCollections, saveTopicInCollection } from '../../../api/user'

export default class TopicTitle extends Taro.Component {
  static propTypes = {
    topic: PropTypes.object
  }
  static defaultProps = {
    topic: {}
  }
  constructor(...props) {
    super(...props)
    this.state = {
      addIconStyle: {
        transition: '.3s ease-in-out transform',
        transform: 'scale(1)'
      },
      showFollow: false,
      isFollow: false,
      isCollection: false,
      isOpenFloatLayout: false,
      collectionLoading: false,
      collectionList: []
    }
    this.handleAvatarClick = this.handleAvatarClick.bind(this)
    this.toWriteReview = this.toWriteReview.bind(this)
    this.handleRadioClick = this.handleRadioClick.bind(this)
    this.handleCollectionSubmitClick = this.handleCollectionSubmitClick.bind(
      this
    )
  }
  componentWillReceiveProps() {
    const topic = this.props.topic
    if (topic && topic.attentionStatus !== undefined) {
      this.setState({
        showFollow: topic.attentionStatus === 0,
        isCollection: topic.collectionStatus === 1
      })
    }
    // this.setState({
    //   addIconStyle: {
    //     transition: '.3s ease-in-out transform',
    //     transform: 'scale(1)'
    //   },
    //   showFollow: true,
    //   isFollow: false
    // })
  }
  componentDidShow() {
    Taro.hideNavigationBarLoading()
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
      url: `write-review/index?title=${this.props.topic.title}&id=${
        this.props.topic.id
      }`
    }).then(() => {
      Taro.hideLoading()
    })
  }
  async loadCollections(params) {
    try {
      this.setState({
        collectionLoading: true
      })
      let res = await getCollections(params)
      res = res.data.map(item => {
        return {
          ...item,
          value: true,
          checked: item.select === 1 ? true : false
        }
      })
      this.setState({
        collectionList: res,
        collectionLoading: false
      })
      console.log('res', res)
    } catch (error) {
      console.log('err', error)
    }
  }
  async addFollow() {
    const { topic } = this.props
    try {
      await addAttentionUser({
        userId: topic.userInfoId
      })
      this.setState(
        {
          addIconStyle: {
            transition: '.3s ease-in-out transform',
            transform: 'scale(0)'
          }
        },
        () => {
          setTimeout(() => {
            this.setState({
              isFollow: true
            })
          }, 350)
        }
      )
    } catch (error) {
      console.log('error', error)
    }
  }
  /**
   * @description 点击头像
   * @author lentoo
   * @date 2019-06-03
   * @memberof TopicTitle
   */
  handleAvatarClick() {
    Taro.showNavigationBarLoading()
    Taro.navigateTo({
      url: '/pages/other-homepage/index'
    })
  }
  handleAddCollectionClick() {
    Taro.showNavigationBarLoading()
    Taro.navigateTo({
      url: '/sub-pages/user-package/pages/collection/add-collection'
    })
  }
  /**
   * @description 点击收藏
   * @author lentoo
   * @date 2019-06-03
   * @memberof TopicTitle
   */
  handleCollectionClick() {
    this.loadCollections({
      questionId: this.props.topic.id
    })
    this.setState(prevState => {
      return {
        isOpenFloatLayout: true
        // isCollection: !prevState.isCollection
      }
    })
  }
  handleRadioClick(item) {
    const list = [...this.state.collectionList]
    this.setState({
      collectionList: list.map(obj =>
        obj.id === item.id ? { ...obj, checked: !item.checked } : obj
      )
    })
  }
  async handleCollectionSubmitClick() {
    Taro.showLoading()
    const { topic } = this.props
    const { collectionList } = this.state
    const collectionIds = collectionList
      .filter(item => item.checked)
      .map(item => item.id)
    try {
      await saveTopicInCollection({
        id: topic.id,
        collectionIds
      })
      this.setState({
        isOpenFloatLayout: false,
        isCollection: !!collectionIds.length
      })
    } catch (error) {
      console.log('error', error)
    } finally {
      Taro.hideLoading()
    }
  }
  renderFollow() {
    const { addIconStyle, isFollow, showFollow } = this.state

    return (
      <View className="follow-view" onClick={this.addFollow.bind(this)}>
        {showFollow && (
          <View
            className={['title-icon-add', isFollow ? 'follow' : ''].join(' ')}
            onAnimationEnd={() => {
              console.log('onAnimationEnd')
              this.setState({
                showFollow: false
              })
            }}>
            {!isFollow ? (
              <AtIcon
                className="icon-add"
                value="add"
                size="10"
                color="#fff"
                customStyle={addIconStyle}
              />
            ) : (
              <AtIcon
                className="icon-check"
                value="check"
                size="12"
                color="#f5222d"
              />
            )}
          </View>
        )}
      </View>
    )
  }
  render() {
    const { topic } = this.props
    const {
      isCollection,
      isOpenFloatLayout,
      collectionLoading,
      collectionList
    } = this.state
    // const { addIconStyle, isFollow, showFollow } = this.state
    return (
      <View className="title">
        <View className="title-wrapper">
          <View className="title-info-wrapper">
            <View className="title-info">
              <View className="title-label">
                <View className="title-tags">
                  {topic.sorts &&
                    topic.sorts.map(tag => {
                      return (
                        <Tag key={tag} className="title-tag">
                          {tag}
                        </Tag>
                      )
                    })}
                </View>
                <View className="title-avatar">
                  <Image
                    className="title-avatar-img"
                    onClick={this.handleAvatarClick}
                    src={topic.avatarUrl}
                  />
                  {/* <View className='at-icon at-icon-add'></View> */}
                  {this.renderFollow()}
                  {/* <View className='title-avatar-name'>
                    <Text>{topic.nickName}</Text>
                  </View> */}
                </View>
              </View>
              <View className="title-text-wrapper">
                <Text selectable className="title-text">
                  {topic.title}
                </Text>
              </View>
              <View className="title-desc">
                {topic.descriptionOfhtml && (
                  <CdParseWxml template={topic.descriptionOfhtml} />
                )}
                {/* <Text>{topic.descriptionOfhtml}</Text> */}
              </View>
              <View className="title-data">
                <View className="title-pv">
                  <View>
                    <AtIcon
                      className="mr5"
                      prefixClass={ICON_PREFIX_CLASS}
                      value="page-view"
                      size="12"
                      color="#999"
                    />
                    <Text>{topic.browse || 0}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="title-actions">
              <View
                className="title-actions-item"
                onClick={this.handleCollectionClick.bind(this)}
                style={{
                  color: isCollection ? '#007fff' : '#999'
                }}>
                <AtIcon
                  className="mr5"
                  prefixClass={ICON_PREFIX_CLASS}
                  value="shoucang"
                  size="14"
                  color={isCollection ? '#007fff' : '#999'}
                />
                <Text>{isCollection ? '已收藏' : '收藏'}</Text>
              </View>
              <View className="title-actions-item" onClick={this.toWriteReview}>
                <AtIcon
                  className="mr5"
                  prefixClass={ICON_PREFIX_CLASS}
                  value="xie"
                  size="16"
                  color="#007fff"
                />
                <Text>写答案</Text>
              </View>
            </View>
          </View>
        </View>
        <AtFloatLayout
          isOpened={isOpenFloatLayout}
          title="添加到收藏集"
          onClose={() => {
            this.setState({
              isOpenFloatLayout: false
            })
          }}>
          <View className="collection">
            <View className="collection-wrapper">
              <View className="collection-title">
                <View
                  style={{
                    height: '100%'
                  }}
                  onClick={this.handleAddCollectionClick}>
                  <AtIcon value="add" size="14" />
                  <Text className="collection-title-text">新建收藏集</Text>
                </View>
              </View>
              <ScrollView scrollY className="collection-body">
                <View className="collection-list">
                  {collectionLoading ? (
                    <AtLoadMore status="loading" />
                  ) : (
                    collectionList.map(item => {
                      return (
                        <AtRadio
                          key={item.id}
                          options={[
                            {
                              label: item.name,
                              desc: `${item.attentionNum} 个关注 · ${
                                item.questionNum
                              } 个题目`,
                              value: item.value
                            }
                          ]}
                          value={item.checked}
                          onClick={() => {
                            this.handleRadioClick(item)
                          }}
                        />
                      )
                    })
                  )}
                </View>
              </ScrollView>
              <View className="collection-footer">
                <AtButton
                  type="primary"
                  onClick={this.handleCollectionSubmitClick}>
                  完成
                </AtButton>
              </View>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
