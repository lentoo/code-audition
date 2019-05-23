import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';

import * as loginActions from '@/actions/login';
import Grid from './components/grid'
import './index.scss'
import { Storage, Utils } from '../../utils';
import { set as setGlobalData, get as getGlobalData } from '../../utils/global-data';
import { USER_INFO, OPEN_ID, FIRST, SORT_LIST } from '../../constants/common';

const itemHeight = 113
@connect(
  state => ({ login: state.login}),
  {
    ...loginActions
  })
class Category extends Component {
  current = 0
  constructor() {
    const windowHeight = Utils.getSystemInfoSync().windowHeight
    const maxLength = windowHeight > 800 ? 12 : 9
    super(...arguments)
    this.state = {
      first: true,
      value: '',
      current: 0,
      last: false,
      sortList: null,
      limit: maxLength,
      sortListData: [],
      sortCount: -1
    }
  }
  config = {
    navigationBarTitleText: '码上面试',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  }
  componentWillMount () {
    let first = true
    if (Storage.getItemSync(FIRST) === false) {
      this.setState({
        first
      })
    }
    this.getSortList()
  }
  onPullDownRefresh() {
    Taro.vibrateShort()
    this.getSortList().then(() => {
      Taro.stopPullDownRefresh()
    })
  }
  onChange(value) {
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索');
  }
  toFeedbackPage() {
    Taro.navigateTo({
      url: '/pages/user/feedback/index'
    })
  }
  handleChange(event) {

    const current = event.detail.current

    this.setState({

      last: current === this.state.sortCount
    })
  }
  /**
   * @description 比较两个对象是否相等 注意：这是浅比较，只比较第一层
   * @author lentoo
   * @date 2019-04-17
   * @memberof Category
   */
  diffObject(left, right) {
    let result = true
    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)
    if (leftKeys.length !== rightKeys.length) {
      return false
    }
    result = rightKeys.every(field => {
      return left[field].toString() === right[field].toString()
    })
    return result
  }
  /**
   * @description 获取分类列表
   * @author lentoo
   * @date 2019-04-17
   * @memberof Category
   */
  async getSortList () {
    Taro.showLoading({
      title: '正在加载中'
    })
    console.log('limit', this.state.limit)
    // TODO: 以后在优化
    await this.props.dispatchSortList({
      page: 1,
      limit: 10000//this.state.limit // 每次请求两页
    })
    const { sortList } = this.props.login

    setGlobalData(SORT_LIST, sortList)

    this.setState({
      sortList,
      sortListData: sortList.data,
      sortCount: Math.floor(sortList.page.total / this.state.limit),
    })

    Taro.hideLoading()
    console.log('sortList', sortList)
  }
  /**
   * @description 更新用户信息
   * @author lentoo
   * @date 2019-04-17
   * @param {*} userInfo
   * @memberof Category
   */
  async updateUserInfo(userInfo) {
    const { doSaveUserInfo } = this.props
    doSaveUserInfo({
      openId: getGlobalData(OPEN_ID),
      ...userInfo
    }).then(res => {
      console.log('doSaveUserInfo', res)
    })


  }
  async handleGetUserInfo(event) {
    if (this.state.sortListData.filter(sort => Boolean(sort.select)).length === 0) {
      Taro.showToast({
        title: '请选择一个喜欢的分类',
        icon: 'none'
      })
      return
    }
    const userInfo = event.detail.userInfo
    setGlobalData(USER_INFO, userInfo)
    let firstValue = this.state.first
    Taro.showLoading({
      title: '正在加载中...'
    })
    if (firstValue) {
      const { doValidOne } = this.props
      // 是否是第一次进入平台
      const validOne = await doValidOne()
      console.log('validOne', validOne)
      // 是
      if (validOne) {
        Storage.setItemSync(FIRST, false)
        Storage.setItem(USER_INFO, userInfo)
        await this.updateUserInfo(userInfo)
      } else {
        // 否
        firstValue = false
      }
    }
    if (firstValue === false) {
      Storage.setItemSync(FIRST, firstValue)
      const value = await Storage.getItemSync(USER_INFO)
      console.log('value', value)
      if (!value) {
        Storage.setItem(USER_INFO, userInfo)
        await this.updateUserInfo(userInfo)
      } else {
        !this.diffObject(value, userInfo) && await this.updateUserInfo(userInfo)
      }
    }

    await this.saveUserSort()
    Taro.hideLoading()
    // 第一个页面就是分类页
    if (Taro.getCurrentPages().length === 1) {
      Taro.redirectTo({
        url: '/pages/home/index'
      })
    } else {
      // 从其他页面进来分类页
      Taro.navigateBack()
    }
  }
  /**
   * @description 保存用户关注的分类
   * @author lentoo
   * @date 2019-04-17
   * @memberof Category
   */
  async saveUserSort () {
    // 找到选中的分类
    await this.props.dispatchUserSort(
      {
        sortIds: this.state.sortListData.filter(sort => Boolean(sort.select))
        .map(sort => sort.id)
      }
    )
  }

  handleGridChange (item) {
    const sortListData = Object.assign(this.state.sortListData).map(sort => {
      if (sort.id === item.id) {
        return item
      }
      return sort
    })
    console.log(sortListData)
    this.setState({
      sortListData
    })
  }
  render() {
    const data = this.state.sortListData
    const changeArrray = Utils.changeArray(data, this.state.limit)
    const actionView = this.state.last ? (
      <View className='not-category-tip'>
        <Text>如果没有你喜欢的分类的话，欢迎到</Text><Text className='link' onClick={this.toFeedbackPage.bind(this)}>反馈中心</Text><Text>给我们反馈哦</Text>
      </View>
    ) : (
        <Text>左右滑动查看更多</Text>
      )
    return (
      <View className='category'>
        <View>
          <View className='title'>
            <Text>请选择你喜欢的分类</Text>
          </View>
          <View className='search-bar'>
            <AtSearchBar
              className='cd-search-bar'
              actionName='搜一下'
              value={this.state.value}
              onActionClick={this.onActionClick.bind(this)}
              onChange={this.onChange.bind(this)}
            ></AtSearchBar>
          </View>
        </View>
        <View id='grid' className='grid'>
          <Swiper
            onChange={this.handleChange.bind(this)}
            // current={this.state.current}
            // onAnimationFinish={this.changeCategoriesSwiper.bind(this)}
            skipHiddenItemLayout
            style={{
              height: Taro.pxTransform(itemHeight * 2 * (this.state.limit / 3))
            }}
          >
            {
              changeArrray.map(item => {
                return (
                  <SwiperItem key={item}>
                    <View><Grid onChange={this.handleGridChange.bind(this)} data={item}></Grid></View>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </View>
        <View>
          <View className='tips'>
            {actionView}
          </View>

          <View className='next'>
            <AtButton type='secondary' openType='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)}>下一步</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
export default Category
