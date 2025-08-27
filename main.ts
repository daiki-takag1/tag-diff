import { getLatestReleaseTag } from "./get_latest_release_tag.ts";

export function main() {
  const latestReleaseTag = getLatestReleaseTag();
  console.log(latestReleaseTag);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
