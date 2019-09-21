import Taro, { useRouter, useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './add-collection.scss'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { CollectionService } from '../services'


const AddCollectionItem = () => {
  const {
    params: { edit, name: titleName, id }
  } = useRouter()
  const isEdit = !!edit
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: isEdit ? '修改标题' : '添加收藏集'
    })
    if (isEdit) {
      setName(titleName)
    }
  }, [])
  const [name, setName] = useState('')
  const handleChange = value => {
    console.log('value', value);
    setName(value)
  }
  const handleClick = async () => {
    try {
      Taro.showLoading({
        title: '正在提交中...'
      })
      if (isEdit) {
        await CollectionService.editTitle(id, name)
      } else {
        await CollectionService.addCollection(name)
      }
      Taro.navigateBack()
    } catch (error) {
      console.log('error', error)
    } finally {
      Taro.hideLoading()
    }
  }

  return (
    <View className="add-collection">
      <AtForm>
        <AtInput
          name=''
          type="text"
          placeholder="名称"
          border={false}
          value={name}
          onChange={handleChange}
          clear
        />
      </AtForm>
      <View className="btn-wrapper">
        <AtButton onClick={handleClick} type="primary">
          {isEdit ? '修改' : '创建'}
        </AtButton>
      </View>
    </View>
  )
}
export default AddCollectionItem
