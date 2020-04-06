import { MsgType, ContentType, ISerializedContentMsg } from 'models/msg';
import ProtoBufSerializer from 'models/pipeline/backend/serializer/backend/msg';
import TextSerializer from 'models/pipeline/backend/serializer/backend/text';


describe('protobuf serializer', () => {
    const serializer = new ProtoBufSerializer();

    test('serialize text msg', () => {
        const textSerializer = new TextSerializer();
        const textObj: ISerializedContentMsg = {
            msgId: '12345678',
            msgType: MsgType.P2P,
            contentType: ContentType.TEXT,
            sender: '4j6hh3jk23',
            receiver: 'cv8df678e4',
            createAt: Date.now(),
            content: textSerializer.serialize('hello world'),
        }

        expect(serializer.deserialize(serializer.serialize(textObj))).toEqual(textObj);
    });

    // TODO: test image msg
});
