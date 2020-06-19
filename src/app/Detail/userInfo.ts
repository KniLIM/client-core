
import React, { CSSProperties, useState } from 'react';
import { createModel } from 'hox';
import Axios from 'axios';
import useGroupService from 'app/Service/groupService';
import useUserService,{IUser} from 'app/Service/userService';

export default createModel(() => {
    const defaultUser = new IUser;
    defaultUser.userId = "";
    defaultUser.userAvatar = '';
    defaultUser.email = '';
    defaultUser.phone = '';
    defaultUser.nickname = '';
    defaultUser.sex = '';
    defaultUser.signature= '';
    defaultUser.location = '';
    defaultUser.birthday= '';

    const {getGroupInfoById} = useGroupService();

    const [currentBox,setCurrentBox] = useState(0); //0 for 无 1 for friend 2 for group
    const [currentUserBoxId, setUserBoxId] = useState('123456');
    const [user, setUser] = useState<IUser>(defaultUser);
    const [groupId,setGroupId] = useState('');
    const [loading, setLoading] = useState(false);
    const changeUser = (id:string) =>{
        setCurrentBox(1);
        setUserBoxId(id);
        getFriendDetail(id);
    }

    const changeGroup = (id:string) => {
        setCurrentBox(2);
        getGroupInfoById(id);
    }
    const deleteFriend = (id: string) =>{
        //TODO:
    }

    const changeNickName = (newName: string) =>{
        //TODO:
    }

    const getFriendDetail = (
        friend_id: string
    ) => {
        setLoading(true)
        const tempUser = new IUser();
        console.log('change User box' + friend_id)
        Axios.get('account/' + friend_id).then((res) => {
            console.log(res)
            tempUser.userId = res.data['self']['id'];
            tempUser.nickname = res.data['self']['nickName'];
            tempUser.userAvatar = res.data['self']['avatar'];
            if(res.data['self']['sex']){
                tempUser.sex = "男"
            }else {
                tempUser.sex = "女"
            }
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            tempUser.phone = res.data['self']['phone']; 
            tempUser.email = res.data['self']['email']; 
            console.log(tempUser)
            setUser(tempUser)
            setLoading(false)
        })
    }

    return {
        currentUserBoxId, setUserBoxId,
        user, setUser,
        changeUser,deleteFriend,changeNickName,changeGroup,
        currentBox, setCurrentBox,
        groupId, setGroupId,
        loading
    };
});