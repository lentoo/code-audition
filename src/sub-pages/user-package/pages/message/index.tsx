import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import CdTabbar from "@/components/cd-tabbar";
import classNames from "classnames";
import styles from "./index.module.scss";
import MessageItem from "./message-item";
import NotMessage from "./not-message";
import { NotificationService } from "../services";
import useUserInfo from "@/hooks/useUserInfo";
import { UserNotify } from "@/common/domain/notification-domain/entities/UserNotify";

const MessagePage = () => {
  // const tabList = [{ title: "用户" }, { title: "系统" }];

  const [user] = useUserInfo();

  const [list, setList] = useState<UserNotify[]>([])

  useEffect(() => {
    const loadData = async () => {
      // showLoginModal()
      if (user) {
        const ls = await NotificationService.getUserNotify(user._id!)
        console.log('ls', ls)
        setList(ls)
      }
    }
    loadData()
  }, [user])
  const oldIndex = list.findIndex(item => item.isRead === true)
  return (
    <View className={styles.message}>
      <View className={styles.badges}>
        {/* <View className={styles.badge}>
          
          <Text>10</Text>
        </View> */}
        {/* <View className={[styles.badge, styles.badgeRight]}>
          
          <Text>99+</Text>
        </View> */}
      </View>
      <View className={styles.pane}>
        {
          list.length 
            ?
          (<ScrollView scrollY className={styles.scrollview}>
            {/* <View className={styles.time}>
              <Text>10分钟前</Text>
            </View> */}
            {
              
              list.map((item, index) => {
                return (<View key={item.id}>
                  {
                    (oldIndex === index && oldIndex !== 0) && (<View className={classNames([styles.time, styles.old])}>
                    <Text className={styles.timeText}>以下是旧消息</Text>
                  </View>)
                  }
                    <MessageItem item={item}/>
                  </View>)
              })
            }
            
          </ScrollView>)
            :
          (
            <View className={styles.not}>
              <NotMessage />
            </View>
          )
        }
      </View>
      {/* <AtTabs
        current={current}
        tabList={tabList}
        onClick={handleTabClick}
      >
        <AtTabsPane current={current} index={0}>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className={styles.pane}>
            <View className={styles.not}>
              <NotMessage />
            </View>
          </View>
        </AtTabsPane>
      </AtTabs> */}
      <CdTabbar title="消息" />
    </View>
  );
};
MessagePage.config = {
  navigationBarTitleText: "消息",
  enablePullDownRefresh: true
};

export default MessagePage;
