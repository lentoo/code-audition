import Taro, { useState, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import LayoutTitle from '@/components/Layout/LayoutTitle'
import './index.scss'
import { LoadingComponent } from '@/components/Loading/Loading'
import { delay } from '@/utils'
import Skeleton from '@/components/Skeleton'
import FocusUserItem from './components/FocusUserItem'
export default class MyFocus extends Taro.Component {
  config: Config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  state = {
    focusList: Array.apply(null, Array(10)).map((item, index) => index),
    loading: false,
    skeletonLoading: true
  }
  async componentDidShow() {
    this.setState({
      loading: true
    })
    await delay(2500)
    this.setState({
      focusList: Array.apply(null, Array(20)).map((item, index) => index),
      loading: false,
      skeletonLoading: false
    })
  }
  onPageScroll(params: any) {
    const scrollTop = params.scrollTop as number
    if (scrollTop > 50) {
      Taro.setNavigationBarTitle({
        title: '我的关注'
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
    await delay(1500)
    const newFocusList = [...this.state.focusList, ...new Array(10).fill(2)]
    this.setState({
        focusList: newFocusList
    })
  }
  renderFocusList() {
    const { focusList, loading, skeletonLoading } = this.state
    return (
      <View className="focus-list">
        {focusList.map((item, index) => {
          return (
            <Skeleton
              avatar
              title
              row={1}
              key={'key' + (item + index)}
              rowWidth="50%"
              action
              loading={skeletonLoading}>
              <FocusUserItem />
            </Skeleton>
          )
        })}
        {loading && !skeletonLoading && <LoadingComponent />}
      </View>
    )
  }
  render() {
    return (
      <View>
        <LayoutTitle title="我的关注">
          <View style={{ textAlign: 'right' }}>
            <AtButton
              circle
              size="small"
              type="primary"
              onClick={() => {
                Taro.navigateTo({
                  url: './AddFocusUserItem'
                })
              }}>
              添加关注
            </AtButton>
          </View>
        </LayoutTitle>
        {this.renderFocusList()}
      </View>
    )
  }
}
