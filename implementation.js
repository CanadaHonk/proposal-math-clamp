import esAbstract from 'es-abstract';

const {ToNumber: toNumber} = esAbstract;

export default function clamp(min, number, max) {
	const minCoerced = toNumber(min);
	const numberCoerced = toNumber(number);
	const maxCoerced = toNumber(max);

	return Math.max(minCoerced, Math.min(numberCoerced, maxCoerced));
}
