
import React, { CSSProperties, useState } from 'react';
import { createModel } from 'hox';
import Axios from 'axios';
import useGroupService from 'app/Service/groupService';
import useUserService from 'app/Service/userService';
import { IUser} from 'app/Service/utils/IUserInfo'
import useFriendService from 'app/Service/friendService';
import useChatBoxService from 'app/ChatBox/service/index'
import friendlist from 'app/Sidebar/PeopleList/friendlist';
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

    const { getGroupInfoById,getGroupMember } = useGroupService();
    const { deleteFriend, changeNickname, updateFriends, friends } = useFriendService();
    const { user } = useUserService();
    const {createChat} = useChatBoxService();

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
        getGroupMember(id, user.userId);
    }
    const deleteFriendById = () => {
        console.log("delete friend ")
        if (!(friendDetail.userId === '')) {
            deleteFriend(user.userId, friendDetail.userId)
        }
        setCurrentBox(0)
    }

    const changeFriendNickName = (newName: string) => {
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

    }

    const getFriendDetail = (
        friend_id: string
    ) => {
        setLoading(true)
        const tempUser = new IUser();
        console.log('change User box' + friend_id)
        Axios.get('account/' + friend_id).then((res) => {
            tempUser.userId = res.data['self']['id'];
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

            friends.forEach(item => {
                if(item.id === friend_id){
                    tempUser.nickname = ((item.nickname==='')?item.nickname:res.data['self']['nickname'])
                }
            })
            setFriendDetail(tempUser)
            setLoading(false)
        })
    }

    const createChatBox = () => {
        createChat(friendDetail.userId, friendDetail.nickname, false)
    }

    return {
        currentUserBoxId, setUserBoxId,
        friendDetail, setFriendDetail,
        changeUser, deleteFriendById, changeFriendNickName, changeGroup,createChatBox,
        currentBox, setCurrentBox,
        groupId, setGroupId,
        userloading
    };
});
