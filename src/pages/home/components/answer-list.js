import Taro from '@tarojs/taro';
import PropTypes from 'prop-types'
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtIcon, AtLoadMore } from 'taro-ui'
import CdParseWxml from '@/components/cd-parse-wxml'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import './answer-list.scss'

export default class AnswerList extends Taro.Component {
  static propTypes = {
    data: PropTypes.array,
    question: PropTypes.object
  }
  static defaultProps = {
    data: [],
    question: {}
  }
  handleTapItem (item) {
    this.props.onItemClick(item)
  }
  render() {
    const { data, question } = this.props
    return (
      <View className='answer-wrapper'>
        <ScrollView
          className='answer-list'
          scrollY
          style={
            {
              maxHeight: '100%'
            }
          }
        >
          {
            data.map(item => {
              return (
                <View className='answer-item'
                  key={item.id}
                >
                  <View className='user-box' onClick={this.handleTapItem.bind(this, item)}>
                    <View className='user-info'>
                      <View className='user-avatar-box'>
                        <Image className='user-avatar' src={question.avatarUrl}></Image>
                      </View>
                      <View className='user-name'>
                        <Text className='user-name-text'>
                          {
                            question.nickName
                          }
                        </Text>
                      </View>
                    </View>
                    <View className='icon-more'>
                      <AtIcon prefixClass={ICON_PREFIX_CLASS} value='more-fill' size={16} color='#999'></AtIcon>
                    </View>
                  </View>
                  <View className='answer-desc'>
                    <CdParseWxml template={question.answerOfhtml}></CdParseWxml>

                  </View>
                </View>
              )
            })
          }

          <AtLoadMore
            status='noMore'
            noMoreText='-- No More Data --'
            noMoreTextStyle={
              {
                color: '#ccc',
                fontSize: '14px'
              }
            }
          ></AtLoadMore>
        </ScrollView>

      </View>
    );
  }
}
