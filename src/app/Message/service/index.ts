import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import { INotification } from 'models/notification';
import { getDB } from 'utils';


export type INoti = INotification & { handled: boolean };

// 数据库存储格式
// { userId: Array<INoti> }
const initNotiList = async (): Promise<Array<INoti>> => {
    const db = await getDB();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        const notiListStore = db.transaction('notiList', 'readonly').objectStore('notiList');
        const getRequest = notiListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const res = e.target.result as Array<{ id: string, notis: Array<INoti> }>;
            if (res.length === 0) {
                resolve([]);
            } else {
                resolve(res[0].notis);
            }
        }

        getRequest.onerror = (e: any) => {
            resolve([]);
        }
    });
};

// TODO: 数据库操作
const addNotiToDB = (item: INoti) => {

}

const updateNotiInDB = (index: number) => {
    // notiList[index] = { ...notiList[index], handled: true }
}

export default createModel(() => {
    const [notis, setNotis] = useState<Array<INoti>>([]);
    const [notiLoading, setNotiLoading] = useState(false);

    useEffect(() => {
        setNotiLoading(true);
        initNotiList().then((res) => {
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
