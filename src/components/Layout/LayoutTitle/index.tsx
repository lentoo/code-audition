import './index.scss'
import { View, Text } from '@tarojs/components'

export type LayoutTitleOption = {
  /**
   * @description 标题
   * @type {string}
   */
  title: string
  /**
   * @description 子组件
   * @type {JSX.Element}
   */
  children?: JSX.Element
}
export default function LayoutTitle(props: LayoutTitleOption) {
  const { title, children } = props
  return (
    <View className="layout-title">
      <Text className="layout-title-text">{title}</Text>
      {children && children}
    </View>
  )
}
LayoutTitle.defaultProps = {
  title: '标题'
}
