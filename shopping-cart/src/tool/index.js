export const currency = (value,currency = "$",decimals = 2) => {

	if (Object.prototype.toString.call(value) === "[object Array]") {
		throw "value 不能为数组"
	}

	value = parseFloat(value);

	if((value !== value) || !isFinite(value)){
		throw "value 不能为无穷大的数或者对象以及其他会被parseFloat转化为NaN的值"
	}

	if (decimals < 0) {
		throw "decimals 必须大于等于0"
	}

	let stringified = Math.abs(value).toFixed(decimals);

	let sign = value >= 0 ? "" : "-";

	let decimal = decimals !== 0
	? stringified.slice(-1 - decimals)
	: "";

	let int = decimals !== 0
	? stringified.slice(0,-1 - decimals)  
	: stringified;

	let i = int.length % 3;

	let head = int.length >= 3
	? i !== 0 ? currency + int.slice(0,i) + "," : currency
	: currency;

	let content = int.length >= 3
	? int.slice(i).replace(/(\d{3})(?=\d)/g,"$1,")
	: int.replace(/(\d{3})(?=\d)/g,"$1,") 

	return sign + head + content + decimal

}