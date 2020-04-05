import { Msg, MsgType, ContentType, IMsg } from 'msg';


export default class TextMsg extends Msg {
    private content: string;

    private constructor(msgId: string, msgType: MsgType, contentType: ContentType,
        sender: string, receiver: string, content: string) {
        super(msgId, msgType, contentType, sender, receiver);
        this.content = content;
    }

    public static fromObject(obj: IMsg) {
        return new TextMsg(obj.msgId, obj.msgType, obj.contentType, obj.sender,
            obj.receiver, obj.content as string);
    }

    public getContent(): string {
        return this.content;
    }
}
