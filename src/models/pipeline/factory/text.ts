import IPipelineFactory from 'models/pipeline/factory/index';
import IPipeline from 'models/pipeline/IPipeline';
import SerializePipeline, { SerializeDecorator } from 'models/pipeline/decorator/serialize';
import EncryptDecorator from 'models/pipeline/decorator/encrypt';
import MsgSerializer from 'models/pipeline/backend/serializer/MsgProtoBufSerializer';
import RedundanceSerializer from 'models/pipeline/backend/serializer/RedundanceProtoBufSerilizer';


export default class TextPipelineFactory implements IPipelineFactory {
    public getPipeline(): IPipeline {
        return new SerializeDecorator(new SerializePipeline(
            new MsgSerializer()), new RedundanceSerializer());
    }
};
