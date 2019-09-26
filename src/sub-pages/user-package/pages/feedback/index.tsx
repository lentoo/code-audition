import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import { AtImagePicker, AtButton } from 'taro-ui'
import { FeedbackType } from '@/domain/feedback-domain/entities'
import classnames from 'classnames'
import { FeedbackService } from '../services'
import './index.scss'

interface FileItem {
  path: string

  size: number
}

interface File {
  url: string

  file?: FileItem
}

const FeedbackPage = () => {

  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [activeFeedBack, setActiveFeedBack] = useState(FeedbackType.IDEA)

  const [successStatus, setSuccessStatus] = useState(false)

  const feedbackTypes = [
    {
      name: '提意见',
      value: FeedbackType.IDEA,
      placeholder: '请在这里输入您的意见'
    },
    {
      name: '有bug',
      value: FeedbackType.BUG,
      placeholder: '没有bug的程序不是好程序'
    },
    {
      name: '吐槽',
      value: FeedbackType.MAKE_COMPLAINTS,
      placeholder: '有事没事吐槽一下'
    }
  ]
  useEffect(() => {
    setSuccessStatus(false)
  }, [content, files])

  const submitFeedback = async () => {
    
    if (content.trim() === '') {
      Taro.showToast({
        title: '给点意见咯!',
        icon: 'none'
      })
      return
    }
    Taro.showLoading({
      title: '图片上传中...'
    })
    const imgUrls = await Promise.all(
      files.map(file => {
        return Taro.uploadFile({
          filePath: file.url,
          url: 'https://ccode.live/api/upload',
          name: 'file'
        }).then(res => {
          const url = JSON.parse(res.data).data.url
          return url
        })
      })
    )
    Taro.showLoading({
      mask: true,
      title: '正在提交中...'
    })
    await FeedbackService.addFeedbackItem(content, activeFeedBack, imgUrls)
    Taro.showToast({
      title: '提交成功',
      icon: 'success'
    })
    setSuccessStatus(true)
  }
  const onChange = (files: File[]) => {
    setFiles(files)
  }
  const onImageClick = (index, file) => {
    Taro.previewImage({
      urls: files.map(item => item.url),
      current: file.url
    })
  }
  return (
    <View className="feedback">
      <View className="feedback-wrapper">
        <View className="feedback-types">
          {feedbackTypes.map(type => {
            return (
              <View
                className="feedback-type"
                key={type.value}
                onClick={() => {
                  setActiveFeedBack(type.value)
                }}>
                <View
                  className={classnames('feedback-type_btn', {
                    'active': activeFeedBack === type.value
                  })}>
                  <Text className="feedback-type_btn_text">{type.name}</Text>
                </View>
              </View>
            )
          })}
        </View>
        <View className="feedback-images">
          <AtImagePicker
            multiple
            files={files}
            count={3}
            onChange={onChange}
            onImageClick={onImageClick}
          />
        </View>
        <View className="feedback-input-wrapper">
          <Textarea
            value={content}
            onInput={e => {
              setContent(e.detail.value)
            }}
            className="feedback-input"
            maxlength={100}
            autoHeight
            placeholder={
              feedbackTypes.find(
                type => type.value === activeFeedBack
              )!.placeholder
            }
          />
          <View className="feedback-input-count">
            <Text className='feedback-input-count-text'>
              { successStatus ? '已提交成功，感谢你的反馈！' : ''}
              
            </Text>
            <Text className='feedback-input-count-text'>{content.length} /100</Text>
          </View>
        </View>

        <View className="feedback-submit-wrapper">
          <AtButton type="secondary" onClick={submitFeedback}>
            提交
          </AtButton>
        </View>
      </View>
    </View>
  )
}
FeedbackPage.config = {
  navigationBarTitleText: '反馈'
}
export default FeedbackPage
