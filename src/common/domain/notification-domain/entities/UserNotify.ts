import User from "../../user-domain/entities/user";
import BaseModel from "../../BaseModel";
import Notification from "./Notification";
export class UserNotify extends BaseModel {
  /**
   * @description 已读
   * @type {boolean}
   * @memberof Notification
   */
  isRead: boolean;

  /**
   * @description 通知来源用户
   * @type {User}
   * @memberof Notification
   */
  user: User;
  /**
   * @description 关联的 Notification
   * @type {Notification}
   * @memberof UserNotify
   */
  sourceNotify: Notification;
}
