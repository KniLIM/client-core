import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export interface IFriend {
    readonly id: string,
    readonly nickname: string,
    readonly isTop: boolean,
    readonly isBlack: boolean,
    readonly createAt: Date,
};

export default createModel(() => {
    const [friends, setFriends] = useState<Array<IFriend>>();

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
