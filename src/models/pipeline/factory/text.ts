import PipelineFactory from 'models/pipeline/factory/index';
import IPipeline from 'models/pipeline/IPipeline';
import Serializer from 'models/pipeline/backend/serializer';
import TextSerializer from 'models/pipeline/backend/serializer/backend/text';
import SerializePipeline from 'models/pipeline/decorator/serialize';
import EncryptPipeline from 'models/pipeline/decorator/encrypt';


export default class TextPipelineFactory implements PipelineFactory {
    public getPipeline(): IPipeline {
        return new EncryptPipeline(new SerializePipeline(new Serializer(new TextSerializer())));
    }
};
