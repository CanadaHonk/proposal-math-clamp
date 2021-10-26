import clamp from './implementation.js';

if (!Math.clamp) {
	Object.defineProperty(Math, 'clamp', {
		value: clamp,
	});
}
