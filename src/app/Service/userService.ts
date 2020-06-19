import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';
import {getDB, encryptBySha256} from 'utils'
import useFriendService, { IFriend } from 'app/Service/friendService';
import useGroupService, {IGroup} from 'app/Service/groupService';
import useConnectService, {IConnect} from 'app/Service/connectService';
import useNotiService from 'app/Message/service';

export class IUser {
    public userId: string = '';
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

export interface ILoginParam {
    account: string,
    password: string,
    device: string,
};

export interface IRegisterParam {
    email: string,
    phone: string,
    password: string,
    nickname: string,
    sex: boolean,
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

const addUserInfo = (id: string, info: IUserInfo) => {
    getDB().then(db => {
        if(db) {
            const userInfoStore = db.transaction('user', 'readwrite').objectStore('user');
            userInfoStore.add({id, info})
            // addUserInfoRequest.onsuccess = (e: any) => {
                // console.log('add');
            // }
        }
    })
}

const putUserInfo = (id: string, info: IUserInfo) => {
    getDB().then(db => {
        if(db) {
            const userInfoStore = db.transaction('user', 'readwrite').objectStore('user');
            userInfoStore.put({id, info})
            // putUserInfoRequest.onsuccess = (e: any) => {
            //     console.log('put');
            // }
        }
    })
}

const deleteUserInfo = (id: string) => {
    getDB().then(db => {
        if(db) {
            const userInfoStore = db.transaction('user', 'readwrite').objectStore('user');
            userInfoStore.delete(id);
            // deleteUserInfoRequest.onsuccess = (e: any) => {
            //     console.log('delete');
            // }
        }
    })
}

const accountService = 'account/';

export default createModel(() => {
    const defaultUser = new IUser();

    const [user, setUser] = useState<IUser>(defaultUser);
    const {friends, setFriends} = useFriendService();
    const {groups, setGroups} = useGroupService();
    const {connect, setConnect} = useConnectService();
    const [userLoading, setUserLoading] = useState(false);
    const { initNotiModel } = useNotiService();

    useEffect(() => {
        setUserLoading(true);
        initUserInfo().then((info) => {
            setUser(info.user);
            setFriends(info.friends);
            setGroups(info.groups);
            setConnect(info.connect);
            setUserLoading(false);

            initNotiModel(user.userId);
        });
    }, []);

    const login = (params: ILoginParam) => {
        setUserLoading(true);

        Axios.post(accountService + 'login', { ...params, password: encryptBySha256(params.password)}).then((res) => {
            console.log(res);
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.nickname = res.data['self']['nickName'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            tempUser.email = res.data['self']['email'];
            tempUser.phone = res.data['self']['phone']
            setUser(tempUser);
            const friendList: Array<IFriend> = [];
            for(let f of res.data['friends']) {
                const tempFriend = new IFriend()
                tempFriend.id = f['friend']
                tempFriend.nickname = f['nickname']
                tempFriend.createAt = f['createdAt']
                tempFriend.isBlack = f['isBlack']
                tempFriend.isTop = f['isTop']
                friendList.push(tempFriend)
            }
            setFriends(friendList)

            const groupList: Array<IGroup> = [];
            for(let f of res.data['groups']) {
                const tempGroup = new IGroup()
                tempGroup.id = f['id']
                tempGroup.announcement = f['announcement']
                tempGroup.avatar = f['avatar']
                tempGroup.createAt = f['created_at']
                tempGroup.owner = f['owner']
                tempGroup.signature = f['signature']
                tempGroup.name = f['name']
                groupList.push(tempGroup)
            }
            setGroups(groupList);
            console.log(groups)
            const tempConnect = new IConnect();
            tempConnect.host = res.data['socket']['ip']
            tempConnect.port = res.data['socket']['port']
            tempConnect.token = res.data['token']
            setConnect(tempConnect)

            setUserLoading(false);

            const tempUserInfo = new IUserInfo();
            tempUserInfo.user = tempUser;
            tempUserInfo.friends = friendList;
            tempUserInfo.groups = groupList;
            tempUserInfo.connect = tempConnect;
            addUserInfo(tempUser.userId, tempUserInfo);
        })
    };

    const register = (params: IRegisterParam) => {
        setUserLoading(true);

        Axios.post(accountService + 'signup', { ...params, password: encryptBySha256(params.password) }).then((res) => {
            console.log(res)
            const loginParams: ILoginParam = {
                account: params.phone,
                password: params.password,
                device: 'web'
            }
            login(loginParams)
        })
    };

    const logout = () => {
        setUser(defaultUser);
        deleteUserInfo(user.userId)
    };

    const updateProfile = (params: any) => {
        Axios.patch(accountService+user.userId+'/modify',params).then((res) => {
            // console.log(res);
            const tempUser = new IUser();
            tempUser.userId = user.userId;
            tempUser.email = 'email' in params ? params['email'] : user.email;
            tempUser.phone = 'phone' in params ? params['phone'] : user.phone;
            tempUser.nickname = 'nickname' in params ? params['nickname'] : user.nickname;
            tempUser.userAvatar = 'avatar' in params ? params['avatar'] : user.userAvatar;
            tempUser.sex = 'sex' in params ? params['sex'] : user.sex;
            tempUser.signature = 'signature' in params ? params['signature'] : user.signature;
            tempUser.location = 'location' in params ? params['location'] : user.location;
            tempUser.birthday = 'birthday' in params ? params['birthday'] : user.birthday;
            setUser(tempUser);

            const tempUserInfo = new IUserInfo();
            tempUserInfo.user = tempUser;
            tempUserInfo.friends = friends;
            tempUserInfo.groups = groups;
            tempUserInfo.connect = connect;
            putUserInfo(tempUser.userId,tempUserInfo);
        })
    };

    return {
        user, login, logout, register, updateProfile, userLoading
    };
});
