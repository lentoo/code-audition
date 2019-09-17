import Taro, { Config } from '@tarojs/taro'
import TaroSkeleton from 'taro-skeleton'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { LoadingComponent } from '@/components/Loading/Loading'
import { ArrayLen } from '@/utils'
import classnames from 'classnames'


import Sort from '../../../../common/domain/sort-domain/entities/Sort'
import './index.scss'
import { SortService } from '../services'

type PageState = {
  sortList: Sort[]
  searchValue: string
  loading: boolean
  loadingFinished: boolean
  showActionSheet: boolean
  skeletonLoading: boolean
}

/**
 * @description 分类列表页面
 * @author lentoo
 * @date 2019-08-10
 * @export
 * @class SortView
 * @extends {Taro.Component}
 */
export default class SortView extends Taro.Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  sort = new Sort({})
  page = 1
  sortIndex = -1
  constructor() {
    super()
    this.state = {
      sortList: ArrayLen(5),
      searchValue: '',
      loading: false,
      loadingFinished: false,
      showActionSheet: false,
      skeletonLoading: true
    }
  }


  async onPullDownRefresh() {
    this.page = 1
    Taro.vibrateLong()
    this.setState(
      {
        loadingFinished: false
      },
      async () => {
        await this.onLoadData(true)
        Taro.stopPullDownRefresh()
      }
    )    
  }

  componentDidMount() {
    this.onLoadData(true)
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
    if (this.state.loadingFinished) return
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
    const { items, page } = await SortService.getSortList(
      this.state.searchValue,
      this.page
    )
    this.setState(prevState => {
      const sortList = clear ? items : [...prevState.sortList, ...items]
      return {
        sortList
      }
    })
    this.setState({
      loading: page.hasMore,
      loadingFinished: !page.hasMore,
      skeletonLoading: false
    })
  }
  onBeforeFolow = (sort: Sort, index: number) => {
    this.sort = sort
    this.sortIndex = index
    if (sort.select) {
      this.setState({
        showActionSheet: true
      })
    } else {
      this.onFollow()
    }
  }
  onFollow = async () => {
    try {
      const sort = this.sort
      const index = this.sortIndex
      const { sortList } = this.state
      if (sort.select) {
        await sort.onCancelFollow()
      } else {
        await sort.onFollow()
      }
      this.setState(
        {
          sortList: sortList.map((sort, _index) => {
            if (_index === index) {
              const s = new Sort(sort)
              Object.assign(s, sort)
              s.select = s.select ? 0 : 1
              return s
            }
            return sort
          }),
          showActionSheet: false
        })
    } catch (error) {
      console.log('error', error)
    }
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
        {this.renderActionSheet()}
        <LoadingComponent finished={loadingFinished} noMoreText="已全部加载完成！" />
      </View>
    )
  }
  renderActionSheet () {
    const { showActionSheet } = this.state
    return (<AtActionSheet isOpened={showActionSheet} cancelText='关闭' title='取消关注后将不再收到该分类下的信息'>
      <AtActionSheetItem onClick={this.onFollow} className='cancelActionItem'>
        取消关注
      </AtActionSheetItem>
    </AtActionSheet>)
  }
  renderSortList() {
    const { sortList, skeletonLoading } = this.state
    return (
      <View className="sort-list">
          {sortList.map((item, index) => {
            return (
              <TaroSkeleton key={item._id} loading={skeletonLoading} title row={1} avatar rowWidth='50%' action>
                <View className="sort-list-item">
                  <View className="sort-list-item-left">
                    <Image className="sort-list-item-left-img" src={item.icon!} />
                  </View>
                  <View className="sort-list-item-right">
                    <View className="sort-list-item-right-info">
                      <View className="sort-list-item-title">
                        <Text>{item.sortName}</Text>
                      </View>
                      <View className="sort-list-item-desc">
                        <Text>
                          {item.questionNum} 个题目 · {item.attentionNum} 个关注
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        className={classnames("sort-list-item-right-btn", item.select ? 'is-follow': '')}
                        
                        onClick={() => {
                          this.onBeforeFolow(item, index)
                        }}>
                        {item.select ? '已关注' : '+ 关注'}
                      </Text>
                      
                    </View>
                  </View>
                </View>
              </TaroSkeleton>
            )
          })}
      </View>
    )
  }
}
