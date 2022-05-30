# `Math.clamp`

ECMAScript proposal and reference implementation for `Math.clamp`.

**Author:** Richie Bendall

**Champion:** None

**Stage:** 0

## Overview and motivation

A [clamping function](https://en.wikipedia.org/wiki/Clamping_(graphics)) constrains a value between an upper and lower bound.

The primary motivation for this function is to bring parity with the [CSS function][css-clamp] of the same name. It will be useful when using it in conjunction with the [CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API).

## Examples

Currently the problem is solved in two ways:

- Chaining mathematical operators with if statements or ternary operators

```js
function clamp(number, minimum, maximum) {
	if (number < minimum) {
		return minimum;
	}

	if (number > maximum) {
		return maximum;
	}

	return number;
}
```

- Nesting [`Math.min`][math-min] and [`Math.max`][math-max] calls

```js
function clamp(number, minimum, maximum) {
	return Math.min(Math.max(number, minimum), maximum);
}
```

Each of these require a unnecessary boilerplate and are error-prone.

For example, a developer only has to mistype a single operator or mix up a single variable name for the function to break.

Both of these common strategies also disregard the potential undefined behaviour that can occur when `minimum` is larger than `maximum`.

The proposed API allows a developer to clamp numbers without creating a separate function:

```js
Math.clamp(0, 5, 10);
//=> 5

Math.clamp(0, -5, 10);
//=> 0

Math.clamp(0, 15, 10);
//=> 10
```

It also handles a larger minimum than maximum number, analogous to the [CSS `clamp()` function][css-clamp-spec].

```js
// Minimum number is larger than maximum value
Math.clamp(10, 5, 0);
//=> 10
```

For reasoning on the order of arguments, see [the previous discussion](https://github.com/w3c/csswg-drafts/issues/2519#issuecomment-387803089) for the CSS function of the same name.

### Real-world scenarios

A common use is for animations and interactive content.

For example, it helps to keep objects in-bounds during user-controlled movement by restricting the coordinates that it can move to.

See the [p5.js demo](https://p5js.org/reference/#/p5/constrain) for its `constrain` function.

## Userland implementations

- [`clamp`](https://github.com/hughsk/clamp/blob/377851f0cca9f3f134b53881e294782cccdae4d8/index.js#L3-L7)
- [`math-clamp`][math-clamp]
- [`lodash`](https://github.com/lodash/lodash/blob/bb7c95947914d12af5f79e7369dd59ce29bc61a8/clamp.js)
- [`three.js`](https://github.com/mrdoob/three.js/blob/431baa0a0e808637df959aa547c98e0b2380bdbe/src/math/MathUtils.js#L43-L47)
- [`p5.js`](https://github.com/processing/p5.js/blob/098f36ded792fca894fdfd947d3293db5bb35e79/src/math/calculation.js#L111-L114)
- [`ramda`](https://github.com/ramda/ramda/blob/6b6a85d3fe30ac1a41ac05734be9f61bd92325e5/source/clamp.js#L23-L32)
- [`sugar`](https://github.com/andrewplummer/Sugar/blob/3ca57818332473b601434001ac1445552d7753ff/lib/range.js#L164-L178)
- [`phaser`](https://github.com/photonstorm/phaser/blob/29ada646e00ebdd375a31eee871be5b10286ba46/src/math/Clamp.js#L19-L22)

## Naming in other languages

Similar functionality exists in other languages with most using a similar name. This is why the function will also be called `clamp`.

- **[`clamp`][css-clamp] in CSS**
- [`Math.Clamp`](https://docs.microsoft.com/en-us/dotnet/api/system.math.clamp?view=netcore-2.0) in C#
- [`std::clamp`](https://en.cppreference.com/w/cpp/algorithm/clamp) in the C++ standard library
- `clamp` for [`f32`](https://doc.rust-lang.org/std/primitive.f32.html#method.clamp) and [`f64`](https://doc.rust-lang.org/std/primitive.f64.html#method.clamp) in Rust
- [`coerceIn`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/coerce-in.html) in Kotlin
- [`clamp`](https://api.dart.dev/stable/2.14.4/dart-core/num/clamp.html) in Dart
- [`clamp`](https://ruby-doc.org/core-2.4.0/Comparable.html#method-i-clamp) in Ruby
- [`clamp`](https://package.elm-lang.org/packages/elm/core/latest/Basics#clamp) in Elm

## Specification

- [Ecmarkup source](spec.html)
- [HTML version](https://richienb.github.io/proposal-math-clamp)

## Implementations

- [Reference Polyfill](polyfill.js)

## Credits

- Specification improved from the [`Math` Extensions Proposal](https://github.com/rwaldron/proposal-math-extensions)
- Specification and reference implementation further inspired by [`math-clamp`][math-clamp]

[math-clamp]: https://github.com/sindresorhus/math-clamp/blob/3897064dd3e9711a2e47e891d0aa7eb66ccdcef8/index.js#L1-L15
[math-min]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
[math-max]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
[css-clamp]: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()
[css-clamp-spec]: https://drafts.csswg.org/css-values/#funcdef-clamp
