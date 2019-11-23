import { getUserNotify } from "@/data-source/notification/index.data";
import { UserNotify } from "./entities/UserNotify";

export default class NotificationService {
  public static getUserNotify(uid: string): Promise<UserNotify[]> {
    return getUserNotify(uid).then(res => res.getUserNotify);
  }
}
