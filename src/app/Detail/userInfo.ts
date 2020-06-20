
import React, { CSSProperties, useState } from 'react';
import { createModel } from 'hox';
import Axios from 'axios';
import useGroupService from 'app/Service/groupService';
import useUserService, { IUser } from 'app/Service/userService';
import useFriendService from 'app/Service/friendService';

export default createModel(() => {
    const defaultUser = new IUser;
    defaultUser.userId = "";
    defaultUser.userAvatar = '';
    defaultUser.email = '';
    defaultUser.phone = '';
    defaultUser.nickname = '';
    defaultUser.sex = '';
    defaultUser.signature = '';
    defaultUser.location = '';
    defaultUser.birthday = '';

    const { getGroupInfoById } = useGroupService();
    const { deleteFriend, changeNickname ,updateFriends } = useFriendService();
    const { user } = useUserService();

    const [currentBox, setCurrentBox] = useState(0); //0 for 无 1 for friend 2 for group
    const [currentUserBoxId, setUserBoxId] = useState('123456');
    const [friendDetail, setFriendDetail] = useState<IUser>(defaultUser);
    const [groupId, setGroupId] = useState('');
    const [userloading, setLoading] = useState(false);
    const changeUser = (id: string) => {
        setCurrentBox(1);
        setUserBoxId(id);
        getFriendDetail(id);
    }

    const changeGroup = (id: string) => {
        setCurrentBox(2);
        getGroupInfoById(id);
    }
    const deleteFriendById = () => {
        console.log("delete friend ")
        if (!(friendDetail.userId === '')){
            deleteFriend(user.userId, friendDetail.userId)
        }
    }

    const changeNickName = (newName: string) => {
        console.log('change nickname ' + newName)
        const tempUser = new IUser();
        tempUser.nickname = newName;
        tempUser.birthday = friendDetail.birthday;
        tempUser.email = friendDetail.email;
        tempUser.location = friendDetail.location;
        tempUser.signature = friendDetail.signature;
        tempUser.phone = friendDetail.phone;
        tempUser.sex = friendDetail.sex;
        tempUser.userAvatar = friendDetail.userAvatar;
        tempUser.userId = friendDetail.userId;
        setFriendDetail(tempUser);

        changeNickname(user.userId, friendDetail.userId, newName);
        
        updateFriends(user.userId);
        //TODO:
    }

    const getFriendDetail = (
        friend_id: string
    ) => {
        setLoading(true)
        const tempUser = new IUser();
        console.log('change User box' + friend_id)
        Axios.get('account/' + friend_id).then((res) => {
            tempUser.userId = res.data['self']['id'];
            tempUser.nickname = res.data['self']['nickName'];
            tempUser.userAvatar = res.data['self']['avatar'];
            if (res.data['self']['sex']) {
                tempUser.sex = "男"
            } else {
                tempUser.sex = "女"
            }
            tempUser.signature = res.data['self']['signature'];
            tempUser.location = res.data['self']['location'];
            tempUser.birthday = res.data['self']['birthday'];
            tempUser.phone = res.data['self']['phone'];
            tempUser.email = res.data['self']['email'];
            setFriendDetail(tempUser)
            setLoading(false)
        })
    }

    return {
        currentUserBoxId, setUserBoxId,
        friendDetail, setFriendDetail,
        changeUser, deleteFriendById, changeNickName, changeGroup,
        currentBox, setCurrentBox,
        groupId, setGroupId,
        userloading
    };
});