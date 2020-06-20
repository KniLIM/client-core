import IPipelineFactory from 'models/pipeline/factory/index';
import IPipeline from 'models/pipeline/IPipeline';
import SerializePipeline from 'models/pipeline/decorator/serialize';
import EncryptDecorator from 'models/pipeline/decorator/encrypt';
import NotiSerializer from 'models/pipeline/backend/serializer/NotiProtoBufSerializer';


export default class TextPipelineFactory implements IPipelineFactory {
    public getPipeline(): IPipeline {
        return new SerializePipeline(new NotiSerializer());
    }
};
