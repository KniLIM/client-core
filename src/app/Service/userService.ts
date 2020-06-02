import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';
import {host, port} from 'utils/config';
import {getDB} from 'utils'

import useFriendService, { IFriend } from 'app/Service/friendService';
import useGroupService, {IGroup} from 'app/Service/groupService';
import useConnectService, {IConnect} from 'app/Service/connectService';


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
};

export class IUserInfo {
    public user = new IUser();
    public friends: Array<IFriend> = [];
    public groups: Array<IGroup> = [];
    public connect: IConnect = { host: '', port: 0, token: '', };
};

const initUserInfo = async (): Promise<IUserInfo> => {
    const db = await getDB();
    if (!db) return new IUserInfo();

    return new Promise((resolve, reject) => {
        const userStore = db.transaction('user', 'readonly').objectStore('user');
        const getRequest = userStore.getAll();

        getRequest.onsuccess = (e: any) => {
            const res = e.target.result as Array<{ id: string, info: IUserInfo }>;
            if (res.length === 0) {
                resolve(new IUserInfo());
            } else {
                resolve(res[0].info);
            }
        };

        getRequest.onerror = (e: any) => {
            resolve(new IUserInfo());
        };
    });
}

const address = 'http://' + host + ':' + port + '/';
const accountService = address + 'account/';

export default createModel(() => {
    const defaultUser = new IUser();
    defaultUser.userId = '654321';
    defaultUser.userAvatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';
    defaultUser.userName = 'test';

    const [user, setUser] = useState<IUser>(defaultUser);
    const {setFriends} = useFriendService();
    const {setGroups} = useGroupService();
    const {setConnect} = useConnectService();
    const [userLoading, setUserLoading] = useState(false);

    // useEffect(() => {
    //     initUserInfo().then((info) => {
    //         setUser(info.user);
    //         setFriends(info.friends);
    //         setGroups(info.groups);
    //         setConnect(info.connect);
            // setLoading(false);
    //     });
    // }, []);

    const login = (params: any) => {
        setUserLoading(true);

        Axios.post(accountService+'login', params).then((res) => {
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.userName = res.data['self']['nickname'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            // email
            setUser(tempUser);

            // setFriends
            // ...
            setUserLoading(false);

            // add
        })
    };

    const register = (params: any) => {
        setUserLoading(true);

        Axios.post(accountService+'signup',params).then((res) => {
            // TODO: login
            const tempUser = new IUser();
            tempUser.userId = res.data['user_id'];
            setUser(tempUser);

            setFriends([]);
            // ...
            setUserLoading(false);
        })
    };

    const logout = () => {
        setUser(defaultUser);

        // delete
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

            // put
        })
    };

    return {
        user, login, logout, register, updateProfile, userLoading
    };
});
