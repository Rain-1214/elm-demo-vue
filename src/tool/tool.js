// 常量
const MAX_ARRAY_INDEX = (2 ** 53) - 1;

const hasOwn = Object.prototype.hasOwnProperty;

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

/**
 * 获取value的类型标签
 * @param {Any} value 需要获取的值
 * @return {String} 类型标签
 */
const getValueTag = (value) => {
  if (value === null) {
    return value === undefined ? tag.undefinedTag : tag.nullTag;
  }
  return Object.prototype.toString.call(value);
};

/**
 * 
 * @param {Function} func 改变this指向的函数
 * @param {Object} context 改变之后的this指向
 * @param {Number} argCount 改变后参数个数
 */
const bindThis = (func, context, argCount) => {
  if (context === undefined) return func;
  return func.call(context, ...argCount);
};

export const isObject = (value) => {
  const valueTag = typeof value;
  return valueTag != null && (valueTag === 'object');
};

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;

export const isArray = Array.isArray;

export const isArrayLike = (value) => {
  if (!hasOwn.call(value, 'length')) return false;
  const length = value.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

export const isString = (value) => typeof value === 'string' || getValueTag(value) === tag.stringTag;

export const isNumber = (value) => {
  const valueTag = typeof value;
  return valueTag === 'number';
};

export const isMap = (value) => value != null && getValueTag(value) === tag.mapTag;

export const isSet = (value) => value != null && getValueTag(value) === tag.setTag;

/**
 * 将一个浮点类型值转放大成整数
 * @param {Number} value 需要转换的值
 * @return {Object} -> {
 *  floatInt: 整数部分
 *  floatDecimal: 小数部分
 *  allInteger：转换成的整数
 *  times: 放大倍数
 * }
 */
export const floatToInt = (value) => {
  if (!(isNumber(value) && `${value}`.indexOf('.') !== -1)) {
    return {
      floatInt: value,
      floatDecimal: '',
      allInteger: value,
      times: 1,
    };
  }
  const floatString = `${value}`;
  const floatDecimal = floatString.split('.')[1];
  const floatInt = floatString.split('.')[0];
  const allInteger = Number.parseInt(floatInt + floatDecimal, 10);
  const times = 10 ** (floatDecimal.length);
  return { floatInt, floatDecimal, allInteger, times };
};

/**
 * 遍历一个数组或者对象并用自定义函数处理
 * @param {Array|Object} list 需要便利的目标
 * @param {Function} iteratee 迭代器
 * @param {Object} context 迭代是否器需要改变this指向
 * @return list 链式调用
 */
export const each = (list, iteratee, context) => {
  iteratee = context == null ? iteratee : bindThis(iteratee, context);
  if (hasOwnProperty.call(Array.prototype, 'forEach')) {
    list.forEach(iteratee);
    return list;
  }
  if (isArrayLike(list)) {
    for (let i = 0; i <= list.length; i += 1) {
      iteratee(list[i], i, list);
    }
  } else {
    const keys = Object.keys(list);
    for (let i = 0; i <= keys.length; i += 1) {
      iteratee(list[keys[i]], keys[i], list);
    }
  }
  return list;
};

/**
 * 浮点类型计算 加法 或 乘法
 * @param {String} sign 计算符号 '+' '*'
 * @param {...Number} valueArray 累加(乘)的一系列值
 * @return {Number} 计算结果
 */
export const floatComputeAddorMul = (sign, ...valueArray) => valueArray.reduce((sum, currentValue) => {
  if (!isNumber(currentValue)) {
    return sum;
  }
  sum = floatToInt(sum);
  currentValue = floatToInt(currentValue);
  switch (sign) {
    case '+': if (sum.times === currentValue.times) {
      return ((sum.allInteger + currentValue.allInteger) / sum.times);
    }
      return sum.times > currentValue.times ? ((sum.allInteger + (currentValue.allInteger * (sum.times / currentValue.times))) / sum.times)
        : ((currentValue.allInteger + (sum.allInteger * (currentValue.times / sum.times))) / currentValue.times);
    default : return (sum.allInteger * currentValue.allInteger) / (sum.times * currentValue.times);
  }
}, 0);

/**
 * 浮点类型计算 减法 或 除法
 * @param {String} sign 计算符号 '-' '/'
 * @param {Number} firstvalue 被减数/被除数 
 * @param {...Number} valueArray 累减(除)的一系列值
 * @return {Number} 计算结果
 */
export const floatComputeSuborDiv = (sign, firstvalue, ...valueArray) => valueArray.reduce((sum, currentValue) => {
  if (!isNumber(currentValue)) {
    return sum;
  }
  sum = floatToInt(sum);
  currentValue = floatToInt(currentValue);
  switch (sign) {
    case '-': if (sum.times === currentValue.times) {
      return ((sum.allInteger - currentValue.allInteger) / sum.times);
    }
      return sum.times > currentValue.times ? ((sum.allInteger - (currentValue.allInteger * (sum.times / currentValue.times))) / sum.times)
        : (((sum.allInteger * (currentValue.times / sum.times)) - currentValue.allInteger) / currentValue.times);
    default : return (sum.allInteger / currentValue.allInteger) * (sum.times / currentValue.times);
  }
}, firstvalue);

export const isPc = () => {
  const phoneArray = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  /* eslint-disable no-undef */
  const userString = navigator.userAgent;
  let flag = true;
  phoneArray.forEach((e) => {
    if (userString.includes(e)) {
      flag = false;
    }
  });
  return flag;
};
