import IPipeline from 'models/pipeline/IPipeline';

export default interface IPipelineFactory {
    getPipeline(): IPipeline;
};
