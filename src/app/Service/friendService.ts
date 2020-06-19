import { useState } from 'react';
import { createModel } from 'hox';
import Axios from 'axios';

export class IFriend {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public createAt: Date = new Date()
}
export class IFriendInfo {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public avatar: string = ''
}

const friendService = 'friend/';

export default createModel(() => {
    

    const [friends, setFriends] = useState<Array<IFriend>>([]);
    const [loading, setLoading] = useState(false);
    const [friendList, setFriendList] = useState<Array<IFriendInfo>>([]);

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
        Axios.delete(friendService, { params: params }).then();
    };


    const getFriendList = () =>{
        console.log("getFriendList")
        const tempfriend: Array<IFriendInfo> = [];
        for(let f of friends){
            const temp = new IFriendInfo()
            temp.id = f.id
            temp.isBlack = f.isBlack
            temp.isTop = f.isTop
            temp.nickname = f.nickname
            Axios.get('account/' + f.id).then((res) => {
                temp.avatar = res.data['self']['avatar'];
            })
            tempfriend.push(temp);
        }
        setFriendList(tempfriend)
    };

    return {
        IFriend, friends, setFriends, isFriend, friendList,
        addFriend, deleteFriend, getFriendList,
    };
});
