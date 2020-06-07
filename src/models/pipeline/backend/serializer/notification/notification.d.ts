import * as $protobuf from "protobufjs";
/** Namespace noti. */
export namespace noti {

    /** Properties of a Notification. */
    interface INotification {

        /** Notification sender */
        sender?: (string|null);

        /** Notification receiver */
        receiver?: (string|null);

        /** Notification notificationType */
        notificationType?: (noti.Notification.NotiType|null);

        /** Notification content */
        content?: (string|null);

        /** Notification createAt */
        createAt?: (string|null);
    }

    /** Represents a Notification. */
    class Notification implements INotification {

        /**
         * Constructs a new Notification.
         * @param [properties] Properties to set
         */
        constructor(properties?: noti.INotification);

        /** Notification sender. */
        public sender: string;

        /** Notification receiver. */
        public receiver: string;

        /** Notification notificationType. */
        public notificationType: noti.Notification.NotiType;

        /** Notification content. */
        public content: string;

        /** Notification createAt. */
        public createAt: string;

        /**
         * Creates a new Notification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Notification instance
         */
        public static create(properties?: noti.INotification): noti.Notification;

        /**
         * Encodes the specified Notification message. Does not implicitly {@link noti.Notification.verify|verify} messages.
         * @param message Notification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: noti.INotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Notification message, length delimited. Does not implicitly {@link noti.Notification.verify|verify} messages.
         * @param message Notification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: noti.INotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Notification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): noti.Notification;

        /**
         * Decodes a Notification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): noti.Notification;

        /**
         * Verifies a Notification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Notification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Notification
         */
        public static fromObject(object: { [k: string]: any }): noti.Notification;

        /**
         * Creates a plain object from a Notification message. Also converts values to other types if specified.
         * @param message Notification
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: noti.Notification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Notification to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Notification {

        /** NotiType enum. */
        enum NotiType {
            N_FRIEND_ADD_APPLICATION = 0,
            N_FRIEND_ADD_RESULT = 1,
            N_FRIEND_DELETE_RESULT = 2,
            N_GROUP_JOIN_APPLICATION = 3,
            N_GROUP_JOIN_RESULT = 4,
            N_GROUP_WITHDRAW_RESULT = 5,
            N_GROUP_KICKOFF_RESULT = 6
        }
    }
}
