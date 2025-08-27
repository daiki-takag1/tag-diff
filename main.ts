import { getLatestReleaseTag } from "./get_latest_release_tag.ts";

export async function main() {
  const latestReleaseTag = await getLatestReleaseTag();
  console.log(latestReleaseTag);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
