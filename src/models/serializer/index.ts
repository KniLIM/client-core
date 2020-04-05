import { Msg, MsgType, ContentType } from 'msg';
import TextMsg from 'msg/text';
import ImageMsg from 'msg/image';
import ISerializer, { IMsgAdapter } from 'serializer/ISerializer';
import ProtoBufSerializer from 'serializer/backend/msg'


// 对整个消息进行序列化
export default class Serializer implements ISerializer {
    private proxy: ISerializer;     // 对异构的 content 进行序列化
    private backend: ISerializer;   // 对整个 Msg 进行序列化

    public constructor(proxy: ISerializer, backend: ISerializer = new ProtoBufSerializer()) {
        this.proxy = proxy;
        this.backend = backend;
    }

    public serialize(item: Msg): Uint8Array {
        const serializedContent = this.proxy.serialize(item.getContent());
        const msgAdapter: IMsgAdapter = {
            msgId: item.getMsgId(),
            msgType: item.getMsgType(),
            contentType: item.getContentType(),
            sender: item.getSender(),
            receiver: item.getReceiver(),
            createAt: item.getCreateAt(),
            content: serializedContent,
        }
        return this.backend.serialize(msgAdapter);
    }

    public deserialize(data: Uint8Array): Msg {
        const msgAdapter: IMsgAdapter = this.backend.deserialize(data);
        const deserializedContent = this.proxy.deserialize(msgAdapter.content);

        switch (msgAdapter.contentType) {
            case ContentType.TEXT:
                return Serializer.makeMsg(msgAdapter, deserializedContent, TextMsg);
            case ContentType.IMAGE:
                return Serializer.makeMsg(msgAdapter, deserializedContent, ImageMsg);
            default:
                throw new Error('error msg type');
        }
    }

    private static makeMsg<T extends Msg>(msgAdapter: IMsgAdapter, content: any,
        TCreator: new(msgId: string, msgType: MsgType, contentType: ContentType,
            sender: string, receiver: string, content: any) => T) {
        return new TCreator(
            msgAdapter.msgId, msgAdapter.msgType, msgAdapter.contentType,
            msgAdapter.sender, msgAdapter.receiver, content
        );
    }
}
