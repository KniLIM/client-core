import * as $protobuf from "protobufjs";
/** Namespace msg. */
export namespace msg {

    /** Properties of a Msg. */
    interface IMsg {

        /** Msg msgId */
        msgId?: (string|null);

        /** Msg msgType */
        msgType?: (msg.Msg.MsgType|null);

        /** Msg contentType */
        contentType?: (msg.Msg.ContentType|null);

        /** Msg sender */
        sender?: (string|null);

        /** Msg receiver */
        receiver?: (string|null);

        /** Msg createAt */
        createAt?: (number|Long|null);

        /** Msg content */
        content?: (string|null);
    }

    /** Represents a Msg. */
    class Msg implements IMsg {

        /**
         * Constructs a new Msg.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMsg);

        /** Msg msgId. */
        public msgId: string;

        /** Msg msgType. */
        public msgType: msg.Msg.MsgType;

        /** Msg contentType. */
        public contentType: msg.Msg.ContentType;

        /** Msg sender. */
        public sender: string;

        /** Msg receiver. */
        public receiver: string;

        /** Msg createAt. */
        public createAt: (number|Long);

        /** Msg content. */
        public content: string;

        /**
         * Creates a new Msg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Msg instance
         */
        public static create(properties?: msg.IMsg): msg.Msg;

        /**
         * Encodes the specified Msg message. Does not implicitly {@link msg.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link msg.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Msg;

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Msg;

        /**
         * Verifies a Msg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Msg
         */
        public static fromObject(object: { [k: string]: any }): msg.Msg;

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @param message Msg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Msg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Msg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Msg {

        /** MsgType enum. */
        enum MsgType {
            P2P = 0,
            P2G = 1
        }

        /** ContentType enum. */
        enum ContentType {
            WITHDRAW = 0,
            TEXT = 1,
            IMAGE = 2,
            FILE = 3,
            AUDIO = 4,
            VIDEO = 5
        }
    }
}
