import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtIcon, AtButton, AtSwipeAction } from "taro-ui";
import User from "@/domain/user-domain/entities/user";
import { ICON_PREFIX_CLASS } from "@/constants/common";
import Tag from "@/components/Tag/Tag";
import { UserService } from "../services";
import "./detail.scss";

export default class CollectionDetail extends Taro.Component {
  config = {
    navigationBarTitleText: "",
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: "black"
  };
  constructor(...props) {
    super(...props)
    this.state = {
      user: new User(),
      topicList: new Array(10),
      componentId: 0
    }
  }
  async componentDidMount() {
    const user = await UserService.getUserInfo();
    this.setState({ user });
  }
  onPullDownRefresh() {
    setTimeout(() => {
      Taro.vibrateLong();
      Taro.stopPullDownRefresh();
    }, 500);
  }
  onPageScroll({ scrollTop }) {
    if (scrollTop > 50) {
      Taro.setNavigationBarTitle({
        title: "收藏集标题"
      });
    } else {
      Taro.setNavigationBarTitle({
        title: ""
      });
    }
  }
  onEditTitle = () => {
    Taro.showNavigationBarLoading();
    Taro.navigateTo({
      url: "./add-collection?edit=1"
    }).finally(Taro.hideNavigationBarLoading());
  }


  render() {
    return (
      <View className="collection-detail">
        {this.renderCollectionTitle()}
        {this.renderCollectionList()}
      </View>
    );
  }
  renderCollectionTitle() {
    const { user, topicList } = this.state;
    return (
      <View className="collection-detail">
        <View className="collection-title">
          <View className="collection-title-info">
            <View
              className="collection-title-info-name"
              onClick={this.onEditTitle}
            >
              收藏集标题
              <AtIcon
                prefixClass={ICON_PREFIX_CLASS}
                size="16"
                value="xie"
              />
            </View>
            <View className="collection-title-info-desc">
              <Text>数量：{topicList.length}</Text>
              <AtButton
                className="collection-title-info-btn"
                circle
                size="small"
                type="primary"
              >
                开始刷题
              </AtButton>
            </View>
          </View>
          <View className="collection-title-img-box">
            <Image className="collection-title-img" src={user.avatarUrl} />
          </View>
        </View>
      </View>
    );
  }
  renderCollectionList() {
    const { topicList } = this.state;
    return (
      <View className="collection-list">
        {topicList.map((item, index) => {
          return (
            <View key={index} className="collection-item-wrapper">
              <AtSwipeAction>
                <View className="collection-item" id={"item" + index}>
                  <View className="collection-item-title">
                    <Text>题目标题 123 </Text>
                    <View className="collection-item-tags">
                      <Tag>vue</Tag>
                    </View>
                  </View>
                  <View className="collection-item-info">
                    <View className="collection-item-desc">
                      <Text className="collection-item-desc-name">lentoo</Text>
                      <Text className="collection-item-desc-text">622 评论</Text>
                    </View>
                  </View>
                </View>
              </AtSwipeAction>
            </View>
          );
        })}
      </View>
    );
  }
}
