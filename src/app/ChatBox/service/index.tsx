import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import {message} from 'antd';
import {getDB} from 'utils';


export interface IMsgRecord {
    msgId: string,
    senderId: string,
    senderAvatar: string,
    type: 'text' | 'photo' | 'file',
    content: string,
    name?: string,
    date: Date,
};

export interface IMsgList {
    // userId or groupId
    [id: string]: {
        msgs: Array<IMsgRecord>;
    };
};

const initMsgList = async (): Promise<IMsgList> => {
    const db = await getDB();
    if (!db) return {};

    return new Promise((resolve, reject) => {
        let msgList: IMsgList = {};
        const msgListStore = db.transaction('msgList', 'readonly').objectStore('msgList');
        const getRequest = msgListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const msgs = e.target.result as Array<{ id: string, msgs: Array<IMsgRecord> }>;
            msgs.forEach((msg) => msgList[msg.id.toString()] = { msgs: msg.msgs});
            resolve(msgList);
        }

        getRequest.onerror = (e: any) => {
            resolve({});
        }
    });
};

export default createModel(() => {
    const [msgList, setMsgList] = useState<IMsgList>({});
    const [sortedList, setSortedList] = useState<Array<string>>([]);

    useEffect(() => {
        initMsgList().then(res => {
            setMsgList(res);
        });
    }, []);

    const addMsg = (id: string, msg: IMsgRecord) => {
        getDB().then(db => {
            if (db) {
                const msgListStore = db.transaction('msgList', 'readwrite').objectStore('msgList');
                let addMsgRequest: IDBRequest<IDBValidKey>;

                if (id in msgList) {
                    let msgs = msgList[id].msgs;
                    msgs.push(msg);

                    addMsgRequest = msgListStore.put({ id, msgs });
                    addMsgRequest.onsuccess = ((e: Event) => {
                        setMsgList(prev => ({
                            ...prev,
                            [id]: {msgs},
                        }));
                    });
                } else {
                    addMsgRequest = msgListStore.add({ id, msgs: [msg] });
                    addMsgRequest.onsuccess = ((e: Event) => {
                        setMsgList(prev => ({
                            ...prev,
                            [id]: { msgs: [msg] },
                        }));
                    });
                }

                addMsgRequest.onerror = ((e: Event) => {
                    message.error('数据更新失败');
                });
            } else {
                if (id in msgList) {
                    let msgs = msgList[id].msgs;
                    msgs.push(msg);

                    setMsgList(prev => ({
                        ...prev,
                        [id]: {msgs},
                    }));
                } else {
                    setMsgList(prev => ({
                        ...prev,
                        [id]: { msgs: [msg] },
                    }));
                }
            }
        });
    }

    return {msgList, addMsg};
});
