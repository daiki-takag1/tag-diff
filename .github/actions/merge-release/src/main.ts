import { getOctokit, context } from "@actions/github";
import core from "@actions/core";

export async function main() {
  const githubToken = core.getInput("GH_TOKEN", { required: true });
  const base = core.getInput("BASE", { required: true });

  const github = getOctokit(githubToken);

  const latestRelease = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  await github.rest.repos.merge({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: base,
    head: context.sha,
    commit_message: `Release: ${latestRelease.data.name}`,
    merge_method: "merge",
  });
}

await main();
