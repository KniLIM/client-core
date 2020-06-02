import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export interface IGroup {
    readonly id: string,
    readonly owner: string,
    readonly avatar: string,
    readonly signature: string,
    readonly announcement: string,
    readonly createAt: Date,
};

export default createModel(() => {
    const [groups, setGroups] = useState<Array<IGroup>>();

    const isInGroup = (id: string) => {
        if (!groups) return false;

        for (let group of groups) {
            if (group.id === id) {
                return true;
            }
        }

        return false;
    };

    const joinGroup = () => {
        // TODO
    };

    return {
        groups, setGroups,
        joinGroup,
    };
});
