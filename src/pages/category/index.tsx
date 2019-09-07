import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { navigateToFeedback, natigateToHome } from '@/utils/Navigate'
import { AtSearchBar, AtButton } from 'taro-ui'
import './index.scss'
import { Utils } from '../../utils'

import { SortService } from './services'
import Sort from '../../common/domain/sort-domain/entities/Sort'
import User from '../../common/domain/user-domain/entities/user'
import SortItem from './components/SortItem'

type pageState = {
  value: string,
  last: boolean,
  current: number,
  limit: number,
  sortListData: Sort[],
  sortCount: number,
  user: User
}

const itemHeight = 113
class Category extends Component<{}, pageState> {
  config: Config = {
    navigationBarTitleText: '选择分类',
    enablePullDownRefresh: false,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  constructor() {
    super()
    const windowHeight = Utils.getSystemInfoSync().windowHeight
    const maxLength = windowHeight > 800 ? 12 : 9
    this.state = {
      value: '',
      last: false,
      current: 0,
      limit: maxLength,
      sortListData: [],
      sortCount: 0,
      user: new User()
    }
  }
  componentDidMount () {
    this.getSortList()
  }
  onChange(value) {
    this.setState({
      value: value
    })
  }
  /**
   * @description 点击搜一搜
   * @author lentoo
   * @date 2019-05-25
   * @memberof Category
   */
  async onActionClick() {
    Taro.showLoading()
    await this.getSortList()
    this.setState({
      current: 0
    })
    Taro.hideLoading()
  }

  handleChange(event) {
    const current = event.detail.current

    this.setState({
      current,
      last: current === this.state.sortCount
    })
  }
  /**
   * @description 获取分类列表
   * @author lentoo
   * @date 2019-04-17
   * @memberof Category
   */
  async getSortList() {
    Taro.showLoading()
    // TODO: 以后在优化
    const { items, page } = await SortService.getSortList(this.state.value, 1, 10000)
    this.setState(
      {
        sortListData: items,
        sortCount: Math.floor(items.length / this.state.limit)
      },
      Taro.hideLoading
    )
  }
  /**
   * @description 判断是否选中了分类
   * @author lentoo
   * @date 2019-09-08
   * @returns {boolean}
   * @memberof Category
   */
  hasSelectedSort () {
    return this.state.sortListData.some(sort => sort.select)
  }
  async onNext () {
    if (!this.hasSelectedSort()) {
      Taro.showToast({
        title: '请选择一个喜欢的分类',
        icon: 'none'
      })
      return
    }
    natigateToHome()
    
  }

  onSortItemChange = (item: Sort) => {
    const sortListData = this.state.sortListData.map(sort => {
      if (sort._id === item._id) {
        item.select = item.select ? 0 : 1
        return item
      }
      return sort
    })
    item.select ? item.onFollow() : item.onCancelFollow()
    this.setState({
      sortListData
    })
  }
  renderActionView() {
    const { sortCount, last } = this.state
    if (sortCount === 0) {
      return null
    }
    return last ? (
      <View className="not-category-tip">
        <Text>如果没有你喜欢的分类的话，欢迎到</Text>
        <Text className="link" onClick={navigateToFeedback}>
          反馈中心
        </Text>
        <Text>给我们反馈哦</Text>
      </View>
    ) : (
      <Text>左右滑动查看更多</Text>
    )
  }
  renderCategoryPage () {
    const { current, sortListData, value, limit } = this.state
    const changeArrray = Utils.changeArray(sortListData, limit)
    return (
      <View>
          <View>
            <View className="title">
              <Text>请选择你喜欢的分类</Text>
            </View>
            <View className="search-bar">
              <AtSearchBar
                className="cd-search-bar"
                actionName="搜一下"
                value={value}
                onActionClick={this.onActionClick.bind(this)}
                onChange={this.onChange.bind(this)}
                onClear={() => {
                  this.setState(
                    {
                      value: ''
                    },
                    this.onActionClick.bind(this)
                  )
                }}
              />
            </View>
          </View>
          <View>
            <Swiper
              onChange={this.handleChange.bind(this)}
              skipHiddenItemLayout
              nextMargin="40"
              style={{
                height: Taro.pxTransform(itemHeight * 2 * (limit / 3))
              }}
              current={current}>
              {changeArrray.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <View className='flex-row flex-wrap'>
                      {
                        item.map((sort: Sort) => {
                          return <View key={sort._id} className='sort-item'><SortItem item={sort} onChange={this.onSortItemChange}></SortItem></View>
                        })
                      }
                    </View>
                  </SwiperItem>
                )
              })}
            </Swiper>
          </View>
          <View>

        </View>
          <View className="tips">{this.renderActionView()}</View>

          <View className="next">
            <AtButton
              type="secondary"
              openType="getUserInfo"
              onGetUserInfo={this.onNext.bind(this)}>
              选择好了，开始刷题
            </AtButton>
          </View>
        </View>
    )
  }

  render() {
    return (
      <View className="category">
        {
          this.renderCategoryPage()
        }
      </View>
    )
  }
}
export default Category
