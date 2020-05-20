import IPipeline from 'models/pipeline/IPipeline';

export default interface PipelineFactory {
    getPipeline(): IPipeline;
};
