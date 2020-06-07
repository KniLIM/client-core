import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import { INotification } from 'models/notification';
import { getDB } from 'utils';
import useUserService from 'app/Service/userService';


export type INoti = INotification & { handled: boolean };

// 数据库存储格式
// { userId: Array<INoti> }
const initNotiList = async (userId: string): Promise<Array<INoti>> => {
    const db = await getDB();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        const notiListStore = db.transaction('notiList', 'readonly').objectStore('notiList');
        const getRequest = notiListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const res = e.target.result as Array<{ id: string, notis: Array<INoti> }>;
            if (res.length === 0) {
                const addRequest = notiListStore.add({ id: userId, notis: [] });
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
    // 添加Noti: 调用前 newNotiList.push(newNoti); addNotiToDB(user.userId, newNotiList);
    // 更新handled状态: 调用前 notiList[i] = { ...notiList[i], handled: !notiList[i].handled }

    // 更新数据库
    // store.put({ id: userId, notis: newNotiList });
}

export default createModel(() => {
    const [notis, setNotis] = useState<Array<INoti>>([]);
    const [notiLoading, setNotiLoading] = useState(false);

    const {user} = useUserService();

    useEffect(() => {
        setNotiLoading(true);
        initNotiList(user.userId).then((res) => {
            setNotis(res);
            setNotiLoading(false);
        })
    }, []);

    // TODO
    const addNoti = () => {

    };

    const handleNoti = () => {

    };

    return { notis, notiLoading, addNoti, handleNoti };
});
