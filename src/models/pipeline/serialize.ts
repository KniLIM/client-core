import { Msg } from 'msg';
import { IPipeline } from 'pipeline/IPipeline';
import Serializer from 'serializer';


export default class SerializePipeline implements IPipeline {
    private serializer: Serializer;

    public constructor(serializer: Serializer) {
        this.serializer = serializer;
    }

    public forward(input: Msg): Uint8Array {
        return this.serializer.serialize(input);
    }

    public backward(data: Uint8Array): Msg {
        return this.serializer.deserialize(data);
    }
}
