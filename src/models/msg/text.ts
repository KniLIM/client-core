import { Msg, MsgType, ContentType } from 'msg';


export default class TextMsg extends Msg {
    private content: string;

    public constructor(msgId: string, msgType: MsgType, contentType: ContentType,
        sender: string, receiver: string, content: string) {
        super(msgId, msgType, contentType, sender, receiver);
        this.content = content;
    }

    public getContent(): string {
        return this.content;
    }
}
