import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export class IConnect {
    public host: string = ''
    public port: number = 0
    public token: string = ''
};

export default createModel(() => {
    const [connect, setConnect] = useState<IConnect>(new IConnect());

    return {
        connect, setConnect
    };
});
