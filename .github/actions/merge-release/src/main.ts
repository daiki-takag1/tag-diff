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

  const branchName = `release/${latestRelease.data.tag_name}`;

  const branch = await github.rest.git.createRef({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: `refs/heads/${branchName}`,
    sha: latestRelease.data.target_commitish,
  });

  console.log(`Branch created: ${branch.url}`);

  const pullRequest = await github.rest.pulls.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    head: branchName,
    base: base,
    title: `Release: ${latestRelease.data.name}`,
    body: `Release: ${latestRelease.data.name}`,
  });

  console.log(`Pull request created: ${pullRequest.data.html_url}`);
}

await main();
