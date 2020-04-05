import { Msg, MsgType, ContentType, IMsg } from 'msg';
import images from 'images';


export default class ImageMsg extends Msg {
    private content: images.ImagesStatic;

    private constructor(msgId: string, msgType: MsgType, contentType: ContentType,
        sender: string, receiver: string, content: any) {
        super(msgId, msgType, contentType, sender, receiver);

        // content maybe filename: string, bytes: Buffer, image: ImagesStatic
        this.content = images(content);
    }

    public static fromObject(obj: IMsg) {
        return new ImageMsg(obj.msgId, obj.msgType, obj.contentType, obj.sender,
            obj.receiver, obj.content);
    }

    public getContent(): images.ImagesStatic {
        return this.content;
    }
}
