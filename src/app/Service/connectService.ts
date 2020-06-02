import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';


export interface IConnect {
    readonly host: string,
    readonly port: number,
    readonly token: string,
};

export default createModel(() => {
    const [connect, setConnect] = useState<IConnect>();

    return {
        connect, setConnect
    };
});
