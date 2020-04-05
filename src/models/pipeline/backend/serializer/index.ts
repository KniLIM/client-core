import { Msg, ContentType, IMsg, ISerializedContentMsg } from 'msg';
import TextMsg from 'msg/text';
import ImageMsg from 'msg/image';
import ISerializer from 'serializer/ISerializer';
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
        const msgAdapter: ISerializedContentMsg = {
            ...item.toObj(), content: serializedContent
        }
        return this.backend.serialize(msgAdapter);
    }

    public deserialize(data: Uint8Array): Msg {
        const msgAdapter: ISerializedContentMsg = this.backend.deserialize(data);
        const deserializedContent = this.proxy.deserialize(msgAdapter.content);
        const msgObj: IMsg = { ...msgAdapter, content: deserializedContent };

        switch (msgAdapter.contentType) {
            case ContentType.TEXT:
                return TextMsg.fromObject(msgObj);
            case ContentType.IMAGE:
                return ImageMsg.fromObject(msgObj);
            default:
                throw new Error('error msg type');
        }
    }
}
