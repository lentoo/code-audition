import User from '@/domain/user-domain/entities/user'
import { useDispatch, useSelector } from '@tarojs/redux'
import { SET_USER } from '@/constants/userinfo'

export default function useUserInfo(): [User | null, (u: User | null) => void] {
  const dispatch = useDispatch()
  const { userinfo } = useSelector((state: any) => state.userinfo)
  const setUserInfo = (user: User) => {
    dispatch({ type: SET_USER, payload: user })
  }
  return [userinfo, setUserInfo]
}
