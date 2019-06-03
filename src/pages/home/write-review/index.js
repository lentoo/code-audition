import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTextarea, AtIcon } from 'taro-ui';
import { set as setGlobalData } from '@/utils/global-data';
import './index.scss'
import { postAnswer } from '../../../api/home';
/**
 * @description 写评论页面
 * @author lentoo
 * @date 2019-05-21
 * @export
 * @class WriteReview
 * @extends {Taro.Component}
 */
export default class WriteReview extends Taro.Component {
  config = {
    navigationBarTitleText: '码上面试'
  }
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      keyboardHeight: 0
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillMount() {
    this.setPageTitle()
  }
  /**
   * @description 设置页面标题为题目标题
   * @author lentoo
   * @date 2019-05-21
   * @memberof WriteReview
   */
  setPageTitle() {
    Taro.setNavigationBarTitle({
      title: this.$router.params.title
    })
  }
  
  /**
   * @description 点击完成时触发
   * @author lentoo
   * @date 2019-05-21
   * @memberof WriteReview
   */
  onConfirm() {
    console.log('onConfirm')
    this.onSubmit()
  }
  /**
   * @description 提交评论
   * @author lentoo
   * @date 2019-05-21
   * @memberof WriteReview
   */
  async onSubmit() {
    const { value } = this.state
    const { id, userId } = this.$router.params
    const params = {
      id,
      commentOfhtml: value,
    }
    if (userId) {
      params.targetUserId = userId
    }
    Taro.showLoading({
      title: '正在提交中'
    })
    try {
      const res = await postAnswer(params)
      Taro.showToast({
        title: '提交成功',
        icon: 'success'
      }).then(() => {
        setGlobalData('write-review', true)
        Taro.navigateBack()

      })      
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    } finally {
      Taro.hideLoading()
    }
  }
  render() {
    const { nickName } = this.$router.params
    return (
      <View className='write-review'>
        <View className='tips'>
          {/* <View> */}
            <AtIcon className='icon-tags' size='18' color='#606266' value='bookmark'></AtIcon>
            <Text>有理有据的答案，更容易让人信服~</Text>
          {/* </View> */}
        </View>

        {
          nickName && (
            <View className='reply'>
              <Text>@ {nickName}</Text>
            </View>
          )
        }
        <AtTextarea
          value={this.state.value}
          onChange={e => {
            this.setState({
              value: e.target.value
            })
          }}
          autoFocus
          maxLength={0}
          showConfirmBar
          count={false}
          onConfirm={this.onConfirm}
          height={500}
          placeholder={nickName ? '填写回复内容' : '填写题目答案'}
        />
        <View className='footer' style={{
          bottom: `${this.state.keyboardHeight}px`
        }}
        >
          {/* <View className='footer-item' onClick={this.onSubmit}>
            <AtIcon value='image' size={20}></AtIcon>
          </View> */}
          <View className='footer-item' onClick={this.onSubmit}>
            <Text>提交</Text>
          </View>
        </View>
      </View>
    );
  }
}
