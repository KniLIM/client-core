import Serializer from 'models/pipeline/backend/serializer';
import TextSerializer from 'models/pipeline/backend/serializer/backend/text';
import ImageSerializer from 'models/pipeline/backend/serializer/backend/image';
import SerializePipeline from 'models/pipeline/decorator/serialize';
import EncryptPipeline from 'models/pipeline/decorator/encrypt';
import CompressPipeline from 'models/pipeline/decorator/compress';


export const textPipeline = () =>
    new EncryptPipeline(new SerializePipeline(new Serializer(new TextSerializer())));

export const imagePipeline = () =>
    new CompressPipeline(new EncryptPipeline(new SerializePipeline(new Serializer(new ImageSerializer()))));
