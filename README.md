<!-- markdownlint-disable MD029 -->

# Inspect Promise

A reimplementation of Node's `util.getPromiseDetails()`, which was removed in [v16](https://github.com/nodejs/node/pull/37819).

> [!NOTE]
> This package is not recommended for use in production other than for reflection purposes. For more information about this topic, please see [nodejs/node#40054](https://github.com/nodejs/node/issues/40054).

```sh
npm i inspect-promise
```

## Usage

There are two ways you can use this package:

1. Import normally as a function

```ts
import { inspectPromise } from "inspect-promise";

const p = Promise.resolve(100);

console.log(inspectPromise(p));
```

2. Globally modify the Promise constructor

```ts
import "inspect-promise/extend";

const p = Promise.resolve(100);

console.log(Promise.inspect(p));
```

Both result in the same output:

```js
{
  status: "fulfilled",
  value: 100
}
```
