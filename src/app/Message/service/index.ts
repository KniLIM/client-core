import {useState} from 'react';
import {createModel} from 'hox';
import {INotification, Notification, NotificationType} from 'models/notification';
import {getDB} from 'utils';
import Axios from 'axios';
import {message} from 'antd';
import {IUser} from "../../Service/utils/IUserInfo";

export enum NotiStatus {
    UNHANDLED = 1,
    AGREED = 2,
    REFUSED = 3,
    INFO_NOTI = 4,  // Info类的通知，不需要处理
};

export type INoti = INotification & { status: NotiStatus };

const testNotiList: Array<INoti> = [
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_FRIEND_ADD_APPLICATION,
        content: "A,我是A",
        createAt: "1591153998499",
        status: NotiStatus.UNHANDLED,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_FRIEND_ADD_RESULT,
        content: "yes,B",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_FRIEND_DELETE_RESULT,
        content: "C",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_GROUP_JOIN_APPLICATION,
        content: "D,114宿舍,快让我康康你的身体结不结实,3453890-dgs",
        createAt: "1591153998499",
        status: NotiStatus.UNHANDLED,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_GROUP_JOIN_RESULT,
        content: "no,114宿舍",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_GROUP_WITHDRAW_RESULT,
        content: "E,1919宿舍",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_GROUP_KICKOFF_RESULT,
        content: "下北泽",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    },
    {
        sender: '123456',
        receiver: '654321',
        notificationType: NotificationType.N_GROUP_DELETE,
        content: "王道征途",
        createAt: "1591153998499",
        status: NotiStatus.INFO_NOTI,
    }
];

// 数据库存储格式
// { userId: Array<INoti> }
const initNotiList = async (userId: string): Promise<Array<INoti>> => {
    const db = await getDB();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        const notiListStore = db.transaction('notiList', 'readwrite').objectStore('notiList');
        const getRequest = notiListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const res = e.target.result as Array<{ id: string, notis: Array<INoti> }>;
            if (res.length === 0) {
                const addRequest = notiListStore.add({id: userId, notis:[]});
                addRequest.onsuccess = (e: any) => {
                    resolve([]);
                };

                addRequest.onerror = (e: any) => {
                    throw Error('notiList db init error')
                };
            } else {
                if (res[0].id !== userId) {
                    throw Error('notiList db init error: userId error');
                } else {
                    resolve(res[0].notis);
                }
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
            notiListStore.put({id: userId, notis: newNotiList});
        }
    })
};

export default createModel(() => {
    const [notis, setNotis] = useState<Array<INoti>>([]);
    const [notiLoading, setNotiLoading] = useState(false);

    const initNotiModel = (userId: string) => {
        setNotiLoading(true);
        initNotiList(userId).then((res) => {
            setNotis(res);
            setNotiLoading(false);
        });
    }

    const addNoti = (userId:string,notification: Notification) => {
        console.log('addNotification');
        setNotiLoading(true);
        const newNol = [...notis]
        let nType;
        switch (notification.getNotificationType()) {
            case NotificationType.N_FRIEND_ADD_APPLICATION:
            case NotificationType.N_GROUP_JOIN_APPLICATION:
                nType = NotiStatus.UNHANDLED;
                break;
            case NotificationType.N_FRIEND_ADD_RESULT:
            case NotificationType.N_FRIEND_DELETE_RESULT:
            case NotificationType.N_GROUP_JOIN_RESULT:
            case NotificationType.N_GROUP_KICKOFF_RESULT:
            case NotificationType.N_GROUP_WITHDRAW_RESULT:
            case NotificationType.N_GROUP_DELETE:
                nType = NotiStatus.INFO_NOTI;
        }
        newNol.push({
                content: notification.getContent(),
                createAt: notification.getCreateAt(),
                notificationType: notification.getNotificationType(),
                receiver: notification.getReceiver(),
                sender: notification.getSender(),
                status: nType
        })
        updateNotiListDB(userId, newNol);
        setNotis(newNol);

        setNotiLoading(false)
    };

    const agreeNoti = (index: number, user: IUser, ID?: any) => {
        console.log('agree');
        setNotiLoading(true);
        const type = notis[index].notificationType;

        const successToUpDataDb = (flag: boolean) => {
            if (flag) {
                const newNotiList = [...notis];
                newNotiList[index] = {...newNotiList[index], status: NotiStatus.AGREED};
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
                console.log('sending friend userId',user.userId,ID)
                Axios.patch('friend/application', {
                    user_id: user.userId,
                    friend_id: ID,
                    u_name: user.nickname,
                    state: true
                }).then(res => {
                    console.log('res is :',res)
                    successToUpDataDb(res.data['success']);
                });
                break;
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                if (!ID || ID === "") {
                    break;
                }
                Axios.patch('group/' + ID + "participation", {user_id: user.userId, state: "yes"}).then((res) => {
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
                newNotiList[index] = {...newNotiList[index], status: NotiStatus.AGREED};
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
                    u_name: user.nickname,
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
                Axios.patch('group/' + ID + "participation", {user_id: user.userId, state: "no"}).then((res) => {
                    successToUpDataDb(res.data['success']);
                })
                break;
            }
            default:
                throw Error('info noti');
        }
    }

    return {notis, notiLoading, addNoti, agreeNoti, refuseNoti, initNotiModel};
});
