# Try

[![ci](https://github.com/Travis-Carlton/npm-travic-try/actions/workflows/ci.yml/badge.svg)](https://github.com/Travis-Carlton/npm-travic-try/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@travic%2Ftry.svg)](https://badge.fury.io/js/@travic%2Ftry)
[![npm](https://img.shields.io/npm/dw/@travic%2Ftry.svg)](https://www.npmjs.com/package/@travic%2Ftry)

![Coverage lines](https://img.shields.io/badge/Coverage:lines-100-blue.svg)
![Coverage functions](https://img.shields.io/badge/Coverage:functions-100-blue.svg)
![Coverage branches](https://img.shields.io/badge/Coverage:branches-100-blue.svg)
![Coverage statements](https://img.shields.io/badge/Coverage:statements-100-blue.svg)

```ruby
npm i @travic/try
or
yarn add @travic/try
```

```typescript
import { Try } from '@travic/try';
// or
const { Try } = require('@travic/try');

// example use

test('Try should be success', () => {
	const res = Try.of(() => true),
		res2 = Try.of(() => false),
		res3 = Try.of(() => {});

	expect(res.isSuccess).toEqual(true);
	expect(res.get()).toEqual(true);
	expect(res2.isSuccess).toEqual(true);
	expect(res2.get()).toEqual(false);
	expect(res3.isSuccess).toEqual(true);
	expect(res3.get()).toEqual(undefined);
});

test('Try should have getOrElse result', () => {
	const res = Try.of(() => {
		throw new Error();
	}).getOrElse('Hello Else');

	expect(res).toEqual('Hello Else');
});

test('Try should perform onFailure method', () => {
	const res = Try.of(() => {
		throw new Error();
	})
		.onFailure(() => 'On Fail')
		.get();

	expect(res).toEqual('On Fail');
});

test('Try should give unhandled error in get', () => {
	const res = Try.of(() => {
		throw new Error();
	}).get();

	expect(res).toHaveProperty('unhandled', true);
});
```
