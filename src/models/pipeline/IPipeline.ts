export default interface IPipeline {
    forward(input: any): Uint8Array;
    backward(data: Uint8Array): any;
}
