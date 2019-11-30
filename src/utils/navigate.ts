import Taro from "@tarojs/taro";
const userSubPackagePath = "/sub-pages/user-package/pages";
export function navigateToFeedback() {
  Taro.navigateTo({
    url: `${userSubPackagePath}/feedback/index`
  });
}

export function natigateToHome() {
  Taro.redirectTo({
    url: "/pages/home/index"
  });
}
/**
 * @description 导航到分类选择页面
 * @author lentoo
 * @date 2019-09-18
 * @export
 */
export function navigateToSelectSort() {
  Taro.navigateTo({
    url: `${userSubPackagePath}/sort/Index`
  });
}

export function navigateToOtherHone(_id: string) {
  Taro.navigateTo({
    url: "/pages/other-homepage/index?id=" + _id
  });
}
export function navigateToLogin() {
  let url = "/sub-pages/login-package/index";
  Taro.navigateTo({
    url
  });
}
