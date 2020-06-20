import {useState} from 'react';
import {createModel} from 'hox';
import { INotification, NotificationType } from 'models/notification';
import { getDB } from 'utils';
import Axios from 'axios';


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
        content: "D,114宿舍,快让我康康你的身体结不结实",
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
                const addRequest = notiListStore.add({ id: userId, notis: testNotiList });
                addRequest.onsuccess = (e: any) => {
                    resolve(testNotiList);
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
            notiListStore.put({ userId, newNotiList });
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

    // TODO
    const addNoti = () => {

    };

    const agreeNoti = (index: number) => {
        console.log('agree');
        setNotiLoading(true);
        const type = notis[index].notificationType;

        switch (type) {
            case NotificationType.N_FRIEND_ADD_APPLICATION: {
                // TODO: 先api请求，成功以后先改前端数据库，再改state
                // 这里省略了api请求和改前端数据库

                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.AGREED };
                setNotis(newNotiList);

                setNotiLoading(false);
                break;
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.AGREED };
                setNotis(newNotiList);

                setNotiLoading(false);
                break;
            }
            default:
                throw Error('info noti');
        }
    };

    const refuseNoti = (index: number) => {
        console.log('refuse');
        setNotiLoading(true);
        const type = notis[index].notificationType;

        switch (type) {
            case NotificationType.N_FRIEND_ADD_APPLICATION: {
                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.REFUSED };
                setNotis(newNotiList);

                setNotiLoading(false);
                break;
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                const newNotiList = [...notis];
                newNotiList[index] = { ...newNotiList[index], status: NotiStatus.REFUSED };
                setNotis(newNotiList);

                setNotiLoading(false);
                break;
            }
        }
    }

    return { notis, notiLoading, addNoti, agreeNoti, refuseNoti, initNotiModel };
});
