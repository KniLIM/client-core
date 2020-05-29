import {useState} from 'react';
import {createModel} from 'hox';


export interface IMsgRecord {
    msgId: string,
    senderId: string,
    senderAvatar: string,
    type: 'text' | 'photo',
    content: string,
    date: Date,
};

export interface IMsgList {
    // userId or groupId
    [id: string]: {
        msgs: Array<IMsgRecord>;
    };
};

const initMsgList = (): IMsgList => {
    // TODO: SQL

    const avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';

    return {
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
                    content: require('/Users/mac/Desktop/client-core/src/penguin.jpg'),
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
                },
            ]
        }
    }
}


export default createModel(() => {
    const [msgList, setMsgList] = useState(initMsgList());

    const addMsg = (id: string, msg: IMsgRecord) => {
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

    return {msgList, addMsg};
});