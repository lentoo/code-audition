import Taro from '@tarojs/taro'
import { View, ScrollView, Text, Image, Canvas } from '@tarojs/components'
import { AtInput, AtFab, AtButton, AtLoadMore } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as publishActions from '@/actions/publish'
import Tag from '@/components/cd-tag'
import { Utils } from '@/utils'
import './choose-category.scss'

import { uploadFile } from '@/utils/request'
const searchCategory =  () => {} 
const submitQuestion = () => {}
@connect(
  state => ({ publish: state.publish }),
  {
    ...publishActions
  }
)
class ChooseCategory extends Taro.Component {
  config = {
    navigationBarTitleText: '选择分类',
    enablePullDownRefresh: false,
    backgroundTextStyle: 'dark'
  }
  constructor(...props) {
    super(...props)
    this.page = 1
    this.canvasImgPath = ''
    // this.loadCategory = Utils.debounce(this.loadCategory.bind(this), 500)
    this.state = {
      name: '',
      sortList: [],
      loading: false,
      selectedCategories: [],
      showCanvas: false
    }
    this.loadCategory = Utils.debounce(this.loadCategory.bind(this), 500)
    this.handleClick = this.handleClick.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.removeUnkonwnCategory = this.removeUnkonwnCategory.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.addUnknownCategory = this.addUnknownCategory.bind(this)
    this.scrollHeight = Taro.getSystemInfoSync().windowHeight - 110 + 'px'
  }
  /**
   * @description 点击发布按钮
   * @author lentoo
   * @date 2019-05-14
   * @memberof ChooseCategory
   */
  handleClick() {
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
    const { selectedCategories } = this.state
    Taro.showLoading({
      title: '正在提交中...'
    })
    const unknownCategories = selectedCategories.filter(item => item.unknown)
    console.log('unknownCategories', unknownCategories)
    unknownCategories.map(item => {
      uploadFile(item.icon)
    })
    return
    submitQuestion({
      ...this.props.publish.publishItem
    }).then(res => {
      console.log('res', res)
      Taro.hideToast()
      Taro.navigateTo({
        url: '/pages/user/publish/open-question/submit-success'
      })
    })
  }
  handleChange(value) {
    this.page = 1
    this.setState({
      name: value
    })
    this.loadCategory(true)
  }
  /**
   * @description 滚动到底部的时候触发
   * @memberof ChooseCategory
   */
  onScrollToLower = () => {
    this.loadCategory()
  }
  initCanvas() {
    const { name } = this.state
    if (!name) {
      return
    }
    const context = Taro.createCanvasContext('firstCanvas')
    context.setFillStyle('#007fff')
    context.arc(20, 20, 20, 2 * Math.PI)
    context.fill()
    context.setStrokeStyle('#fff')
    context.setFontSize(20)
    context.setTextAlign('center')
    context.setFillStyle('#fff')
    context.setTextBaseline('middle')
    context.fillText(name.substr(0, 1), 20, 20, 200)
    context.draw(false, () => {
      Taro.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success: res => {
          console.log('success', res)
          this.canvasImgPath = res.tempFilePath
        }
      })
    })
  }
  /**
   * @description 请求分类数据
   * @memberof ChooseCategory
   */
  async loadCategory(reset = false) {
    if (this.state.name.trim() === '') {
      this.setState({
        sortList: []
      })
      return
    }
    this.setState({
      loading: true
    })
    try {
      const res = await searchCategory({
        sortName: this.state.name,
        page: this.page
      })
      if (res.data.length > 0) {
        this.page++
        this.setState({
          showCanvas: false
        })
      } else {
        if (res.page.total === 0) {
          this.setState(
            {
              showCanvas: true
            },
            () => {
              this.initCanvas()
            }
          )
        }
      }
      let sortList = []
      sortList = reset ? res.data : [...this.state.sortList, ...res.data]
      this.setState({
        sortList,
        loading: false
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  selectCategory(category) {
    const { selectedCategories } = this.state
    if (selectedCategories.length === 5) {
      Taro.showToast({
        icon: 'none',
        title: '最多选择5个分类'
      })
      return
    }
    this.setState({
      selectedCategories: [...selectedCategories, category]
    })
  }
  /**
   * @description 删除分类
   * @author lentoo
   * @date 2019-06-05
   * @param {*} category
   * @memberof ChooseCategory
   */
  removeCategory(category) {
    if (category.unknown) {
      this.removeUnkonwnCategory(category.sortName)
      return
    }
    const { selectedCategories } = this.state
    console.log(
      'selectedCategories',
      selectedCategories.filter(item => item.id !== category.id)
    )
    this.setState({
      selectedCategories: selectedCategories.filter(
        item => item.id !== category.id
      )
    })
  }
  /**
   * @description 删除未知分类
   * @author lentoo
   * @date 2019-06-05
   * @param {*} name
   * @memberof ChooseCategory
   */
  removeUnkonwnCategory(name) {
    const { selectedCategories } = this.state
    this.setState({
      selectedCategories: selectedCategories.filter(
        item => item.sortName !== name
      )
    })
  }
  /**
   * @description 添加未知分类
   * @author lentoo
   * @date 2019-06-05
   * @memberof ChooseCategory
   */
  addUnknownCategory() {
    this.setState({
      selectedCategories: [
        ...this.state.selectedCategories,
        {
          sortName: this.state.name,
          questionCount: 0,
          attentionFrequency: 0,
          icon: this.canvasImgPath,
          unknown: true
        }
      ]
    })
  }
  renderCanvasItem() {
    const { name, selectedCategories } = this.state
    return (
      <View className="category-item">
        <View className="category-info">
          <View className="category-img-box">
            <Canvas
              style={{
                width: Taro.pxTransform(80),
                height: Taro.pxTransform(80)
              }}
              canvasId="firstCanvas"
            />
            {/* <Image className='category-img'></Image> */}
          </View>
          <View className="category-description">
            <View className="category-title">
              <Text>{name}</Text>
            </View>
            <View className="category-desc">
              <Text>0人关注 · 0个问题</Text>
            </View>
          </View>
        </View>
        <View className="category-btns">
          {selectedCategories.some(sort => sort.sortName === name) ? (
            <AtButton
              onClick={() => {
                this.removeUnkonwnCategory(name)
              }}
              customStyle={{ width: '60px', fontSize: '12px' }}
              type="primary"
              size="small">
              已添加
            </AtButton>
          ) : (
            <AtButton
              onClick={this.addUnknownCategory}
              customStyle={{ width: '60px', fontSize: '12px' }}
              type="primary"
              size="small">
              添加
            </AtButton>
          )}
        </View>
      </View>
    )
  }
  /**
   * @description 渲染选中的分类
   * @author lentoo
   * @date 2019-06-05
   * @returns
   * @memberof ChooseCategory
   */
  renderSelectedCategories() {
    const { selectedCategories } = this.state
    return (
      <ScrollView
        scrollX
        style={{
          width: '100vw'
        }}>
        <View className="tags-wrapper">
          {selectedCategories.length === 0 ? (
            <Text className="tag-placeholder">可以添加5个分类</Text>
          ) : (
            selectedCategories.map(item => (
              <Tag
                key={item.id}
                onClick={() => {
                  this.removeCategory(item)
                }}
                className="tag"
                type="primary"
                content={item.sortName}
                active
              />
            ))
          )}
        </View>
      </ScrollView>
    )
  }
  render() {
    const {
      sortList,
      loading,
      selectedCategories,
      name,
      showCanvas
    } = this.state
    return (
      <View className="choose-category">
        <View>
          <AtInput
            placeholderClass="placeholder"
            className="title-input"
            onChange={this.handleChange.bind(this)}
            value={name}
            placeholder="分类名称"
            clear
          />
        </View>

        <View className="tags">{this.renderSelectedCategories()}</View>

        <View
          className="category-list-wrapper"
          ref={node => (this.refWrapper = node)}>
          <ScrollView
            scrollY
            className="category-list-scroll"
            style={{
              height: this.scrollHeight
            }}
            onScrollToLower={this.onScrollToLower}>
            <View className="category-list">
              {showCanvas && this.renderCanvasItem()}
              {sortList.map(item => {
                return (
                  <View className="category-item" key={item.id}>
                    <View className="category-info">
                      <View className="category-img-box">
                        <Image className="category-img" src={item.icon} />
                      </View>
                      <View className="category-description">
                        <View className="category-title">
                          <Text>{item.sortName}</Text>
                        </View>
                        <View className="category-desc">
                          <Text>
                            {item.attentionFrequency}人关注 ·{' '}
                            {item.questionCount}个问题
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View className="category-btns">
                      {selectedCategories.some(sort => sort.id === item.id) ? (
                        <AtButton
                          customStyle={{ width: '60px', fontSize: '12px' }}
                          size="small"
                          onClick={() => {
                            this.removeCategory(item)
                          }}>
                          已添加
                        </AtButton>
                      ) : (
                        <AtButton
                          customStyle={{ width: '60px', fontSize: '12px' }}
                          type="primary"
                          size="small"
                          onClick={() => {
                            this.selectCategory(item)
                          }}>
                          添加
                        </AtButton>
                      )}
                    </View>
                  </View>
                )
              })}
              {loading && (
                <AtLoadMore status="loading" loadingText="正在加载中..." />
              )}
            </View>
          </ScrollView>
        </View>

        <View className="fab-btn">
          <AtFab onClick={this.handleClick}>
            <Text
              style={{ fontSize: '16px', lineHeight: `48rpx` }}
              className="at-fab__icon at-icon at-icon-add"
            />
          </AtFab>
        </View>
      </View>
    )
  }
}

export default ChooseCategory
