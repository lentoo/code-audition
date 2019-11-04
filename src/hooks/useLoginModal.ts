import useGlobalData from './useGlobalData'
const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'

export default function useLoginModal() {
  return useGlobalData<boolean>(SHOW_LOGIN_MODAL, false)
}
