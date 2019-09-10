import {
  scanLogin,
  cancelLogin,
  confirmLogin
} from '../../../common/data-source/login/login.data'
import { ActionResponseModel } from '../BaseModel'

export default class LoginService {
  public static scanLogin(
    unicode: string,
    loginToken: string
  ): Promise<ActionResponseModel> {
    return scanLogin(unicode, loginToken).then(({ scanLogin }) => scanLogin)
  }

  public static cancelLogin(unicode: string): Promise<ActionResponseModel> {
    return cancelLogin(unicode).then(({ cancelLogin }) => cancelLogin)
  }

  public static confirmLogin(
    unicode: string,
    token: string
  ): Promise<ActionResponseModel> {
    return confirmLogin(unicode, token).then(({ confirmLogin }) => confirmLogin)
  }
}
