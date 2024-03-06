/* eslint-disable @typescript-eslint/no-var-requires */

import path from "node:path";
import { find } from "@mapbox/node-pre-gyp";

interface Binding {
	inspectPromise(promise: Promise<unknown>): [number, unknown];
}

const bindingPath = require(find(path.resolve(path.join(__dirname, "../package.json"))));
const binding = require(bindingPath) as Binding;

export type PromiseState = (typeof states)[number];

export interface PromiseDetails<T> {
	/**
	 * The current state of the Promise.
	 *
	 * - `pending`: The initial state of the Promise and is neither fulfilled
	 * nor rejected.
	 * - `fulfilled`: The Promise was completed successfully.
	 * - `rejected`: The Promise failed.
	 */
	state: PromiseState;

	/**
	 * The value of the Promise if it is not pending; otherwise, `undefined`.
	 */
	value: T | undefined;
}

const states = ["pending", "fulfilled", "rejected"] as const;

/**
 * Synchronously inspect the details of a Promise.
 *
 * @example
 * ```ts
 * const promise = Promise.resolve(100);
 *
 * console.log(inspectPromise(promise));
 * // => { state: "resolved", value: 100 }
 * ```
 */
export function inspectPromise<T>(promise: Promise<T>): PromiseDetails<T> {
	const [state, value] = binding.inspectPromise(promise);

	return {
		state: states[state],
		value: value as T,
	};
}

export default inspectPromise;
