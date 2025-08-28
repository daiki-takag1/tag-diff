import { getOctokit, context } from "npm:@actions/github";
import core from "npm:@actions/core";

export async function main() {
  const githubToken = core.getInput("GH_TOKEN", { required: true });
  const base = core.getInput("BASE", { required: true });

  const github = getOctokit(githubToken);

  const latestRelease = await github.rest.repos.getReleaseByTag({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag: context.ref,
  });

  await github.rest.repos.merge({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: base,
    head: context.sha,
    commit_message: `release: ${latestRelease.data.tag_name} : ${latestRelease.data.name}`,
    merge_method: "merge",
  });
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
