import Taro from '@tarojs/taro';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import { AtInput, AtFab, AtButton, AtLoadMore } from 'taro-ui';
import { connect } from '@tarojs/redux';
import * as publishActions from '@/actions/publish';
import Tag from '@/components/cd-tag'
import { Utils } from '@/utils'
import './choose-category.scss'

import { searchCategory, submitQuestion } from '../../../../api/question';

@connect(
  state => ({publish: state.publish}),
  {
    ...publishActions
  }
)
class ChooseCategory extends Taro.Component {
  config = {
    navigationBarTitleText: '选择分类',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  }
  constructor(params) {
    super(params)
    this.page = 1
    this.loadCategory = Utils.debounce(this.loadCategory.bind(this), 500)
    this.handleClick = this.handleClick.bind(this)
    this.scrollHeight = Taro.getSystemInfoSync().windowHeight - 110 + 'px'
  }
  state = {
    name: '',
    sortList: [],
    loading: false,
    selectedCategories: []
  }
  componentDidMount () {
    console.log(this.scrollHeight)
  }
  /**
   * @description 点击发布按钮
   * @author lentoo
   * @date 2019-05-14
   * @memberof ChooseCategory
   */
  handleClick () {
    if (this.state.selectedCategories.length === 0) {
      Taro.showToast({
        title: '请选择分类',
        icon: 'none'
      })
      return
    }
    let { dispatchPublishItem } = this.props
    const publishItem = {
      ...this.props.publish.publishItem,
      sort: this.state.selectedCategories.map(item => item.id)
    }
    dispatchPublishItem(publishItem)
    this.handleSubmit()
  }
  /**
   * @description 提交投稿
   * @memberof ChooseCategory
   */
  handleSubmit = () => {
    Taro.showLoading({
      title: '正在提交中...'
    })
    submitQuestion({
      ...this.props.publish.publishItem
    }).then(res => {
      console.log('res', res);
      Taro.hideToast()
      Taro.navigateTo({
        url: '/pages/publish/open-question/submit-success'
      })
    })
  }
  handleChange(value) {
    this.setState({
      name: value
    })
    this.loadCategory()
  }
  /**
   * @description 滚动到底部的时候触发
   * @memberof ChooseCategory
   */
  onScrollToLower = () => {
    this.loadCategory()
  }
  /**
   * @description 请求分类数据
   * @memberof ChooseCategory
   */
  loadCategory = () => {
    if (this.state.name.trim() === '') {
      this.setState({
        sortList: [],
      })
      return
    }
    this.setState({
      loading: true
    })
    searchCategory({
      sortName: this.state.name,
      page: this.page
    }).then(res => {

      res.data.length > 0 && this.page++
      this.setState({
        sortList: [...this.state.sortList, ...res.data],
        loading: false
      })
    })
  }
  selectCategory = category => {

    const { selectedCategories } = this.state
    if (selectedCategories.length === 5) {
      Taro.showToast({
        icon: 'none',
        title: '最多选择5个分类'
      })
      return
    }
    selectedCategories.push(category)
    this.setState({
      selectedCategories
    })

  }
  removeCategory = category => {
    const { selectedCategories } = this.state
    this.setState({
      selectedCategories: selectedCategories.filter(item => item.id !== category.id)
    })
  }
  render() {
    const { sortList, loading, selectedCategories } = this.state
    return (
      <View className='choose-category'>
        <View>
          <AtInput
            placeholderClass='placeholder'
            className='title-input'
            onChange={this.handleChange}
            value={this.state.name}
            placeholder='分类名称'
          ></AtInput>
        </View>

        <View className='tags'>
          <ScrollView
            scrollX
            style={{
              width: '100vw'
            }}
          >
            <View className='tags-wrapper'>
              {
                selectedCategories.length === 0 && (
                  <Text className='tag-placeholder'>
                    可以添加5个分类
                  </Text>
                )
              }
              {
                selectedCategories.length && selectedCategories.map( item => (
                    <Tag
                      key={item.id}
                      onClick={this.removeCategory.bind(this, item)}
                      className='tag'
                      type='primary'
                      active
                    >{item.sortName}</Tag>
                  )
                )
              }
            </View>

          </ScrollView>
        </View>

        <View className='category-list-wrapper' ref={node => this.refWrapper = node}>
          <ScrollView
            scrollY
            className='category-list-scroll'
            style={{
              height: this.scrollHeight
            }}
            onScrollToLower={this.onScrollToLower}
          >
            <View className='category-list'>
            {
              sortList.map(item => {
                return (
                  <View className='category-item' key={item.id}>
                    <View className='category-info'>
                      <View className='category-img-box'>
                        <Image className='category-img' src={item.icon}></Image>
                      </View>
                      <View className='category-description'>
                        <View className='category-title'>
                          <Text>{item.sortName}</Text>
                        </View>
                        <View className='category-desc'>
                          <Text>{item.attentionFrequency}人关注 · {item.questionCount}个问题</Text>
                        </View>
                      </View>
                    </View>
                    <View className='category-btns'>
                      {
                        selectedCategories.some(sort => sort.id === item.id)
                        ? (
                            <AtButton customStyle={{ width: '60px'}} size='small' onClick={this.removeCategory.bind(this, item)}>已添加</AtButton>
                        )
                        : (
                            <AtButton customStyle={{ width: '60px'}} type='primary' size='small' onClick={this.selectCategory.bind(this, item)}>添加</AtButton>
                        )
                      }
                    </View>
                  </View>
                )
              })
            }
            {
              loading && (<AtLoadMore status='loading' loadingText='正在加载中...'></AtLoadMore>)
            }
            </View>
          </ScrollView>
        </View>

        <View className='fab-btn'>
          <AtFab onClick={this.handleClick}>
            <Text style={{ fontSize: '16px', lineHeight: `48rpx` }} className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
      </View>
    );
  }
}

export default ChooseCategory
