import { useState } from 'react';
import { createModel } from 'hox';
import { INotification, Notification, NotificationType } from 'models/notification';
import { getDB } from 'utils';
import Axios from 'axios';
import { message } from 'antd';
import { IUser } from "../../Service/utils/IUserInfo";
import friendService from "../../Service/friendService";
import groupService from "../../Service/groupService";
import useService, { TABS } from '../../Service'
import useChatService from 'app/ChatBox/service';

export enum NotiStatus {
    UNHANDLED = 1,
    AGREED = 2,
    REFUSED = 3,
    INFO_NOTI = 4,  // Info类的通知，不需要处理
};

export type INoti = INotification & { status: NotiStatus };

// 数据库存储格式
// { userId: Array<INoti> }
const initNotiList = async (userId: string): Promise<Array<INoti>> => {
    const db = await getDB();
    if (!db) return [];

    console.log('user nolist ', userId)
    return new Promise((resolve, reject) => {
        const notiListStore = db.transaction('notiList', 'readwrite').objectStore('notiList');
        const getRequest = notiListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            // console.log('user nolist e',e)
            const res = e.target.result as Array<{ id: string, notis: Array<INoti> }>;
            console.log(res)
            if (res.length === 0) {
                const addRequest = notiListStore.add({ id: userId, notis: [] });
                addRequest.onsuccess = (e: any) => {
                    resolve([]);
                };

                addRequest.onerror = (e: any) => {
                    throw Error('notiList db init error')
                };
            } else {
                res.forEach((item) => {
                    if (item.id == userId) resolve(item.notis)
                })
            }
        }

        getRequest.onerror = (e: any) => {
            resolve([]);
        }
    });
};

const updateNotiListDB = (userId: string, newNotiList: Array<INoti>) => {
    getDB().then((db) => {
        if (db) {
            const notiListStore = db.transaction('notiList', 'readwrite').objectStore('notiList');
            notiListStore.put({ id: userId, notis: newNotiList });
        }
    })
};

export default createModel(() => {
    const [notis, setNotis] = useState<Array<INoti>>([]);
    const [notiLoading, setNotiLoading] = useState(false);
    const { updateFriends } = friendService()
    const { updateGroupList } = groupService()
    const { setNotificationRed, tabBar, setTabBar } = useService();
    const { setSortedMsgList } = useChatService();

    const initNotiModel = (userId: string) => {
        setNotiLoading(true);
        initNotiList(userId).then((res) => {
            setNotis(res);
            setNotiLoading(false);
        });
    }

    const addNoti = (userId: string, notification: Notification) => {
        console.log('addNotification');
        setNotiLoading(true);
        if (tabBar !== TABS.MESSAGE) setNotificationRed(true);
        getDB().then((db) => {
            if (db) {
                const notiStore = db.transaction('notiList', 'readwrite').objectStore('notiList');
                const getRequest = notiStore.get(userId);
                getRequest.onsuccess = ((e: any) => {
                    console.log(e);
                    if (typeof (e.target.result) !== 'undefined') {
                        let newList = e.target.result.notis as Array<INoti>;
                        let nType;
                        switch (notification.getNotificationType()) {
                            case NotificationType.N_FRIEND_ADD_APPLICATION:
                            case NotificationType.N_GROUP_JOIN_APPLICATION:
                                nType = NotiStatus.UNHANDLED;
                                break;
                            case NotificationType.N_FRIEND_ADD_RESULT:
                            case NotificationType.N_FRIEND_DELETE_RESULT: {
                                const friendId = notification.getSender();
                                nType = NotiStatus.INFO_NOTI;
                                getDB().then((db) => {
                                    if (db) {
                                        const msgStore = db.transaction('msgList', 'readwrite').objectStore('msgList');
                                        msgStore.delete(friendId);

                                        setTabBar(TABS.EMPTY);
                                        setSortedMsgList(prev => {
                                            const index = prev.indexOf(friendId);
                                            const newList = [...prev];
                                            if (index !== -1) {
                                                newList.splice(index, 1);
                                            }
                                            return newList;
                                        });

                                        updateFriends(userId);
                                    }
                                });
                                break;
                            }

                            case NotificationType.N_GROUP_JOIN_RESULT:
                            case NotificationType.N_GROUP_KICKOFF_RESULT:
                            case NotificationType.N_GROUP_WITHDRAW_RESULT:
                            case NotificationType.N_GROUP_DELETE:
                                updateGroupList(userId)
                                nType = NotiStatus.INFO_NOTI;
                        }
                        newList.push({
                            content: notification.getContent(),
                            createAt: notification.getCreateAt(),
                            notificationType: notification.getNotificationType(),
                            receiver: notification.getReceiver(),
                            sender: notification.getSender(),
                            status: nType
                        });
                        setNotis(newList);
                        updateNotiListDB(userId, newList);
                        setNotiLoading(false)
                    } else {
                        throw Error('get notiList undefined');
                    }
                })
            }
        })
    };


    const agreeNoti = (index: number, user: IUser, ID?: string) => {
        console.log('agree');
        setNotiLoading(true);
        const type = notis[index].notificationType;

        const successToUpDataDb = (flag: boolean) => {
            if (flag) {
                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.AGREED };
                updateNotiListDB(user.userId, newNotiList);
                updateFriends(user.userId)
                setNotis(newNotiList);
                setNotiLoading(false);
            } else {
                message.error("后端错误")
                setNotiLoading(false);
            }
        }

        switch (type) {
            case NotificationType.N_FRIEND_ADD_APPLICATION: {
                if (!ID || ID === "") {
                    break;
                }
                console.log('sending friend userId', user.userId, ID)
                Axios.patch('friend/application', {
                    user_id: user.userId,
                    friend_id: ID,
                    f_name: user.nickname,
                    state: true
                }).then(res => {
                    console.log('res is :', res)
                    successToUpDataDb(res.data['success']);
                });
                break;
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                if (!ID || ID === "") {
                    break;
                }
                const rcvID = notis[index].sender;
                Axios.patch('group/' + ID + "/participation",
                    { user_id: rcvID, state: "yes" }).then(
                        (res) => {
                            successToUpDataDb(res.data['success']);
                        })
                break;
            }
            default:
                throw Error('info noti');
        }
    };

    const refuseNoti = (index: number, user: IUser, ID?: any) => {
        console.log('refuse');
        setNotiLoading(true);
        const type = notis[index].notificationType;

        const successToUpDataDb = (flag: boolean) => {
            if (flag) {
                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.AGREED };
                updateNotiListDB(user.userId, newNotiList);
                setNotis(newNotiList);
                setNotiLoading(false);
            } else {
                message.error("后端错误")
                setNotiLoading(false);
            }
        }

        switch (type) {
            case NotificationType.N_FRIEND_ADD_APPLICATION: {
                if (!ID || ID === "") {
                    break;
                }
                Axios.patch('friend/application', {
                    user_id: user.userId,
                    friend_id: ID,
                    f_name: user.nickname,
                    state: false
                }).then(res => {
                    successToUpDataDb(res.data['success']);
                });
                break;
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                if (!ID || ID === "") {
                    break;
                }
                Axios.patch('group/' + ID + "participation", { user_id: user.userId, state: "no" }).then((res) => {
                    successToUpDataDb(res.data['success']);
                })
                break;
            }
            default:
                throw Error('info noti');
        }
    }

    return { notis, notiLoading, addNoti, agreeNoti, refuseNoti, initNotiModel };
});
