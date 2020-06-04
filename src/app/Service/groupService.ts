import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export class IGroup {
    public id: string = ''
    public owner: string = ''
    public avatar: string = ''
    public signature: string = ''
    public announcement: string = ''
    public createAt: string = ''
}

export default createModel(() => {
    const [groups, setGroups] = useState<Array<IGroup>>([]);

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
        groups, setGroups,isInGroup,
        joinGroup,
    };
});
