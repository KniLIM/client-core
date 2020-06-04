import Base64Encryptor from 'models/pipeline/backend/encryptor/base64';
import { IMsg, Msg, MsgType, ContentType } from 'models/msg';
import MsgSerializer from 'models/pipeline/backend/serializer/MsgProtoBufSerializer';


describe('base64 encryptor', () => {
    const encryptor = new Base64Encryptor();
    const content = Buffer.from('hello world');
    const serializer = new MsgSerializer();

    const textObj: IMsg = {
        msgId: '12345678',
        msgType: MsgType.P2P,
        contentType: ContentType.TEXT,
        sender: '4j6hh3jk23',
        receiver: 'cv8df678e4',
        content: 'hello world',
    }
    const textMsg = Msg.fromObject(textObj);

    test('encrypt', () => {
        expect(encryptor.decrypt(encryptor.encrypt(content))).toEqual(content);
    });

    test('after serialize', () => {
        const tmp = serializer.serialize(textMsg);
        expect(serializer.deserialize(encryptor.decrypt(encryptor.encrypt(tmp.content))).toObj())
            .toEqual({ ...textMsg, createAt: textMsg.getCreateAt() });
    });
});
