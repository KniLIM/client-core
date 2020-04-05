export default interface ICompressor {
    compress(input: Uint8Array): Uint8Array;
    decompress(input: Uint8Array): Uint8Array;
}
