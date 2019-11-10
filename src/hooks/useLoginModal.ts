import { useDispatch, useSelector } from '@tarojs/redux'
import { ACTION_SHOW_LOGIN_MODAL } from '@/actions/userinfo'

export default function useLoginModal(): [boolean, (state: boolean) => void] {
  const dispatch = useDispatch()
  const { showLoginModal } = useSelector((state: any) => state.userinfo)
  const set = (state: boolean) => {
    dispatch({ type: ACTION_SHOW_LOGIN_MODAL, payload: state })
  }
  return [showLoginModal, set]
}
