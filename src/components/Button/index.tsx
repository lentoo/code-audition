import { View, Text } from "@tarojs/components"
import classnames from 'classnames'
import './index.scss'

export interface CodeButtonProp {
  type: 'primary' | 'info' | 'danger',
  onClick?: () => void
  children?: JSX.Element
}

const CodeButton = (prop: CodeButtonProp) => {
  return (
    <View className="code-btn-wrapper">
      <View
        className={classnames("code-btn", `code-btn-${prop.type}`)}
        onClick={prop.onClick}>
        {prop.children}
      </View>
      
    </View>
  )
}
export default CodeButton
