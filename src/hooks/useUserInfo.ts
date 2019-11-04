import User from '@/domain/user-domain/entities/user'
import { USER_INFO } from '@/constants/common'
import useGlobalData from './useGlobalData'

export default function useUserInfo(): [User | null, (u: User | null) => void] {
  return useGlobalData<User | null>(USER_INFO, null)
}
