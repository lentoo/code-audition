import { globalData } from '@/utils/global-data'
import Taro, { useState, useEffect, Events } from '@tarojs/taro'
// type GlobalData = {
//   [key: string]: any
// }
// const globalData: GlobalData = {}

const events = new Events()

export default function useGlobalData<T>(
  key: string,
  value?: T
): [T, (t: Taro.SetStateAction<T>) => void] {
  if (globalData[key] === undefined) {
    globalData[key] = value
  }

  const initValue = globalData[key]
  const [state, setState] = useState<T>(initValue)
  useEffect(() => {
    const handleListener = () => {
      console.log('handleListener')
      setState(globalData[key])
    }

    events.on(key, handleListener)

    return () => {
      console.log('remove handleListener')
      events.off(key, handleListener)
    }
  }, [])
  const proxySetState = dispatch => {
    if (typeof dispatch === 'function') {
      const newState = dispatch.call(null, state)
      globalData[key] = newState
    } else {
      globalData[key] = dispatch
    }
    events.trigger(key)
  }
  return [state, proxySetState]
}
