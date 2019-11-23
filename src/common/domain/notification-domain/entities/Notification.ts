import BaseModel from "../../BaseModel";
import Question from "../../question-domain/entities/Question";
import Idea from "../../question-domain/entities/Idea";
import User from "../../user-domain/entities/user";

export enum NotificationType {
  /**
   * 普通通知
   */
  Message = "1",
  /**
   * 系统消息
   */
  System = "0"
}
export enum ActionType {
  /**
   * 关注用户
   */
  FollowUser = "FollowUserInfo",
  /**
   * 回复Idea
   */
  ReplyIdea = "ReplyIdea",
  /**
   * 写Idea
   */
  Idea = "Idea"
}

export default interface Notification extends BaseModel {
  /**
   * @description 消息类型
   * @type {NotificationType}
   * @memberof Notification
   */
  notificationType: NotificationType;

  /**
   * @description 目标 _id
   * @type {string}
   * @memberof Notification
   */
  target?: string;
  /**
   * @description 对题目进行评论
   * @type {Question}
   * @memberof Notification
   */
  targetQuestion?: Question;

  targetIdea?: Idea;

  targetUser?: User;

  /**
   * @description 行为类型
   * @type {ActionType}
   * @memberof Notification
   */

  actionType?: ActionType;
  /**
   * @description 目标用户
   * @type {User}
   * @memberof Notification
   */

  receiveUser?: User;
  /**
   * @description 通知来源用户
   * @type {User}
   * @memberof Notification
   */

  sendUser?: User;
  /**
   * @description 内容
   * @type {string}
   * @memberof Notification
   */

  content: string;
}
