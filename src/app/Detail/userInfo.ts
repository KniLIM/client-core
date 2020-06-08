
import React, { CSSProperties, useState } from 'react';
import { createModel } from 'hox';


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

export default createModel(() => {
    

    const defaultUser = new IUser();
    defaultUser.userId = '123456';
    defaultUser.userAvatar = 'https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1';
    defaultUser.userName = 'test';
    defaultUser.email = 'test@hh.com';
    defaultUser.phone = '12345678910';
    defaultUser.sex = '男';
    defaultUser.signature = 'zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.zhe shi yi ju fei hua.';
    defaultUser.location = 'pk pk pk';
    defaultUser.birthday = '2020.02.02';
    defaultUser.nickname = 'nickname';
    
    const [currentUserBoxId, setUserBoxId] = useState('123456');
    const [user, setUser] = useState(defaultUser);


    const changeUser = (id:string) =>{
        setUserBoxId(id);
        //setUser();
    }

    const deleteFriend = (id: string) =>{
        //TODO:
    }

    const changeNickName = (newName: string) =>{
        //TODO:
    }

    return {
        currentUserBoxId, setUserBoxId,
        user,
        changeUser,deleteFriend,changeNickName,
    };
});