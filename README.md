# `Math.clamp`

A TC39 proposal to add `Math.clamp`: a function that constrains a value between an upper and lower bound.

## Status

**Stage:** 0  \
**Champion:** Oliver Medhurst (@canadahonk)  \
**Authors:** Oliver Medhurst (@canadahonk), Richie Bendall (@richienb)  \
**Last Presented:** (unpresented)

## Overview and motivation

A [clamping function](https://en.wikipedia.org/wiki/Clamping_(graphics)) constrains a value between an upper and lower bound.

Our primary motivation is its usefulness and [popularity](https://github.com/search?q=clamp+language%3AJavaScript+&type=code) in existing projects where it is often defined for the sake of readability. A common use is for animations and interactive content. For example, it helps to keep objects in-bounds during user-controlled movement by restricting the coordinates that it can move to (see the [p5.js demo](https://p5js.org/reference/#/p5/constrain) for its `constrain` function). Projects tend to define a function that looks like `clamp(number, min, max)`, either through:

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

Each of those examples require unnecessary boilerplate and are error-prone. For example, a developer only has to mistype a single operator or mix up a single variable name for the function to break. They also disregard the potential undefined behaviour that can occur when minimum is larger than maximum, or when only `min` or `max` is specified.

We name it the function `clamp`, like how it is in other programming languages...

- **[`clamp`][css-clamp] in CSS**
- [`Math.Clamp`](https://docs.microsoft.com/en-us/dotnet/api/system.math.clamp?view=netcore-2.0) in C#
- [`std::clamp`](https://en.cppreference.com/w/cpp/algorithm/clamp) in the C++ standard library
- `clamp` for [`f32`](https://doc.rust-lang.org/std/primitive.f32.html#method.clamp) and [`f64`](https://doc.rust-lang.org/std/primitive.f64.html#method.clamp) in Rust
- [`coerceIn`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/coerce-in.html) in Kotlin
- [`clamp`](https://api.dart.dev/stable/2.14.4/dart-core/num/clamp.html) in Dart
- [`clamp`](https://ruby-doc.org/core-2.4.0/Comparable.html#method-i-clamp) in Ruby
- [`clamp`](https://package.elm-lang.org/packages/elm/core/latest/Basics#clamp) in Elm

...and userland implementations:

- [`clamp`](https://github.com/hughsk/clamp/blob/377851f0cca9f3f134b53881e294782cccdae4d8/index.js#L3-L7)
- [`math-clamp`](https://github.com/sindresorhus/math-clamp/blob/3897064dd3e9711a2e47e891d0aa7eb66ccdcef8/index.js#L1-L15)
- [`lodash`](https://github.com/lodash/lodash/blob/bb7c95947914d12af5f79e7369dd59ce29bc61a8/clamp.js)
- [`three.js`](https://github.com/mrdoob/three.js/blob/431baa0a0e808637df959aa547c98e0b2380bdbe/src/math/MathUtils.js#L43-L47)
- [`p5.js`](https://github.com/processing/p5.js/blob/098f36ded792fca894fdfd947d3293db5bb35e79/src/math/calculation.js#L111-L114)
- [`ramda`](https://github.com/ramda/ramda/blob/6b6a85d3fe30ac1a41ac05734be9f61bd92325e5/source/clamp.js#L23-L32)
- [`sugar`](https://github.com/andrewplummer/Sugar/blob/3ca57818332473b601434001ac1445552d7753ff/lib/range.js#L164-L178)
- [`phaser`](https://github.com/photonstorm/phaser/blob/29ada646e00ebdd375a31eee871be5b10286ba46/src/math/Clamp.js#L19-L22)

Another motivation is to bring parity with the [CSS function][css-clamp] of the same name, although it will have a different parameter order because of the slightly different use cases in each context (see also [the previous discussion on the order of options for CSS `clamp`](https://github.com/w3c/csswg-drafts/issues/2519#issuecomment-387803089).

The original proposal intended to have the `min` and `max` arguments optional and allowing `null` or `undefined` as values to mean no upper/lower bound; but following [recent TC39 requirements](https://github.com/tc39/how-we-work/blob/main/normative-conventions.md#when-required-arguments-are-missing-throw), it was agreed among some delegates that it would be best to not do this, especially since `Math.min`/`Math.max` remains available for uses with a single bound.

## Examples

The proposed API allows a developer to clamp numbers like:

```js
Math.clamp(5, 0, 10) // 5
Math.clamp(-5, 0, 10) // 0
Math.clamp(15, 0, 10) // 10
```

It supports `-Infinity`/`Infinity` to specify when there is no upper or lower bound, although `Math.min`/`Math.max` are also already available to use:
```js
Math.clamp(5, 0, Infinity) === Math.max(5, 0) // 5
Math.clamp(-5, -Infinity, 10) === Math.min(-5, 10) // -5
```

If the minimum bound is larger than the maximum bound, it throws a `RangeError` to avoid possible developer confusion:

```js
Math.clamp(10, 5, 0) // RangeError
```

It also correctly respects `-0` if given:

```js
Math.clamp(-2, -0, 10) // -0
Math.clamp(-0, -0, 10) // -0
Math.clamp(0, -0, 10) // 0
```

## Specification

- [Ecmarkup source](spec.emu)
- [HTML version](https://canadahonk.github.io/proposal-math-clamp)

## Implementations

## Acknowledgements

Past work:
- [`Math` Extensions Proposal](https://github.com/rwaldron/proposal-math-extensions)

[math-min]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
[math-max]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
[css-clamp]: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()
[css-clamp-spec]: https://drafts.csswg.org/css-values/#funcdef-clamp
