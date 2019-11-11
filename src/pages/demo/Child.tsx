import { View, Text, Button } from "@tarojs/components";
import useLoginModal from "@/hooks/useLoginModal";
import useUserInfo from "@/hooks/useUserInfo";

export default function Child () {

  const [ loginModal, setLoginModal ] = useLoginModal()
  const [ userinfo ] = useUserInfo()
  return (
    <View>
      <Text>Child : {loginModal}</Text>
      <View>
        <Text>{userinfo && userinfo.nickName}</Text>
      </View>
      <Button onClick={ () => setLoginModal(true)}>set state</Button>
    </View>
  )
}