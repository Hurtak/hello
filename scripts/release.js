const fs = require("fs");
const path = require("path");
const execa = require("execa");

async function execCommand(...args) {
  let res;
  try {
    res = await execa(...args);
  } catch (e) {
    console.error(e.all);
    process.exit(1);
  }

  return res.stdout;
}

async function main() {
  console.log("Running release script");

  process.chdir(path.join(__dirname, "/.."));
  console.log(`CWD: ${process.cwd()}`);

  console.log("");

  console.log("Getting version from CHANGELOG.md");
  const changelog = fs.readFileSync(path.join(__dirname, "../CHANGELOG.md"), "utf8");
  const isUnreleased = Boolean(changelog.match(/^## \[Unreleased\]+/im));
  if (isUnreleased) {
    console.error(`  "Unreleased" version in changelog, exiting`);
    return;
  }

  const versionMatch = changelog.match(/^## \[(.+)\]+/m);
  const versionChangelog = Array.isArray(versionMatch) && versionMatch[1] ? versionMatch[1] : null;
  if (!versionChangelog) {
    console.error("  Could not parse version from changelog, exiting");
    return;
  } else {
    console.log(`  OK, version: "${versionChangelog}"`);
  }

  console.log(`Checking if there is correct version in package.json`);
  const packageJsonString = fs.readFileSync(path.join(__dirname, "../package.json"), "utf8");
  const packageJson = JSON.parse(packageJsonString);
  const versionPackageJson = packageJson.version;
  if (versionPackageJson !== versionChangelog) {
    console.error(
      `  Version from package.json "${versionPackageJson}" is not equal to version from changelog "${versionChangelog}", exiting`,
    );
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there is correct version in public/manifest.json`);
  const manifestString = fs.readFileSync(path.join(__dirname, "../public/manifest.json"), "utf8");
  const manifest = JSON.parse(manifestString);
  const versionManifest = manifest.version;
  if (versionManifest !== versionChangelog) {
    console.error(
      `  Version from public/manifest.json "${versionManifest}" is not equal to version from changelog "${versionChangelog}", exiting`,
    );
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Pulling git tags`);
  await execCommand("git", ["pull", "--tags"]);
  console.log("  OK");

  console.log(`Checking if current branch is master`);
  const branchName = await execCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  if (branchName !== "master") {
    console.error(`  Current Git branch is "${branchName}", it must be "master", exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there are any uncommitted changes`);
  const gitStatus = await execCommand("git", ["status", "-s"]);
  if (gitStatus) {
    console.error(`  There are uncommitted changes, exiting`);
    return;
  } else {
    console.log("  OK");
  }

  const gitTag = `v${versionChangelog}`;

  console.log(`Check if tag "${gitTag}" does not already exist`);
  const gitTagExists = await execCommand("git", ["tag", "--list", gitTag]);
  if (gitTagExists) {
    console.error(`  Git tag "${gitTag}" already exists, exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log("Running validate script");
  await execCommand("npm", ["run", "validate"]);
  console.log("  OK");

  console.log(`Building the app`);
  await execCommand("npm", ["run", "build"]);
  console.log("  OK");

  console.log(`Creating the zip of builded app`);
  await execCommand("npm", ["run", "zip"]);
  console.log("  OK");

  console.log(`Git commit release`);
  await execCommand("git", ["commit", "--allow-empty", "--message", `release ${versionChangelog}`]);
  console.log("  OK");

  console.log(`Creating tag "${gitTag}"`);
  await execCommand("git", ["tag", "--annotate", gitTag, "--message", gitTag]);
  console.log(`  OK`);

  console.log(`Git push`);
  await execCommand("git", ["push"]);
  console.log("  OK");

  console.log(`Pushing tags`);
  await execCommand("git", ["push", "origin", gitTag]); // Tags are not pushed by regular `git push`.
  console.log(`  OK`);

  console.log("");
  console.log("DONE");
}

main();
