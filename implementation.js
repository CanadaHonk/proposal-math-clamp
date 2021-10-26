import esAbstract from 'es-abstract';

// ToNumber() abstract method (https://tc39.es/ecma262/#sec-tonumber) (https://github.com/ljharb/es-abstract/blob/8bc0b761dc26bd7335664ee9eb7095d9fc9d82db/2021/ToNumber.js#L39-L62)
const {ToNumber: toNumber} = esAbstract;

export default function clamp(number, min, max) {
	number = toNumber(number);
	min = toNumber(min);
	max = toNumber(max);

	if (min > max) {
		throw new RangeError('The minimum value cannot be higher than the maximum value');
	}

	if (number < min) {
		return min;
	}

	if (number > max) {
		return max;
	}

	return number;
}
