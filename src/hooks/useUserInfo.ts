import { useState, useEffect } from '@tarojs/taro'
import { get, set } from '@/utils/global-data'
import User from '@/domain/user-domain/entities/user'
import { USER_INFO } from '@/constants/common'
export default function() {
  const [userinfo, setUserinfo] = useState<User | null>(() => get(USER_INFO))

  useEffect(() => {
    console.log('重新赋值 userinfo', userinfo)
    set(USER_INFO, userinfo)
  }, [userinfo])
  return {
    userinfo,
    setUserinfo
  }
}
