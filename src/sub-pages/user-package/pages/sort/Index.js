import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtSearchBar } from 'taro-ui'
import Loading from '@/components/Loading/Loading'
import { SortService } from '../services'
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
  async onPullDownRefresh() {
    Taro.vibrateLong()
    await this.onLoadData(true)
    Taro.stopPullDownRefresh()
  }
  constructor(...props) {
    super(...props)
    this.state = {
      sortList: [],
      searchValue: '',
      loading: false,
      loadingFinished: false
    }
    this.page = 1
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
    this.page++
    await this.onLoadData()
  }
  onSearchBarValueChange = value => {
    this.setState({
      searchValue: value
    })
  }
  onSearchBarActionClick = () => {
    this.page = 1
    this.setState(
      {
        loadingFinished: false
      },
      () => {
        this.onLoadData(true)
      }
    )
  }
  async onLoadData(clear = false) {
    console.log('data', this.state.loadingFinished)
    if (this.state.loadingFinished) return
    const { data, page } = await SortService.getSortList(
      this.state.searchValue,
      this.page
    )
    console.log('data', data)
    this.setState(prevState => {
      const sortList = clear ? data : [...prevState.sortList, ...data]
      return {
        sortList
      }
    })
    if (page.pages === this.page) {
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
  render() {
    const { loading, loadingFinished } = this.state
    return (
      <View className="sort">
        <View className="title">
          <Text>分类</Text>
          <AtSearchBar
            onActionClick={this.onSearchBarActionClick}
            value={this.state.searchValue}
            onChange={this.onSearchBarValueChange}
            onClear={() => {
              this.setState(
                {
                  searchValue: ''
                },
                this.onSearchBarActionClick
              )
            }}
          />
        </View>
        {this.renderSortList()}
        {loading && (
          <Loading finished={loadingFinished} noMoreText="已全部加载完成！" />
        )}
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
              <View key={item.id} className="sort-list-item">
                <View className="sort-list-item-left">
                  <Image className="sort-list-item-left-img" src={item.icon} />
                </View>
                <View className="sort-list-item-right">
                  <View className="sort-list-item-right-info">
                    <View className="sort-list-item-title">
                      <Text>{item.sortName}</Text>
                    </View>
                    <View className="sort-list-item-desc">
                      <Text>123个题目 · 94 个关注</Text>
                    </View>
                  </View>
                  <View>
                    {item.select === 1 ? (
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
