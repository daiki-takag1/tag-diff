import { getOctokit, context } from "npm:@actions/github";

export async function main() {
  const githubToken = Deno.env.get("GH_TOKEN");
  if (!githubToken) {
    throw new Error("GH_TOKEN is not set");
  }

  const github = getOctokit(githubToken);


  const latestRelease = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  await github.rest.repos.merge({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: "production",
    head: context.sha,
    commit_message: `release: ${latestRelease.data.tag_name} : ${latestRelease.data.name}`,
    merge_method: "merge",
  });
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
