import type { PromiseDetails } from './';
import { inspectPromise } from './';

declare global {
	interface PromiseConstructor {
		/**
		 * Synchronously inspect the details of a Promise.
		 */
		inspect<T>(promise: Promise<T>): PromiseDetails<T>;
	}
}

Promise.inspect = inspectPromise;
