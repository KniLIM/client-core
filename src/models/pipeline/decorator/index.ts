import IPipeline from 'models/pipeline/IPipeline';


export default abstract class PipelineDecorator implements IPipeline {
    protected wrapper: IPipeline;

    public constructor(wrapper: IPipeline) {
        this.wrapper = wrapper;
    }

    public abstract forward(input: any): Uint8Array;
    public abstract backward(data: Uint8Array): any;
};
