import esAbstract from 'es-abstract';

const {ToNumber: toNumber} = esAbstract;

export default function clamp(min, val, max) {
	const minCoerced = toNumber(min);
	const valCoerced = toNumber(val);
	const maxCoerced = toNumber(max);

	return Math.max(minCoerced, Math.min(valCoerced, maxCoerced));
}
