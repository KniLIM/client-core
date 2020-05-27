import { Msg, ISerializedContentMsg } from 'models/msg';
import ISerializer from 'models/pipeline/backend/serializer/ISerializer';
import ProtoBufSerializer from 'models/pipeline/backend/serializer/backend/msg';


// 对整个消息进行序列化
export default class Serializer implements ISerializer {
    private proxy: ISerializer;     // 对异构的 content 进行序列化
    private backend: ISerializer;   // 对整个 Msg 进行序列化

    public constructor(proxy: ISerializer, backend: ISerializer = new ProtoBufSerializer()) {
        this.proxy = proxy;
        this.backend = backend;
    }

    public serialize(item: any): any {
        const serializedContent = this.proxy.serialize(item.getContent());
        const msgAdapter: ISerializedContentMsg = {
            ...item.toObj(), content: serializedContent
        }
        return this.backend.serialize(msgAdapter);
    }

    public deserialize(data: Uint8Array): Msg {
        const msgAdapter: ISerializedContentMsg = this.backend.deserialize(data);
        const content = this.proxy.deserialize(msgAdapter.content, msgAdapter.msgId);
        return Msg.fromObject({ ...msgAdapter, content: content });
    }
}
