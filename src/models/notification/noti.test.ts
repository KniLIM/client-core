import { INotification, Notification, NotificationType } from 'models/notification';


describe('notification', () => {
    const notiObj: INotification = {
        sender: '4j6hh3jk23',
        receiver: 'cv8df678e4',
        notificationType: NotificationType.N_FRIEND_ADD_APPLICATION,
        content: 'hello world',
        createAt: '2020-06-07 12:00:00',
    };

    const noti = Notification.fromObject(notiObj);

    test('create from factory', () => {
        expect(noti instanceof Notification).toBeTruthy();
    });

    test('get content', () => {
        expect(noti.getContent()).toBe('hello world');
    });

    test('get property', () => {
        expect(noti.toObj()).toEqual(notiObj);
    });
});
