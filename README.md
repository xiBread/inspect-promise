<!-- markdownlint-disable MD029 -->

# Inspect Promise

A reimplementation of Node's `util.getPromiseDetails()`, which was removed in v16.

```sh
npm i inspect-promise
```

## Usage

There are two ways you can use this package:

1. Import normally as a function

```ts
import inspectPromise from 'inspect-promise';
/* or */
import { inspectPromise } from 'inspect-promise';

const p = Promise.resolve(100);

console.log(inspectPromise(p));
```

2. Globally modify the Promise constructor

```ts
import 'inspect-promise/extend';

const p = Promise.resolve(100);

console.log(Promise.inspect(p));
```

Both result in the same output.
