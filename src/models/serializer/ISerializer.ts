import { MsgType, ContentType } from 'msg';

export default interface ISerializer {
    serialize(item: any): Uint8Array;
    deserialize(data: Uint8Array): any;
}

export interface IMsgAdapter {
    msgId: string,
    msgType: MsgType,
    contentType: ContentType,
    sender: string,
    receiver: string,
    createAt: number,
    content: Uint8Array,
}
