import { IMsg, Msg, MsgType, ContentType } from 'models/msg';
import Serializer from 'models/pipeline/backend/serializer';
import TextSerializer from 'models/pipeline/backend/serializer/backend/text';


describe('protobuf serializer', () => {
    test('serialize text msg', () => {
        const serializer = new Serializer(new TextSerializer());

        const textObj: IMsg = {
            msgId: '12345678',
            msgType: MsgType.P2P,
            contentType: ContentType.TEXT,
            sender: '4j6hh3jk23',
            receiver: 'cv8df678e4',
            content: 'hello world',
        }
        const textMsg = Msg.fromObject(textObj);

        expect(serializer.deserialize(serializer.serialize(textMsg))).toEqual(textMsg);
    });

    // TODO: test image msg
});
