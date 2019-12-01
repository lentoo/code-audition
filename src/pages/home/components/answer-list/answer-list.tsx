import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtIcon, AtLoadMore } from 'taro-ui'
import CdParseWxml from '@/components/cd-parse-wxml'
import { ICON_PREFIX_CLASS } from '@/constants/common'
import './answer-list.scss'
import Idea from '@/common/domain/question-domain/entities/Idea';
import Question from '@/common/domain/question-domain/entities/Question';
import { Utils } from '@/utils';
import useUserInfo from '@/hooks/useUserInfo';
import { navigateToLogin } from '@/utils/Navigate';


interface PageProp {
  data?: Idea[],
  question?: Question
  onItemClick: (item: Idea) => void
}

const Ideas = (params: PageProp) => {
  const { data, question } = params
  const handleTapItem = (item: Idea) => {
    params.onItemClick(item)
  }
  const [userinfo] = useUserInfo()

  const handleAvatarClick = (item) => {
    if (userinfo) {
      Taro.navigateTo({
        url: `/pages/other-homepage/index?id=${item.userinfo._id}`
      })
    } else {
      navigateToLogin()
    }
    // e.stopPropagation()
  }

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
            data && data.map(item => {
              return (
                <View className='answer-item'
                  key={item._id}
                >
                  <View className='user-box' onClick={handleTapItem.bind(this, item)}>
                    <View className='user-info'>
                      <View className='user-avatar-box' onClick={(e) => {
                        handleAvatarClick(item)
                        e.stopPropagation()
                      }}>
                        <Image className='user-avatar' src={item.userinfo.avatarUrl!}></Image>
                      </View>
                      <View className='user-name'>
                        <View>
                          <Text className='user-name-text'>
                            {
                              item.userinfo.nickName
                            }
                          </Text>
                        </View>
                        <View>
                          <Text className='user-name-date'>
                            {
                              Utils.timeView(item.createAtDate)
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                    {
                      item._id !== '0' && (<View className='icon-more'>
                      <AtIcon prefixClass={ICON_PREFIX_CLASS} value='more-fill' size={16} color='#999'></AtIcon>
                    </View>)
                    }
                    
                  </View>
                  <View className='answer-desc'>
                    {
                      item.targetUser && item.targetUser.nickName && (
                        <View className='user-mention'>
                          <Text>@{item.targetUser.nickName}</Text>
                        </View>
                      )
                    }
                    {
                      item.content && item.content.startsWith('<') ? <CdParseWxml template={item.content} mode='html'></CdParseWxml> : 
                      // <View className='p'>{item.content}</View>
                      <CdParseWxml template={item.content} mode='markdown'></CdParseWxml>
                      // item.content && <Text>{item.content}</Text>
                    }
                  </View>
                </View>
              )
            })
          }
          {
            (question && question.answerOfhtml || data && data.length !== 0) ? (
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
            ) : (
              <View style={
                {
                  marginTop: '10PX',
                  fontSize: '12px',
                  color: '#999',
                  textAlign: 'center',
                  paddingTop: '10PX'
                }
              }
              >
                <View>
                  <AtIcon prefixClass={ICON_PREFIX_CLASS} value='tubiao-' color='#aaa' size='54'></AtIcon>
                </View>
                <View style={{
                  marginTop: '5PX'
                }}
                >
                  <Text>期待你的第一个想法哦~</Text>
                </View>
              </View>
            )
          }
        </ScrollView>

      </View>
  )
}
export default Ideas
