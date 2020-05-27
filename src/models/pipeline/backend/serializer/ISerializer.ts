export default interface ISerializer {
    serialize(item: any): any;
    deserialize(data: Uint8Array, checkpoint?: string): any;
}
