/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.noti = (function() {

    /**
     * Namespace noti.
     * @exports noti
     * @namespace
     */
    var noti = {};

    noti.Notification = (function() {

        /**
         * Properties of a Notification.
         * @memberof noti
         * @interface INotification
         * @property {string|null} [sender] Notification sender
         * @property {string|null} [receiver] Notification receiver
         * @property {noti.Notification.NotiType|null} [notificationType] Notification notificationType
         * @property {string|null} [content] Notification content
         * @property {string|null} [createAt] Notification createAt
         */

        /**
         * Constructs a new Notification.
         * @memberof noti
         * @classdesc Represents a Notification.
         * @implements INotification
         * @constructor
         * @param {noti.INotification=} [properties] Properties to set
         */
        function Notification(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Notification sender.
         * @member {string} sender
         * @memberof noti.Notification
         * @instance
         */
        Notification.prototype.sender = "";

        /**
         * Notification receiver.
         * @member {string} receiver
         * @memberof noti.Notification
         * @instance
         */
        Notification.prototype.receiver = "";

        /**
         * Notification notificationType.
         * @member {noti.Notification.NotiType} notificationType
         * @memberof noti.Notification
         * @instance
         */
        Notification.prototype.notificationType = 0;

        /**
         * Notification content.
         * @member {string} content
         * @memberof noti.Notification
         * @instance
         */
        Notification.prototype.content = "";

        /**
         * Notification createAt.
         * @member {string} createAt
         * @memberof noti.Notification
         * @instance
         */
        Notification.prototype.createAt = "";

        /**
         * Creates a new Notification instance using the specified properties.
         * @function create
         * @memberof noti.Notification
         * @static
         * @param {noti.INotification=} [properties] Properties to set
         * @returns {noti.Notification} Notification instance
         */
        Notification.create = function create(properties) {
            return new Notification(properties);
        };

        /**
         * Encodes the specified Notification message. Does not implicitly {@link noti.Notification.verify|verify} messages.
         * @function encode
         * @memberof noti.Notification
         * @static
         * @param {noti.INotification} message Notification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notification.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
            if (message.receiver != null && Object.hasOwnProperty.call(message, "receiver"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.receiver);
            if (message.notificationType != null && Object.hasOwnProperty.call(message, "notificationType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.notificationType);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.content);
            if (message.createAt != null && Object.hasOwnProperty.call(message, "createAt"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.createAt);
            return writer;
        };

        /**
         * Encodes the specified Notification message, length delimited. Does not implicitly {@link noti.Notification.verify|verify} messages.
         * @function encodeDelimited
         * @memberof noti.Notification
         * @static
         * @param {noti.INotification} message Notification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notification.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Notification message from the specified reader or buffer.
         * @function decode
         * @memberof noti.Notification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {noti.Notification} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notification.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.noti.Notification();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.receiver = reader.string();
                    break;
                case 3:
                    message.notificationType = reader.int32();
                    break;
                case 4:
                    message.content = reader.string();
                    break;
                case 5:
                    message.createAt = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Notification message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof noti.Notification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {noti.Notification} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notification.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Notification message.
         * @function verify
         * @memberof noti.Notification
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Notification.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            if (message.receiver != null && message.hasOwnProperty("receiver"))
                if (!$util.isString(message.receiver))
                    return "receiver: string expected";
            if (message.notificationType != null && message.hasOwnProperty("notificationType"))
                switch (message.notificationType) {
                default:
                    return "notificationType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.createAt != null && message.hasOwnProperty("createAt"))
                if (!$util.isString(message.createAt))
                    return "createAt: string expected";
            return null;
        };

        /**
         * Creates a Notification message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof noti.Notification
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {noti.Notification} Notification
         */
        Notification.fromObject = function fromObject(object) {
            if (object instanceof $root.noti.Notification)
                return object;
            var message = new $root.noti.Notification();
            if (object.sender != null)
                message.sender = String(object.sender);
            if (object.receiver != null)
                message.receiver = String(object.receiver);
            switch (object.notificationType) {
            case "N_FRIEND_ADD_APPLICATION":
            case 0:
                message.notificationType = 0;
                break;
            case "N_FRIEND_ADD_RESULT":
            case 1:
                message.notificationType = 1;
                break;
            case "N_FRIEND_DELETE_RESULT":
            case 2:
                message.notificationType = 2;
                break;
            case "N_GROUP_JOIN_APPLICATION":
            case 3:
                message.notificationType = 3;
                break;
            case "N_GROUP_JOIN_RESULT":
            case 4:
                message.notificationType = 4;
                break;
            case "N_GROUP_WITHDRAW_RESULT":
            case 5:
                message.notificationType = 5;
                break;
            case "N_GROUP_KICKOFF_RESULT":
            case 6:
                message.notificationType = 6;
                break;
            }
            if (object.content != null)
                message.content = String(object.content);
            if (object.createAt != null)
                message.createAt = String(object.createAt);
            return message;
        };

        /**
         * Creates a plain object from a Notification message. Also converts values to other types if specified.
         * @function toObject
         * @memberof noti.Notification
         * @static
         * @param {noti.Notification} message Notification
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Notification.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sender = "";
                object.receiver = "";
                object.notificationType = options.enums === String ? "N_FRIEND_ADD_APPLICATION" : 0;
                object.content = "";
                object.createAt = "";
            }
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            if (message.receiver != null && message.hasOwnProperty("receiver"))
                object.receiver = message.receiver;
            if (message.notificationType != null && message.hasOwnProperty("notificationType"))
                object.notificationType = options.enums === String ? $root.noti.Notification.NotiType[message.notificationType] : message.notificationType;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.createAt != null && message.hasOwnProperty("createAt"))
                object.createAt = message.createAt;
            return object;
        };

        /**
         * Converts this Notification to JSON.
         * @function toJSON
         * @memberof noti.Notification
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Notification.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * NotiType enum.
         * @name noti.Notification.NotiType
         * @enum {number}
         * @property {number} N_FRIEND_ADD_APPLICATION=0 N_FRIEND_ADD_APPLICATION value
         * @property {number} N_FRIEND_ADD_RESULT=1 N_FRIEND_ADD_RESULT value
         * @property {number} N_FRIEND_DELETE_RESULT=2 N_FRIEND_DELETE_RESULT value
         * @property {number} N_GROUP_JOIN_APPLICATION=3 N_GROUP_JOIN_APPLICATION value
         * @property {number} N_GROUP_JOIN_RESULT=4 N_GROUP_JOIN_RESULT value
         * @property {number} N_GROUP_WITHDRAW_RESULT=5 N_GROUP_WITHDRAW_RESULT value
         * @property {number} N_GROUP_KICKOFF_RESULT=6 N_GROUP_KICKOFF_RESULT value
         */
        Notification.NotiType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "N_FRIEND_ADD_APPLICATION"] = 0;
            values[valuesById[1] = "N_FRIEND_ADD_RESULT"] = 1;
            values[valuesById[2] = "N_FRIEND_DELETE_RESULT"] = 2;
            values[valuesById[3] = "N_GROUP_JOIN_APPLICATION"] = 3;
            values[valuesById[4] = "N_GROUP_JOIN_RESULT"] = 4;
            values[valuesById[5] = "N_GROUP_WITHDRAW_RESULT"] = 5;
            values[valuesById[6] = "N_GROUP_KICKOFF_RESULT"] = 6;
            return values;
        })();

        return Notification;
    })();

    return noti;
})();

module.exports = $root;
