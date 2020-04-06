import { Msg, IMsg, MsgType, ContentType } from 'models/msg';
import { textPipeline } from 'models/pipeline';


describe('pipeline', () => {
    test('text pipeline', () => {
        const textObj: IMsg = {
            msgId: '12345678',
            msgType: MsgType.P2P,
            contentType: ContentType.TEXT,
            sender: '4j6hh3jk23',
            receiver: 'cv8df678e4',
            content: 'hello world',
        }
        const textMsg = Msg.fromObject(textObj);

        const pipeline = textPipeline();
        expect(pipeline.backward(pipeline.forward(textMsg)) as Msg).toEqual(textMsg);
    });

    // image pipeline
});
