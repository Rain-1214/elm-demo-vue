
// 常用属性
const ArrayProto = Array.prototype;
const ObjProto = Object.prototype;
const SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// 常用方法
const push = ArrayProto.push;
const slice = ArrayProto.slice;
const toString = ObjProto.toString;
const hasOwnProperty = ObjProto.hasOwnProperty;

// 原生方法
const nativeKeys = Object.keys;
const nativeCreate = Object.create;

const tag = {
  arrayTag: '[object Array]',
  boolTag: '[object Boolean]',
  dateTag: '[object Date]',
  errorTag: '[object Error]',
  funcTag: '[object Function]',
  mapTag: '[object Map]',
  numberTag: '[object Number]',
  nullTag: '[object Null]',
  objectTag: '[object Object]',
  promiseTag: '[object Promise]',
  regexpTag: '[object RegExp]',
  setTag: '[object Set]',
  stringTag: '[object String]',
  symbolTag: '[object Symbol]',
  undefinedTag: '[object Undefined]',
};

const getValueTag = (value) => {
  if (value === null) {
    return value === undefined ? tag.undefinedTag : tag.nullTag;
  }
  return Object.prototype.toString.call(value);
};

export const isObject = (value) => {
  const valueTag = typeof value;
  return valueTag != null && (valueTag === 'object');
};

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;

export const isArray = Array.isArray;

export const isString = (value) => typeof value === 'string' || getValueTag(value) === tag.stringTag;

export const isNumber = (value) => {
  const valueTag = typeof value;
  return valueTag === 'number';
};

export const isMap = (value) => value != null && getValueTag(value) === tag.mapTag;

export const isSet = (value) => value != null && getValueTag(value) === tag.setTag;

