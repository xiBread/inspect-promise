interface Binding {
	inspectPromise(promise: Promise<any>): [number, any];
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binding = require(require.resolve('../build/Release/inspectPromise.node')) as Binding;

export type PromiseState = 'pending' | 'fulfilled' | 'rejected';

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

const states = ['pending', 'fulfilled', 'rejected'] as const;

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
		value,
	};
}

export default inspectPromise;
