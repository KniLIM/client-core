import React from 'react';
import { NotificationType } from 'models/notification';


export const getDateTime = (timeStamp: string) => {
    let date = new Date(parseInt(timeStamp))

    return (date.getMonth()+1 < 10 ? '0' +
    (date.getMonth()+1) : date.getMonth()+1) + '-' +
    (date.getDate() < 10 ? '0' + date.getDate():date.getDate()) + ' ' +
    date.getHours() + ':' +
    date.getMinutes()
}

export const splitContentByType = (notiType: NotificationType, content: string) => {
    const words = content.split(',');

    switch (notiType) {
        case NotificationType.N_FRIEND_ADD_APPLICATION: {
            if (words.length !== 2) break;
            return (
                <span>
                    <span style={{color: '#1890ff'}}>{words[0]}</span>
                    {' 添加 '}
                    <span style={{color: '#1890ff'}}>你</span>
                    {` 为好友: ${words[1]}`}
                </span>
            );
        }
        case NotificationType.N_FRIEND_ADD_RESULT: {
            if (words.length !== 2) break;
            if (words[0] === 'yes') {
                return (
                    <span>
                        <span style={{color: '#1890ff'}}>你</span>
                        {' 已成功添加好友 '}
                        <span style={{color: '#1890ff'}}>{words[1]}</span>
                    </span>
                );
            }

            return (
                <span>
                    <span style={{color: '#1890ff'}}>你</span>
                    {' 没能通过 '}
                    <span style={{color: '#1890ff'}}>{words[1]}</span>
                    {' 的好友验证'}
                </span>
            );
        }
        case NotificationType.N_FRIEND_DELETE_RESULT: {
            if (words.length !== 1) break;
            return (
                <span>
                    <span style={{color: '#1890ff'}}>{words[0]}</span>
                    {' 已删除了和 '}
                    <span style={{color: '#1890ff'}}>你</span>
                    {' 的好友'}
                </span>
            );
        }
        case NotificationType.N_GROUP_DELETE: {
            if (words.length !== 1) break;
            return (
                <span>
                    {'群聊 '}
                    <span style={{color: '#1890ff'}}>{words[0]}</span>
                    {' 已被解散'}
                </span>
            );
        }
        case NotificationType.N_GROUP_JOIN_APPLICATION: {
            if (words.length !== 3) break;
            return (
                <span>
                    <span style={{color: '#1890ff'}}>{words[0]}</span>
                    {' 申请加入群聊 '}
                    <span style={{color: '#1890ff'}}>{words[1]}</span>
                    {`: ${words[2]}`}
                </span>
            );
        }
        case NotificationType.N_GROUP_JOIN_RESULT: {
            if (words.length !== 2) break;
            if (words[0] === 'yes') {
                return (
                    <span>
                        <span style={{color: '#1890ff'}}>你</span>
                        {' 已成功加入群聊 '}
                        <span style={{color: '#1890ff'}}>{words[1]}</span>
                    </span>
                );
            }

            return (
                <span>
                    <span style={{color: '#1890ff'}}>你</span>
                    {' 没能通过群聊 '}
                    <span style={{color: '#1890ff'}}>{words[1]}</span>
                    {' 申请'}
                </span>
            );
        }
        case NotificationType.N_GROUP_WITHDRAW_RESULT: {
            if (words.length !== 2) break;
            return (
                <span>
                    <span style={{color: '#1890ff'}}>{words[0]}</span>
                    {' 已退出群聊 '}
                    <span style={{color: '#1890ff'}}>{words[1]}</span>
                </span>
            );
        }
        case NotificationType.N_GROUP_KICKOFF_RESULT: {
            if (words.length !== 1) break;
            return (
                <span>
                    <span style={{color: '#1890ff'}}>你</span>
                    {' 已被踢出群聊 '}
                    <span style={{color: '#1890ff'}}>{words[1]}</span>
                </span>
            );
        }
    }
};
