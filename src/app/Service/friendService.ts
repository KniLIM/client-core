import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export class IFriend {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public createAt: Date = new Date()
}

export default createModel(() => {
    const [friends, setFriends] = useState<Array<IFriend>>([]);

    const isFriend = (id: string) => {
        if (!friends) return false;

        for (let friend of friends) {
            if (friend.id === id) {
                return true;
            }
        }

        return false;
    };

    const addFriend = () => {
        // TODO
    };

    const deleteFriend = () => {
        // TODO
    };

    return {
        friends, setFriends,
        addFriend, deleteFriend,
    };
});
