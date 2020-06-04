import * as $protobuf from "protobufjs";
/** Namespace redundance. */
export namespace redundance {

    /** Properties of a Redundance. */
    interface IRedundance {

        /** Redundance msgType */
        msgType?: (redundance.Redundance.MsgType|null);

        /** Redundance sender */
        sender?: (string|null);

        /** Redundance receiver */
        receiver?: (string|null);

        /** Redundance device */
        device?: (string|null);

        /** Redundance content */
        content?: (Uint8Array|null);
    }

    /** Represents a Redundance. */
    class Redundance implements IRedundance {

        /**
         * Constructs a new Redundance.
         * @param [properties] Properties to set
         */
        constructor(properties?: redundance.IRedundance);

        /** Redundance msgType. */
        public msgType: redundance.Redundance.MsgType;

        /** Redundance sender. */
        public sender: string;

        /** Redundance receiver. */
        public receiver: string;

        /** Redundance device. */
        public device: string;

        /** Redundance content. */
        public content: Uint8Array;

        /**
         * Creates a new Redundance instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Redundance instance
         */
        public static create(properties?: redundance.IRedundance): redundance.Redundance;

        /**
         * Encodes the specified Redundance message. Does not implicitly {@link redundance.Redundance.verify|verify} messages.
         * @param message Redundance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: redundance.IRedundance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Redundance message, length delimited. Does not implicitly {@link redundance.Redundance.verify|verify} messages.
         * @param message Redundance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: redundance.IRedundance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Redundance message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Redundance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): redundance.Redundance;

        /**
         * Decodes a Redundance message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Redundance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): redundance.Redundance;

        /**
         * Verifies a Redundance message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Redundance message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Redundance
         */
        public static fromObject(object: { [k: string]: any }): redundance.Redundance;

        /**
         * Creates a plain object from a Redundance message. Also converts values to other types if specified.
         * @param message Redundance
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: redundance.Redundance, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Redundance to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Redundance {

        /** MsgType enum. */
        enum MsgType {
            P2P = 0,
            P2G = 1
        }
    }
}
