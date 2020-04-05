import Serializer from 'serializer';
import TextSerializer from 'serializer/backend/text';
import ImageSerializer from 'serializer/backend/image';
import SerializePipeline from 'pipeline/serialize';
import EncryptPipeline from 'pipeline/encrypt';
import CompressPipeline from 'pipeline/compress';


export const textPipeline = () =>
    new EncryptPipeline(new SerializePipeline(new Serializer(new TextSerializer())));

export const imagePipeline = () =>
    new CompressPipeline(new EncryptPipeline(new SerializePipeline(new Serializer(new ImageSerializer()))));

