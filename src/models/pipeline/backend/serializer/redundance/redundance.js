/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.redundance = (function() {

    /**
     * Namespace redundance.
     * @exports redundance
     * @namespace
     */
    var redundance = {};

    redundance.Redundance = (function() {

        /**
         * Properties of a Redundance.
         * @memberof redundance
         * @interface IRedundance
         * @property {redundance.Redundance.MsgType|null} [msgType] Redundance msgType
         * @property {string|null} [sender] Redundance sender
         * @property {string|null} [receiver] Redundance receiver
         * @property {string|null} [device] Redundance device
         * @property {Uint8Array|null} [content] Redundance content
         */

        /**
         * Constructs a new Redundance.
         * @memberof redundance
         * @classdesc Represents a Redundance.
         * @implements IRedundance
         * @constructor
         * @param {redundance.IRedundance=} [properties] Properties to set
         */
        function Redundance(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Redundance msgType.
         * @member {redundance.Redundance.MsgType} msgType
         * @memberof redundance.Redundance
         * @instance
         */
        Redundance.prototype.msgType = 0;

        /**
         * Redundance sender.
         * @member {string} sender
         * @memberof redundance.Redundance
         * @instance
         */
        Redundance.prototype.sender = "";

        /**
         * Redundance receiver.
         * @member {string} receiver
         * @memberof redundance.Redundance
         * @instance
         */
        Redundance.prototype.receiver = "";

        /**
         * Redundance device.
         * @member {string} device
         * @memberof redundance.Redundance
         * @instance
         */
        Redundance.prototype.device = "";

        /**
         * Redundance content.
         * @member {Uint8Array} content
         * @memberof redundance.Redundance
         * @instance
         */
        Redundance.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new Redundance instance using the specified properties.
         * @function create
         * @memberof redundance.Redundance
         * @static
         * @param {redundance.IRedundance=} [properties] Properties to set
         * @returns {redundance.Redundance} Redundance instance
         */
        Redundance.create = function create(properties) {
            return new Redundance(properties);
        };

        /**
         * Encodes the specified Redundance message. Does not implicitly {@link redundance.Redundance.verify|verify} messages.
         * @function encode
         * @memberof redundance.Redundance
         * @static
         * @param {redundance.IRedundance} message Redundance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Redundance.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.msgType);
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
            if (message.receiver != null && Object.hasOwnProperty.call(message, "receiver"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.receiver);
            if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.device);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.content);
            return writer;
        };

        /**
         * Encodes the specified Redundance message, length delimited. Does not implicitly {@link redundance.Redundance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof redundance.Redundance
         * @static
         * @param {redundance.IRedundance} message Redundance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Redundance.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Redundance message from the specified reader or buffer.
         * @function decode
         * @memberof redundance.Redundance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {redundance.Redundance} Redundance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Redundance.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.redundance.Redundance();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgType = reader.int32();
                    break;
                case 2:
                    message.sender = reader.string();
                    break;
                case 3:
                    message.receiver = reader.string();
                    break;
                case 4:
                    message.device = reader.string();
                    break;
                case 5:
                    message.content = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Redundance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof redundance.Redundance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {redundance.Redundance} Redundance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Redundance.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Redundance message.
         * @function verify
         * @memberof redundance.Redundance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Redundance.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                switch (message.msgType) {
                default:
                    return "msgType: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!$util.isString(message.sender))
                    return "sender: string expected";
            if (message.receiver != null && message.hasOwnProperty("receiver"))
                if (!$util.isString(message.receiver))
                    return "receiver: string expected";
            if (message.device != null && message.hasOwnProperty("device"))
                if (!$util.isString(message.device))
                    return "device: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!(message.content && typeof message.content.length === "number" || $util.isString(message.content)))
                    return "content: buffer expected";
            return null;
        };

        /**
         * Creates a Redundance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof redundance.Redundance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {redundance.Redundance} Redundance
         */
        Redundance.fromObject = function fromObject(object) {
            if (object instanceof $root.redundance.Redundance)
                return object;
            var message = new $root.redundance.Redundance();
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
            if (object.sender != null)
                message.sender = String(object.sender);
            if (object.receiver != null)
                message.receiver = String(object.receiver);
            if (object.device != null)
                message.device = String(object.device);
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from a Redundance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof redundance.Redundance
         * @static
         * @param {redundance.Redundance} message Redundance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Redundance.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgType = options.enums === String ? "P2P" : 0;
                object.sender = "";
                object.receiver = "";
                object.device = "";
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                object.msgType = options.enums === String ? $root.redundance.Redundance.MsgType[message.msgType] : message.msgType;
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = message.sender;
            if (message.receiver != null && message.hasOwnProperty("receiver"))
                object.receiver = message.receiver;
            if (message.device != null && message.hasOwnProperty("device"))
                object.device = message.device;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this Redundance to JSON.
         * @function toJSON
         * @memberof redundance.Redundance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Redundance.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * MsgType enum.
         * @name redundance.Redundance.MsgType
         * @enum {number}
         * @property {number} P2P=0 P2P value
         * @property {number} P2G=1 P2G value
         */
        Redundance.MsgType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "P2P"] = 0;
            values[valuesById[1] = "P2G"] = 1;
            return values;
        })();

        return Redundance;
    })();

    return redundance;
})();

module.exports = $root;
