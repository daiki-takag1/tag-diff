import { getOctokit } from "npm:@actions/github";
import core from "npm:@actions/core";

export async function getLatestReleaseTag() {
  const githubToken = Deno.env.get("GH_TOKEN");
  if (!githubToken) {
    throw new Error("GH_TOKEN is not set");
  }

  const github = getOctokit(githubToken);

  const response = await github.rest.repos.getLatestRelease();

  core.setOutput("latest_release_tag", response.data.tag_name);

  console.log(response.data.tag_name);
}
