import { View } from "@tarojs/components"
import classnames from 'classnames'
import './index.scss'

export interface CodeButtonProp {
  type: 'primary' | 'info' | 'danger' | 'main',
  size?: 'small' | 'normal' | 'large'
  onClick?: () => void
  children?: JSX.Element
}

const CodeButton = (prop: CodeButtonProp) => {
  return (
    <View className="code-btn-wrapper">
      <View
        className={classnames("code-btn", `code-btn-${prop.type}`, `code-btn-${prop.size}`)}
        onClick={prop.onClick}>
        {prop.children}
      </View>
      
    </View>
  )
}
CodeButton.defaultProps = {
  size: 'small'
}
export default CodeButton
