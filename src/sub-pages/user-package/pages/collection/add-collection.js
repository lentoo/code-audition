import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './add-collection.scss'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { addCollection } from '../../../../api/user'

/**
 * @description 添加收藏集
 * @author lentoo
 * @date 2019-06-05
 * @export
 * @class AddCollection
 * @extends {Taro.Component}
 */
export default class AddCollection extends Taro.Component {
  config = {
    navigationBarTitleText: '添加收藏集'
  }
  constructor() {
    super(...arguments)
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const isEdit = this.$router.params.edit
    isEdit &&
      Taro.setNavigationBarTitle({
        title: '修改标题'
      })
  }
  handleChange(value) {
    this.setState({
      name: value
    })
  }
  /**
   * @description 提交数据
   * @author lentoo
   * @date 2019-06-05
   * @memberof AddCollection
   */
  async handleClick() {
    Taro.showLoading({
      title: '正在提交中...'
    })
    try {
      await addCollection({
        name: this.state.name
      })
      Taro.navigateBack()
    } catch (error) {
      console.log('error', error)
    } finally {
      Taro.hideLoading()
    }
  }
  render() {
    return (
      <View className="add-collection">
        <AtForm>
          <AtInput
            type="text"
            placeholder="名称"
            border={false}
            value={this.state.name}
            onChange={this.handleChange}
            clear
          />
        </AtForm>
        <View className="btn-wrapper">
          <AtButton onClick={this.handleClick} type="primary">
            创建
          </AtButton>
        </View>
      </View>
    )
  }
}
