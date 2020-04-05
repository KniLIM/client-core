import { IPipeline, PipelineDecorator } from 'pipeline/IPipeline';


export default class CompressDecorator extends PipelineDecorator {
    public constructor(wrapper: IPipeline) {
        super(wrapper);
    }

    private compress(input: Uint8Array): Uint8Array {
        return input;
    }

    private decompress(input: Uint8Array): Uint8Array {
        return input;
    }

    public forward(input: Uint8Array): Uint8Array {
        return this.compress(this.wrapper.forward(input));
    }

    public backward(input: Uint8Array): Uint8Array {
        return this.wrapper.backward(this.decompress(input));
    }
}
