import Taro, { useCallback } from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components"
import {  AtButton, AtIcon } from "taro-ui"
import './index.scss'
import UserService from "@/domain/user-domain/user.service";
import useUserInfo from "@/hooks/useUserInfo"
import {
  set as setGlobalData,
  get as getGlobalData
} from "@/utils/global-data";
import { USER_INFO, APP_ID , ICON_PREFIX_CLASS} from "@/constants/common";
import User from "@/domain/user-domain/entities/user";
import { AppId } from "@/types";

const LoginPage = () => {
  const [ _, setUserInfo ] = useUserInfo()

  const back = useCallback(() => {
    Taro.navigateBack()
  }, [])
  const onGetUserInfo = useCallback(async res => {
    const appid = getGlobalData(APP_ID) as AppId;

    const onLogin = async (u: User) => {
      try {
        u.openId = appid.openid;
        const response = await UserService.login(u);

        Taro.setStorage({
          key: "token",
          data: response.data
        });

        setGlobalData("token", response.data);
      } catch (error) {
        Taro.showToast({
          title: "登陆异常",
          icon: "none"
        });
      }
    };

    Taro.showLoading();

    const u = new User();
    const getUser = res.detail.userInfo;

    Object.assign(u, getUser);
    u.openId = appid.openid;

    await UserService.addUserInfo(u);

    await onLogin(u);

    const loginUser = await UserService.findLoginUserInfo();

    setUserInfo(loginUser);

    if (Taro.getStorageSync(USER_INFO)) {
      Taro.hideLoading();
    } else {
      Taro.setStorage({
        key: USER_INFO,
        data: loginUser
      });
      Taro.hideLoading();
    }
    Taro.navigateBack()
  }, []);

  return (
    <View className='login flex-col ali-c'>
      <View className='login-wrapper flex-col'>
        <View className='icon-wrapper'>
            <AtIcon prefixClass={ICON_PREFIX_CLASS} value='huanyingye' size='100' color='#fff'></AtIcon>
          </View>
        <View className='text-wrapper'>
          <View className='text-c cfff f14'>
            <Text>欢迎使用码上面试</Text>
          </View>
          <View className='text-c cfff f14'>
            <Text>欢迎使用码上面试小程序</Text>
          </View>
        </View>
        <View className='btn-wrapper'>
          <View>
            <AtButton className="login-btn" openType="getUserInfo" onGetUserInfo={onGetUserInfo}>登录</AtButton>
          </View>
          <View className='text-c mt20'>
            <Text className='cfff f14' onClick={back}>返回</Text>
          </View>

        </View>
      </View>
      <View className="bubble">
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
        <View className='i'></View>
      </View>
    </View>
  )
}
LoginPage.config = {
  navigationStyle: 'custom',
}
export default LoginPage
