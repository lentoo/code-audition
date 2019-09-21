import './tag.scss'
import { Text } from '@tarojs/components'
function Tag(props) {
  return (
    <Text className='tag'>{props.children}</Text>
  )
}

export default Tag