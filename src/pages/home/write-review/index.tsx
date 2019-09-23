import Taro, { Config, useRouter, useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTextarea, AtIcon } from 'taro-ui';
import { set as setGlobalData } from '@/utils/global-data';
import './index.scss'
import { QuestionService } from '../services'

const WriteIdea = () => {
  const [value, setValue] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const {
    params: { title, id, tid, nickName }
  } = useRouter() 

  useEffect(() => {
    const t = title
    Taro.setNavigationBarTitle({
      title: t
    })
  }, [])
  const onConfirm = async () => {
    const params: any = {
      qid: id,
      content: `<pre>${value}</pre>`
    }
    if (tid) {
      params.tid = tid
    }
    Taro.showLoading({
      title: '正在提交中'
    })
    try {
      const res = await QuestionService.addIdea(params)
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
  return (
    <View className='write-review'>
        <View className='tips'>
          {/* <View> */}
            <AtIcon className='icon-tags' size='18' color='#606266' value='bookmark'></AtIcon>
            <Text>有理有据的想法，更容易让人信服~</Text>
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
          onChange={(e: any) => {
            setValue(e.target.value)            
          }}
          autoFocus
          maxLength={0}
          showConfirmBar
          count={false}
          onConfirm={onConfirm}
          height={500}
          placeholder={nickName ? '填写回复内容' : '我的想法'}
        />
        <View className='footer' style={{
          bottom: `${keyboardHeight}px`
        }}
        >
          {/* <View className='footer-item' onClick={this.onSubmit}>
            <AtIcon value='image' size={20}></AtIcon>
          </View> */}
          <View className='footer-item' onClick={onConfirm}>
            <Text>提交</Text>
          </View>
        </View>
      </View>
  )
}
export default WriteIdea