import ISerializer from 'models/pipeline/backend/serializer';
import { noti } from 'models/pipeline/backend/serializer/notification/notification';
import { INotification, Notification, NotificationType } from 'models/notification';


export default class NotiProtoBufSerializer implements ISerializer {
    public serialize(item: INotification | Notification): Uint8Array {
        throw Error('not implement');
    }

    public deserialize(data: Uint8Array): Notification {
        const deserialized: noti.Notification = noti.Notification.decode(data);
        return Notification.fromObject({
            ...deserialized,
            notificationType: NotiProtoBufSerializer.transformType(deserialized.notificationType) });
    }

    private static transformType(type: noti.Notification.NotiType): NotificationType {
        switch (type) {
            case noti.Notification.NotiType.N_FRIEND_ADD_APPLICATION:
                return NotificationType.N_FRIEND_ADD_APPLICATION;
            case noti.Notification.NotiType.N_FRIEND_ADD_RESULT:
                return NotificationType.N_FRIEND_ADD_RESULT;
            case noti.Notification.NotiType.N_FRIEND_DELETE_RESULT:
                return NotificationType.N_FRIEND_DELETE_RESULT;
            case noti.Notification.NotiType.N_GROUP_JOIN_APPLICATION:
                return NotificationType.N_GROUP_JOIN_APPLICATION;
            case noti.Notification.NotiType.N_GROUP_JOIN_RESULT:
                return NotificationType.N_GROUP_JOIN_RESULT;
            case noti.Notification.NotiType.N_GROUP_KICKOFF_RESULT:
                return NotificationType.N_GROUP_KICKOFF_RESULT;
            case noti.Notification.NotiType.N_GROUP_WITHDRAW_RESULT:
                return NotificationType.N_GROUP_WITHDRAW_RESULT;
        }
    }
}