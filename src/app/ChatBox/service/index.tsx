import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import {message} from 'antd';


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

const avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';

const initList: IMsgList = {
    '123456': {
        msgs: [
            {
                msgId: '00001',
                senderId: '123456',
                senderAvatar: avatar,
                type: 'text',
                content: 'new friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friend',
                date: new Date(),
            }, {
                msgId: '00002',
                senderId: '654321',
                senderAvatar: avatar,
                type: 'photo',
                content: require('../../../assets/penguin.jpg'),
                date: new Date(),
            }, {
                msgId: '00003',
                senderId: '123456',
                senderAvatar: avatar,
                type: 'text',
                content: 'hi',
                date: new Date(),
            }, {
                msgId: '00004',
                senderId: '654321',
                senderAvatar: avatar,
                type: 'text',
                content: 'what is u r name',
                date: new Date(),
            }, {
                msgId: '00005',
                senderId: '123456',
                senderAvatar: avatar,
                type: 'text',
                content: 'xian bei',
                date: new Date(),
            }, {
                msgId: '00006',
                senderId: '654321',
                senderAvatar: avatar,
                type: 'text',
                content: 'I am Jie Ge',
                date: new Date(),
            }, {
                msgId: '00007',
                senderId: '123456',
                senderAvatar: avatar,
                type: 'text',
                content: '让我康康！',
                date: new Date(),
            }, {
                msgId: '00008',
                senderId: '654321',
                senderAvatar: avatar,
                type: 'text',
                content: '我觉得怪怪的',
                date: new Date(),
            }, {
                msgId: '00009',
                senderId: '654321',
                senderAvatar: avatar,
                type: 'file',
                content: 'http://cdn.loheagn.com/Fqgmu5OxQ-kTz9gnYWLZUugJfvh4',
                name: '架构文档.docx',
                date: new Date(),
            }
        ]
    }
};

let DB: IDBDatabase | null = null;

const getDB = async (): Promise<IDBDatabase | null> => {
    if (DB) return DB;

    return new Promise((resolve, reject) => {
        const indexedDB = window.indexedDB;
        if (!indexedDB) {
            resolve(null);
        }

        const request = indexedDB.open('knilim');

        request.onsuccess = (e: Event) => {
            DB = request.result as IDBDatabase;
            resolve(DB);
        };

        request.onerror = (e: Event) => {
            resolve(null);
        }

        request.onupgradeneeded = (e: any) => {
            DB = e.target.result as IDBDatabase;
            const msgListStore = DB.createObjectStore('msgList', { keyPath: 'id' });

            msgListStore.transaction.oncomplete = () => {
                const store = (DB as IDBDatabase).transaction('msgList', 'readwrite').objectStore('msgList');
                for (let props in initList) {
                    store.add({ id: props, msgs: initList[props].msgs });
                }
                resolve(DB);
            }
        }
    });
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

                if (msgList[id] === null) {
                    addMsgRequest = msgListStore.add({ id, msgs: [msg] });
                    addMsgRequest.onsuccess = ((e: Event) => {
                        setMsgList(prev => ({
                            ...prev,
                            id: { msgs: [msg] },
                        }));
                    });
                } else {
                    let msgs = msgList[id].msgs;
                    msgs.push(msg);

                    addMsgRequest = msgListStore.put({ id, msgs });
                    addMsgRequest.onsuccess = ((e: Event) => {
                        setMsgList(prev => ({
                            ...prev,
                            id: {msgs},
                        }));
                    });
                }

                addMsgRequest.onerror = ((e: Event) => {
                    message.error('数据更新失败');
                });
            } else {
                if (msgList[id] === null) {
                    setMsgList(prev => ({
                        ...prev,
                        id: { msgs: [msg] },
                    }));
                } else {
                    let msgs = msgList[id].msgs;
                    msgs.push(msg);

                    setMsgList(prev => ({
                        ...prev,
                        id: {msgs},
                    }));
                }
            }
        });
    }

    return {msgList, addMsg};
});
