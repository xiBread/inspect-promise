import { describe, expect, test } from "vitest";
import { inspectPromise } from "./";

describe("inspectPromise", () => {
	test("pending", () => {
		const p = new Promise(() => {})
		const details = inspectPromise(p);

		expect(details.state).toBe("pending")
		expect(details.value).toBe(undefined);
	})

	test("fulfilled", () => {
		const p = Promise.resolve(42);
		const details = inspectPromise(p);

		expect(details.state).toBe("fulfilled")
		expect(details.value).toBe(42);
	})

	// Vitest will throw here; as long as it outputs "3 passed" then the error doesn't matter
	test("rejected", () => {
		const p = Promise.reject<Error>(new Error("hello"))
		const details = inspectPromise(p);

		expect(details.state).toBe("rejected")
		expect(details.value).toBeInstanceOf(Error);
		expect(details.value!.message).toBe("hello")
	})
})
