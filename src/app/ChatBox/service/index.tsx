import { useState, useEffect } from 'react';
import { createModel } from 'hox';
import { message } from 'antd';
import { getDB } from 'utils';
import useService, { TABS } from 'app/Service';

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

export interface IMsgReadList {
    // userId or groupId
    [id: string]: boolean
};

export class MsgItem {
    public id: string = ''
    public name: string = ''
    public avatar: string = ''
};

const initMsgList = async (): Promise<IMsgList> => {
    const db = await getDB();
    if (!db) return {};

    return new Promise((resolve, reject) => {
        const a: Array<IMsgRecord> = [];
        const b: Array<IMsgRecord> = [];
        let msgList: IMsgList = {};
        const msgListStore = db.transaction('msgList', 'readonly').objectStore('msgList');
        const getRequest = msgListStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const msgs = e.target.result as Array<{ id: string, msgs: Array<IMsgRecord> }>;
            msgs.forEach((msg) => msgList[msg.id.toString()] = { msgs: msg.msgs });
            resolve(msgList);
        }

        getRequest.onerror = (e: any) => {
            resolve({});
        }
    });
};

export default createModel(() => {
    const [msgList, setMsgList] = useState<IMsgList>({});
    const [sortedMsgList, setSortedMsgList] = useState<Array<string>>([]);
    const { setChatBoxId, setChatBoxName, setChatBoxGroup } = useService();
    const { setTabBar } = useService();
    const [msgReadList, setMsgReadList] = useState<IMsgReadList>({});

    useEffect(() => {
        initMsgList().then(res => {
            setMsgList(res);
            const sortedIdList = Object.keys(res).sort((a, b) => {
                const msg1 = res[a]['msgs'];
                const msg2 = res[b]['msgs'];
                const date1 = msg1[msg1.length - 1].date;
                const date2 = msg2[msg2.length - 1].date;
                if (date1 < date2) return 1;
                else if (date1 === date2) return 0;
                else return -1;
            });
            setSortedMsgList(sortedIdList);
            const tmp: IMsgReadList = {};
            for(var key in res) {
                tmp[key] = true;
            }
            setMsgReadList(tmp);
        });
    }, []);

    // useEffect(() => {
    //     console.log('msglist: ',sortedMsgList);
    // }, [sortedMsgList])

    const createChat = (id: string, name: string, isGroup: boolean) => {
        const index = sortedMsgList.indexOf(id);
        if (index !== -1) sortedMsgList.splice(index, 1);
        sortedMsgList.unshift(id);
        setChatBoxId(id);
        setTabBar(TABS.CHAT);
        setChatBoxName(name);
        setChatBoxGroup(isGroup);
    }

    const addMsg = (id: string, msg: IMsgRecord) => {
        const index = sortedMsgList.indexOf(id);
        if (index !== -1) sortedMsgList.splice(index, 1);
        sortedMsgList.unshift(id);

        getDB().then(db => {
            if (db) {
                const msgListStore = db.transaction('msgList', 'readwrite').objectStore('msgList');
                const getRequest = msgListStore.get(id);
                getRequest.onsuccess = ((e: any) => {
                    if (typeof (e.target.result) === 'undefined') {
                        let newList = [msg];
                        let addOrPutRequest = msgListStore.add({ id, msgs: newList });
                        addOrPutRequest.onsuccess = ((e: Event) => {
                            setMsgList(prev => ({
                                ...prev,
                                [id]: { msgs: newList },
                            }));
                        });
                        addOrPutRequest.onerror = ((e: any) => {
                            message.error('数据库更新失败');
                            console.log(e);
                        });
                    } else {
                        let newList = e.target.result.msgs as Array<IMsgRecord>;
                        newList.push(msg);
                        let addOrPutRequest = msgListStore.put({ id, msgs: newList });
                        addOrPutRequest.onsuccess = ((e: Event) => {
                            setMsgList(prev => ({
                                ...prev,
                                [id]: { msgs: newList },
                            }));
                        });
                        addOrPutRequest.onerror = ((e: any) => {
                            message.error('数据库更新失败');
                            console.log(e);
                        });
                    }
                });

                getRequest.onerror = ((e: Event) => {
                    message.error('数据库读取失败');
                    console.log(e);
                });
            }
        });
    }

    return { msgList, setMsgList, addMsg, sortedMsgList, setSortedMsgList, createChat, msgReadList };
});
