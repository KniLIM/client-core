import { Msg, ISerializedMsg } from 'models/msg';
import IPipeline from 'models/pipeline/IPipeline';
import ISerializer from 'models/pipeline/backend/serializer';
import PipelineDecorator from 'models/pipeline/decorator';


export default class SerializePipeline implements IPipeline {
    private backend: ISerializer;

    public constructor(backend: ISerializer) {
        this.backend = backend;
    }

    public forward(input: Msg): ISerializedMsg {
        return this.backend.serialize(input);
    }

    public backward(data: Uint8Array): Msg {
        return this.backend.deserialize(data);
    }
}

export class SerializeDecorator extends PipelineDecorator {
    private backend: ISerializer;

    public constructor(wrapper: IPipeline, backend: ISerializer) {
        super(wrapper);
        this.backend = backend;
    }

    public forward(input: Msg): Uint8Array {
        return this.backend.serialize(this.wrapper.forward(input));
    }

    public backward(input: Uint8Array): Msg {
        return this.wrapper.backward(this.backend.deserialize(input));
    }
};
