import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';
import {IUser} from './userService';

export class IFriend {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public createAt: Date = new Date()
    public avatar: string = ''
}

const friendService = 'friend/';

export default createModel(() => {


    const [friends, setFriends] = useState<Array<IFriend>>([]);
    const [loading, setLoading] = useState(false);
    const [searchRes, setSearchRes] = useState<Array<IUser>>([]);

    const isFriend = (id: string) => {
        if (!friends) return false;

        for (let friend of friends) {
            if (friend.id === id) {
                return true;
            }
        }

        return false;
    };

    const addFriend = (
        user_id: string,
        friend_id: string,
        u_name: string,
        instruction: string
    ) => {

        const params = {
            user_id: user_id,
            friend_id: friend_id,
            u_name: u_name,
            instruction: instruction
        };
        Axios.post(friendService + 'application', params).then();

    };

    const deleteFriend = (
        user_id: string,
        friend_id: string) => {
        const params = {
            user_id: user_id,
            friend_id: friend_id,
        };
        Axios.delete(friendService, {params: params}).then((res) => {
            console.log(res)
        });
    };

    const changeNickname = (
        user_id: string,
        friend_id: string,
        nickname: string
    ) => {
        const params = {
            user_id: user_id,
            friend_id: friend_id,
            nickname: nickname
        };
        Axios.patch(friendService + 'nickname', params).then((res) => {
            console.log(res)
        });
    };

    const updateFriends = (id: string) => {
        Axios.get(friendService + id).then((res) => {
            console.log(res)
            const friendList: Array<IFriend> = [];
            for (let f of res.data['result']) {
                const tempFriend = new IFriend()
                tempFriend.id = f['friend']
                tempFriend.nickname = f['nickname']
                tempFriend.createAt = f['createdAt']
                tempFriend.isBlack = f['isBlack']
                tempFriend.isTop = f['isTop']
                friendList.push(tempFriend)
            }
            setFriends(friendList)
        })
    };

    const searchFriendByKeyword = (keyword: string) => {
        // TODO
    }

    /**
     * 根据id返回好友头像
     * @param id
     */
    const searchPicFriendById= (id: string):string  => {
        let pic:string = '';
        friends.forEach((value: IFriend) => {
                return value.id === id ? (pic = value.avatar) : null;
            })
        return pic;
    }

    /**
     * 根据id返回好友name
     * @param id
     */
    const searchNameFriendById= (id: string):string  => {
        let pic:string = '';
        friends.forEach((value: IFriend) => {
            return value.id === id ? (pic = value.nickname) : null;
        })
        return pic;
    }

    return {
        IFriend, friends, setFriends, isFriend,
        addFriend, deleteFriend, loading, changeNickname, updateFriends, searchFriendByKeyword,
        searchRes,searchPicFriendById,searchNameFriendById
    };
});
