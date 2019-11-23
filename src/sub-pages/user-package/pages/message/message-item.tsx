import Taro, { useCallback } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "./message-item.scss";
import { AtIcon } from "taro-ui";
import { UserNotify } from "@/domain/notification-domain/entities/UserNotify";
import { ActionType, NotificationType } from "@/domain/notification-domain/entities/Notification";
import { Utils } from "@/utils";
import { navigateToOtherHone } from "@/utils/Navigate";
import CodeButton from "@/components/Button";

interface MessageItemProp {
  item: UserNotify;
}

const MessageItem = ({ item }: MessageItemProp) => {
  console.log(
    item
  );
  const handleAvatarClick = useCallback(() => {
    navigateToOtherHone(item._id!)
  }, [item])
  if (!item) {
    return null
  }
  const {
    sourceNotify
  } = item
  const {
    sendUser,
    targetIdea,
    targetQuestion,
    actionType,
    notificationType
  } = sourceNotify || {}

  function renderNotificationType () {
    if (notificationType === NotificationType.System) {
      return '系统通知'
    } else {
      switch (actionType) {
        case ActionType.FollowUser:
          return '用户关注通知'
        case ActionType.ReplyIdea:
          return '用户回复通知'
        case ActionType.Idea:
          return '用户评论通知'
        default:
          return '通知'
      }
    }
  }
  function renderName () {
    switch (actionType) {
      case ActionType.FollowUser:
        return `${sendUser!.nickName} 关注了你`
      case ActionType.Idea: 
        return `${sendUser!.nickName} 评论了你`
      case ActionType.ReplyIdea:
        return `${sendUser!.nickName} 回复了你`
    
      default:
        return sendUser!.nickName
    }
  }
  return (
    <View className="message-item">
      <View className="message-item-wrapper">
        <View className="message-title">
          <Text className="message-title-text">
            {
              renderNotificationType()
            }
          </Text>
          <Text className="message-title-date">{Utils.timeView(item.createAtDate)}</Text>
        </View>
        <View className="message-item-body">
          <View className="message-item-user">
            <View className="message-avatar">
              <Image
                className="message-avatar-img"
                onClick={handleAvatarClick}
                src={sendUser!.avatarUrl!}
              ></Image>
            </View>
            <View className="message-item-user-name">
              <Text className="title-user-name">
                {
                  renderName()
                }
              </Text>
            </View>
          </View>
          {
            (actionType === ActionType.Idea || actionType === ActionType.ReplyIdea) &&
            (
            <View className="message-content">
              <View className="message-content-desc">
                <Text>{sourceNotify.content}</Text>
              </View>
              <View className="message-content-source">
                <View className="message-content-source-item">
                  <AtIcon value="tag" size="12"></AtIcon>
                  <Text className="message-content-source-item-left">题目：</Text>
                  <Text>
                    {
                      actionType === ActionType.Idea ? targetQuestion!.title : actionType === ActionType.ReplyIdea ? targetIdea!.question!.title : ''
                    }
                  </Text>
                </View>
                {
                  actionType === ActionType.ReplyIdea && (
                  <View className="message-content-source-item">
                    <AtIcon value="tag" size="12"></AtIcon>
                    <Text className="message-content-source-item-left">想法：</Text>
                    <Text>
                      {targetIdea!.content}
                    </Text>
                  </View>
                  )
                }
              </View> 
            </View>
            )
          }
        </View>
        <View className="message-item-bottom">
          <View className="message-item-bottom-action">
            {
              actionType === ActionType.FollowUser && (
                <CodeButton type={item.sourceNotify.targetUser && item.sourceNotify.targetUser!.isAttention ? 'info' : 'primary'}><Text>{item.sourceNotify.targetUser && item.sourceNotify.targetUser!.isAttention ? '互相关注' : '关注'}</Text></CodeButton>
                )
            }
            {
              (actionType === ActionType.Idea || actionType === ActionType.ReplyIdea) && (<View><Text>点击查看 </Text><AtIcon value="chevron-right" color="#999" size="12"></AtIcon></View>)
            }
          </View>
        </View>
      </View>
    </View>
  );
};
export default MessageItem;
