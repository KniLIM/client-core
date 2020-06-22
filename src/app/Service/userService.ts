import {useState, useEffect} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';
import {host, port} from 'utils/config';
import {getDB, encryptBySha256} from 'utils'
import useFriendService from 'app/Service/friendService';
import useGroupService from 'app/Service/groupService';
import useConnectService from 'app/Service/connectService';
import useNotiService from 'app/Message/service';
import { IUserInfo, IUser, IFriend, IGroup, IConnect } from 'app/Service/utils/IUserInfo';


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
    const {connect, setConnect,leaveSocket} = useConnectService();
    const [userLoading, setUserLoading] = useState(false);
    const { initNotiModel } = useNotiService();
    const [searchRes, setSearchRes] = useState<Array<IUser>>([]);
    const [searchUserLoading, setSerchUserLoading] = useState(false);

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
        setConnect(new IConnect())

        Axios.post(accountService + 'login', { ...params, password: encryptBySha256(params.password)}).then((res) => {
            console.log(res);
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.nickname = res.data['self']['nickName'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
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
                tempFriend.avatar = f['avatar']
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
            console.log('return socket info is : ',res.data['socket'])
            tempConnect.host = res.data['socket']['first']
            tempConnect.port = res.data['socket']['second']
            tempConnect.token = res.data['token']

            console.log(tempUser)
            setUserLoading(false);
            setConnect(tempConnect)


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
        leaveSocket()
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
            putUserInfo(tempUser.userId, tempUserInfo);
        })
    };

    const searchFriendByKeyword = (keyword: string) => {
        setSerchUserLoading(true)
        let params:any = {
            params:{'keyword':keyword}
        }
        Axios.post(accountService+'search',params).then((res) => {
            // if(!res.data['success']){
            //     setSearchRes([])
            //     setSerchUserLoading(false)
            //     return
            // }
            const friendList:Array<IUser> = []
            console.log(res)
            for(let f of res.data['result']){
                const tempFriend = new IUser()
                tempFriend.userId = f['id']
                tempFriend.nickname = f['nickname']
                tempFriend.userAvatar = f['avatar']
                tempFriend.sex = f['sex']
                tempFriend.signature = f['signature']
                tempFriend.location = f['location']
                tempFriend.birthday = f['birthday']
                friendList.push(tempFriend)
            }
            setSearchRes(friendList)
            setSerchUserLoading(false)
        })
    }

    return {
        user, login, logout, register, updateProfile, userLoading,
        searchFriendByKeyword, searchRes, searchUserLoading
    };
});
