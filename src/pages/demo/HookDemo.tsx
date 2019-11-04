import Taro, { useState } from '@tarojs/taro'
import { Text, View, Button } from '@tarojs/components'
import useUserinfo from '@/hooks/useUserInfo'
import useLoginModal from '@/hooks/useLoginModal'
import LoginModal from '@/components/LoginModal/LoginModal'
import Child from './Child'
export default function HookDemo ()  {
  const [userinfo, setUserinfo] = useUserinfo()
  // const [ userinfo, setUserinfo ] = useUserinfo()
  // const [ userinfo1 ] = useUserinfo()

  const [ showLoginModal0, setShowLoginModal ] = useLoginModal()
  const [count, setCount] =  useState(0)
  const setUser = () => {
    console.log('setUser');
    setUserinfo({
      nickName: 'nickname1111',
      gender: 'gender1111',
      avatarUrl: 'avatarUrl1111',
      attentionCount: 0,
      fansCount: 0,
      isAttention: true
    })
  }
  const setState = () => {
    setShowLoginModal(prev => !prev)
    setCount(prev => prev+1)
  }
  return (
    <View>
      <Text>{HookDemo}</Text>
      <View>
        <Text>UserContext</Text>
        <View>
          <View>
            {userinfo && <Text>{userinfo.nickName}</Text>}
          </View>
{/* 
          <View>
            {userinfo1 && <Text>{userinfo1.nickName}</Text>}
          </View> */}

          <View>
            <Text>
              {
                showLoginModal0
              }
            </Text>
          </View>
           {
             count < 5 && <Child />
           } 
        </View>
        <View>
          <Button onClick={setUser}>
            set UserInfo
          </Button>

          <Button onClick={setState}>
            set showLoginModal
          </Button>
        </View>
      </View>
      {/* {
        !userinfo && <LoginModal open={showLoginModal0} cancelClick={() => setShowLoginModal(false)} successClick={() => setShowLoginModal(true)}></LoginModal>
      } */}
    </View>
  )
}