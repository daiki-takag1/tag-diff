import { getOctokit, context } from "npm:@actions/github";
import core from "npm:@actions/core";

export async function main() {
  const githubToken = Deno.env.get("GH_TOKEN");
  if (!githubToken) {
    throw new Error("GH_TOKEN is not set");
  }

  const github = getOctokit(githubToken);

  const response = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const latestReleaseTag = response.data.tag_name;

  core.setOutput("latest_release_tag", latestReleaseTag);

  const currentBranch = context.ref;

  const diffResponse = await github.rest.repos.compareCommitsWithBasehead({
    owner: context.repo.owner,
    repo: context.repo.repo,
    basehead: `${currentBranch}...${latestReleaseTag}`,
  });

  const diffFiles = diffResponse.data.files;

  console.log(diffFiles);

  if (!diffFiles) {
    core.setOutput("diff", []);
    return;
  }

  for (const file of diffFiles) {
    core.setOutput("diff", file.filename);
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
