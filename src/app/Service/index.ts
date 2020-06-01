import {useState} from 'react';
import { createModel } from 'hox';
import {host, port} from '../../utils/config'
import Axios from 'axios'

// 右侧的标签页面需要对应的状态，当信息为空的时候，setTabBar(TABS.EMPTY)，可在右侧显示空
export enum TABS {
    "EMPTY", // 初始页面，空
    "CHAT", // 聊天
    "LIST", // 好友列表
    "MESSAGE", // 消息推送
}

export class IUser {
    public userId: string = '';
    public userName: string = '';
    public userAvatar: string = '';
    public email: string = '';
    public phone: string = '';
    public nickname: string = '';
    public sex: string = '';
    public signature: string = '';
    public location: string = '';
    public birthday: string = '';
    public token: string = '';
}
const address = 'http://'+host+':'+port+'/';
const accountService = address+'account/';
/**
 * 全局状态
 */
export default createModel(() => {
    const [tabBar,setTabBar]= useState(TABS.EMPTY);
    const [showAddFriendView,setNewFriendView] = useState(false);
    const [showAddGroupView,setNewGroupView] = useState(false);

    const [currentChatBoxId, setChatBoxId] = useState('123456'); // 聊天对象的id，''默认没有（空空如野）

    const defaultUser = new IUser();
    defaultUser.userId = '654321';
    defaultUser.userAvatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';
    defaultUser.userName = 'test';

    const [user, setUser] = useState(defaultUser);

    const login = (params: any) => {
        Axios.post(accountService+'login', params).then((res) => {
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.userName = res.data['self']['nickname'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            setUser(tempUser);
        })
    };

    const register = (params: any) => {
        Axios.post(accountService+'signup',params).then((res) => {
            const tempUser = new IUser();
            tempUser.userId = res.data['user_id'];
            setUser(tempUser);
        })
    };

    const logout = () => {
        setUser(defaultUser);
    };

    const updateProfile = (params: any) => {
        Axios.patch(accountService+user.userId+'/modify',params).then((res) => {
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.userName = res.data['self']['nickname'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            setUser(tempUser);
        })
    };

    return {
        tabBar, setTabBar,
        showAddFriendView, setNewFriendView,
        showAddGroupView, setNewGroupView,
        currentChatBoxId, setChatBoxId,
        user, login, register, logout , updateProfile
    };
});
