import { Msg } from 'msg';
import { IPipeline } from 'pipeline/IPipeline';
import Serializer from 'serializer';


export default class SerializePipeline implements IPipeline {
    private backend: Serializer;

    public constructor(backend: Serializer) {
        this.backend = backend;
    }

    public forward(input: Msg): Uint8Array {
        return this.backend.serialize(input);
    }

    public backward(data: Uint8Array): Msg {
        return this.backend.deserialize(data);
    }
}
