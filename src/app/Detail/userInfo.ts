
import React, { CSSProperties, useState } from 'react';
import { createModel } from 'hox';
import useUserService, {IUser} from 'app/Service/userService';
import Axios from 'axios';

export default createModel(() => {
    const defaultUser = new IUser();
    defaultUser.userId = '';
    
    const [currentBox,setCurrentBox] = useState(0); //0 for 无 1 for friend 2 for group
    const [currentUserBoxId, setUserBoxId] = useState('123456');
    const [user, setUser] = useState(defaultUser);
    const [groupId,setGroupId] = useState('');

    const changeUser = (id:string) =>{
        setCurrentBox(1);
        setUserBoxId(id);
        Axios.post('account' + id).then((res) => {
            console.log(res);
            const tempUser = new IUser();
            tempUser.userId = res.data['self']['id'];
            tempUser.userName = res.data['self']['nickname'];
            tempUser.userAvatar = res.data['self']['avatar'];
            tempUser.sex = res.data['self']['sex'];
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            //tempUser.email = res.data['self']['email'];
            setUser(tempUser);
        });
    }

    const changeGroup = (id:string) => {
        setCurrentBox(2);
        setGroupId(id);
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
        changeUser,deleteFriend,changeNickName,changeGroup,
        currentBox, setCurrentBox,
        groupId, setGroupId
    };
});