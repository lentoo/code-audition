import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types'
import { AtIcon } from 'taro-ui';
import { ICON_PREFIX_CLASS } from '@/constants/common';
import CdParseWxml from '../../../components/cd-parse-wxml'
import './topic-title.scss';

export default class TopicTitle extends Taro.Component {
  static propTypes = {
    topic: PropTypes.object
  }
  static defaultProps = {
    topic: {}
  }
  constructor(prop) {
    super(prop)
    this.state = {
      addIconStyle: {
        transition: '.3s ease-in-out transform',
        transform: 'scale(1)'
      },
      showFollow: true,
      isFollow: false,
      isCollection: false
    }
    this.handleAvatarClick = this.handleAvatarClick.bind(this)
    this.toWriteReview = this.toWriteReview.bind(this)
  }
  componentWillReceiveProps() {
    this.setState({
      addIconStyle: {
        transition: '.3s ease-in-out transform',
        transform: 'scale(1)'
      },
      showFollow: true,
      isFollow: false
    })
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
      url: 'write-review/index?title=' + this.props.topic.title
    }).then(() => {
      Taro.hideLoading()
    })
  }
  addFollow() {
    this.setState({
      addIconStyle: {
        transition: '.3s ease-in-out transform',
        transform: 'scale(0)',
      }
    }, () => {
      setTimeout(() => {
        this.setState({
          isFollow: true
        })
      }, 350)
    })
  }
  /**
   * @description 点击头像
   * @author lentoo
   * @date 2019-06-03
   * @memberof TopicTitle
   */
  handleAvatarClick () {
    Taro.showNavigationBarLoading()
    Taro.navigateTo({
      url: '/pages/other-homepage/index'
    }).then(() => {
      Taro.hideNavigationBarLoading()
    })
  }
  /**
   * @description 点击收藏
   * @author lentoo
   * @date 2019-06-03
   * @memberof TopicTitle
   */
  handleCollectionClick () {
    this.setState(prevState => {
      return {
        isCollection: !prevState.isCollection
      }
    })
  }
  renderFollow() {
    const { addIconStyle, isFollow, showFollow } = this.state

    return (
      <View className='follow-view'
        onClick={this.addFollow.bind(this)}
      >
        {showFollow &&
          (
            <View className={['title-icon-add', isFollow ? 'follow' : ''].join(' ')}

              onAnimationEnd={() => {
                console.log('onAnimationEnd');
                this.setState({
                  showFollow: false
                })
              }}
            >
              {
                !isFollow ? (<AtIcon className='icon-add' value='add' size='10' color='#fff' customStyle={addIconStyle}></AtIcon>)
                  : (<AtIcon className='icon-check' value='check' size='12' color='#f5222d'></AtIcon>)
              }
            </View>
          )

        }
      </View>
    )
  }
  render() {
    const { topic } = this.props
    const { isCollection } = this.state
    // const { addIconStyle, isFollow, showFollow } = this.state
    return (
      <View className='title'>

        <View className='title-info'>
          <View className='title-label'>
            <View className='title-tags'>
              {
                topic.sorts.map(tag => {
                  return (
                    <Text key={tag} className='title-tag'>{tag}</Text>
                  )
                })
              }
            </View>
            <View className='title-avatar'>
              <Image className='title-avatar-img' onClick={this.handleAvatarClick} src={topic.avatarUrl}></Image>
              {/* <View className='at-icon at-icon-add'></View> */}
              {
                this.renderFollow()
              }
              {/* <View className='title-avatar-name'>
                <Text>{topic.nickName}</Text>
              </View> */}
            </View>
          </View>
          <View>
            <Text className='title-text'>{topic.title}</Text>
          </View>
          <View className='title-desc'>
            {
              topic.descriptionOfhtml && <CdParseWxml template={topic.descriptionOfhtml}></CdParseWxml>
            }
            {/* <Text>{topic.descriptionOfhtml}</Text> */}
          </View>
          <View className='title-data'>
            <View className='title-pv'>
              <View>
                <AtIcon className='mr5' prefixClass={ICON_PREFIX_CLASS} value='page-view' size='12' color='#999'></AtIcon>
                <Text>{topic.browse || 0}</Text>
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
          <View className='title-actions-item' onClick={this.handleCollectionClick.bind(this)}>

            <AtIcon className='mr5' prefixClass={ICON_PREFIX_CLASS} value='shoucang' size='14' color={isCollection? '#007fff' : '#999'}></AtIcon>
            <Text>
              {isCollection ? '已收藏' : '收藏'}
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
