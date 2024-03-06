import { describe, expect, test } from "vitest";
import { inspectPromise } from "./";

describe("inspectPromise", () => {
	test("pending", () => {
		const p = new Promise(() => {});
		const details = inspectPromise(p);

		expect(details.state).toBe("pending");
		expect(details.value).toBe(undefined);
	});

	test("fulfilled", () => {
		const p = Promise.resolve(42);
		const details = inspectPromise(p);

		expect(details.state).toBe("fulfilled");
		expect(details.value).toBe(42);
	});

	// rejected case not covered for ci
});
