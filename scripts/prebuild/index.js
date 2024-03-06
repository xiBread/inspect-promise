const fs = require("node:fs");
const { getInput, setFailed } = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const { create } = require("@actions/glob");

const path = getInput("path", { required: true });
const releaseTag = getInput("releaseTag", { required: false });
const contentType = getInput("content-type", { required: false });

const octokit = getOctokit(process.env.GITHUB_TOKEN);
const { owner, repo } = context.repo;

async function run() {
	let releaseId;
	let uploadUrl;

	if (releaseTag) {
		const response = await octokit.rest.repos.getReleaseByTag({
			owner,
			repo,
			tag: releaseTag,
		});

		if (response.status !== 200) {
			setFailed(`Failed to get release "${releaseTag}"`);
			process.exit(1);
		}

		releaseId = `${response.data.id}`;
	} else {
		releaseId = context.payload.release?.id;
	}

	try {
		const response = await octokit.rest.repos.getRelease({
			owner,
			repo,
			release_id: releaseId,
		});

		uploadUrl = response.data.upload_url;
	} catch (error) {
		setFailed(error);
		process.exit(1);
	}

	const globber = await create(path);

	for await (const path of globber.globGenerator()) {
		const file = fs.createReadStream(path);
		const name =
			process.platform === "win32" ? path.split("\\").at(-1) : path.split("/").at(-1);

		try {
			await octokit.rest.repos.uploadReleaseAsset({
				owner,
				repo,
				url: uploadUrl,
				data: file,
				name,
				headers: {
					"Content-Type": contentType,
					"Content-Length": fs.statSync(path).size,
				},
			});
		} catch (error) {
			setFailed(error);
		}
	}
}

run();
