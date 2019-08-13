import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtSearchBar } from 'taro-ui'
import Loading from '@/components/Loading/Loading'
/**
 * @description 分类列表页面
 * @author lentoo
 * @date 2019-08-10
 * @export
 * @class SortView
 * @extends {Taro.Component}
 */
export default class SortView extends Taro.Component {
  config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  onPullDownRefresh() {
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 500)
  }
  constructor(...props) {
    super(...props)
    this.state = {
      sortList: [],
      searchValue: '',
      loading: false,
      loadingFinished: false
    }
  }
  componentDidMount() {
    this.onLoadData()
  }
  onPageScroll({ scrollTop }) {
    if (scrollTop > 50) {
      Taro.setNavigationBarTitle({
        title: '分类'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: ''
      })
    }
  }
  async onReachBottom() {
    this.setState({
      loading: true
    })
    await this.onLoadData()
    if (this.state.sortList.length >= 50) {
      this.setState({
        loadingFinished: true
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }
  onSearchBarValueChange = value => {
    this.setState({
      searchValue: value
    })
  }
  onLoadData() {
    if (this.state.loadingFinished) return
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(
          prev => {
            return {
              sortList: prev.sortList.concat(
                new Array(10).fill(prev.sortList.length)
              )
            }
          },
          () => {
            resolve()
          }
        )
      }, 1500)
    })
  }
  render() {
    const { loading, loadingFinished } = this.state
    return (
      <View className="sort">
        <View className="title">
          <Text>分类</Text>
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.onSearchBarValueChange}
          />
          {this.renderSortList()}
          {loading && <Loading finished={loadingFinished} />}
        </View>
      </View>
    )
  }
  renderSortList() {
    const { sortList } = this.state
    return (
      <View className="sort-list">
        {sortList.length === 0 ? (
          <Loading />
        ) : (
          sortList.map((item, index) => {
            return (
              <View key={index} className="sort-list-item">
                <View className="sort-list-item-left">
                  <Image
                    className="sort-list-item-left-img"
                    src="https://upload.jianshu.io/users/upload_avatars/15717347/4e662bed-45ab-42f3-bd1d-07f09ec201b2?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                  />
                </View>
                <View className="sort-list-item-right">
                  <View className="sort-list-item-right-info">
                    <View className="sort-list-item-title">
                      <Text>Vue</Text>
                    </View>
                    <View className="sort-list-item-desc">
                      <Text>123个题目 · 94 个关注</Text>
                    </View>
                  </View>
                  <View>
                    {index % 2 === 0 ? (
                      <Text className="sort-list-item-right-btn">已关注</Text>
                    ) : (
                      <Text className="sort-list-item-right-btn">+ 关注</Text>
                    )}
                  </View>
                </View>
              </View>
            )
          })
        )}
      </View>
    )
  }
}
