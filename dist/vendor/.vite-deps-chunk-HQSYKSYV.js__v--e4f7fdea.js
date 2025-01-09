import {
  __commonJS,
  __toESM
} from "/vendor/.vite-deps-chunk-G3PMV62Z.js__v--e4f7fdea.js";

// node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "node_modules/secure-json-parse/index.js"(exports, module) {
    "use strict";
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text)) {
        text = text.toString();
      }
      if (text && text.charCodeAt(0) === 65279) {
        text = text.slice(1);
      }
      const obj = JSON.parse(text, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    function parse(text, reviver, options) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    function safeParse(text, reviver) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, { safe: true });
      } catch (_e) {
        return null;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    module.exports = parse;
    module.exports.default = parse;
    module.exports.parse = parse;
    module.exports.safeParse = safeParse;
    module.exports.scan = filter;
  }
});

// node_modules/@ai-sdk/provider/dist/index.mjs
var marker = "vercel.ai.error";
var symbol = Symbol.for(marker);
var _a;
var _AISDKError = class _AISDKError2 extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name14,
    message,
    cause
  }) {
    super(message);
    this[_a] = true;
    this.name = name14;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError2.hasMarker(error, marker);
  }
  static hasMarker(error, marker15) {
    const markerSymbol = Symbol.for(marker15);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
  /**
   * Returns a JSON representation of the error.
   * @returns {Object} An object containing the error's name, message, and cause.
   *
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message
    };
  }
};
_a = symbol;
var AISDKError = _AISDKError;
var name = "AI_APICallError";
var marker2 = `vercel.ai.error.${name}`;
var symbol2 = Symbol.for(marker2);
var _a2;
var APICallError = class extends AISDKError {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name, message, cause });
    this[_a2] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isAPICallError(error) {
    return error instanceof Error && error.name === name && typeof error.url === "string" && typeof error.requestBodyValues === "object" && (error.statusCode == null || typeof error.statusCode === "number") && (error.responseHeaders == null || typeof error.responseHeaders === "object") && (error.responseBody == null || typeof error.responseBody === "string") && (error.cause == null || typeof error.cause === "object") && typeof error.isRetryable === "boolean" && (error.data == null || typeof error.data === "object");
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      requestBodyValues: this.requestBodyValues,
      statusCode: this.statusCode,
      responseHeaders: this.responseHeaders,
      responseBody: this.responseBody,
      cause: this.cause,
      isRetryable: this.isRetryable,
      data: this.data
    };
  }
};
_a2 = symbol2;
var name2 = "AI_EmptyResponseBodyError";
var marker3 = `vercel.ai.error.${name2}`;
var symbol3 = Symbol.for(marker3);
var _a3;
var EmptyResponseBodyError = class extends AISDKError {
  // used in isInstance
  constructor({ message = "Empty response body" } = {}) {
    super({ name: name2, message });
    this[_a3] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker3);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isEmptyResponseBodyError(error) {
    return error instanceof Error && error.name === name2;
  }
};
_a3 = symbol3;
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
var name3 = "AI_InvalidArgumentError";
var marker4 = `vercel.ai.error.${name3}`;
var symbol4 = Symbol.for(marker4);
var _a4;
var InvalidArgumentError = class extends AISDKError {
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name3, message, cause });
    this[_a4] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4);
  }
};
_a4 = symbol4;
var name4 = "AI_InvalidPromptError";
var marker5 = `vercel.ai.error.${name4}`;
var symbol5 = Symbol.for(marker5);
var _a5;
var InvalidPromptError = class extends AISDKError {
  constructor({
    prompt: prompt2,
    message,
    cause
  }) {
    super({ name: name4, message: `Invalid prompt: ${message}`, cause });
    this[_a5] = true;
    this.prompt = prompt2;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidPromptError(error) {
    return error instanceof Error && error.name === name4 && prompt != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      prompt: this.prompt
    };
  }
};
_a5 = symbol5;
var name5 = "AI_InvalidResponseDataError";
var marker6 = `vercel.ai.error.${name5}`;
var symbol6 = Symbol.for(marker6);
var _a6;
var InvalidResponseDataError = class extends AISDKError {
  constructor({
    data,
    message = `Invalid response data: ${JSON.stringify(data)}.`
  }) {
    super({ name: name5, message });
    this[_a6] = true;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker6);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidResponseDataError(error) {
    return error instanceof Error && error.name === name5 && error.data != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      data: this.data
    };
  }
};
_a6 = symbol6;
var name6 = "AI_JSONParseError";
var marker7 = `vercel.ai.error.${name6}`;
var symbol7 = Symbol.for(marker7);
var _a7;
var JSONParseError = class extends AISDKError {
  constructor({ text, cause }) {
    super({
      name: name6,
      message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage(cause)}`,
      cause
    });
    this[_a7] = true;
    this.text = text;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker7);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isJSONParseError(error) {
    return error instanceof Error && error.name === name6 && "text" in error && typeof error.text === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      valueText: this.text
    };
  }
};
_a7 = symbol7;
var name7 = "AI_LoadAPIKeyError";
var marker8 = `vercel.ai.error.${name7}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var LoadAPIKeyError = class extends AISDKError {
  // used in isInstance
  constructor({ message }) {
    super({ name: name7, message });
    this[_a8] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker8);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isLoadAPIKeyError(error) {
    return error instanceof Error && error.name === name7;
  }
};
_a8 = symbol8;
var name8 = "AI_LoadSettingError";
var marker9 = `vercel.ai.error.${name8}`;
var symbol9 = Symbol.for(marker9);
var _a9;
_a9 = symbol9;
var name9 = "AI_NoContentGeneratedError";
var marker10 = `vercel.ai.error.${name9}`;
var symbol10 = Symbol.for(marker10);
var _a10;
var NoContentGeneratedError = class extends AISDKError {
  // used in isInstance
  constructor({
    message = "No content generated."
  } = {}) {
    super({ name: name9, message });
    this[_a10] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker10);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isNoContentGeneratedError(error) {
    return error instanceof Error && error.name === name9;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack
    };
  }
};
_a10 = symbol10;
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11;
var NoSuchModelError = class extends AISDKError {
  constructor({
    errorName = name10,
    modelId,
    modelType,
    message = `No such ${modelType}: ${modelId}`
  }) {
    super({ name: errorName, message });
    this[_a11] = true;
    this.modelId = modelId;
    this.modelType = modelType;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker11);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isNoSuchModelError(error) {
    return error instanceof Error && error.name === name10 && typeof error.modelId === "string" && typeof error.modelType === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      modelId: this.modelId,
      modelType: this.modelType
    };
  }
};
_a11 = symbol11;
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12;
var TooManyEmbeddingValuesForCallError = class extends AISDKError {
  constructor(options) {
    super({
      name: name11,
      message: `Too many values for a single embedding call. The ${options.provider} model "${options.modelId}" can only embed up to ${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`
    });
    this[_a12] = true;
    this.provider = options.provider;
    this.modelId = options.modelId;
    this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
    this.values = options.values;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker12);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTooManyEmbeddingValuesForCallError(error) {
    return error instanceof Error && error.name === name11 && "provider" in error && typeof error.provider === "string" && "modelId" in error && typeof error.modelId === "string" && "maxEmbeddingsPerCall" in error && typeof error.maxEmbeddingsPerCall === "number" && "values" in error && Array.isArray(error.values);
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      provider: this.provider,
      modelId: this.modelId,
      maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
      values: this.values
    };
  }
};
_a12 = symbol12;
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var _TypeValidationError = class _TypeValidationError2 extends AISDKError {
  constructor({ value, cause }) {
    super({
      name: name12,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage(cause)}`,
      cause
    });
    this[_a13] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker13);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError2.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError2({ value, cause });
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTypeValidationError(error) {
    return error instanceof Error && error.name === name12;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      value: this.value
    };
  }
};
_a13 = symbol13;
var TypeValidationError = _TypeValidationError;
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14;
var UnsupportedFunctionalityError = class extends AISDKError {
  constructor({ functionality }) {
    super({
      name: name13,
      message: `'${functionality}' functionality not supported.`
    });
    this[_a14] = true;
    this.functionality = functionality;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker14);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isUnsupportedFunctionalityError(error) {
    return error instanceof Error && error.name === name13 && typeof error.functionality === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      functionality: this.functionality
    };
  }
};
_a14 = symbol14;
function isJSONValue(value) {
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isJSONValue);
  }
  if (typeof value === "object") {
    return Object.entries(value).every(
      ([key, val]) => typeof key === "string" && isJSONValue(val)
    );
  }
  return false;
}
function isJSONArray(value) {
  return Array.isArray(value) && value.every(isJSONValue);
}
function isJSONObject(value) {
  return value != null && typeof value === "object" && Object.entries(value).every(
    ([key, val]) => typeof key === "string" && isJSONValue(val)
  );
}

// node_modules/eventsource-parser/dist/index.js
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
          // remove trailing newline
        });
        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
var BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}

// node_modules/nanoid/non-secure/index.js
var customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i = size | 0;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};

// node_modules/@ai-sdk/provider-utils/dist/index.mjs
var import_secure_json_parse = __toESM(require_secure_json_parse(), 1);

// node_modules/eventsource-parser/dist/stream.js
var EventSourceParserStream = class extends TransformStream {
  constructor() {
    let parser;
    super({
      start(controller) {
        parser = createParser((event) => {
          if (event.type === "event") {
            controller.enqueue(event);
          }
        });
      },
      transform(chunk) {
        parser.feed(chunk);
      }
    });
  }
};

// node_modules/@ai-sdk/provider-utils/dist/index.mjs
function combineHeaders(...headers) {
  return headers.reduce(
    (combinedHeaders, currentHeaders) => ({
      ...combinedHeaders,
      ...currentHeaders != null ? currentHeaders : {}
    }),
    {}
  );
}
function extractResponseHeaders(response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}
var createIdGenerator = ({
  prefix,
  size: defaultSize = 7,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
};
var generateId = createIdGenerator();
function getErrorMessage2(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
function isAbortError(error) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
function loadApiKey({
  apiKey,
  environmentVariableName,
  apiKeyParameterName = "apiKey",
  description
}) {
  if (typeof apiKey === "string") {
    return apiKey;
  }
  if (apiKey != null) {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string.`
    });
  }
  if (typeof process === "undefined") {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.`
    });
  }
  apiKey = process.env[environmentVariableName];
  if (apiKey == null) {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.`
    });
  }
  if (typeof apiKey !== "string") {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
    });
  }
  return apiKey;
}
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
  return { [validatorSymbol]: true, validate };
}
function isValidator(value) {
  return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
function asValidator(value) {
  return isValidator(value) ? value : zodValidator(value);
}
function zodValidator(zodSchema) {
  return validator((value) => {
    const result = zodSchema.safeParse(value);
    return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
  });
}
function validateTypes({
  value,
  schema: inputSchema
}) {
  const result = safeValidateTypes({ value, schema: inputSchema });
  if (!result.success) {
    throw TypeValidationError.wrap({ value, cause: result.error });
  }
  return result.value;
}
function safeValidateTypes({
  value,
  schema
}) {
  const validator2 = asValidator(schema);
  try {
    if (validator2.validate == null) {
      return { success: true, value };
    }
    const result = validator2.validate(value);
    if (result.success) {
      return result;
    }
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: result.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: error })
    };
  }
}
function parseJSON({
  text,
  schema
}) {
  try {
    const value = import_secure_json_parse.default.parse(text);
    if (schema == null) {
      return value;
    }
    return validateTypes({ value, schema });
  } catch (error) {
    if (JSONParseError.isJSONParseError(error) || TypeValidationError.isTypeValidationError(error)) {
      throw error;
    }
    throw new JSONParseError({ text, cause: error });
  }
}
function safeParseJSON({
  text,
  schema
}) {
  try {
    const value = import_secure_json_parse.default.parse(text);
    if (schema == null) {
      return {
        success: true,
        value
      };
    }
    return safeValidateTypes({ value, schema });
  } catch (error) {
    return {
      success: false,
      error: JSONParseError.isJSONParseError(error) ? error : new JSONParseError({ text, cause: error })
    };
  }
}
function isParsableJson(input) {
  try {
    import_secure_json_parse.default.parse(input);
    return true;
  } catch (e) {
    return false;
  }
}
function removeUndefinedEntries(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([_key, value]) => value != null)
  );
}
var getOriginalFetch = () => globalThis.fetch;
var postJsonToApi = async ({
  url,
  headers,
  body,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch
}) => postToApi({
  url,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: {
    content: JSON.stringify(body),
    values: body
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch
});
var postToApi = async ({
  url,
  headers = {},
  body,
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch = getOriginalFetch()
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: removeUndefinedEntries(headers),
      body: body.content,
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: body.values
        });
      } catch (error) {
        if (isAbortError(error) || APICallError.isAPICallError(error)) {
          throw error;
        }
        throw new APICallError({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: body.values
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: body.values
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError.isAPICallError(error)) {
          throw error;
        }
      }
      throw new APICallError({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: body.values
      });
    }
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (error instanceof TypeError && error.message === "fetch failed") {
      const cause = error.cause;
      if (cause != null) {
        throw new APICallError({
          message: `Cannot connect to API: ${cause.message}`,
          cause,
          url,
          requestBodyValues: body.values,
          isRetryable: true
          // retry when network error
        });
      }
    }
    throw error;
  }
};
var createJsonErrorResponseHandler = ({
  errorSchema,
  errorToMessage,
  isRetryable
}) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const responseHeaders = extractResponseHeaders(response);
  if (responseBody.trim() === "") {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
  try {
    const parsedError = parseJSON({
      text: responseBody,
      schema: errorSchema
    });
    return {
      responseHeaders,
      value: new APICallError({
        message: errorToMessage(parsedError),
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        data: parsedError,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
      })
    };
  } catch (parseError) {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
};
var createEventSourceResponseHandler = (chunkSchema) => async ({ response }) => {
  const responseHeaders = extractResponseHeaders(response);
  if (response.body == null) {
    throw new EmptyResponseBodyError({});
  }
  return {
    responseHeaders,
    value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(
      new TransformStream({
        transform({ data }, controller) {
          if (data === "[DONE]") {
            return;
          }
          controller.enqueue(
            safeParseJSON({
              text: data,
              schema: chunkSchema
            })
          );
        }
      })
    )
  };
};
var createJsonResponseHandler = (responseSchema) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const parsedResult = safeParseJSON({
    text: responseBody,
    schema: responseSchema
  });
  const responseHeaders = extractResponseHeaders(response);
  if (!parsedResult.success) {
    throw new APICallError({
      message: "Invalid JSON response",
      cause: parsedResult.error,
      statusCode: response.status,
      responseHeaders,
      responseBody,
      url,
      requestBodyValues
    });
  }
  return {
    responseHeaders,
    value: parsedResult.value
  };
};
var { btoa, atob } = globalThis;
function convertBase64ToUint8Array(base64String) {
  const base64Url = base64String.replace(/-/g, "+").replace(/_/g, "/");
  const latin1string = atob(base64Url);
  return Uint8Array.from(latin1string, (byte) => byte.codePointAt(0));
}
function convertUint8ArrayToBase64(array) {
  let latin1string = "";
  for (let i = 0; i < array.length; i++) {
    latin1string += String.fromCodePoint(array[i]);
  }
  return btoa(latin1string);
}
function withoutTrailingSlash(url) {
  return url == null ? void 0 : url.replace(/\/$/, "");
}

export {
  AISDKError,
  APICallError,
  EmptyResponseBodyError,
  getErrorMessage,
  InvalidPromptError,
  InvalidResponseDataError,
  JSONParseError,
  LoadAPIKeyError,
  NoContentGeneratedError,
  NoSuchModelError,
  TooManyEmbeddingValuesForCallError,
  TypeValidationError,
  UnsupportedFunctionalityError,
  isJSONArray,
  isJSONObject,
  require_secure_json_parse,
  createParser,
  combineHeaders,
  createIdGenerator,
  generateId,
  getErrorMessage2,
  isAbortError,
  loadApiKey,
  validatorSymbol,
  safeValidateTypes,
  safeParseJSON,
  isParsableJson,
  postJsonToApi,
  createJsonErrorResponseHandler,
  createEventSourceResponseHandler,
  createJsonResponseHandler,
  convertBase64ToUint8Array,
  convertUint8ArrayToBase64,
  withoutTrailingSlash
};
//# sourceMappingURL=chunk-HQSYKSYV.js.map
