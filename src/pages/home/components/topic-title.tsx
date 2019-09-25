import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtIcon, AtFloatLayout, AtRadio, AtButton, AtLoadMore } from 'taro-ui'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import CdParseWxml from '../../../components/cd-parse-wxml'
import { CollectionService } from '../services'
import Tag from './tag/tag'
import './topic-title.scss'
import Question from '@/common/domain/question-domain/entities/Question'
import Collection from '@/common/domain/collection-domain/entities/Collection'
type PageProp = {
  question: Question
}

interface CollectionWithSelected extends Collection {
  checked: boolean
  value: boolean
}

const TopicTitleComponent = ({ question }: PageProp) => {
  // const [showFollow, setShowFollow] = useState(true)
  const [isCollection, setIsCollection] = useState(false)
  const [isOpenFloatLayout, setIsOpenFloatLayout] = useState(false)
  const [collectionLoading, setCollectionLoading] = useState(false)
  // const [addIconStyle, setAddIconStyle] = useState({
  //   transition: '.3s ease-in-out transform',
  //   transform: 'scale(1)'
  // })
  const [collectionNum, setScollectionNum] = useState(0)
  useEffect(() => {
    console.log('useEffect', question)
    if (question) {
      setIsCollection(question.isCollection)
    }
  }, [question])

  const [collectionBtnDisabled, setCollectionBtnDisabled] = useState(true)

  const [collectionList, setCollectionList] = useState<
    CollectionWithSelected[]
  >([])

  /**
   * @description 跳转写评论页面
   * @author lentoo
   * @date 2019-05-21
   * @memberof Home
   */
  const toWriteReview = () => {
    Taro.showLoading()
    Taro.navigateTo({
      url: `write-review/index?title=${question.title}&id=${question._id}`
    }).then(() => {
      Taro.hideLoading()
    })
  }
  const loadCollections = async () => {
    try {
      setCollectionLoading(true)

      let { items } = await CollectionService.getCollection(
        {
          page: 1,
          limit: 10
        },
        question._id
      )
      const list: CollectionWithSelected[] = items.map(item => {
        return {
          ...item,
          value: item.selected,
          checked: true
        }
      })
      setCollectionList(list)
      setCollectionLoading(false)

      console.log('res', list)
    } catch (error) {
      console.log('err', error)
    }
  }

  // const [isFollow, setIsFollow] = useState(false)

  // const addFollow = async () => {
  //   // const { question } = this.props
  //   try {
  //     // await addAttentionUser({
  //     //   userId: question.userinfo._id
  //     // })
  //     // setAddIconStyle({
  //     //   transition: '.3s ease-in-out transform',
  //     //   transform: 'scale(0)'
  //     // })
  //     setTimeout(() => {
  //       setIsFollow(true)
  //     }, 500)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }
  /**
   * @description 点击头像
   * @author lentoo
   * @date 2019-06-03
   * @memberof TopicTitle
   */
  const handleAvatarClick = () => {
    Taro.navigateTo({
      url: '/pages/other-homepage/index?id='+question.userinfo._id
    })
  }
  // 跳转到 新建收藏夹页面
  const handleAddCollectionClick = () => {
    Taro.navigateTo({
      url: '/sub-pages/user-package/pages/collection/add-collection'
    })
  }
  /**
   * @description 点击收藏
   * @author lentoo
   */
  const handleCollectionClick = () => {
    loadCollections()
    setIsOpenFloatLayout(true)
  }

  const handleRadioClick = (item: CollectionWithSelected) => {
    let list = collectionList
    list = list.map(obj =>
      obj._id === item._id ? { ...obj, value: !item.value } : obj
    )
    setCollectionList(list)
    const selectedListLen = list.filter(item => item.value).length
    setScollectionNum(selectedListLen)

    setCollectionBtnDisabled(list.every(item => item.selected === item.value))

    console.log('list', list)
  }
  const handleCollectionSubmitClick = async () => {
    Taro.showLoading()
    const collectionIds = collectionList
      .filter(item => item.value)
      .map(item => item._id)
    console.log('collectionIds', collectionIds.toString())
    try {
      await CollectionService.collectionQuestion(
        question._id!,
        collectionIds.toString()
      )
      setIsOpenFloatLayout(false)
      setIsCollection(collectionIds.length > 0)
    } catch (error) {
      console.log('error', error)
    } finally {
      Taro.hideLoading()
    }
  }
  // const renderFollow = () => {
  //   return (
  //     <View className="follow-view" onClick={addFollow}>
  //       {showFollow && (
  //         <View
  //           className={classnames('title-icon-add', {
  //             follow: isFollow
  //           })}
  //           onAnimationEnd={() => {
  //             console.log('onAnimationEnd')
  //             setShowFollow(false)
  //           }}>
  //           {!isFollow && (
  //             <AtIcon
  //               className="icon-add"
  //               value="add"
  //               size="10"
  //               color="#fff"
  //             />
  //           )}
  //           {isFollow && (
  //             <AtIcon className="icon-check" value="check" size="10" color="#fff" />
  //           )}
  //         </View>
  //       )}
  //     </View>
  //   )
  // }
  if (!question) {
    return <View />
  }
  // const { addIconStyle, isFollow, showFollow } = this.state
  return (
    <View className="title">
      <View className="title-wrapper">
        <View className="title-info-wrapper">
          <View className="title-info">
            <View className="title-label">
              <View className="title-tags">
                {question.sort &&
                  question.sort.map(tag => {
                    return (
                      <Tag key={tag._id} className="title-tag">
                        {tag.sortName}
                      </Tag>
                    )
                  })}
              </View>
              <View className="title-avatar">
                <Image
                  className="title-avatar-img"
                  onClick={handleAvatarClick}
                  src={question.userinfo.avatarUrl!}
                />
                {/* {renderFollow()} */}
              </View>
            </View>
            <View className="title-text-wrapper">
              <Text selectable className="title-text">
                {question.title}
              </Text>
            </View>
            <View className="title-desc">
              {question.descriptionOfhtml && (
                <CdParseWxml template={question.descriptionOfmarkdown} mode="markdown" />
              )}
              {/* <Text>{question.descriptionOfhtml}</Text> */}
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
                  <Text>{question.browse || 0}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="title-actions">
            <View
              className="title-actions-item"
              onClick={handleCollectionClick}
              style={{
                color: isCollection ? '#999' : '#999'
              }}>
              <AtIcon
                className="mr5"
                prefixClass={ICON_PREFIX_CLASS}
                value="shoucang"
                size="14"
                color={isCollection ? '#fcbd1f' : '#999'}
              />
              <Text>{isCollection ? '已收藏' : '收藏'}</Text>
            </View>
            <View className="title-actions-item" onClick={toWriteReview}>
              <AtIcon
                className="mr5"
                prefixClass={ICON_PREFIX_CLASS}
                value="xie"
                size="16"
                color="#007fff"
              />
              <Text>我的想法</Text>
            </View>
          </View>
        </View>
      </View>
      <AtFloatLayout
        isOpened={isOpenFloatLayout}
        title={`已选择${collectionNum}个收藏集`}
        onClose={() => {
          setIsOpenFloatLayout(false)
        }}>
        <View className="collection">
          <View className="collection-wrapper">
            <View className="collection-title">
              <View
                style={{
                  height: '100%'
                }}
                onClick={handleAddCollectionClick}>
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
                        key={item._id}
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
                          handleRadioClick(item)
                        }}
                      />
                    )
                  })
                )}
              </View>
            </ScrollView>
            <View className="collection-footer">
              <AtButton
                disabled={collectionBtnDisabled}
                type="primary"
                onClick={handleCollectionSubmitClick}>
                完成
              </AtButton>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default TopicTitleComponent
