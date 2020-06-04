/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.msg = (function() {

    /**
     * Namespace msg.
     * @exports msg
     * @namespace
     */
    var msg = {};

    msg.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof msg
         * @interface IMsg
         * @property {string} msgId Msg msgId
         * @property {msg.Msg.MsgType} msgType Msg msgType
         * @property {msg.Msg.ContentType} contentType Msg contentType
         * @property {string} sender Msg sender
         * @property {string} receiver Msg receiver
         * @property {google.protobuf.ITimestamp} createAt Msg createAt
         * @property {string} content Msg content
         */

        /**
         * Constructs a new Msg.
         * @memberof msg
         * @classdesc Represents a Msg.
         * @implements IMsg
         * @constructor
         * @param {msg.IMsg=} [properties] Properties to set
         */
        function Msg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg msgId.
         * @member {string} msgId
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.msgId = "";

        /**
         * Msg msgType.
         * @member {msg.Msg.MsgType} msgType
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.msgType = 0;

        /**
         * Msg contentType.
         * @member {msg.Msg.ContentType} contentType
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.contentType = 0;

        /**
         * Msg sender.
         * @member {string} sender
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.sender = "";

        /**
         * Msg receiver.
         * @member {string} receiver
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.receiver = "";

        /**
         * Msg createAt.
         * @member {google.protobuf.ITimestamp} createAt
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.createAt = null;

        /**
         * Msg content.
         * @member {string} content
         * @memberof msg.Msg
         * @instance
         */
        Msg.prototype.content = "";

        /**
         * Creates a new Msg instance using the specified properties.
         * @function create
         * @memberof msg.Msg
         * @static
         * @param {msg.IMsg=} [properties] Properties to set
         * @returns {msg.Msg} Msg instance
         */
        Msg.create = function create(properties) {
            return new Msg(properties);
        };

        /**
         * Encodes the specified Msg message. Does not implicitly {@link msg.Msg.verify|verify} messages.
         * @function encode
         * @memberof msg.Msg
         * @static
         * @param {msg.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.msgId);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.msgType);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.contentType);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.sender);
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.receiver);
            $root.google.protobuf.Timestamp.encode(message.createAt, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link msg.Msg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Msg
         * @static
         * @param {msg.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Msg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.string();
                    break;
                case 2:
                    message.msgType = reader.int32();
                    break;
                case 3:
                    message.contentType = reader.int32();
                    break;
                case 4:
                    message.sender = reader.string();
                    break;
                case 5:
                    message.receiver = reader.string();
                    break;
                case 6:
                    message.createAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("msgId"))
                throw $util.ProtocolError("missing required 'msgId'", { instance: message });
            if (!message.hasOwnProperty("msgType"))
                throw $util.ProtocolError("missing required 'msgType'", { instance: message });
            if (!message.hasOwnProperty("contentType"))
                throw $util.ProtocolError("missing required 'contentType'", { instance: message });
            if (!message.hasOwnProperty("sender"))
                throw $util.ProtocolError("missing required 'sender'", { instance: message });
            if (!message.hasOwnProperty("receiver"))
                throw $util.ProtocolError("missing required 'receiver'", { instance: message });
            if (!message.hasOwnProperty("createAt"))
                throw $util.ProtocolError("missing required 'createAt'", { instance: message });
            if (!message.hasOwnProperty("content"))
                throw $util.ProtocolError("missing required 'content'", { instance: message });
            return message;
        };

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Msg message.
         * @function verify
         * @memberof msg.Msg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Msg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.msgId))
                return "msgId: string expected";
            switch (message.msgType) {
            default:
                return "msgType: enum value expected";
            case 0:
            case 1:
                break;
            }
            switch (message.contentType) {
            default:
                return "contentType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
            if (!$util.isString(message.sender))
                return "sender: string expected";
            if (!$util.isString(message.receiver))
                return "receiver: string expected";
            {
                var error = $root.google.protobuf.Timestamp.verify(message.createAt);
                if (error)
                    return "createAt." + error;
            }
            if (!$util.isString(message.content))
                return "content: string expected";
            return null;
        };

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Msg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Msg} Msg
         */
        Msg.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Msg)
                return object;
            var message = new $root.msg.Msg();
            if (object.msgId != null)
                message.msgId = String(object.msgId);
            switch (object.msgType) {
            case "P2P":
            case 0:
                message.msgType = 0;
                break;
            case "P2G":
            case 1:
                message.msgType = 1;
                break;
            }
            switch (object.contentType) {
            case "WITHDRAW":
            case 0:
                message.contentType = 0;
                break;
            case "TEXT":
            case 1:
                message.contentType = 1;
                break;
            case "IMAGE":
            case 2:
                message.contentType = 2;
                break;
            case "FILE":
            case 3:
                message.contentType = 3;
                break;
            case "AUDIO":
            case 4:
                message.contentType = 4;
                break;
            case "VIDEO":
            case 5:
                message.contentType = 5;
                break;
            }
            if (object.sender != null)
                message.sender = String(object.sender);
            if (object.receiver != null)
                message.receiver = String(object.receiver);
            if (object.createAt != null) {
                if (typeof object.createAt !== "object")
                    throw TypeError(".msg.Msg.createAt: object expected");
                message.createAt = $root.google.protobuf.Timestamp.fromObject(object.createAt);
            }
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Msg
         * @static
         * @param {msg.Msg} message Msg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Msg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgId = "";
                object.msgType = options.enums === String ? "P2P" : 0;
                object.contentType = options.enums === String ? "WITHDRAW" : 0;
                object.sender = "";
                object.receiver = "";
                object.createAt = null;
                object.content = "";
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                object.msgType = options.enums === String ? $root.msg.Msg.MsgType[message.msgType] : message.msgType;
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                object.contentType = options.enums === String ? $root.msg.Msg.ContentType[message.contentType] : message.contentType;
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            if (message.receiver != null && message.hasOwnProperty("receiver"))
                object.receiver = message.receiver;
            if (message.createAt != null && message.hasOwnProperty("createAt"))
                object.createAt = $root.google.protobuf.Timestamp.toObject(message.createAt, options);
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this Msg to JSON.
         * @function toJSON
         * @memberof msg.Msg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Msg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * MsgType enum.
         * @name msg.Msg.MsgType
         * @enum {number}
         * @property {number} P2P=0 P2P value
         * @property {number} P2G=1 P2G value
         */
        Msg.MsgType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "P2P"] = 0;
            values[valuesById[1] = "P2G"] = 1;
            return values;
        })();

        /**
         * ContentType enum.
         * @name msg.Msg.ContentType
         * @enum {number}
         * @property {number} WITHDRAW=0 WITHDRAW value
         * @property {number} TEXT=1 TEXT value
         * @property {number} IMAGE=2 IMAGE value
         * @property {number} FILE=3 FILE value
         * @property {number} AUDIO=4 AUDIO value
         * @property {number} VIDEO=5 VIDEO value
         */
        Msg.ContentType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "WITHDRAW"] = 0;
            values[valuesById[1] = "TEXT"] = 1;
            values[valuesById[2] = "IMAGE"] = 2;
            values[valuesById[3] = "FILE"] = 3;
            values[valuesById[4] = "AUDIO"] = 4;
            values[valuesById[5] = "VIDEO"] = 5;
            return values;
        })();

        return Msg;
    })();

    return msg;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
