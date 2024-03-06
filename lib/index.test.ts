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

	test("rejected", () => {
		const p = Promise.reject<number>(42).catch(() => {});
		const details = inspectPromise(p);

		expect(details.state).toBe("rejected");
		expect(details.value).toBe(42);
	});
});
