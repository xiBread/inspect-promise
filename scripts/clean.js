const fs = require("node:fs/promises");

(async () => {
	await Promise.all([
		fs.rm("dist/", { recursive: true, force: true }),
		fs.rm("build/", { recursive: true, force: true }),
		fs.rm("prebuild/", { recursive: true, force: true }),
	]);
})();
