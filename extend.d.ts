import type { PromiseDetails } from "./lib";

declare global {
	interface PromiseConstructor {
		/**
		 * Synchronously inspect the details of a Promise.
		 */
		inspect<T>(promise: Promise<T>): PromiseDetails<T>;
	}
}
