import esAbstract from 'es-abstract';

const {ToNumber: toNumber} = esAbstract;

export default function clamp(number, min, max) {
	number = toNumber(number);

	if (max !== undefined && max !== null) {
		max = toNumber(max);
		number = Math.min(number, max);
	}

	if (min !== undefined && min !== null) {
		min = toNumber(min);
		number = Math.max(number, min);
	}

	return number;
}
