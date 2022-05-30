console.assert(typeof Math.clamp === 'function', 'Math.clamp is not a function');

console.assert(Math.clamp.name === 'clamp', 'The function name of Math.clamp is not \'clamp\'');

const {
	configurable,
	enumerable,
	writable,
} = Object.getOwnPropertyDescriptor(Math, 'clamp');

console.assert(!configurable, 'Math.clamp is configurable');
console.assert(!enumerable, 'Math.clamp is enumerable');
console.assert(!writable, 'Math.clamp is writable');

console.assert(Math.clamp(0, 5, 10) === 5, 'Math.clamp(0, 5, 10) === 5');
console.assert(Math.clamp(0, -5, 10) === 0, 'Math.clamp(0, -5, 10) === 0');
console.assert(Math.clamp(0, 15, 10) === 10, 'Math.clamp(0, 15, 10) === 10');
console.assert(Math.clamp(10, 5, 0) === 10, 'Math.clamp(10, 5, 0) === 10');
