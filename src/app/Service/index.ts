import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import {getDB} from 'utils';
import {host, port} from 'utils/config';
import Axios from 'axios';
import qs from 'qs';

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
};

export class IFriend {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public createAt: Date = new Date()
}

export class IGroup {
    public id: string = ''
    public owner: string = ''
    public avatar: string = ''
    public signature: string = ''
    public announcement: string = ''
    public createAt: string = ''
}

export class IConnect {
    public host: string = ''
    public port: number = 0
    public token: string = ''
};

export class IUserInfo {
    public user = new IUser();
    public friends: Array<IFriend> = [];
    public groups: Array<IGroup> = [];
    public connect: IConnect = { host: '', port: 0, token: '', };
}

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
            let addUserInfoRequest: IDBRequest<IDBValidKey>;
            
            addUserInfoRequest = userInfoStore.add({id, info})
            addUserInfoRequest.onsuccess = (e: any) => {
                console.log('add');
            }
        }
    })
}

const putUserInfo = (id: string, info: IUserInfo) => {
    getDB().then(db => {
        if(db) {
            const userInfoStore = db.transaction('user', 'readwrite').objectStore('user');
            let putUserInfoRequest: IDBRequest<IDBValidKey>;
            
            putUserInfoRequest = userInfoStore.put({id, info})
            putUserInfoRequest.onsuccess = (e: any) => {
                console.log('put');
            }
        }
    })
}

const deleteUserInfo = (id: string) => {
    getDB().then(db => {
        if(db) {
            const userInfoStore = db.transaction('user', 'readwrite').objectStore('user');
            let deleteUserInfoRequest = userInfoStore.delete(id);
            deleteUserInfoRequest.onsuccess = (e: any) => {
                console.log('delete');
            }
        }
    })
}

const address = 'http://'+host+':'+port+'/';
const accountService = 'account/';

export default createModel(() => {
    const [tabBar,setTabBar]= useState(TABS.EMPTY);
    const [showAddFriendView,setNewFriendView] = useState(false);
    const [showAddGroupView,setNewGroupView] = useState(false);

    const [currentChatBoxId, setChatBoxId] = useState('123456'); // 聊天对象的id，''默认没有（空空如野）

    const defaultUser = new IUser();
    defaultUser.userId = '654321';
    defaultUser.userAvatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';
    defaultUser.userName = 'test';

    const [user, setUser] = useState<IUser>(defaultUser);
    const [friends, setFriends] = useState<Array<IFriend>>([]);
    const [groups, setGroups] = useState<Array<IGroup>>([]);
    const [connect, setConnect] = useState<IConnect>(new IConnect());
    const [initLoading, setLoading] = useState(true);

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
        setLoading(true);

        Axios.post(accountService+'login', params).then((res) => {
            console.log(res);
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.userName = res.data['self']['nickname'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            // tempUser.email = res.data['self']['email'];
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
                groupList.push(tempGroup)
            }
            setGroups(groupList);

            const tempConnect = new IConnect();
            tempConnect.host = res.data['socket']['ip']
            tempConnect.port = res.data['socket']['port']
            tempConnect.token = res.data['token']
            setConnect(tempConnect)

            setLoading(false);

            const tempUserInfo = new IUserInfo();
            tempUserInfo.user = tempUser;
            tempUserInfo.friends = friendList;
            tempUserInfo.groups = groupList;
            tempUserInfo.connect = tempConnect;
            // addUserInfo(user.userId, tempUserInfo);
        })
    };

    const register = (params: any) => {
        setLoading(true);

        Axios.post(accountService+'signup',params).then((res) => {
            console.log(res)
            const loginParams = {
                account: params.phone,
                password: params.password,
                device: 'web'
            }
            login(loginParams)
        })
    };

    const logout = () => {
        setUser(defaultUser);
        // deleteUserInfo(user.userId)
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

            const tempUserInfo = new IUserInfo();
            tempUserInfo.user = tempUser;
            tempUserInfo.friends = friends;
            tempUserInfo.groups = groups;
            tempUserInfo.connect = connect;
            // putUserInfo(tempUser.userId,tempUserInfo);
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
