import PipelineFactory from 'models/pipeline/factory/index';
import IPipeline from 'models/pipeline/IPipeline';
import Serializer from 'models/pipeline/backend/serializer';
import ImageSerializer from 'models/pipeline/backend/serializer/backend/image';
import SerializePipeline from 'models/pipeline/decorator/serialize';
import EncryptPipeline from 'models/pipeline/decorator/encrypt';
import CompressPipeline from 'models/pipeline/decorator/compress'


export default class ImagePipelineFactory implements PipelineFactory {
    public getPipeline(): IPipeline {
        return new EncryptPipeline(new CompressPipeline(new SerializePipeline(new Serializer(new ImageSerializer()))));
    }
};
